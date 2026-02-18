import { useAuthStore } from "@/store/useAuthStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import '../global.css';


export default function RootLayout() {
  const { restore } = useAuthStore()

  useEffect(() => {
    restore();
  },[restore])
  return <Stack>
    <Stack.Screen name="(protected)" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)" options={{ headerShown: false}}/>
  </Stack>;
}
