import { useAuthStore } from "@/store/useAuthStore";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function BottomTabsLayout() {
  const router = useRouter();
  const { user } = useAuthStore();
    
  useEffect(() => {
    if(user?.role === "INVESTOR") {
      if(!user?.isOnboarded) {
        router.replace("/onboard");
      } else {
        router.replace("/investor")
      }
    }
  }, [user, router]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Ideas",}} />
      <Stack.Screen name="create-idea" options={{ title: "Create Idea"}} />
      <Stack.Screen name="idea-detail" options={{ title: "Idea Details"}} />
      <Stack.Screen name="update-idea" options={{ title: "Update Details"}} />
    </Stack>
  );
}