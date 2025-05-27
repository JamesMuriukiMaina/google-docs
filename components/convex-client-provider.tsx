"use client";

import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";
import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";
import FullScreenLoader from "./Screen_loader";
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>

        <Unauthenticated>
          <div
            className={"flex items-center flex-col justify-center min-h-screen"}
          >
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>

        <AuthLoading>
          <FullScreenLoader label="We're glad to see you join us. Kindly wait as we authenticate you." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
