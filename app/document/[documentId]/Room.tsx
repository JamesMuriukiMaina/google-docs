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
import { getUsers } from "./actions";

type Users = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
  const [users, setUser] = useState<Users[]>([]);
  const params = useParams();

  useEffect(() => {
    (async function () {
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
      authEndpoint={"/api/liveblocks-auth"}
      throttle={16}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find(({ id }) => id === userId) ?? undefined
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;
        if (text) {
          filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room loading" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
