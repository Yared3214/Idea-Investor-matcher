import { useAuth } from "@/hooks/useAuth";
import { BoltIcon, EmailIcon, LockIcon } from "@/lib/utils/Icons";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async() => {
    await login(email, password)
    router.replace('/')
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
    <ScrollView
  contentContainerStyle={{
    flexGrow: 1,                    // ← crucial: allows content to expand
    justifyContent: 'center',       // ← centers content vertically when short
    paddingHorizontal: 20,
    paddingVertical: 24,            // symmetric padding looks better than only bottom
    backgroundColor: "#FFFFFF",
  }}
  keyboardShouldPersistTaps="handled"   // recommended for login forms
  // Optional: showsVerticalScrollIndicator={false}   // cleaner look
>
  <SafeAreaView style={{ flex: 1 }}>
    {/* Header Section */}
    <View style={{
      alignItems: "center",
      marginBottom: 40,
    }}>
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
        <BoltIcon color="#FFFFFF" size={24}/>
      </LinearGradient>

      <Text style={{ fontSize: 24, fontWeight: "700", color: "#111827", marginBottom: 8 }}>
        Welcome back
      </Text>
      <Text style={{ fontSize: 14, color: "#4B5563" }}>
        Sign in to continue to your account
      </Text>
    </View>

    {/* ──────────────────────────────────────────────── */}
    {/*               FORM SECTION                       */}
    {/* ──────────────────────────────────────────────── */}

    <View style={styles.form}>
      {/* EMAIL */}
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
            style={styles.input}
          />
        </View>
      </View>

      {/* PASSWORD */}
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <View style={styles.iconLeft}>
            <LockIcon fillColor="#9CA3AF" />
          </View>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secure}
            style={styles.input}
          />
          <Pressable
          onPress={() => setSecure(prev => !prev)}
          hitSlop={10}
          style={({ pressed }) => [
            styles.iconRight,
            pressed && { opacity: 0.6 },
          ]}
        >
          <Feather
            name={secure ? "eye" : "eye-off"}
            size={20}
            color="#9CA3AF"
          />
        </Pressable>
        </View>
      </View>

      {/* Forgot Password */}
      <View style={{ alignItems: "flex-end", marginBottom: 8 }}>
        <Link href="/forgot-password" style={{ textDecorationLine: "none" }}>
          <Text style={{ color: "#6366F1", fontWeight: "600" }}>
            Forgot password?
          </Text>
        </Link>
      </View>

      {/* Login Button */}
      <Pressable onPress={handleLogin} style={{ height: 52, backgroundColor: '#6366f1', borderRadius: 14, justifyContent: "center", alignItems: "center",
          }}>        
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Log In
          </Text>
      </Pressable>

      {/* Sign Up Link */}
      <View style={{ marginTop: 32, alignItems: "center" }}>
        <Text style={{ fontSize: 14, color: "#4B5563" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ textDecorationLine: "none" }}>
            <Text style={{ color: "#2563EB", fontWeight: "600" }}>
              Sign up
            </Text>
          </Link>
        </Text>
      </View>
    </View>
  </SafeAreaView>
</ScrollView>
</SafeAreaView>
  );
}


const styles = StyleSheet.create({
    button: {
        width: "100%",            // w-full
        height: 56,               // h-14
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#D1D5DB",   // border-gray-300
        borderRadius: 12,         // rounded-xl
        justifyContent: "center",
        shadowColor: "#000",      // shadow-sm
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 16,
      },
    
      content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,                  // gap-3 (RN 0.71+)
      },
    
      text: {
        fontSize: 16,             // text-base
        fontWeight: "600",
        color: "#111827",         // text-gray-900
      },
    
      pressed: {
        transform: [{ scale: 0.98 }], // active:scale-98
        opacity: 0.9,
      },

      form: {
        gap: 20, // space-y-5
        marginBottom: 24,
      },

    field: {},

    label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151", // gray-700
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
  
    iconRight: {
      position: "absolute",
      right: 16,
    },
  
    helper: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 8,
      marginLeft: 4,
    },
});