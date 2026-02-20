import { FilterSection } from "@/components/FilterSection";
import { IdeaCard } from "@/components/IdeaCard";
import { StatsSection } from "@/components/StatsSection";
import { FilterType } from "@/types/filter";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function IdeasScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>("All");

  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F9FAFB" }}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
      >
        <StatsSection />

        <FilterSection
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />

        <IdeaCard
          title="AI-Powered Personal Finance Assistant"
          status="Active"
          category="FinTech"
          amount="$500K"
          interested={42}
          color="#9333ea"
          fillColor="#faf5ff"
        />

        <IdeaCard
          title="Smart Home Energy Optimizer"
          status="Active"
          category="Technology"
          amount="$750K"
          interested={68}
          fillColor="#EFF6FF"
          color="#1D4ED8"
        />

        <IdeaCard
          title="Telemedicine Platform for Rural Areas"
          status="Active"
          category="Healthcare"
          amount="$1.2M"
          interested={35}
          color="#16a34a"
          fillColor="#f0fdf4"
        />
      </ScrollView>

      {/* Floating Add Button */}
      <Pressable
        style={styles.fabContainer}
        onPress={() => router.push("/create-idea")}
      >
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fab}
        >
          <Feather name="plus" size={24} color="#FFFFFF" />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 24,
    bottom: 40,
  },

  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",

    // iOS shadow
    shadowColor: "#6366F1",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },

    // Android shadow
    elevation: 8,
  },
});