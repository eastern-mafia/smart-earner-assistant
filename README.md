# Link to data repo: https://github.com/eastern-mafia/data

# How to run this template

## 1. Download repo

```
git clone git@github.com:eastern-mafia/next-template.git
```

## 2. Install pnpm if you don't have it already (your laptop will thank you)

```
npm install -g pnpm
```

## 3. Install deps

```
cd next-template
pnpm install
```

## 4. Setup Clerk

Go to [Clerk](https://clerk.com/) and create an account. Then send your email address on Discord so I can add you to the project.

After that, DM me to send you the environment variables for Clerk, which you should add in `.env` in the root of the repo.

## 5. Setup Convex

Go to [Convex](https://www.convex.dev/) and create an account, then send your email address on Discord so I can add you to the project.

After you are in the project, run

```
pnpm convex dev
```

and select "Choose an existing project" and "Eastern Mafia: next-template" or whatever they are called.

This should add your development URLs to the `.env.local` file (not `.env`).

Please note that every developer in a Convex project has a separate development database with different data, that is at a different URL. The production data is shared, though.

## 6. Run dev server

```
pnpm dev
```

After that, try creating an account and adding a todo like "(your name) was here".
