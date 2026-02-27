import EmptyState from "@/components/EmptyState";
import { FilterSection } from "@/components/entrepreneur/FilterSection";
import { IdeaCard } from "@/components/entrepreneur/IdeaCard";
import { StatsSection } from "@/components/entrepreneur/StatsSection";
import ErrorState from "@/components/ErrorState";
import IdeaCardSkeleton from "@/components/IdeaCardSkeleton";
import { useEntrepreneur } from "@/hooks/useEntrepreneur";
import { useStartupStore } from "@/store/startupStore";
import { FilterType } from "@/types/filter";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const startupMap: Record<string, {
  color: string;
  fillColor: string;
}> = {
  
}

export default function IdeasScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>("All");

  const startups = useStartupStore((state)=>state.startups);

  const router = useRouter();

  const { getMyStartups, loading, error } = useEntrepreneur()
  useEffect(() => {
    const fetchStartups = async() => {
     await getMyStartups();
    }

    fetchStartups();
  },[getMyStartups])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F9FAFB" }}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
      >
        <StatsSection 
        totalStartups={startups.length}
        totalInterests={42*startups.length}/>

        <FilterSection
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />

        {loading && (
          <>
            <IdeaCardSkeleton />
            <IdeaCardSkeleton />
            <IdeaCardSkeleton />
          </>
        )}

        {error && !loading && (
          <ErrorState
            message={error}
            onRetry={() => getMyStartups()}
          />
        )}

        {!loading && !error && startups.length === 0 && (
          <EmptyState />
        )}

        {!loading && !error && startups.length > 0 && 
          startups.map((item, index) => (
            <IdeaCard 
            key={index}
            item={item}
            status="Active"
            interested={42}
            />
          ))}
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