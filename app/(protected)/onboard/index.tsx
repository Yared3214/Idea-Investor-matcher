import BottomNavigation from "@/components/BottomNavigation";
import ProgressBar from "@/components/ProgressBar";
import StepFunding from "@/components/StepFunding";
import StepIndustryGeo from "@/components/StepIndustryGeo";
import StepStage from "@/components/StepStage";
import StepThesis from "@/components/StepThesis";
import { useInvestor } from "@/hooks/useInvestor";
import { InvestorOnboardingData } from "@/types/investor";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stageMap: Record<string, string> = {
  "Idea stage": "IDEA_STAGE",
  "Prototype": "PROTOTYPE",
  "MVP": "MVP",
  "Early revenue": "EARLY_REVENUE",
  "Scaling": "SCALING",
  "Series A+": "SERIES_A",
};

const industryMap: Record<string, string> = {
  "Technology": "TECHNOLOGY",
  "Healthcare": "HEALTHCARE",
  "Fintech": "FINTECH",
  "Clean Energy": "ENERGY",
  "E-commerce": "ECOMMERCE",
  "Education": "EDTECH",
  "AgriTech": "AGRITECH",
  "Food & Beverage": "FOOD_AND_BEVERAGE",
}



export default function Onboarding() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [thesis, setThesis] = useState('');
  const [minAmount, setMinAmount] = useState("50,000");
  const [maxAmount, setMaxAmount] = useState("500,000");


  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState<string | null>(null)

  const totalSteps = 4;

  const validateStep = () => {
    switch (step) {
      case 1:
        if (selectedStages.length === 0) {
          return "Please select at least one preferred stage."
        }
        break
  
      case 2:
        if (selectedIndustries.length === 0) {
          return "Please select at least one industry."
        }
        break
  
      case 3:
        const min = Number(minAmount.replace(/,/g, ""))
        const max = Number(maxAmount.replace(/,/g, ""))
  
        if (!min || !max) {
          return "Please enter funding range."
        }
  
        if (min <= 0 || max <= 0) {
          return "Funding amount must be greater than zero."
        }
  
        if (min > max) {
          return "Minimum funding cannot be greater than maximum."
        }
        break
  
      case 4:
        if (!thesis.trim()) {
          return "Please enter your investment thesis."
        }
  
        if (thesis.trim().length < 20) {
          return "Investment thesis must be at least 20 characters."
        }
        break
    }
  
    return null
  }
  

  const { investorOnboarding, loading, error } = useInvestor();

  const mappedStages = selectedStages.map(stage => stageMap[stage]);
  const mappedIndustries = selectedIndustries.map(industry=> industryMap[industry])


  const completeOnboarding = async() => {
    const data: InvestorOnboardingData = {
      preferredStages: mappedStages,
      industries: mappedIndustries,
      minFunding: Number(minAmount.replace(/,/g, "")),
      maxFunding:Number(maxAmount.replace(/,/g, "")),
      investmentThesis: thesis,
    };
    
    await investorOnboarding(data);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepStage selected={selectedStages} setSelected={setSelectedStages}/>;
      case 2:
        return <StepIndustryGeo selected={selectedIndustries} setSelected={setSelectedIndustries}/>;
      case 3:
        return <StepFunding minAmount={minAmount} maxAmount={maxAmount} setMinAmount={setMinAmount} setMaxAmount={setMaxAmount}/>;
      case 4:
        return <StepThesis thesis={thesis} setThesis={setThesis}/>;
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
       { error ? 
       <Text style={{padding: 10, borderRadius: 9, backgroundColor: "#fee2e2", color: "red", marginBottom: 12, textAlign: "center" }}>
        {error}
       </Text> : null}

       {stepError && (
        <Text
          style={{
            padding: 10,
            borderRadius: 9,
            backgroundColor: "#fee2e2",
            color: "red",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {stepError}
        </Text>
      )}
      <ProgressBar step={step} totalSteps={totalSteps} />
      <View style={styles.content}>{renderStep()}</View>
      <BottomNavigation
        complete={completeOnboarding}
        step={step}
        loading={loading}
        totalSteps={totalSteps}
        onNext={() => {
          const errorMessage = validateStep()
        
          if (errorMessage) {
            setStepError(errorMessage)
            return
          }
        
          setStepError(null)
          setStep(prev => prev + 1)
        }}
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
