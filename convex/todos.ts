import {
  type ActionCtx,
  mutation,
  type MutationCtx,
  query,
  type QueryCtx,
} from "./_generated/server";
import { v } from "convex/values";

const requireLogin = async (ctx: MutationCtx | QueryCtx | ActionCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return { error: "Unauthorized" };
  }
  return identity;
};

export const changeCompletion = mutation({
  args: { id: v.id("todos"), completed: v.boolean() },
  handler: async (ctx, args) => {
		const loginResult = await requireLogin(ctx);
		if (loginResult.error) return;
    await ctx.db.patch(args.id, {
      completed: args.completed,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
		const loginResult = await requireLogin(ctx);
		if (loginResult.error) return;
    await ctx.db.delete(args.id);
  },
});

export const list = query({
  handler: async (ctx) => {
		const loginResult = await requireLogin(ctx);
		if (loginResult.error) return [];
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos.sort((a, b) => a._creationTime - b._creationTime);
  },
});

export const add = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
		const loginResult = await requireLogin(ctx);
		if (loginResult.error) return;
    await ctx.db.insert("todos", {
      title: args.title,
      completed: false,
    });
  },
});
