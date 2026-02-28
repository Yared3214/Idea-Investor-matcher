import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

type Props = {
  title: string;
  subtitle: string;
};

export default function StepHeader({
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingBottom: 14,
      paddingHorizontal: 24,
    },
  
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "#111827", // text-main
      lineHeight: 30,
    },
  
    subtitle: {
      fontSize: 14,
      color: "#6B7280", // text-muted
      marginTop: 8,
    },
  });