import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    item: {
        id: number;
        category: string;
        title: string;
        desc: string;
        funding: string;
        score: number;
        color: [string, string, ...string[]];
        categoryColor: string;
        categoryBackcolor: string;
    };
    isFav: boolean;
    onFav: () => void;
}

export default function IdeaCard({ item, isFav, onFav }: Props) {
    return (
      <View style={styles.card}>
      
      {/* Left Gradient Bar */}
      <LinearGradient
        colors={item.color}
        style={styles.gradientBar}
      />

      {/* Top Section */}
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          
          {/* Badge + Rank */}
          <View style={styles.badgeRow}>
            <View style={[styles.badge, {backgroundColor: item.categoryBackcolor}]}>
              <Text style={[styles.badgeText, {color: item.categoryColor}]}>{item.category}</Text>
            </View>
            <Text style={styles.rank}>#{item.id}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            {item.title}
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            {item.desc}
          </Text>
        </View>

        {/* Heart Button */}
        <Pressable style={styles.heartBtn}>
          <Feather name="heart" size={20} color="#94A3B8" />
        </Pressable>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom Section */}
      <View style={styles.bottomRow}>
        <View style={styles.statsRow}>
          
          {/* Funding */}
          <View>
            <Text style={styles.statLabel}>Funding Need</Text>
            <Text style={styles.statValue}>{item.funding}</Text>
          </View>

          {/* Vertical Divider */}
          <View style={styles.verticalDivider} />

          {/* Match Score */}
          <View>
            <Text style={styles.statLabel}>Match Score</Text>

            <View style={styles.matchRow}>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={item.color}
                  style={[
                    styles.progressFill,
                    { width: `${item.score}%` },
                  ]}
                />
              </View>

              <Text style={[styles.matchScoreText, {color: item.categoryColor}]}>
                {item.score}
              </Text>
            </View>
          </View>
        </View>

        {/* View Button */}
        <Pressable style={styles.viewBtn}>
          <Text style={styles.viewText}>View</Text>
        </Pressable>
      </View>
    </View>
    );
  }

  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#F1F5F9",
      position: "relative",
      overflow: "hidden",
    },
  
    gradientBar: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 4,
      height: "100%",
    },
  
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
  
    badgeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
    },
  
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 999,
    },
  
    badgeText: {
      fontSize: 12,
      fontWeight: "600",
    },
  
    rank: {
      fontSize: 12,
      color: "#94A3B8",
    },
  
    title: {
      fontSize: 15,
      fontWeight: "700",
      color: "#1E293B",
      marginBottom: 4,
    },
  
    description: {
      fontSize: 12,
      color: "#475569",
      lineHeight: 16,
    },
  
    heartBtn: {
      padding: 8,
      borderRadius: 8,
    },
  
    divider: {
      height: 1,
      backgroundColor: "#F1F5F9",
      marginVertical: 12,
    },
  
    bottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    statsRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
  
    statLabel: {
      fontSize: 11,
      color: "#64748B",
      marginBottom: 2,
    },
  
    statValue: {
      fontSize: 14,
      fontWeight: "700",
      color: "#1E293B",
    },
  
    verticalDivider: {
      width: 1,
      height: 32,
      backgroundColor: "#E2E8F0",
    },
  
    matchRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
  
    progressBar: {
      width: 60,
      height: 6,
      backgroundColor: "#F1F5F9",
      borderRadius: 999,
      overflow: "hidden",
    },
  
    progressFill: {
      height: "100%",
      borderRadius: 999,
    },
  
    matchScoreText: {
      fontSize: 14,
      fontWeight: "700",
    },
  
    viewBtn: {
      backgroundColor: "#4F46E5",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
  
    viewText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "600",
    },
  });