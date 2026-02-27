import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Feather name="inbox" size={48} color="#94A3B8" />

      <Text style={styles.title}>No Startup Matches</Text>
      <Text style={styles.subtitle}>
        Try adjusting your filters or search criteria to discover new opportunities.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
  },
});