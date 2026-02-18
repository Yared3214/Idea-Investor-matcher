import { useAuth } from "@/hooks/useAuth";
import { BriefcaseIcon, EmailIcon, InfoIcon, LockIcon, ShieldIcon, UserIcon, UserShieldIcon } from "@/lib/utils/Icons";
import { Feather } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Signup() {
    const router = useRouter();

    const [secure, setSecure] = useState(true);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { role } = useLocalSearchParams<{ role?: string }>();


    const [fullNameError, setFullNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);


    const fullNameRegex =
    /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/;
    
    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    
    const calculatePasswordStrength = (password: string) => {
      let score = 0;
    
      if (!password) return 0;
    
      // Length checks
      if (password.length >= 8) score += 1;
      if (password.length >= 12) score += 1;
    
      // Uppercase check
      if (/[A-Z]/.test(password)) score += 1;
    
      // Number check
      if (/[0-9]/.test(password)) score += 1;
    
      // Symbol check
      if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
      return score;
    };

    const score = calculatePasswordStrength(password);

    const getColor = (index: number) => {
      if (score >= index + 1) {
        if (score === 1) return "#EF4444"; // red
        if (score === 2) return "#F97316"; // orange
        if (score === 3) return "#EAB308"; // yellow
        if (score === 4) return "#22C55E"; // green
      }
      return "#E5E7EB"; // gray
    };

    const validate = () => {
      let valid = true;
    
      // Full name
      if (!fullName.trim()) {
        setFullNameError("Full name is required");
        valid = false;
      } else if (!fullNameRegex.test(fullName.trim())) {
        setFullNameError("Enter first and father name (letters only)");
        valid = false;
      } else {
        setFullNameError(null);
      }
    
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
    
      // Password
      if (!password) {
        setPasswordError("Password is required");
        valid = false;
      } else if (!strongPasswordRegex.test(password)) {
        setPasswordError(
          "Password must be 8+ chars with upper, lower, number & symbol"
        );
        valid = false;
      } else {
        setPasswordError(null);
      }
    
      return valid;
    };
    

    const { signup, error, loading } = useAuth();

    const handleSignup = async () => {
      const isValid = validate();
      if (!isValid) return;
    
      const res = await signup(
        fullName.trim(),
        email.trim(),
        password,
        role as "ENTREPRENEUR" | "INVESTOR"
      );
    
      if (res?.success) {
        router.push({
          pathname: "/verify-email",
          params: { email },
        });
      }
    };
    
    
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#FFFFFF",}}>

      {/* Header Section */}
    <View style={{flexDirection: "row", alignItems: "flex-start", backgroundColor: "#EEF2FF", borderWidth: 1, borderColor: "#E0E7FF", borderRadius: 16, padding: 16, marginBottom: 24, gap: 12,}}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E7FF", justifyContent: "center", alignItems: "center",}}>
        <ShieldIcon color="#4F46E5" />
      </View>

      <View style={{flex: 1}}>
        <Text style={{fontSize: 14, fontWeight: "600", color: "#111827", marginBottom: 4,}}>Secure Registration</Text>
        <Text style={{fontSize: 12, color: "#4B5563", lineHeight: 18,}}>
          Your data is encrypted and protected with{'\n'} industry-standard
          security protocols.
        </Text>
      </View>
    </View>


    <ScrollView
      style={{ flex: 1, marginBottom: 20 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
    {/* Form Section */}
    <View style={styles.form}>
      
      {/* FULL NAME */}
      <View style={styles.field}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputWrapper}>
          <View style={styles.iconLeft}>
            <UserIcon />
          </View>
          <TextInput value={fullName} onChangeText={setFullName} placeholder="John Doe" placeholderTextColor="#9CA3AF" 
          style={[
            styles.input,
            fullNameError && { borderColor: "#DC2626" }
          ]}
          />
        </View>
        {fullNameError && (
          <Text style={{ color: "#DC2626", fontSize: 12, marginTop: 6 }}>
            {fullNameError}
          </Text>
        )}

      </View>

      {/* EMAIL */}
      <View style={styles.field}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrapper}>
          <View style={styles.iconLeft}>
            <EmailIcon />
          </View>
          <TextInput value={email} onChangeText={setEmail} placeholder="john@example.com" placeholderTextColor="#9CA3AF" keyboardType="email-address" 
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

      {/* PASSWORD */}
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <View style={styles.iconLeft}>
            <LockIcon fillColor='#9CA3AF'/>
          </View>

          <TextInput value={password} onChangeText={setPassword} placeholder="Create a strong Password" placeholderTextColor="#9CA3AF" secureTextEntry={secure} 
          style={[
            styles.input,
            passwordError && { borderColor: "#DC2626" }
          ]}
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

        <View style={{ marginTop: 12, flexDirection: "row",gap: 6,  }}>
        {[0, 1, 2, 3].map((_, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            { backgroundColor: getColor(index) },
          ]}
        />
      ))}
        </View>

        <Text style={styles.helper}>
        Use 8+ characters with letters, numbers & symbols
        </Text>
        
        {passwordError && (
          <Text style={{ color: "#DC2626", fontSize: 12, marginTop: 6 }}>
            {passwordError}
          </Text>
        )}

      </View>

      <View style={{marginBottom: 8}}>
      <Text style={styles.label}>Role</Text>

      <View style={styles.inputWrapper}>
        {/* Left Icon */}
        <View style={styles.iconLeft}>
          <BriefcaseIcon size={14} color="#9CA3AF" />
        </View>

        <TextInput
          value={role === "ENTREPRENEUR" ? "Entrepreneur" : role === "INVESTOR" ? "Investor" : "N/A"}
          editable={false}
          style={{height: 56, paddingLeft: 44, paddingRight: 44, backgroundColor: "#F3F4F6", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 16, fontSize: 14, color: "#6B7280",}}
        />

        {/* Right Icon */}
        <View style={styles.iconRight}>
          <LockIcon fillColor="#9CA3AF" />
        </View>
      </View>

      {/* Helper Text */}
      <View style={{flexDirection: "row", alignItems: "center", marginTop: 8, gap: 6,}}>
        <InfoIcon size={12} color="#9CA3AF" />
        <Text style={{fontSize: 12, color: "#6B7280",}}>
          Selected from previous step
        </Text>
      </View>
    </View>

    </View>
    </ScrollView>



    {/* Sign Up Button */}
    <Pressable
      onPress={handleSignup}
      style={({ pressed }) => [
        styles.signupButton,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <Feather name="loader" size={20} color="#FFFFFF" />
      ) : (
      <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600", }}>Create Account</Text>
      )}
    </Pressable>


    {/* Error Message */}
    {error && (
      <View style={{ marginTop: 16, padding: 12, backgroundColor: "#FEE2E2", borderRadius: 8, }}>
        <Text style={{ color: "#B91C1C", fontSize: 14, }}>{error}</Text>
      </View>
    )}



    {/* Security Features Section */}
    <View style={{ marginTop: 32, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 24,  }}>
      
      {/* Secure */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8,  }}>
        <ShieldIcon color="#16A34A"/>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#4B5563", }}>Secure</Text>
      </View>

      <View style={{ width: 1, height: 16, backgroundColor: "#D1D5DB", }} />

      {/* Encrypted */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, }}>
        <LockIcon fillColor='#16A34A'/>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#4B5563", }}>Encrypted</Text>
      </View>

      <View style={{ width: 1, height: 16, backgroundColor: "#D1D5DB", }} />

      {/* Private */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, }}>
        <UserShieldIcon />
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#4B5563", }}>Private</Text>
      </View>

    </View>



    {/* Sign In Link */}
    <View style={{ marginTop: 32, alignItems: "center", }}>
      <Text style={{ fontSize: 14, color: "#4B5563",    }}>
        Already have an account?{" "}
        <Link href='/login' style={{ textDecorationLine: "none" }}>
        <Text style={{ color: "#2563EB", fontWeight: "600",  }}>
          Sign In
        </Text>
        </Link>
      </Text>
    </View>



    {/* Terms of Service and Privacy Policy */}
    <View style={{ marginTop: 24, paddingHorizontal: 16, }}>
      <Text style={{ fontSize: 12, color: "#6B7280", textAlign: "center", lineHeight: 18, }}>
        By creating an account, you agree to our{" "}
        <Text style={{ color: "#2563EB", fontWeight: "500", }} onPress={() => {
            // Handle navigation to Terms of Service here
        }}>
          Terms of Service
        </Text>{" "}
        and{" "}
        <Text style={{ color: "#2563EB", fontWeight: "500", }} onPress={() => {
            // Handle navigation to Privacy Policy here
        }}>
          Privacy Policy
        </Text>
      </Text>
    </View>
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

    optional: {
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "400",
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
      bar: {
        flex: 1,                // flex-1
        height: 6,              // h-1.5 (~6px)
        borderRadius: 999,      // rounded-full
      },
      signupButton: {
        width: "100%",          // w-full
    height: 56,             // h-14
    backgroundColor: "#6366f1", // bg-primary (blue-600 example)
    borderRadius: 12,       // rounded-xl
    alignItems: "center",
    justifyContent: "center",

    // shadow-lg shadow-blue-500/30
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6, // Android shadow
  },

  });
  