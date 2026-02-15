import { Pressable, StyleSheet, Text } from "react-native";

export const Preset = ({ title, subtitle }: any) => (
    <Pressable style={styles.preset}>
      <Text style={styles.presetTitle}>{title}</Text>
      <Text style={styles.presetSubtitle}>{subtitle}</Text>
    </Pressable>
  );

const styles = StyleSheet.create({
    preset: {
        width: "48%",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
        marginBottom: 12,
      },
    
      presetTitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
      },
    
      presetSubtitle: {
        fontSize: 11,
        color: "#6B7280",
      },
})
  