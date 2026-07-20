<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Shared memory — Jacobee vault

Jacob maintains a personal/business knowledge vault (Obsidian, built on the LLM Wiki
method) at `C:\Users\Jacob\Desktop\Jacobee`. It holds standing context across his four
entities — Atsell, Afix.sg, Physio and Sole Clinic Group, AnjouHealth — covering people,
companies, projects, decisions, meetings, and reusable knowledge.

Use it as shared memory. When you need context about a person, company, project, or past
decision that you don't already have (e.g. writing a post that references Jacob's work),
read from the vault instead of asking him to re-explain:

1. Read `C:\Users\Jacob\Desktop\Jacobee\index.md` first — it's the catalog. Find the note.
2. Drill into the note. Start points for this project: `Projects\AI for Boomers
   (ai-learnings-eight.vercel.app).md`, and `Knowledge\` for AI/agent method write-ups.
3. For how the vault is structured, see `C:\Users\Jacob\Desktop\Jacobee\CLAUDE.md`.
4. `grep`/`glob` the folders (People/ Companies/ Projects/ Decisions/ Meetings/ Knowledge/)
   if the index doesn't surface it.

Rules:
- **Don't read the vault unless you actually need context you don't already have** — it
  costs tokens.
- **This project reads the vault; it does not write to it.** Vault edits happen in a
  Jacobee session, not from here. If something here is vault-worthy, flag it for Jacob.
- If the vault isn't accessible, say so and proceed on local context — never invent facts
  about Jacob's entities.
