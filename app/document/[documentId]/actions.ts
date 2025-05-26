"use server";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

interface SessionClaims {
  o?: {
    id: string;
    rol: string;
    slg: string;
  };
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export async function getDocuments(ids: Id<"documents">[]) {
  return convex.query(api.document.getByIds, { ids });
}

export async function getUsers() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const clerk = await clerkClient();

  try {
    // Get the organization ID from the session claims
    const orgId = (sessionClaims as SessionClaims)?.o?.id;

    if (!orgId) {
      throw new Error("No organization selected");
    }

    const response = await clerk.users.getUserList({
      organizationId: [orgId],
    });

    return response.data.map((user) => ({
      name:
        user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
      id: user.id,
      avatar: user.imageUrl,
    }));
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}
