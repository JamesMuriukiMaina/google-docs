"use client";

import FullScreenLoader from "@/components/Screen_loader";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getUsers, getDocuments } from "./actions";
import type { Id } from "@/convex/_generated/dataModel";

type Users = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
  const [users, setUser] = useState<Users[]>([]);
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        const userList = await getUsers();

        setUser(userList);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Failed to fetch users ${error.message}`);
        }
      }
    })();
  }, []);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const authEndpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(authEndpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });
        return await response.json();
      }}
      throttle={16}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find(({ id }) => id === userId) ?? undefined
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        const filteredUsers = users;
        if (text) {
          filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);

        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{ leftMargin: 56, rightMargin: 56 }}
      >
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room loading" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
