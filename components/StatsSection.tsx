import { StyleSheet, Text, View } from "react-native";

export const StatsSection = () => (
    <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
      <View style={statStyles.card}>
        <Text style={statStyles.number}>12</Text>
        <Text style={statStyles.label}>Total Ideas</Text>
      </View>
  
      <View style={statStyles.card}>
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
  