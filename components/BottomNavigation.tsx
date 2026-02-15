import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

interface Props {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}

export default function BottomNavigation({
  step,
  totalSteps,
  onNext,
  onBack,
}: Props) {
  const isLastStep = step === totalSteps;
  const isFirstStep = step === 1;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {!isFirstStep ? (
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      ) : (
        <View />
      )}

      {/* Continue / Finish Button */}
      <Pressable
        onPress={onNext}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.primaryText}>
          {isLastStep ? "Finish Setup" : "Continue"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  backText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },

  primaryButton: {
    backgroundColor: "#111827", // Linear-style dark button
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 14,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
