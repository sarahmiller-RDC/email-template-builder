---
description: Commit local changes and push to main to trigger Vercel auto-deploy
---

1. Pull latest from origin/main to avoid conflicts.
// turbo
```bash
git pull --rebase
```

2. Show what will be committed.
// turbo
```bash
git status --short
```

3. Stage, commit, and push. If there are no changes, skip commit and just confirm remote is up to date.
// turbo
```bash
git add -A && git diff --cached --quiet || git commit -m "update" ; git push
```

4. Report the pushed commit SHA to the user and note that Vercel will auto-deploy from `main`.
