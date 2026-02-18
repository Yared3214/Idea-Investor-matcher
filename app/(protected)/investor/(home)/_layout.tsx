import { Stack } from "expo-router";
import React from "react";

export default function BottomTabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Ideas", headerShown: false,}} />
    </Stack>
  );
}