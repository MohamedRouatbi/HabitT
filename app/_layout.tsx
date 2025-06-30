import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = false;
  useEffect(() => {
    if (!isAuth) {
      // Delay navigation to avoid navigating before mount
      const timeout = setTimeout(() => {
        router.replace("/auth");
      }, 0);

      return () => clearTimeout(timeout); // Cleanup
    }
  }, []);

  return <>{children}</>;
}
export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RouteGuard>
  );
}
