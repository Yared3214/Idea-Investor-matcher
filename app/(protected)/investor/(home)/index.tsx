import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import IdeaCardSkeleton from "@/components/IdeaCardSkeleton";
import FiltersSection from "@/components/investors/FiltersSection";
import IdeaCard from "@/components/investors/IdeaCard";
import StatCard from "@/components/investors/StatCard";
import { useInvestor } from "@/hooks/useInvestor";
import { startupMap } from "@/lib/utils/startupMap";
import { useStartupStore } from "@/store/startupStore";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
  

export default function IdeasScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedFunding, setSelectedFunding] = useState("All Ranges");
  const [searchQuery, setSearchQuery] = useState("");

  const startups = useStartupStore((state) => state.startups);

  const { getStartups, error, loading } = useInvestor();
  
    useEffect(() => {
      const fetchStartups = async() => {
        await getStartups();
      }

      fetchStartups();
    },[getStartups])

  const handleIndustrySelect = (value: string) => {
    setSelectedIndustry(value);
  };

  const handleFundingSelect = (value: string) => {
    setSelectedFunding(value);
  };

  const handleReset = () => {
    setSelectedIndustry("All Industries");
    setSelectedFunding("All Ranges");
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const parseFundingRange = (range: string) => {
    if (range === "All Ranges") return null;
  
    if (range === "$5M+") return { min: 5_000_000, max: Infinity };
  
    const cleaned = range.replace(/\ETB/g, "").replace(/K/g, "000").replace(/M/g, "000000");
    const [minStr, maxStr] = cleaned.split(" - ");
  
    return {
      min: Number(minStr),
      max: Number(maxStr),
    };
  };

  const filteredStartups = startups.filter((startup) => {
    // 🔍 Search Filter
    const matchesSearch =
      searchQuery.trim() === "" ||
      startup.pitchTitle
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
  
    // 🏭 Industry Filter
    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      startupMap[startup.industry].category === selectedIndustry;
  
    // 💰 Funding Filter
    const range = parseFundingRange(selectedFunding);
    const matchesFunding =
      !range ||
      (startup.fundingAmount >= range.min &&
        startup.fundingAmount <= range.max);
  
    return matchesSearch && matchesIndustry && matchesFunding;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      
      {/* Stats Section */}
      <View style={styles.statsGrid}>
        <StatCard label="Matches" value="24" color="#2563EB" icon="zap" />
        <StatCard label="Avg Score" value="92" color="#7C3AED" icon="star" />
        <StatCard label="Favorites" value="8" color="#16A34A" icon="heart" />
      </View>

      <FiltersSection
        searchQuery={searchQuery}
        selectedIndustry={selectedIndustry}
        selectedFunding={selectedFunding}
        onSearchChange={setSearchQuery}
        onIndustrySelect={handleIndustrySelect}
        onFundingSelect={handleFundingSelect}
        onReset={handleReset}
      />

      

      {/* Top Matches Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Matches</Text>
        <Text style={styles.sectionSub}>
          {filteredStartups.length} results
        </Text>
      </View>

      {/* Idea Cards */}

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
          onRetry={() => getStartups()}
        />
      )}

      {!loading && !error && filteredStartups.length === 0 && (
        <EmptyState />
      )}

      {!loading && !error && startups.length > 0 &&
        filteredStartups.map((item, index) => (
          <IdeaCard
            key={index}
            rank={index+1}
            item={item}
            isFav={favorites.includes(item.id)}
            onFav={() => toggleFavorite(item.id)}
          />
      ))}

      {/* Load More */}
      <Pressable style={styles.loadMore}>
        <Text style={styles.loadMoreText}>Load More Ideas</Text>
      </Pressable>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8FAFC",
      paddingHorizontal: 16,
    },
  
    statsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      marginBottom: 20,
    },
  
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
  
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#1E293B",
    },
  
    sectionSub: {
      fontSize: 12,
      color: "#94A3B8",
    },
  
    loadMore: {
      marginTop: 10,
      paddingVertical: 12,
      borderWidth: 2,
      borderColor: "#E2E8F0",
      borderRadius: 14,
      alignItems: "center",
    },
  
    loadMoreText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#475569",
    },
  });
  

