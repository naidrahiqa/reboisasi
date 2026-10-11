# reboisasi

A small Node.js script plus a scheduled GitHub Actions workflow that appends a few randomized log entries and commits them every day — so the GitHub contribution graph stays green. *Reboisasi* (Indonesian for "reforestation") is the joke: each run "plants" a handful of commits.

**Heads up:** this is purely a contribution-graph toy. It produces no value for anyone else and the commits are auto-generated noise.

## How it works

1. [`index.js`](index.js) picks a random commit count between `MIN_COMMITS` and `MAX_COMMITS` (default **1–5**).
2. For each commit it appends a line to `log.txt`:
   `Log entry: <ISO timestamp> - Hash: <8 random hex chars>`
3. Each entry is committed individually as
   `chore: auto sync data <hash> [skip ci]`
4. After the loop it pushes everything to `main`.

The `[skip ci]` tag prevents those commits from re-triggering the push event, so the workflow doesn't recurse.

## Schedule

The workflow ([`.github/workflows/reboisasi.yml`](.github/workflows/reboisasi.yml), **Auto Reboisasi**) runs on:

| Trigger | Value |
| ------- | ----- |
| `schedule` | `0 12 * * *` — every day at **12:00 UTC** (19:00 WIB) |
| `push` | any push to `main` |
| `workflow_dispatch` | manual run from the **Actions** tab |

The runner checks out the full history (`fetch-depth: 0`), sets up **Node.js 20**, configures the git identity (`naidrahiqa <akufaqih1@gmail.com>`), and runs `node index.js` with `GITHUB_TOKEN` available in the environment.

## Usage

- **Automatic:** nothing to do; the cron keeps it running daily.
- **Manual:** Actions → *Auto Reboisasi* → *Run workflow*.
- **Locally:** `node index.js` (or `run.bat` on Windows), with a configured `origin` remote and push rights.

## Customization

| What | Where |
| ---- | ----- |
| Commits per run | `MIN_COMMITS` / `MAX_COMMITS` at the top of `index.js` |
| Run frequency | `cron` in `.github/workflows/reboisasi.yml` |
| Target branch | the `git push origin main` line at the bottom of `index.js` (and the `push.branches` trigger) |
| Commit message format | the `git commit -m ...` line in `index.js` |

## Requirements

- Node.js (v20 in CI; any recent version locally).
- A `git` remote you can push to. If you fork this, update the branch name in `index.js` if you don't use `main`.
