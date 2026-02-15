// import { IndustryItem } from "@/components/IndustryItem";
// import { Preset } from "@/components/PresetButton";
// import {
//   BoltIcon,
//   ChartIcon,
//   HeartIcon,
//   InfoIcon,
//   MortarboardIcon,
//   SeedlingIcon,
//   ShopIcon,
//   TechnologyIcon,
//   UtensilsIcon,
// } from "@/lib/utils/Icons";
// import React, { useState } from "react";
// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View
// } from "react-native";

// export default function Index() {
//   const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
//   const [minAmount, setMinAmount] = useState("50,000");
//   const [maxAmount, setMaxAmount] = useState("500,000");

//   const toggleIndustry = (name: string) => {
//     if (selectedIndustries.includes(name)) {
//       setSelectedIndustries(selectedIndustries.filter(i => i !== name));
//     } else {
//       setSelectedIndustries([...selectedIndustries, name]);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
      
//       {/* Intro */}
//       <Text style={styles.intro}>
//         Define your investment criteria to receive personalized startup
//         recommendations that match your interests and budget.
//       </Text>

//       {/* INDUSTRIES */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Industries of Interest</Text>
//         <Text style={styles.sectionSubtitle}>Select all that apply</Text>

//         <IndustryItem
//           label="Technology"
//           Icon={TechnologyIcon}
//           checked={selectedIndustries.includes("Technology")}
//           onPress={() => toggleIndustry("Technology")}
//           color="#DBEAFE"
//         />

//         <IndustryItem
//           label="Healthcare"
//           Icon={HeartIcon}
//           checked={selectedIndustries.includes("Healthcare")}
//           onPress={() => toggleIndustry("Healthcare")}
//           color="#f0fdf4"
//           fillColor="#16a34a"
//         />

//         <IndustryItem
//           label="Fintech"
//           Icon={ChartIcon}
//           checked={selectedIndustries.includes("Fintech")}
//           onPress={() => toggleIndustry("Fintech")}
//           color="#faf5ff"
//           fillColor="#9333ea"
//         />

//         <IndustryItem
//           label="Clean Energy"
//           Icon={BoltIcon}
//           checked={selectedIndustries.includes("Clean Energy")}
//           onPress={() => toggleIndustry("Clean Energy")}
//           color="#fff7ed"
//           fillColor="#ea580c"
//         />

//         <IndustryItem
//           label="E-commerce"
//           Icon={ShopIcon}
//           checked={selectedIndustries.includes("E-commerce")}
//           onPress={() => toggleIndustry("E-commerce")}
//           color="#fdf2f8"
//           fillColor="#db2777"
//         />

//         <IndustryItem
//           label="Education"
//           Icon={MortarboardIcon}
//           checked={selectedIndustries.includes("Education")}
//           onPress={() => toggleIndustry("Education")}
//           color="#eef2ff"
//           fillColor="#4f46e5"
//         />

//         <IndustryItem
//           label="AgriTech"
//           Icon={SeedlingIcon}
//           checked={selectedIndustries.includes("AgriTech")}
//           onPress={() => toggleIndustry("AgriTech")}
//           color="#f0fdfa"
//           fillColor="#0d9488"
//         />

//         <IndustryItem
//           label="Food & Beverage"
//           Icon={UtensilsIcon}
//           checked={selectedIndustries.includes("Food")}
//           onPress={() => toggleIndustry("Food")}
//           color="#fefce8"
//           fillColor="#ca8a04"
//         />
//       </View>

//       {/* FUNDING RANGE */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Funding Amount Range</Text>

//         <Text style={styles.inputLabel}>Minimum Amount</Text>
//         <View style={styles.moneyInput}>
//           <Text style={styles.dollar}>$</Text>
//           <TextInput
//             value={minAmount}
//             onChangeText={setMinAmount}
//             style={styles.input}
//           />
//         </View>

//         <View style={styles.dividerRow}>
//           <View style={styles.divider} />
//           <Text style={styles.toText}>to</Text>
//           <View style={styles.divider} />
//         </View>

//         <Text style={styles.inputLabel}>Maximum Amount</Text>
//         <View style={styles.moneyInput}>
//           <Text style={styles.dollar}>$</Text>
//           <TextInput
//             value={maxAmount}
//             onChangeText={setMaxAmount}
//             style={styles.input}
//           />
//         </View>

//         {/* Info Box */}
//         <View style={styles.infoBox}>
//           <InfoIcon size={14} color="#2563EB" />
//           <Text style={styles.infoText}>
//             Your preferences help us match you with relevant investment
//             opportunities within your budget range.
//           </Text>
//         </View>
//       </View>

//       {/* QUICK PRESETS */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Quick Presets</Text>

//         <View style={styles.grid}>
//           <Preset title="Angel" subtitle="$25K - $100K" />
//           <Preset title="Seed" subtitle="$100K - $500K" />
//           <Preset title="Series A" subtitle="$500K - $2M" />
//           <Preset title="Series B+" subtitle="$2M+" />
//         </View>
//       </View>

//       <View style={styles.actionContainer}>
//         <Pressable
//           disabled={selectedIndustries.length === 0}
//           onPress={() => {
//             console.log({
//               industries: selectedIndustries,
//               minAmount,
//               maxAmount,
//             });
//           }}
//           style={({ pressed }) => [
//             styles.actionButton,
//             selectedIndustries.length === 0 && styles.actionButtonDisabled,
//             pressed && { opacity: 0.8 },
//           ]}
//         >
//           <Text style={styles.actionButtonText}>
//             Save Investment Preferences
//           </Text>
//         </Pressable>
//       </View>


//     </ScrollView>
//   );
// };


// const styles = StyleSheet.create({
//     container: {
//       paddingTop: 80,
//       paddingBottom: 24,
//       paddingHorizontal: 20,
//     },
  
//     intro: {
//       fontSize: 14,
//       color: "#6B7280",
//       lineHeight: 20,
//       marginBottom: 32,
//     },
  
//     card: {
//       backgroundColor: "#FFFFFF",
//       borderRadius: 16,
//       padding: 20,
//       marginBottom: 24,
//       borderWidth: 1,
//       borderColor: "#F3F4F6",
//     },
  
//     sectionTitle: {
//       fontSize: 14,
//       fontWeight: "600",
//       color: "#111827",
//       marginBottom: 8,
//     },
  
//     sectionSubtitle: {
//       fontSize: 12,
//       color: "#6B7280",
//       marginBottom: 16,
//     },
  
//     inputLabel: {
//       fontSize: 12,
//       fontWeight: "500",
//       color: "#4B5563",
//       marginBottom: 6,
//     },
  
//     moneyInput: {
//       flexDirection: "row",
//       alignItems: "center",
//       borderWidth: 1,
//       borderColor: "#D1D5DB",
//       borderRadius: 10,
//       paddingHorizontal: 12,
//       height: 48,
//     },
  
//     dollar: {
//       marginRight: 6,
//       fontSize: 14,
//       fontWeight: "600",
//       color: "#6B7280",
//     },
  
//     input: {
//       flex: 1,
//       fontSize: 14,
//       fontWeight: "600",
//       color: "#111827",
//     },
  
//     dividerRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginVertical: 16,
//     },
  
//     divider: {
//       flex: 1,
//       height: 1,
//       backgroundColor: "#E5E7EB",
//     },
  
//     toText: {
//       marginHorizontal: 8,
//       fontSize: 12,
//       color: "#9CA3AF",
//     },
  
//     infoBox: {
//       marginTop: 16,
//       flexDirection: "row",
//       gap: 8,
//       backgroundColor: "#DBEAFE",
//       padding: 12,
//       borderRadius: 10,
//     },
  
//     infoText: {
//       fontSize: 12,
//       color: "#1E3A8A",
//       flex: 1,
//     },
  
//     grid: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       justifyContent: "space-between",
//     },

//     actionButton: {
//       backgroundColor: "#2563EB",
//       paddingVertical: 16,
//       borderRadius: 14,
//       alignItems: "center",
//     },
    
//     actionButtonText: {
//       color: "#FFFFFF",
//       fontSize: 14,
//       fontWeight: "600",
//     },
    
//     actionContainer: {
//       marginTop: 12,
//       marginBottom: 40,
//     },

//     actionButtonDisabled: {
//       backgroundColor: "#9CA3AF",
//     },
//   });
  





import BottomNavigation from "@/components/BottomNavigation";
import ProgressBar from "@/components/ProgressBar";
import StepFunding from "@/components/StepFunding";
import StepIndustryGeo from "@/components/StepIndustryGeo";
import StepStage from "@/components/StepStage";
import StepThesis from "@/components/StepThesis";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [minAmount, setMinAmount] = useState("50,000");
  const [maxAmount, setMaxAmount] = useState("500,000");


  const [step, setStep] = useState(1);

  const totalSteps = 4;

  const toggleIndustry = (name: string) => {
    if (selectedIndustries.includes(name)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== name));
    } else {
      setSelectedIndustries([...selectedIndustries, name]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepStage />;
      case 2:
        return <StepIndustryGeo selectedIndustries={selectedIndustries} toggleIndustry={toggleIndustry}/>;
      case 3:
        return <StepFunding minAmount={minAmount} maxAmount={maxAmount} setMinAmount={setMinAmount} setMaxAmount={setMaxAmount}/>;
      case 4:
        return <StepThesis />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Intro */}
       <Text style={styles.intro}>
        Define your investment criteria to receive personalized startup
         recommendations that match your interests and budget.
       </Text>
      <ProgressBar step={step} totalSteps={totalSteps} />
      <View style={styles.content}>{renderStep()}</View>
      <BottomNavigation
        step={step}
        totalSteps={totalSteps}
        onNext={() => setStep(prev => prev + 1)}
        onBack={() => setStep(prev => prev - 1)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  intro: {
  fontSize: 14,
  color: "#6B7280",
  lineHeight: 20,
  marginBottom: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
