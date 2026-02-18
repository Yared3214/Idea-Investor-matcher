import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const StatsSection = () => (
    
    <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
      <View style={statStyles.card}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8,}}>
      <FontAwesome6
        name="lightbulb"
        size={24} // text-2xl ≈ 24px
        color="#F59E0B" // amber-500
        solid
      />
    </View>
        <Text style={statStyles.number}>12</Text>
        <Text style={statStyles.label}>Total Ideas</Text>
      </View>
  
      <View style={statStyles.card}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8,}}>
      <FontAwesome6
        name="eye"
        size={24}          // text-2xl
        color="#2563EB"    // text-primary (blue-600 style)
        solid
      />
    </View>
        <Text style={statStyles.number}>247</Text>
        <Text style={statStyles.label}>Total Interest</Text>
      </View>
    </View>
  );
  
  const statStyles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      elevation: 2,
    },
    number: {
      fontSize: 22,
      fontWeight: "700",
    },
    label: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 4,
    },
  });
  