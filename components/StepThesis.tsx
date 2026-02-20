import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  thesis: string;
  setThesis: Dispatch<SetStateAction<string>>
}

export default function StepThesis({ thesis, setThesis}: Props) {

  return (
    <View>
      <Text style={styles.title}>Your Investment Thesis</Text>
      <Text style={styles.subtitle}>
        Describe what kind of startups you like to invest in and why.
      </Text>

      <TextInput
        multiline
        value={thesis}
        onChangeText={setThesis}
        placeholder="Example: I invest in mission-driven fintech startups solving access to capital in emerging markets..."
        style={styles.textarea}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  textarea: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
  },
});
