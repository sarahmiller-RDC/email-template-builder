---
description: Commit local changes and push to main to trigger Vercel auto-deploy
---

1. Show what will be committed.
// turbo
```bash
git status --short
```

2. Stage, commit (if anything is staged), pull --rebase to sync with remote, then push.
// turbo
```bash
git add -A && (git diff --cached --quiet || git commit -m "update") && git pull --rebase && git push
```

4. Report the pushed commit SHA to the user and note that Vercel will auto-deploy from `main`.
