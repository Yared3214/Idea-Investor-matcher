import { BoltIcon } from "@/lib/utils/Icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmailConfirmation() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]); // Array of refs
  const router = useRouter();

  const handleOtpChange = (value: string, index: number) => {
    // Only allow digits
    if (value !== "" && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next field
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      // TODO: verify OTP with your backend
      router.replace("/");
    }
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
            <BoltIcon />
          </LinearGradient>

          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{"\n"}
            <Text style={{ fontWeight: "600", color: "#111827" }}>
              john@example.com
            </Text>
          </Text>
        </View>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
              selectTextOnFocus
              textAlign="center"
              autoCapitalize="none"
            />
          ))}
        </View>

        {/* Verify Button */}
        <Pressable onPress={handleVerify} disabled={otp.join("").length !== 6}>
          <LinearGradient
            colors={["#4F46E5", "#9333EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.verifyButton,
              otp.join("").length !== 6 && styles.disabledButton,
            ]}
          >
            <Text style={styles.buttonText}>Verify Email</Text>
          </LinearGradient>
        </Pressable>

        {/* Resend & Back */}
        <View style={{ alignItems: "center", marginTop: 32, gap: 12 }}>
          <Text style={styles.resendText}>
            Didn&apos;t receive the code?{" "}
            <Text style={styles.resendLink}>Resend code</Text>
          </Text>

          <Pressable onPress={() => router.replace('/login')}>
            <Text style={styles.backLink}>Back to login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

// Styles remain the same as before
const styles = StyleSheet.create({
  // ... (your existing styles)
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 52,
    height: 60,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
  verifyButton: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  resendText: {
    fontSize: 14,
    color: "#4B5563",
  },
  resendLink: {
    color: "#4F46E5",
    fontWeight: "600",
  },
  backLink: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
});