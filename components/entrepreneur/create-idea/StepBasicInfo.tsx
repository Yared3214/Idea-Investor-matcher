import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import StepHeader from "./StepHeader";

const industries = [
  "Technology",
  "FinTech",
  "AgriTech",
  "HealthTech",
  "AI/SaaS",
  "EdTech",
  "ECommerce",
  "Renewable Energy",
  "Food & Beverage"
];

const stages = [
  {
    title: "Idea Phase",
    subtitle: "Concept only, no product yet",
    icon: "zap",
    color: "#2563EB",
  },
  {
    title: "Prototype",
    subtitle: "Functional product built",
    icon: "box",
    color: "#6366F1",
  },
  {
    title: "MVP",
    subtitle: "Functional product built",
    icon: "box",
    color: "#6366F1",
  },
  {
    title: "Early Revenue",
    subtitle: "Generating initial sales",
    icon: "trending-up",
    color: "#16A34A",
  },
  {
    title: "Series A",
    subtitle: "Institutional funding raised",
    icon: "bar-chart-2",
    color: "#F59E0B",
  },
  {
    title: "Scaling",
    subtitle: "Rapid growth & expansion",
    icon: "activity",
    color: "#DC2626",
  },
];

interface Props {
  startupName: string;
  selectedIndustry: string; // 🔥 changed
  selectedStage: string;
  setStartupName: Dispatch<SetStateAction<string>>;
  setSelectedIndustry: Dispatch<SetStateAction<string>>; // 🔥 changed
  setSelectedStage: Dispatch<SetStateAction<string>>;
}

export default function StepBasicInfo({
  startupName,
  selectedIndustry,
  selectedStage,
  setStartupName,
  setSelectedIndustry,
  setSelectedStage,
}: Props) {

  /* -------- Single Industry Select -------- */
  const selectIndustry = (industry: string) => {
    // Tap again to deselect (optional)
    if (selectedIndustry === industry) {
      setSelectedIndustry("");
    } else {
      setSelectedIndustry(industry);
    }
  };

  return (
    <View style={{ marginBottom: 45 }}>
      <StepHeader
        title="Tell us about your startup"
        subtitle="Let's start with the basics to match you with the right investors."
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          
          {/* Startup Name */}
          <View>
            <Text style={styles.label}>Startup Name</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="e.g. Acme AI"
                value={startupName}
                onChangeText={setStartupName}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
              <MaterialCommunityIcons
                name="rocket-launch"
                size={20}
                color="#9CA3AF"
              />
            </View>
          </View>

          {/* Industry Selection (Single) */}
          <View>
            <Text style={styles.label}>Industry</Text>

            <View style={styles.chipContainer}>
              {industries.map((item) => {
                const selected = selectedIndustry === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => selectIndustry(item)}
                    style={[
                      styles.chip,
                      selected && styles.chipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selected && styles.chipTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Stage Selection */}
          <View>
            <Text style={styles.label}>Current Stage</Text>

            {stages.map((stage) => {
              const selected = selectedStage === stage.title;

              return (
                <Pressable
                  key={stage.title}
                  onPress={() => setSelectedStage(stage.title)}
                  style={[
                    styles.stageCard,
                    selected && {
                      borderColor: stage.color,
                      backgroundColor: stage.color + "10",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.stageIcon,
                      {
                        backgroundColor: selected
                          ? stage.color
                          : stage.color + "20",
                      },
                    ]}
                  >
                    <Feather
                      name={stage.icon as any}
                      size={16}
                      color={selected ? "#fff" : stage.color}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.stageTitle,
                        selected && { color: stage.color },
                      ]}
                    >
                      {stage.title}
                    </Text>
                    <Text style={styles.stageSubtitle}>
                      {stage.subtitle}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.radioOuter,
                      selected && {
                        borderColor: stage.color,
                        borderWidth: 6,
                      },
                    ]}
                  />
                </Pressable>
              );
            })}
          </View>

          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      gap: 24,
      paddingHorizontal: 24,
    },
  
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 8,
    },
  
    labelMuted: {
      fontWeight: "400",
      color: "#9CA3AF",
    },
  
    /* Input */
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F9FAFB",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      paddingHorizontal: 16,
      height: 56,
      justifyContent: "space-between",
    },
  
    input: {
      flex: 1,
      fontSize: 16,
      color: "#111827",
    },
  
    /* Chips */
    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
  
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      backgroundColor: "#FFFFFF",
    },
  
    chipSelected: {
      backgroundColor: "#EEF2FF",
      borderColor: "#6366F1",
    },
  
    chipText: {
      fontSize: 14,
      color: "#4B5563",
      fontWeight: "500",
    },
  
    chipTextSelected: {
      color: "#4F46E5",
    },
  
    /* Stage Cards */
    stageCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      backgroundColor: "#FFFFFF",
      marginBottom: 12,
    },
  
    stageIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
  
    stageTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: "#111827",
    },
  
    stageSubtitle: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 2,
    },
  
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#D1D5DB",
    },
  });