import { View, Text, StyleSheet } from "react-native";
import {
  BriefcaseIcon,
  HeartIcon,
  MortarboardIcon,
  TechnologyIcon,
  ShopIcon,
} from "@/lib/utils/Icons";

type Sector =
  | "FinTech"
  | "Healthcare"
  | "Education"
  | "Technology"
  | "Retail";

type CategoryBadgeProps = {
  label: Sector;
};

const iconMap: Record<Sector, React.FC<{ size?: number; color?: string }>> = {
  FinTech: BriefcaseIcon,
  Healthcare: HeartIcon,
  Education: MortarboardIcon,
  Technology: TechnologyIcon,
  Retail: ShopIcon,
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  label,
}) => {
  const IconComponent = iconMap[label] || BriefcaseIcon;

  return (
    <View style={styles.container}>
      <IconComponent size={12} color="#1D4ED8" />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#EFF6FF",
    borderRadius: 999,
    marginBottom: 16,
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1D4ED8",
  },
});
