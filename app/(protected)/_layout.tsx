import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)", // anchor
};

export default function ProtectedLayout() {
    const { token, loading } = useAuthStore()

    if (loading) return null

    if (!token) return <Redirect href='/login' />
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onboard"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="investor"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
