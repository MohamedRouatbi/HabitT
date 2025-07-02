import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter } from "expo-router";
import { useSegments } from "expo-router/build/hooks";
import React, { useEffect } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();
  useEffect(() => {
    const isAuthGroup = segments[0] === "auth";
    if (!user && !isAuthGroup && !isLoadingUser) {
      const timeout = setTimeout(() => {
        router.replace("/auth");
      }, 0);

      return () => clearTimeout(timeout); // Cleanup
    } else if (user && isAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments]);

  return <>{children}</>;
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
