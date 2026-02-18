import { useAuth } from "@/hooks/useAuth";
import { LockIcon } from "@/lib/utils/Icons";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const router = useRouter();

  const { token, email } = useLocalSearchParams<{
    token: string;
    email: string;
  }>();


  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const isStrong = newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /\d/.test(newPassword);

  const { resetPassword, loading, error } = useAuth();
  const handleReset = async() => {
    if (passwordsMatch && isStrong) {
      // TODO: Call your reset password API with token + newPassword
      // On success → redirect to login or show success screen
      await resetPassword(email, token, newPassword);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
        backgroundColor: "#FFFFFF",
      }}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={{ flex: 1 }}>

        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <LinearGradient
            colors={["#4F46E5", "#9333EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <LockIcon fillColor="#FFFFFF"/>
            </LinearGradient>
          <Text style={styles.title}>Create New Password</Text>
          <Text style={styles.subtitle}>
            Your new password must be different from previous used passwords
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>

          {/* New Password */}
          <View style={styles.field}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconLeft}>
                <LockIcon fillColor="#9CA3AF" />
              </View>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={secureNew}
                style={styles.input}
                autoCapitalize="none"
              />
              <Pressable
                style={styles.iconRight}
                onPress={() => setSecureNew(!secureNew)}
              >
                <Feather
                    name={secureNew ? "eye" : "eye-off"}
                    size={20}
                    color="#9CA3AF"
                />
              </Pressable>
            </View>

            {/* Simple strength indicator */}
            {newPassword.length > 0 && (
              <View style={styles.strengthContainer}>
                <View
                  style={[
                    styles.strengthBar,
                    { width: isStrong ? "100%" : newPassword.length > 5 ? "60%" : "30%" },
                    { backgroundColor: isStrong ? "#10B981" : newPassword.length > 5 ? "#F59E0B" : "#EF4444" },
                  ]}
                />
                <Text style={styles.strengthText}>
                  {isStrong ? "Strong password" : newPassword.length > 5 ? "Medium" : "Weak"}
                </Text>
              </View>
            )}
          </View>

          {/* Confirm Password */}
          <View style={styles.field}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.iconLeft}>
                <LockIcon fillColor="#9CA3AF" />
              </View>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={secureConfirm}
                style={[
                  styles.input,
                  confirmPassword.length > 0 &&
                    !passwordsMatch && { borderColor: "#EF4444" },
                ]}
                autoCapitalize="none"
              />
              <Pressable
                style={styles.iconRight}
                onPress={() => setSecureConfirm(!secureConfirm)}
              >
                <Feather
                    name={secureConfirm ? "eye" : "eye-off"}
                    size={20}
                    color="#9CA3AF"
                />
              </Pressable>
            </View>

            {confirmPassword.length > 0 && !passwordsMatch && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>

          {/* Reset Button */}
          <Pressable
            onPress={handleReset}
            disabled={!passwordsMatch || !isStrong}
          >
            <LinearGradient
              colors={["#4F46E5", "#9333EA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.button,
                (!passwordsMatch || !isStrong) && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.buttonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
            </LinearGradient>
          </Pressable>

          {error && (
            <Text style={[styles.errorText, { textAlign: "center", marginTop: 12 }]}>
              {error}
            </Text>
          )}

          {/* Back to Login */}
          <View style={{ alignItems: "center", marginTop: 32 }}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backLink}>← Back to Login</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: 56,
    paddingLeft: 52,
    paddingRight: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 14,
    fontSize: 16,
    color: "#111827",
  },
  iconLeft: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  iconRight: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  strengthBar: {
    height: 6,
    borderRadius: 3,
    flex: 1,
  },
  strengthText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
  },
  errorText: {
    fontSize: 13,
    color: "#EF4444",
    marginTop: 6,
  },
  button: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backLink: {
    color: "#4F46E5",
    fontSize: 15,
    fontWeight: "600",
  },
});