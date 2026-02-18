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
