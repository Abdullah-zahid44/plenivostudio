# Ultimate Offline Life Planner — README

## What this is

The Ultimate Offline Life Planner by Digitali is a personal planning
application delivered as a **single self-contained HTML file**. You buy it
once, download it, and open it in your web browser — no installation, no
account, no subscription, no internet connection required for daily use.

## What's in the ZIP

- `ultimate-life-planner.html` — the planner application (open this file)
- `README.md` — this file
- `QUICKSTART.md` — get running in five minutes
- `LICENSE.txt` — your single-user license terms
- `CHANGELOG.md` — version history
- `BROWSER-SUPPORT.md` — honest browser/device compatibility notes

## How to open it

1. Extract the ZIP to a folder on your device.
2. Double-click `ultimate-life-planner.html`. It opens in your default browser.
3. Optional: bookmark it, or add it to your home screen / dock for quick access.

Supported browsers are listed in `BROWSER-SUPPORT.md`. Any modern desktop
browser from the last few years will run it.

## Your data

- Everything you enter is stored **locally in your browser** (your device
  only). There is no account, no cloud sync, and the planner makes no network
  requests while you use it.
- Browser storage is convenient but not indestructible: clearing browser data,
  uninstalling the browser, or switching devices will remove your planner data.
- **Back up regularly:** use Settings → Export to download a JSON backup file,
  and keep copies somewhere safe (a cloud drive folder, USB stick, etc.).
  You can re-import a backup at any time via Settings → Import.

### A note on file:// usage

Opening the file directly from your disk (`file://`) works in current
versions of Firefox and Chromium-based browsers. Some browsers restrict
storage features for local files; if the planner ever shows a warning that
changes may not persist, use the Export feature immediately and consider
serving the file over `http://localhost` (see `BROWSER-SUPPORT.md`).

## Fonts

On first load with an internet connection, the planner requests the Inter
typeface from Google Fonts. If you are offline, it silently falls back to
your system's built-in fonts — the planner works fully either way.

## No account needed

There is nothing to sign up for and nothing to sign in to. Your license is
tied to your purchase receipt from our payment provider, not to an account
inside the planner.

## Getting help

- In-app: open the Help panel (the `?` button) for a feature tour.
- Web: visit the Digitali contact page for support options.

## License

Single-user license. See `LICENSE.txt` for the full terms: personal use on
your own devices, backup copies allowed, no redistribution or resale.
