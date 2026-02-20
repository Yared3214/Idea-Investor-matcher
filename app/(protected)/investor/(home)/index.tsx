import FiltersSection from "@/components/investors/FiltersSection";
import IdeaCard from "@/components/investors/IdeaCard";
import StatCard from "@/components/investors/StatCard";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
  

export default function IdeasScreen() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedFunding, setSelectedFunding] = useState("All Ranges");

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

  const ideas = [
    {
      id: 1,
      category: "FinTech",
      title: "AI-Powered Personal Finance Assistant",
      desc: "Smart budgeting app using ML to predict expenses.",
      funding: "$500K",
      score: 98,
      color: ["#22C55E", "#10B981"] as [string, string],
    },
    {
      id: 2,
      category: "HealthTech",
      title: "Telemedicine Platform for Rural Areas",
      desc: "Video consultations for underserved communities.",
      funding: "$750K",
      score: 96,
      color: ["#3B82F6", "#06B6D4"] as [string, string],
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      
      {/* Stats Section */}
      <View style={styles.statsGrid}>
        <StatCard label="Matches" value="24" color="#2563EB" icon="zap" />
        <StatCard label="Avg Score" value="92" color="#7C3AED" icon="star" />
        <StatCard label="Favorites" value="8" color="#16A34A" icon="heart" />
      </View>

      <FiltersSection
        selectedIndustry={selectedIndustry}
        selectedFunding={selectedFunding}
        onIndustrySelect={handleIndustrySelect}
        onFundingSelect={handleFundingSelect}
        onReset={handleReset}
      />

      

      {/* Top Matches Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Matches</Text>
        <Text style={styles.sectionSub}>24 results</Text>
      </View>

      {/* Idea Cards */}
      {ideas.map(item => (
        <IdeaCard
          key={item.id}
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
  

