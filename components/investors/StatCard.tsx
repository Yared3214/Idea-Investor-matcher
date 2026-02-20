import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    label: string;
    value: string | number;
    color: string;
    icon: string;
}

export default function StatCard({ label, value, color, icon }: Props) {
    return (
      <View style={styles.statCard}>
        <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
          <Feather name={icon as keyof typeof Feather.glyphMap} size={16} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    statCard: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 12,
        width: "31%",
        alignItems: "center",
      },
    
      iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
      },
    
      statValue: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E293B",
      },
    
      statLabel: {
        fontSize: 12,
        color: "#64748B",
      },
  })