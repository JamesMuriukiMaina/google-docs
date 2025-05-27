import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";
import { PALETTE as palette } from "@/constants/colors";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const liveblocks = new Liveblocks({ secret: process.env.LIVEBLOCKS_SECRET! });

function pickColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

export async function POST(req: Request) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await req.json();

  const document = await convex.query(api.document.getById, { id: room });

  if (!document) {
    console.log("Hey jimmie, I don't exist");
    return new Response("Unauthorized", { status: 401 });
  }

  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === sessionClaims.org_id
  );

  if (isOwner && isOrganizationMember) {
    console.log("Hey jimmie am damned");
    return new Response("Unauthorized", { status: 401 });
  }

  const name =
    user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";

  const color = pickColor(name);

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
