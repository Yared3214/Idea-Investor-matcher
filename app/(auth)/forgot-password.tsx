import { useAuth } from "@/hooks/useAuth";
import { EmailIcon, LockIcon } from "@/lib/utils/Icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = () => {
      let valid = true;
    
      // Email
      if (!email) {
        setEmailError("Email is required");
        valid = false;
      } else if (!emailRegex.test(email)) {
        setEmailError("Enter a valid email address");
        valid = false;
      } else {
        setEmailError(null);
      }
    
      return valid;
    };


  const { forgotPassword, loading, error } = useAuth();

  const handleResetRequest = async() => {
    const isValid = validate();
    if (!isValid) return;

    await forgotPassword(email);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: "#FFFFFF",
        flexGrow: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ alignItems: "center", marginTop: 20, marginBottom: 48 }}>
          <LinearGradient
            colors={["#4F46E5", "#9333EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <LockIcon fillColor="#FFFFFF" />
          </LinearGradient>

          <Text style={styles.title}>Reset your password</Text>
          <Text style={styles.subtitle}>
            Enter your email and we&apos;ll send you a link{"\n"}to reset your password
          </Text>
        </View>

        {/* Email Field */}
        <View style={styles.field}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.iconLeft}>
              <EmailIcon />
            </View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="john@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                emailError && { borderColor: "#DC2626" }
              ]}
            />
          </View>
          {emailError && (
          <Text style={{ color: "#DC2626", fontSize: 12, marginTop: 6 }}>
            {emailError}
          </Text>
        )}
        </View>

        {/* Submit Button */}
        <Pressable 
          onPress={handleResetRequest} 
          disabled={!email.trim()}
          style={[
            styles.submitButton,
            !email.trim() && styles.disabledButton,
          ]}
        >
            <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
        </Pressable>

        {error ? (
          <Text style={{ color: "red", marginTop: 12, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}

        {/* Back to Login */}
        <View style={{ alignItems: "center", marginTop: 32 }}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>
              ← Back to login
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
  },
  field: {
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: 56,
    paddingLeft: 48,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    fontSize: 16,
    color: "#111827",
  },
  iconLeft: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  submitButton: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: '#6366f1',
  },
  disabledButton: {
    opacity: 0.6,
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