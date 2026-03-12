# Lab Project | Security & Advanced Typing

## Stack

- `Node.js`/`TypeScript`
- `Vite` + `React` | Front-end
- `TailwindCSS` + `Shadcn/ui` | Faster UI Development
- `Fastify` | Back-end
- `Zod` | Client and Server Sides Typing
- `JWT` + `Bcrypt` | Security and Hashing
- `PostgreSQL` + `Prisma ORM` | Database

## Description

> An Auth system with multiple access levels (`Admin`, `Editor`, `Viewer`)
>
> - **Technical Goal:** `Zod` for schemas validation, `JWT` with `httpOnly` cookies and `TypeScript Generics`
>
> - **What am I proving?** I know how to create contracts that propagates from Back-end to Front-end without errors

## What did I learn?

> This project is one of my **Personal Lab's** projects, dedicated to simple/small projects that I created to learn some specific feature

### Setting up the Project and its Stack

### Working with GitHub Branches Management (such an even more simplified version of GitHub Flow)

**Branches:**

- `main` | Where the official files and versions should be published
- `feat/lab` | For development (features, fixes, bugs, updates, etc.)

**Workflow:**

```bash
$ git checkout -b feat/lab # Creates feat/lab branch.

# Coding process (create features, update files, anything needed).

$ git status # Makes sure your actual working tree is as you expect.

$ git add <files or *> # Adds target files on the working tree.
$ git commit -m "example commit message"

# If needed, continue coding until a new commit is required (like for new features/fixes/chores).
# Repeats the "git add" and "git commit" commands as needed.

$ git status # Makes sure you haven't forget to stage/commit any file (again).

$ git branch # It's recommended to verify in which branch you are.

# If you're in the wrong branch you must use "git branch --list" to see the branches list and then select the right one by running "git switch <branch>".

$ git push # Pushes the commited changes to the actual branch.
# If you need to specify, you can use "git push <origin> <branch/flag>.

# Then, only when you've finished the process of developing everything on the development branch and it's all lookig good and working properly, you can now proceed to the next step, that's one of the simplest ones.

$ git switch [main/master] # Switches to your project's main branch
$ git merge feat/lab # Merges the actual (feat/lab) branch within main branch with all its changes
```
