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
    };
    isFav: boolean;
    onFav: () => void;
}

export default function IdeaCard({ item, isFav, onFav }: Props) {
    return (
      <View style={styles.card}>
        <LinearGradient
          colors={item.color}
          style={styles.gradientBar}
        />
  
        <View style={{ flex: 1 }}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.badge}>{item.category}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
  
            <Pressable onPress={onFav}>
              <Feather
                name="heart"
                size={20}
                color={isFav ? "#EF4444" : "#9CA3AF"}
              />
            </Pressable>
          </View>
  
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.smallLabel}>Funding Need</Text>
              <Text style={styles.boldText}>{item.funding}</Text>
            </View>
  
            <View>
              <Text style={styles.smallLabel}>Match Score</Text>
              <View style={styles.progressRow}>
                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${item.score}%` },
                    ]}
                  />
                </View>
                <Text style={styles.scoreText}>{item.score}</Text>
              </View>
            </View>
  
            <Pressable style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>View</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        flexDirection: "row",
        overflow: "hidden",
      },
    
      gradientBar: {
        width: 4,
        borderRadius: 4,
        marginRight: 10,
      },
    
      cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
    
      badge: {
        backgroundColor: "#EEF2FF",
        color: "#4338CA",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
        fontSize: 10,
        fontWeight: "600",
        marginBottom: 6,
      },
    
      cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
      },
    
      cardDesc: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 4,
      },
    
      cardFooter: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    
      smallLabel: {
        fontSize: 10,
        color: "#94A3B8",
      },
    
      boldText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
      },
    
      progressRow: {
        flexDirection: "row",
        alignItems: "center",
      },
    
      progressBg: {
        width: 60,
        height: 6,
        backgroundColor: "#E2E8F0",
        borderRadius: 10,
        marginRight: 6,
      },
    
      progressFill: {
        height: 6,
        backgroundColor: "#22C55E",
        borderRadius: 10,
      },
    
      scoreText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#16A34A",
      },
    
      viewBtn: {
        backgroundColor: "#4F46E5",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
      },
    
      viewBtnText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "600",
      },
  })