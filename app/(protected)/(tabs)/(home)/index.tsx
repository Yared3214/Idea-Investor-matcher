import { FilterSection } from "@/components/FilterSection";
import { IdeaCard } from "@/components/IdeaCard";
import { StatsSection } from "@/components/StatsSection";
import { useAuthStore } from "@/store/useAuthStore";
import { FilterType } from "@/types/filter";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function IdeasScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>("All");

    const router = useRouter();
    const { user } = useAuthStore();
  
    useEffect(() => {
      if (user?.role === "INVESTOR" && !user?.isOnboarded) {
        router.replace("/onboard");
      }
    }, [user, router]);

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
  )
}