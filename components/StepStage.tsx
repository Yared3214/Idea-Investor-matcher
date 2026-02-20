import React, { Dispatch } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

const stages = [
  "Idea stage",
  "Prototype",
  "MVP",
  "Early revenue",
  "Scaling",
  "Series A+",
];

interface Props {
  selected: string[];
  setSelected: Dispatch<React.SetStateAction<string[]>>;
}

export default function StepStage({selected, setSelected}: Props) {

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(s => s !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Preferred Stage</Text>
      <Text style={styles.subtitle}>
        Select the stages you&apos;re comfortable investing in.
      </Text>

      {stages.map(stage => (
        <Pressable
          key={stage}
          onPress={() => toggle(stage)}
          style={[
            styles.option,
            selected.includes(stage) && styles.optionActive,
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected.includes(stage) && styles.optionTextActive,
            ]}
          >
            {stage}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
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
  option: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  optionActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  optionTextActive: {
    color: "#2563EB",
  },
});
