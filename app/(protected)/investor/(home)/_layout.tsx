import { Stack } from "expo-router";
import React from "react";

export default function BottomTabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Startup Matches", }} />
      <Stack.Screen name="idea-details" options={{ title: "Idea Detail",}} />
    </Stack>
  );
}