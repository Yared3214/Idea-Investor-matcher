import { BoltIcon, ChartIcon, HeartIcon, MortarboardIcon, SeedlingIcon, ShopIcon, TechnologyIcon, UtensilsIcon } from "@/lib/utils/Icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IndustryItem } from "./IndustryItem";
import { Dispatch, SetStateAction } from "react";

const industries = [
  {
    label: "Technology",
    Icon: TechnologyIcon,
    color: "#DBEAFE",
    fillColor: "#1D4ED8"
  },
  {
    label: "Healthcare",
    Icon: HeartIcon,
    color: "#f0fdf4",
    fillColor: "#16a34a",
  },
  {
    label: "Fintech",
    Icon: ChartIcon,
    color: "#faf5ff",
    fillColor: "#9333ea",
  },
  {
    label: "Clean Energy",
    Icon: BoltIcon,
    color: "#fff7ed",
    fillColor: "#ea580c",
  },
  {
    label: "E-commerce",
    Icon: ShopIcon,
    color: "#fdf2f8",
    fillColor: "#db2777",
  },
  {
    label: "Education",
    Icon: MortarboardIcon,
    color: "#eef2ff",
    fillColor: "#4f46e5",
  },
  {
    label: "AgriTech",
    Icon: SeedlingIcon,
    color: "#f0fdfa",
    fillColor: "#0d9488",
  },
  {
    label: "Food & Beverage",
    Icon: UtensilsIcon,
    color: "#fefce8",
    fillColor: "#ca8a04",
  },
];


interface Props {
    selected: string[];
    setSelected: Dispatch<SetStateAction<string[]>>
}

export default function StepIndustryGeo({selected, setSelected}: Props) {

  const toggleIndustry = (name: string) => {
      if (selected.includes(name)) {
        setSelected(selected.filter(i => i !== name));
      } else {
        setSelected([...selected, name]);
      }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>

       {/* INDUSTRIES */}
       <View style={styles.card}>
         <Text style={styles.sectionTitle}>Industries of Interest</Text>
         <Text style={styles.sectionSubtitle}>Select all that apply</Text>

         { industries.map((industry, index) => (
          <IndustryItem
          key={index}
          label={industry.label}
          Icon={industry.Icon}
          checked={selected.includes(industry.label)}
          onPress={() => toggleIndustry(industry.label)}
          color={industry.color}
          fillColor={industry.fillColor}
        />
         ))}
      </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    },

    card: {
    marginBottom: 24,
            },
          
    sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    },
          
    sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    },


})