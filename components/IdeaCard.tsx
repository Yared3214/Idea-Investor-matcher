import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CategoryBadge } from "./CategoryBadge";

type IdeaCardProps = {
  title: string;
  status: "Active" | "Draft";
  category: "FinTech" | "Healthcare" | "Education" | "Technology" | "Retail";
  amount: string;
  interested: number;
};

export const IdeaCard: React.FC<IdeaCardProps> = ({
  title,
  status,
  category,
  amount,
  interested,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>

        <View
          style={[
            styles.statusBadge,
            status === "Active" ? styles.activeBadge : styles.draftBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              status === "Active"
                ? styles.activeText
                : styles.draftText,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{category}</Text>
      </View> */}
      <CategoryBadge label={category} />

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.subText}>needed</Text>
        </View>

        <View style={styles.footerItem}>
          <Text style={styles.amount}>{interested}</Text>
          <Text style={styles.subText}>interested</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: "#DCFCE7",
  },
  draftBadge: {
    backgroundColor: "#E5E7EB",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  activeText: {
    color: "#15803D",
  },
  draftText: {
    color: "#374151",
  },
  categoryBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4F46E5",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#F3F4F6",
    paddingTop: 12,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
});
