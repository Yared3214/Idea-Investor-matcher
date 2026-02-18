import { Stack } from 'expo-router';

export default function AuthRoutesLayout() {

  return (
  <Stack>
    <Stack.Screen name="welcome" options={{ headerShown: false }} />
    <Stack.Screen name="signup" options={{ headerTitle: 'Create Account'}}/>
    <Stack.Screen name="login" options={{ headerShown: false }} />
    <Stack.Screen name="forgot-password" />
    <Stack.Screen name="verify-email" />
    <Stack.Screen name="reset-password" options={{ headerShown: false}}/>
  </Stack>
  );
}