#!/usr/bin/env node
/**
 * planner-smoke.mjs — Playwright smoke tests for the Digitali planner.
 *
 * Usage:
 *   node tests/planner-smoke.mjs [path/to/planner.html]
 *   node tests/planner-smoke.mjs ../planner/ultimate-life-planner.html
 *
 * Real assertions only. Every check prints PASS/FAIL; the process exits
 * nonzero if any check fails.
 */
import { firefox } from 'playwright-core';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const FIREFOX_FALLBACK =
  '/home/hatch/.cache/ms-playwright/firefox-1555/firefox/firefox';

const plannerArg = process.argv[2] || '../planner/ultimate-life-planner.html';
const plannerPath = path.resolve(plannerArg);

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

async function launchBrowser() {
  try {
    return await firefox.launch();
  } catch {
    return await firefox.launch({ executablePath: FIREFOX_FALLBACK });
  }
}

const VIEWS = [
  'today', 'braindump', 'tasks', 'goals', 'calendar', 'habits',
  'routines', 'timer', 'dopamine', 'impulse', 'notes', 'progress',
  'backup', 'settings',
];

async function main() {
  check('planner file exists', fs.existsSync(plannerPath), plannerPath);
  if (!fs.existsSync(plannerPath)) return finish();

  const browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  const pageErrors = [];
  const consoleErrors = [];
  const externalRequests = [];
  page.on('pageerror', (e) => pageErrors.push(String(e).slice(0, 200)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
  });
  page.on('request', (req) => {
    const u = req.url();
    if (/^https?:\/\//i.test(u)) externalRequests.push(u);
  });

  await page.goto(pathToFileURL(plannerPath).href, { waitUntil: 'load' });
  await page.waitForSelector('.nav-item[data-view="today"]', { timeout: 15000 });
  await page.waitForTimeout(1200);

  check(
    'page loads with zero page errors',
    pageErrors.length === 0,
    pageErrors.length ? pageErrors[0] : '',
  );
  check(
    'page loads with zero console errors',
    consoleErrors.length === 0,
    consoleErrors.length ? consoleErrors[0] : '',
  );

  // --- Navigation: every view renders ---
  let navOk = true;
  let navDetail = '';
  for (const v of VIEWS) {
    try {
      await page.click(`.nav-item[data-view="${v}"]`, { timeout: 5000 });
      await page.waitForTimeout(250);
      const visible = await page.evaluate((view) => {
        const el = document.getElementById('view-' + view);
        return !!el && el.offsetParent !== null;
      }, v);
      if (!visible) { navOk = false; navDetail = `view "${v}" not visible`; break; }
    } catch (e) {
      navOk = false; navDetail = `view "${v}": ${String(e).slice(0, 100)}`; break;
    }
  }
  check('navigation: all 14 views render', navOk, navDetail);

  // --- Tasks: add + complete ---
  let taskOk = false, taskDetail = '';
  try {
    await page.click('.nav-item[data-view="tasks"]');
    await page.waitForTimeout(300);
    await page.evaluate(() => window.openAddTaskModal());
    await page.waitForTimeout(300);
    await page.fill('#newTaskTitle', 'SMOKE QA task');
    await page.evaluate(() => window.confirmAddTask());
    await page.waitForTimeout(400);
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (!bodyText.includes('SMOKE QA task')) throw new Error('task not visible after add');
    const toggled = await page.evaluate(() => {
      const items = [...document.querySelectorAll('#view-tasks .task-item')];
      const row = items.find((el) => el.innerText.includes('SMOKE QA task'));
      const box = row && row.querySelector('.custom-checkbox');
      if (!box) return false;
      box.click();
      return true;
    });
    if (!toggled) throw new Error('checkbox for QA task not found');
    await page.waitForTimeout(300);
    const completed = await page.evaluate(() => {
      const t = state.tasks.find((x) => x.title === 'SMOKE QA task');
      return !!(t && t.completed);
    });
    if (!completed) throw new Error('task did not toggle to completed');
    taskOk = true;
  } catch (e) { taskDetail = String(e).slice(0, 140); }
  check('tasks: add + complete via UI', taskOk, taskDetail);

  // --- Habits: add + toggle day ---
  let habitOk = false, habitDetail = '';
  try {
    await page.click('.nav-item[data-view="habits"]');
    await page.waitForTimeout(300);
    await page.evaluate(() => window.openAddHabitModal());
    await page.waitForTimeout(300);
    await page.fill('#newHabitName', 'SMOKE QA habit');
    await page.evaluate(() => window.confirmAddHabit());
    await page.waitForTimeout(400);
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (!bodyText.includes('SMOKE QA habit')) throw new Error('habit not visible after add');
    const before = await page.evaluate(() =>
      JSON.stringify(state.habits.find((h) => h.name === 'SMOKE QA habit').days));
    await page.click('#habitsContainer > div:first-child > div:last-child > div:first-child');
    await page.waitForTimeout(300);
    const after = await page.evaluate(() =>
      JSON.stringify(state.habits.find((h) => h.name === 'SMOKE QA habit').days));
    if (before === after) throw new Error('habit day dot click had no effect on state (no toggle wired)');
    habitOk = true;
  } catch (e) { habitDetail = String(e).slice(0, 140); }
  check('habits: add + toggle day via UI', habitOk, habitDetail);

  // --- Backup: export downloads valid JSON ---
  let exportOk = false, exportDetail = '', exportPath = '';
  try {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 8000 }),
      page.evaluate(() => window.exportData()),
    ]);
    exportPath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'digitali-')), 'backup.json');
    await download.saveAs(exportPath);
    const parsed = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
    if (!Array.isArray(parsed.tasks)) throw new Error('exported JSON has no tasks array');
    if (!parsed.tasks.some((t) => t.title === 'SMOKE QA task')) {
      throw new Error('exported JSON missing the QA task');
    }
    exportOk = true;
  } catch (e) { exportDetail = String(e).slice(0, 140); }
  check('backup: export downloads valid JSON', exportOk, exportDetail);

  // --- Backup: import restores data ---
  let importOk = false, importDetail = '';
  try {
    if (!exportPath) throw new Error('no exported file to import (export check failed)');
    await page.evaluate(() => {
      state.tasks = state.tasks.filter((t) => t.title !== 'SMOKE QA task');
      window.saveState();
      window.renderTasks();
    });
    await page.waitForTimeout(300);
    await page.setInputFiles('#importFile', exportPath);
    await page.waitForTimeout(1200);
    const restored = await page.evaluate(() =>
      state.tasks.some((t) => t.title === 'SMOKE QA task'));
    if (!restored) throw new Error('QA task not present in state after import');
    importOk = true;
  } catch (e) { importDetail = String(e).slice(0, 140); }
  check('backup: import restores exported data', importOk, importDetail);

  // --- Offline: zero external network requests ---
  const seen = [...new Set(externalRequests)];
  check(
    'offline: no external http(s) requests',
    seen.length === 0,
    seen.length ? `got ${seen.length}: ${seen.slice(0, 3).join(' | ')}` : '',
  );

  await browser.close();
  finish();
}

function finish() {
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  if (failed.length) {
    console.log('Failed checks:');
    for (const f of failed) console.log(`  - ${f.name}${f.detail ? ': ' + f.detail : ''}`);
  }
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error('FATAL', String(e).slice(0, 300));
  process.exit(2);
});
