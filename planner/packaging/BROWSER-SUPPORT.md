# Browser & Device Support — Ultimate Offline Life Planner

Last updated: 2026-10-17 (v1.0.0)

## Support matrix

| Platform | Status | Notes |
|---|---|---|
| Firefox (desktop, current) | **Tested** | Automated smoke tests pass: all views, task/habit CRUD, JSON backup export/import, zero page errors. |
| Chromium / Chrome (desktop, current) | **Tested** | Same automated smoke tests as Firefox. |
| Safari (desktop) | **Not yet tested** | Expected to work (uses standard web APIs only), but unverified on a real Mac. Help us verify. |
| Chrome (Android) | **Not yet tested** | Expected to work; file downloads and localStorage behave per Android Chrome's standard policies. Unverified on a real device. |
| Safari (iOS) | **Not yet tested** | Expected to work; iOS Safari has stricter storage eviction policies — keep regular JSON backups. Unverified on a real device. |
| Older browsers (5+ years) | **Not supported** | The planner uses modern JavaScript. Use a current browser. |

We do **not** claim "works on all devices". The table above is the complete
truth as of this version. If you test an untested platform, please tell us
so we can update this document.

## Opening from disk (file://)

Double-clicking `ultimate-life-planner.html` opens it directly from your disk.
This works in current Firefox and Chromium-based browsers, including
localStorage persistence.

Known caveats:

- **Safari** has historically restricted web storage for `file://` pages. If
  the planner shows its "changes may not persist" warning, export a JSON
  backup immediately.
- Some browsers treat each local file as a separate origin. If you move or
  rename the file, previously saved data may appear to vanish — it is still
  stored under the old file path/origin. Keep the file in one stable location.
- If storage ever behaves unexpectedly, the reliable workaround is to serve
  the file over local HTTP. Example with Python:
  `python3 -m http.server 8000` in the planner folder, then open
  `http://localhost:8000/ultimate-life-planner.html`.

## Offline use and fonts

The planner makes **no network requests while you use it** — no analytics,
no tracking, no cloud calls. On first load with an internet connection it
requests the Inter typeface from Google Fonts; offline, it silently falls
back to your system fonts and works fully either way.

## Backups are your responsibility

Browser storage can be cleared by the browser, the OS, privacy tools, or the
user. It is not a permanent archive. Export a JSON backup from Settings
regularly and keep copies outside the browser (cloud drive, USB stick).
CSV export is available for tasks, habits, and budget entries.
