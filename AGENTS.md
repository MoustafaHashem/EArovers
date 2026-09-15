<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Documentation Updating Rule

Before concluding any major task or session, you MUST update the following documentation files to reflect any architectural changes, new dependencies, new files, new API routes, caching strategies, or significant refactoring that occurred:
- `MEMORY.md`
- `docs/ARCHITECTURE.md`
- `docs/PROJECT_AUDIT.md` (if resolving an audited issue)

Do not wait for the user to ask you to update these files. Make it a mandatory step of your feature completion workflow.
