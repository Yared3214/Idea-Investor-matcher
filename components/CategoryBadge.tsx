import {
  BriefcaseIcon,
  HeartIcon,
  MortarboardIcon,
  ShopIcon,
  TechnologyIcon,
} from "@/lib/utils/Icons";
import { StyleSheet, Text, View } from "react-native";

type Sector =
  | "FinTech"
  | "Healthcare"
  | "Education"
  | "Technology"
  | "Retail";

type CategoryBadgeProps = {
  label: Sector;
  color: string;
  fillColor: string;
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
  color,
  fillColor,
}) => {
  const IconComponent = iconMap[label] || BriefcaseIcon;

  return (
    <View style={[styles.container, { backgroundColor: fillColor }]}>
      <IconComponent size={12} color={color} />
      <Text style={[styles.text, { color: color}]}>{label}</Text>
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
    borderRadius: 999,
    marginBottom: 16,
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});
