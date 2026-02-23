import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  selectedIndustry: string;
  selectedFunding: string;
  searchQuery: string;
  onIndustrySelect: (value: string) => void;
  onFundingSelect: (value: string) => void;
  onSearchChange: (value: string) => void;
  onReset: () => void;
};

export default function FiltersSection({
  selectedIndustry,
  selectedFunding,
  searchQuery,
  onIndustrySelect,
  onFundingSelect,
  onSearchChange,
  onReset,
}: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.card}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <Pressable onPress={onReset}>
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>
        </View>

        {/* ================= SEARCH BAR ================= */}
        <View style={styles.searchWrapper}>
          <Feather name="search" size={18} color="#94A3B8" />

          <TextInput
            placeholder="Search startups..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={onSearchChange}
            style={styles.searchInput}
          />

          {searchQuery.length > 0 && (
            <Pressable onPress={() => onSearchChange("")}>
              <Feather name="x" size={18} color="#94A3B8" />
            </Pressable>
          )}
        </View>

        {/* Industry */}
        <View style={styles.field}>
          <Text style={styles.label}>Industry</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedIndustry}
              onValueChange={onIndustrySelect}
              style={styles.picker}
            >
              <Picker.Item label="All Industries" value="All Industries" />
              <Picker.Item label="FinTech" value="FinTech" />
              <Picker.Item label="HealthTech" value="HealthTech" />
              <Picker.Item label="EdTech" value="EdTech" />
              <Picker.Item label="AI & ML" value="AI & ML" />
              <Picker.Item label="E-commerce" value="E-commerce" />
              <Picker.Item label="SaaS" value="SaaS" />
            </Picker>

            <Feather
              name="chevron-down"
              size={16}
              color="#94A3B8"
              style={styles.chevron}
            />
          </View>
        </View>

        {/* Funding */}
        <View style={styles.field}>
          <Text style={styles.label}>Funding Range</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedFunding}
              onValueChange={onFundingSelect}
              style={styles.picker}
            >
              <Picker.Item label="All Ranges" value="All Ranges" />
              <Picker.Item label="$0 - $50K" value="$0 - $50K" />
              <Picker.Item label="$50K - $250K" value="$50K - $250K" />
              <Picker.Item label="$250K - $1M" value="$250K - $1M" />
              <Picker.Item label="$1M - $5M" value="$1M - $5M" />
              <Picker.Item label="$5M+" value="$5M+" />
            </Picker>

            <Feather
              name="chevron-down"
              size={16}
              color="#94A3B8"
              style={styles.chevron}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Section wrapper (px-4 pb-4) */
  section: {
    paddingBottom: 16,
  },

  /* Card container (bg-white rounded-xl p-4 shadow-sm border) */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: "#F1F5F9", // slate-100

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // Android shadow
    elevation: 2,
  },

  /* Header row */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  /* "Filters" title */
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B", // slate-800
  },

  /* Reset button text */
  resetText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6366F1", // primary (indigo-500)
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#1E293B",
  },

  /* Field wrapper (mb-3) */
  field: {
    marginBottom: 12,
  },

  /* Label text */
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475569", // slate-600
    marginBottom: 8,
  },

  /* Dropdown wrapper */
  pickerWrapper: {
    position: "relative",
    backgroundColor: "#F8FAFC", // slate-50
    borderWidth: 1,
    borderColor: "#E2E8F0", // slate-200
    borderRadius: 12,
    justifyContent: "center",
    padding: 0,
  },

  /* Picker itself */
  picker: {
    height: 50,
    color: "#334155", // slate-700
  },

  pickerItem: {
    fontSize: 13,
  },

  /* Chevron icon */
  chevron: {
    position: "absolute",
    right: 12,
    pointerEvents: "none",
  },
});

