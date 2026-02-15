import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressBar({ step, totalSteps }: any) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          { width: `${(step / totalSteps) * 100}%` },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: "#E5E7EB",
  },
  progress: {
    height: 4,
    backgroundColor: "#2563EB",
  },
});
