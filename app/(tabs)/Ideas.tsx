import { FilterSection } from "@/components/FilterSection";
import { IdeaCard } from "@/components/IdeaCard";
import { StatsSection } from "@/components/StatsSection";
import { FilterType } from "@/types/filter";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function IdeasScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>("All");
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F9FAFB" }}
      contentContainerStyle={{ padding: 20 }}
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
      />

      <IdeaCard
        title="Smart Home Energy Optimizer"
        status="Active"
        category="Technology"
        amount="$750K"
        interested={68}
      />

      <IdeaCard
        title="Telemedicine Platform for Rural Areas"
        status="Active"
        category="Healthcare"
        amount="$1.2M"
        interested={35}
      />
    </ScrollView>
  )
}