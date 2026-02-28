import BottomCTA from "@/components/entrepreneur/create-idea/BottomCTA";
import IdeaDescriptionStep from "@/components/entrepreneur/create-idea/IdeaDescriptionStep";
import IdeaDetails from "@/components/entrepreneur/create-idea/IdeaDetails";
import StepBasicInfo from "@/components/entrepreneur/create-idea/StepBasicInfo";
import StepFunding from "@/components/entrepreneur/create-idea/StepFunding";
import StepProgress from "@/components/entrepreneur/create-idea/StepProgress";
import { useEntrepreneur } from "@/hooks/useEntrepreneur";
import { mapIndustry, mapStage } from "@/lib/utils/startupMap";
import { CreateStartupData } from "@/types/entrepreneur";
import { DocumentPickerAsset } from "expo-document-picker";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function CreateIdeaScreen() {
  const [startupName, setStartupName] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState("mvp");

  const [amount, setAmount] = useState('');
  const [selectedFundingStage, setSelectedFundingStage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('Addis Ababa');
  const [equityEnabled, setEquityEnabled] = useState(true);

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<DocumentPickerAsset | null>(null);
  const [editorState, setEditorState] = useState<string | null>(null) 


  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState<string | null>(null)



  const validateStep = () => {
    // Clear previous step-level error
    setStepError(null);
  
    switch (step) {
      case 1:
        if (!startupName) {
          return "Startup name is required";
        }
  
        if (startupName.length < 3) {
          return "Startup name must be at least 3 characters";
        }
  
        if (!selectedIndustry) {
          return "You must select an industry";
        }
  
        if (!selectedStage) {
          return "You must select current stage";
        }
  
        break;
  
      case 2:
        if (Number(amount) < 1) {
          return "Funding amount must be greater than 0";
        }

        if (isNaN(Number(amount.replace(/,/g, "")))) {
          return "Funding amount must be a valid number";
        }
  
        if (!selectedFundingStage) {
          return "You must choose a funding round";
        }
  
        break;
  
      case 3:
        if (!title) {
          return "Pitch title is required";
        }
  
        if (title.length < 5) {
          return "Pitch title must be at least 5 characters";
        }
  
        break;
  
      case 4: 
        if (!editorState) {
          return "Pitch description is required";
        }
  
        if (editorState.length < 20) {
          return "Description must be at least 20 characters";
        }
  
        break;
    }
  
    return null;
  };

  const { createIdea, error, loading } = useEntrepreneur();

  const submit = async() => {
    const mappedIndustry = mapIndustry[selectedIndustry] || "";
    const mappedStage = mapStage[selectedStage] || "";
    const data: CreateStartupData = {
      startupName,
      industry: mappedIndustry,
      stage: mappedStage,
      fundingAmount: Number(amount.replace(/,/g, "")),
      roundType: selectedFundingStage,
      region: selectedLocation,
      equityOffered: equityEnabled,
      pitchTitle: title,
      pitchDeck: file,
      description: editorState,
    }

    console.log("startup data: ", data);
    await createIdea(data);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepBasicInfo 
                startupName={startupName}
                selectedIndustry={selectedIndustry}
                selectedStage={selectedStage}
                setStartupName={setStartupName}
                setSelectedIndustry={setSelectedIndustry}
                setSelectedStage={setSelectedStage}
                />;
      case 2:
        return <StepFunding 
                amount={amount}
                selectedStage={selectedFundingStage}
                selectedLocation={selectedLocation}
                equityEnabled={equityEnabled}
                setAmount={setAmount}
                setSelectedStage={setSelectedFundingStage}
                setSelectedLocation={setSelectedLocation}
                setEquityEnabled={setEquityEnabled}/>
      case 3:
        return <IdeaDetails 
                title={title}
                file={file}
                setFile={setFile}
                setTitle={setTitle}/>
      case 4:
        return <IdeaDescriptionStep 
                editorState={editorState}
                setEditorState={setEditorState}
                />
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>

       {/* Intro */}
      <StepProgress 
      step={step} 
      totalSteps={4}
      error={error}
      stepError={stepError}
      onBack={() => setStep(prev => prev - 1)}
      />
      
      <View style={styles.content}>{renderStep()}</View>
      <BottomCTA
      step={step}
      loading={loading}
      submit={() => {
        const errorMessage = validateStep()
        
        if (errorMessage) {
          setStepError(errorMessage)
          return
        }

        submit()
      }} 
      onNext={() => {
        const errorMessage = validateStep()

        if (errorMessage) {
          setStepError(errorMessage)
          return
        }

        setStep(prev => prev + 1)
        }}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24,
  },
});
