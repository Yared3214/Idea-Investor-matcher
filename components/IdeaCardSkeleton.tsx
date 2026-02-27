import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function IdeaCardSkeleton() {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={["#F1F5F9", "#E2E8F0", "#F1F5F9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBar}
      />

      <View style={styles.topSection}>
        <View style={styles.badge} />
        <View style={styles.title} />
        <View style={styles.desc} />
        <View style={[styles.desc, { width: "70%" }]} />
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomSection}>
        <View style={styles.statBlock} />
        <View style={styles.statBlock} />
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
  },
  gradientBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 4,
    height: "100%",
  },
  topSection: {
    marginBottom: 12,
  },
  badge: {
    width: 80,
    height: 20,
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    marginBottom: 10,
  },
  title: {
    height: 16,
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    marginBottom: 8,
  },
  desc: {
    height: 12,
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  bottomSection: {
    flexDirection: "row",
    gap: 12,
  },
  statBlock: {
    width: 100,
    height: 30,
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
  },
});