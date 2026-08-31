# BCA-USA

Brotherhood of Christian Athletes — USA chapter site (static HTML/CSS/JS).

Active development is on the **`future`** branch only (`main` is not used for this site).

## Collaborating with Dante (upstream)

Shared by **dantehsema** (`upstream`). Your fork is **`siggsters/BCA-USA`** (`origin`).

### One-time setup

1. Fork on GitHub: [dantehsema/BCA-USA → Fork](https://github.com/dantehsema/BCA-USA/fork)
2. In your fork’s **Settings → General → Default branch**, set **`future`** (optional but keeps PRs aligned).
3. Push only `future` to your fork:
   ```bash
   git push -u origin future
   ```

### Daily workflow (`future` only)

```bash
git fetch upstream
git checkout future
git merge upstream/future

# commit your work, then:
git push origin future

# Open PR: siggsters/BCA-USA (future) → dantehsema/BCA-USA (future)
```

### Remotes

| Remote     | Repo | Branch |
|------------|------|--------|
| `upstream` | `dantehsema/BCA-USA` | `future` (source of truth) |
| `origin`   | `siggsters/BCA-USA` | `future` (your fork) |
