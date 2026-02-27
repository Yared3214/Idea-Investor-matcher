import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const TeamItem = ({ icon, color, title, subtitle }: any) => (
    <View style={styles.teamRow}>
      <View style={[styles.iconCircle, { backgroundColor: color + "20" }]}>
        <Feather name={icon as any} size={18} color={color} />
      </View>
      <View>
        <Text style={styles.teamTitle}>{title}</Text>
        <Text style={styles.teamSub}>{subtitle}</Text>
      </View>
    </View>
  );

  
const styles = StyleSheet.create({
    teamRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 14,
      },
    
      iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
      },
    
      teamTitle: {
        fontSize: 14,
        fontWeight: "600",
      },
    
      teamSub: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
      },
})