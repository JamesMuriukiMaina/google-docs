import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });

    return documentId;
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("You need to be loggedIn to delete this document");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("No document found with that id.");
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) {
      throw new ConvexError(
        "You cannot delete a document that is owned by somebody else"
      );
    }

    return await ctx.db.delete(args.id);
  },
});

export const edit = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args_0) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args_0.id);
    if (!document) {
      throw new ConvexError("The document does not exist");
    }

    const isOwner = user.subject === document.ownerId;

    if (!isOwner) {
      throw new ConvexError("You don't have permission to edit this document");
    }

    return ctx.db.patch(args_0.id, { title: args_0.title });
  },
});
