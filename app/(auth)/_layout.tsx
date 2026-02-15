import { Stack } from 'expo-router';

export default function AuthRoutesLayout() {

  return (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="signup" options={{ headerTitle: 'Create Account'}}/>
    <Stack.Screen name="login" options={{ headerShown: false }} />
    <Stack.Screen name="forgot-password" />
  </Stack>
  );
}