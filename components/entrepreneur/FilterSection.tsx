import { FilterType } from "@/types/filter";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

type FilterSectionProps = {
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
};

const filters: FilterType[] = [
  "All",
  "Active",
  "Draft",
  "FinTech",
  "Technology",
  "Healthcare",
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isActive = selected === filter;

        return (
          <TouchableOpacity
            key={filter}
            style={[
              styles.pill,
              isActive && styles.activePill,
            ]}
            onPress={() => onSelect(filter)}
          >
            <Text
              style={[
                styles.pillText,
                isActive && styles.activeText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
  },
  activePill: {
    backgroundColor: "#4F46E5",
  },
  pillText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
  },
  activeText: {
    color: "#fff",
  },
});
