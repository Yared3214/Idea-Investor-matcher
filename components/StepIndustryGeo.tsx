import { BoltIcon, ChartIcon, HeartIcon, MortarboardIcon, SeedlingIcon, ShopIcon, TechnologyIcon, UtensilsIcon } from "@/lib/utils/Icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IndustryItem } from "./IndustryItem";


interface Props {
    selectedIndustries: string[];
    toggleIndustry: (name: string) => void
}

export default function StepIndustryGeo({selectedIndustries, toggleIndustry}: Props) {
    return (
        <ScrollView contentContainerStyle={styles.container}>

       {/* INDUSTRIES */}
       <View style={styles.card}>
         <Text style={styles.sectionTitle}>Industries of Interest</Text>
         <Text style={styles.sectionSubtitle}>Select all that apply</Text>

        <IndustryItem
          label="Technology"
          Icon={TechnologyIcon}
          checked={selectedIndustries.includes("Technology")}
          onPress={() => toggleIndustry("Technology")}
          color="#DBEAFE"
        />

        <IndustryItem
          label="Healthcare"
          Icon={HeartIcon}
          checked={selectedIndustries.includes("Healthcare")}
          onPress={() => toggleIndustry("Healthcare")}
          color="#f0fdf4"
          fillColor="#16a34a"
        />

        <IndustryItem
          label="Fintech"
          Icon={ChartIcon}
          checked={selectedIndustries.includes("Fintech")}
          onPress={() => toggleIndustry("Fintech")}
          color="#faf5ff"
          fillColor="#9333ea"
        />

        <IndustryItem
          label="Clean Energy"
          Icon={BoltIcon}
          checked={selectedIndustries.includes("Clean Energy")}
          onPress={() => toggleIndustry("Clean Energy")}
          color="#fff7ed"
          fillColor="#ea580c"
        />

        <IndustryItem
          label="E-commerce"
          Icon={ShopIcon}
          checked={selectedIndustries.includes("E-commerce")}
          onPress={() => toggleIndustry("E-commerce")}
          color="#fdf2f8"
          fillColor="#db2777"
        />

        <IndustryItem
          label="Education"
          Icon={MortarboardIcon}
          checked={selectedIndustries.includes("Education")}
          onPress={() => toggleIndustry("Education")}
          color="#eef2ff"
          fillColor="#4f46e5"
        />

        <IndustryItem
          label="AgriTech"
          Icon={SeedlingIcon}
          checked={selectedIndustries.includes("AgriTech")}
          onPress={() => toggleIndustry("AgriTech")}
          color="#f0fdfa"
          fillColor="#0d9488"
        />

        <IndustryItem
          label="Food & Beverage"
          Icon={UtensilsIcon}
          checked={selectedIndustries.includes("Food")}
          onPress={() => toggleIndustry("Food")}
          color="#fefce8"
          fillColor="#ca8a04"
        />
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