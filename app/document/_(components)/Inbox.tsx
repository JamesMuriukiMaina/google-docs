"use client";
import { ClientSideSuspense } from "@liveblocks/react";
import { BellIcon } from "lucide-react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Inbox() {
  return (
    <ClientSideSuspense
      fallback={
        <Button disabled variant={"ghost"} className={"relative"} size={"icon"}>
          <BellIcon className={"size-5"} />
        </Button>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
}

function InboxMenu() {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className={"relative"} size={"icon"}>
            <BellIcon className={"size-5"} />
            {inboxNotifications.length > 0 && (
              <span
                className={
                  "absolute -top-1 -right-1 rounded-full size-4 bg-sky-500 text-xs flex items-center justify-center text-white"
                }
              >
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={"w-auto"}>
          {inboxNotifications.length > 0 ? (
            <>
              <InboxNotificationList>
                {inboxNotifications.map((inboxNotification) => (
                  <InboxNotification
                    key={inboxNotification.id}
                    inboxNotification={inboxNotification}
                  />
                ))}
              </InboxNotificationList>
            </>
          ) : (
            <>
              <div
                className={
                  "p-2 w-[400px] text-center text-sm text-muted-foreground"
                }
              >
                No notifications
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
