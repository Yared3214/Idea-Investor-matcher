import { StatBox } from "@/components/investors/startups-detail/StatBox";
import { TeamItem } from "@/components/investors/startups-detail/TeamItem";
import { useInvestor } from "@/hooks/useInvestor";
import { stageMap, startupMap } from "@/lib/utils/startupMap";
import { useStartupStore } from "@/store/startupStore";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from "react-native";
import RenderHTML from "react-native-render-html";

export default function StartupDetailScreen() {
  const selectedStartup = useStartupStore((state)=>state.selectedStartup);
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { width } = useWindowDimensions();

  const { getSingleStartup } = useInvestor();

  useEffect(() => {
    const fetchStartup = async(id: string) => {
      const res = await getSingleStartup(id);
      console.log(res?.data)
    }

    if (id) fetchStartup(id);
  },[getSingleStartup, id]);

  const category = selectedStartup?.industry ? startupMap[selectedStartup.industry]?.category : undefined;
  const categoryColor = selectedStartup?.industry ? startupMap[selectedStartup.industry]?.categoryColor : undefined;
  const categoryBackcolor = selectedStartup?.industry ? startupMap[selectedStartup.industry]?.categoryBackcolor : undefined;
  const icon = selectedStartup?.industry ? startupMap[selectedStartup.industry]?.icon : undefined;

  const stage = selectedStartup?.stage ? stageMap[selectedStartup?.stage]?.stage : undefined;
  const stageIcon = selectedStartup?.stage ? stageMap[selectedStartup?.stage]?.icon : undefined;

  return (
    <ScrollView style={styles.container}>

      {/* Entrepreneur Info */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
            }}
            style={styles.avatar}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Marcus Chen</Text>
            <Text style={styles.role}>Serial Entrepreneur</Text>
          </View>

          <View style={styles.verifiedBadge}>
            <View style={styles.dot} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>
      </View>

      {/* Idea Header */}
      <View style={styles.section}>
        <Text style={styles.title}>
          {selectedStartup?.pitchTitle}
        </Text>

        <View style={styles.chipsRow}>
          <View style={[styles.chip, { backgroundColor: categoryBackcolor }]}>
            <Feather name={(icon as keyof typeof Feather.glyphMap) || "help-circle"} size={12} color={categoryColor} />
            <Text style={[styles.chipText, { color: categoryColor }]}>
              {category}
            </Text>
          </View>

          <View style={[styles.chip, { backgroundColor: "#fae8ff" }]}>
            {/* <Feather name="clock" size={12} color="#9333EA" /> */}
            <FontAwesome6 name={stageIcon} size={12} color="#c026d3"/>
            <Text style={[styles.chipText, { color: "#c026d3" }]}>
              {stage}
            </Text>
          </View>
        </View>
      </View>

      {/* Funding Section */}
      <View style={[styles.section, styles.fundingRow]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.statLabel}>Funding Need</Text>
          <Text style={styles.statBig}>{selectedStartup?.fundingAmount.toLocaleString('en-US', { style: 'currency', currency: 'ETB' })}</Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={styles.statLabel}>Equity Offered</Text>
          {selectedStartup?.equityOffered ? 
          <Text style={styles.statBig}>Negotiable</Text> : 
          <Text style={styles.statBig}>NO</Text>}
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>

      <RenderHTML
              contentWidth={width}
              source={{ html: selectedStartup?.description || "" }}
              tagsStyles={{
                p: {
                  fontSize: 16,
                  color: "#1E293B",
                  lineHeight: 24,
                  marginBottom: 12,
                },
                strong: {
                  fontWeight: "bold",
                  color: "#111827",
                },
                em: {
                  fontStyle: "italic",
                },
                h1: {
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 16,
                },
                h2: {
                  fontSize: 20,
                  fontWeight: "600",
                  marginBottom: 12,
                },
                ul: {
                  marginBottom: 12,
                },
                li: {
                  marginBottom: 6,
                },
              }}
            />
      </View>

      {selectedStartup?.pitchDeckUrl && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pitch Deck</Text>

        <TouchableOpacity
          style={styles.pitchCard}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(selectedStartup.pitchDeckUrl)}
        >
          <View style={styles.pitchIconWrapper}>
            <Feather name="file-text" size={22} color="#DC2626" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.pitchTitle}>View Pitch Deck</Text>
            <Text style={styles.pitchSub}>
              Tap to open PDF presentation
            </Text>
          </View>

          <Feather name="external-link" size={18} color="#64748B" />
        </TouchableOpacity>
      </View>
    )}

      {/* Market Opportunity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Market Opportunity</Text>

        <View style={styles.grid}>
          <StatBox color1="#DBEAFE" color2="#BFDBFE" title="$12B" subtitle="Market Size" textColor="#1E3A8A" />
          <StatBox color1="#F3E8FF" color2="#E9D5FF" title="150M+" subtitle="Target Users" textColor="#581C87" />
          <StatBox color1="#DCFCE7" color2="#BBF7D0" title="23%" subtitle="Annual Growth" textColor="#14532D" />
          <StatBox color1="#FFEDD5" color2="#FED7AA" title="87%" subtitle="Retention" textColor="#7C2D12" />
        </View>
      </View>

      {/* Team Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Team Highlights</Text>

        <TeamItem icon="award" color="#2563EB" title="PhD in AI/ML" subtitle="10+ years healthcare tech" />
        <TeamItem icon="rocket" color="#16A34A" title="Exited startup for $45M" subtitle="Scaling expert" />
        <TeamItem icon="users" color="#9333EA" title="Team of 8 incl. 3 MDs" subtitle="Top clinical advisors" />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8FAFC",
    },
  
    section: {
      backgroundColor: "#FFFFFF",
      padding: 16,
      marginBottom: 8,
    },
  
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
  
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
  
    name: {
      fontSize: 16,
      fontWeight: "600",
      color: "#111827",
    },
  
    role: {
      fontSize: 13,
      color: "#6B7280",
      marginTop: 2,
    },
  
    verifiedBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#DCFCE7",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      gap: 6,
    },
  
    dot: {
      width: 6,
      height: 6,
      backgroundColor: "#22C55E",
      borderRadius: 3,
    },
  
    verifiedText: {
      fontSize: 12,
      color: "#15803D",
      fontWeight: "500",
    },
  
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: "#111827",
    },
  
    chipsRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 12,
    },
  
    chip: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 99,
      gap: 6,
    },
  
    chipText: {
      fontSize: 12,
      fontWeight: "500",
    },
  
    fundingRow: {
      flexDirection: "row",
      alignItems: "center",
    },
  
    statLabel: {
      fontSize: 12,
      color: "#6B7280",
    },
  
    statBig: {
      fontSize: 18,
      fontWeight: "700",
      color: "#111827",
      marginTop: 4,
    },

    pitchCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F9FAFB",
      padding: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },
    
    pitchIconWrapper: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: "#FEE2E2",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    
    pitchTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: "#111827",
    },
    
    pitchSub: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 2,
    },
  
    verticalDivider: {
      width: 1,
      height: 40,
      backgroundColor: "#E5E7EB",
      marginHorizontal: 16,
    },
  
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 12,
      color: "#111827",
    },
  
    paragraph: {
      fontSize: 14,
      color: "#374151",
      lineHeight: 20,
      marginBottom: 12,
    },
  
    featureCard: {
      backgroundColor: "#F9FAFB",
      padding: 14,
      borderRadius: 12,
      marginBottom: 12,
    },
  
    featureTitle: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 8,
    },
  
    featureRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 6,
    },
  
    featureText: {
      fontSize: 13,
      color: "#374151",
      flex: 1,
    },
  
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 10,
    },
  });