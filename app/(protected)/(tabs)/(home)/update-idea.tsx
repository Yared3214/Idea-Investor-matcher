import BottomCTA from "@/components/entrepreneur/update-idea/BottomCTA";
import StartupDescriptionEditor from "@/components/entrepreneur/update-idea/StartupDescriptionEditor";
import StepIdentityFunding from "@/components/entrepreneur/update-idea/StepIdentityFunding";
import StepPitchDetails from "@/components/entrepreneur/update-idea/StepPitchDetails";
import { useEntrepreneur } from "@/hooks/useEntrepreneur";
import { mapIndustry, mapStage, stageMap, startupMap } from "@/lib/utils/startupMap";
import { useStartupStore } from "@/store/startupStore";
import { CreateStartupData } from "@/types/entrepreneur";
import { DocumentPickerAsset } from "expo-document-picker";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UpdateIdeaScreen() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [stepError, setStepError] = useState<string | null>(null)

  const startup = useStartupStore((state)=>state.selectedStartup);

  const [startupName, setStartupName] = useState<string>(startup?.startupName ?? '') 

  const category = startup?.industry ? startupMap[startup?.industry].category : 'Technology';
  const [industry, setIndustry] = useState<string>(category );

  const stage = startup?.stage ? stageMap[startup?.stage].stage : 'MVP';
  const [startupStage, setStartupStage] = useState<string>(stage);

  const amount = startup?.fundingAmount ? startup.fundingAmount.toString() : ''; // Default to '0'
  const [fundingAmount, setFundingAmount] = useState<string>(
    new Intl.NumberFormat().format(Number(amount))
  );

  const [roundType, setRoundType] = useState<string>(startup?.roundType ?? 'Pre-Seed');
  const [region, setRegion] = useState<string>(startup?.region ?? 'Addis Ababa');
  const [equityEnabled, setEquityEnabled] = useState<boolean>(startup?.equityOffered ?? false);

  const [pitchTitle, setPitchTitle] = useState<string>(startup?.pitchTitle ?? '');
  const [file, setFile] = useState<DocumentPickerAsset | null>(
      startup?.pitchDeckUrl
        ? {
            name: startup?.pitchDeckUrl.split("/").pop() || "PitchDeck.pdf",
            size: 0,
            uri: startup?.pitchDeckUrl,
            mimeType: "application/pdf",
            lastModified: Date.now(),
          }
        : null
    );
  const [desc, setDesc] = useState<string | null>("");

  const validateStep = () => {
    // Clear previous step-level error
    setStepError(null);
  
    switch (step) {
      case 1:
  
        if (startupName.length < 3) {
          return "Startup name must be at least 3 characters";
        }

        if (Number(amount) < 1) {
          return "Funding amount must be greater than 0";
        }

        if (isNaN(Number(amount.replace(/,/g, "")))) {
          return "Funding amount must be a valid number";
        }
  
        break;
  
      case 2:

      if (pitchTitle.length < 5) {
        return "Pitch title must be at least 5 characters";
      }

        break;
  
      case 3:

      if ((desc ?? "").length < 20) {
        return "Description must be at least 20 characters";
      }
  
        break;

    }
  
    return null;
  };

  const { updateIdea, loading, error } = useEntrepreneur();
  const saveChanges = async() => {
    const mappedIndustry = mapIndustry[industry];
    const mappedStage = mapStage[startupStage];
    const data: CreateStartupData = {
          startupName,
          industry: mappedIndustry,
          stage: mappedStage,
          fundingAmount: Number(fundingAmount.replace(/,/g, "")),
          roundType,
          region,
          equityOffered: equityEnabled,
          pitchTitle,
          pitchDeck: file,
          description: desc,
        }
    
        console.log("startup data: ", data);
        if (startup?.id) await updateIdea(data, startup?.id);
  }

  const handleNext = () => {
    const errorMessage = validateStep();
  
    if (errorMessage) {
      setStepError(errorMessage);
      return;
    }
  
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return  <StepIdentityFunding 
        startupName={startupName}
        industry={industry}
        stage={startupStage}
        fundingAmount={fundingAmount}
        roundType={roundType}
        region={region}
        equityEnabled={equityEnabled}
        setStartupName={setStartupName}
        setIndustry={setIndustry}
        setStage={setStartupStage}
        setFundingAmount={setFundingAmount}
        setRoundType={setRoundType}
        setRegion={setRegion}
        setEquityEnabled={setEquityEnabled}
        />;
      case 2:
        return <StepPitchDetails 
                pitchTitle={pitchTitle}
                file={file}
                setPitchTitle={setPitchTitle}
                setFile={setFile}
                />;
      case 3:
        return <StartupDescriptionEditor setDesc={setDesc}/>
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {stepError && (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>{stepError}</Text>
        </View>
      )}

      {step > 1 && (
      <View style={styles.header}>
          <Text onPress={handleBack} style={styles.backText}>
            ← Back
          </Text>
        <View style={{ width: 60 }} />
      </View>
      )}

        <View style={styles.content}>{renderStep()}</View>
        <BottomCTA 
        loading={loading}
        step={step}
        onPress={handleNext}
         saveChanges={() => {
          const errorMessage = validateStep()
        
        if (errorMessage) {
          setStepError(errorMessage)
          return
        }

        saveChanges()
         }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  content: {
    flex: 1,
  },

  errorWrapper: {
    alignSelf: "center",        // 👈 makes it NOT full width
    backgroundColor: "#FEE2E2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 12,
    maxWidth: "85%",            // 👈 prevents too wide messages
  },
  
  errorText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6366F1",
  },
  
  stepIndicator: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },
});
