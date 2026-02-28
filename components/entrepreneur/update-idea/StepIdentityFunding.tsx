import { SelectField } from "@/components/SelectField";
import React, { Dispatch, SetStateAction } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  startupName: string;
  industry: string;
  stage: string;
  fundingAmount: string;
  roundType: string;
  region: string;
  equityEnabled: boolean;
  setIndustry: Dispatch<SetStateAction<string>>;
  setStartupName: Dispatch<SetStateAction<string>>;
  setStage: Dispatch<SetStateAction<string>>;
  setFundingAmount: Dispatch<SetStateAction<string>>;
  setRoundType: Dispatch<SetStateAction<string>>;
  setRegion: Dispatch<SetStateAction<string>>;
  setEquityEnabled: Dispatch<SetStateAction<boolean>>;

}

export default function StepIdentityFunding({ 
  startupName,
  industry,
  stage,
  fundingAmount,
  roundType, 
  region,
  equityEnabled,
  setStartupName,
  setIndustry,
  setStage,
  setFundingAmount,
  setRoundType,
  setRegion,
  setEquityEnabled
}: Props) {

  const handleFundingAmountChange = (value: string) => {
    const numericValue = value.replace(/,/g, ''); // Remove commas for parsing
    if (!isNaN(Number(numericValue))) {
      setFundingAmount(new Intl.NumberFormat().format(Number(numericValue)));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* SECTION 1 - Startup Identity */}
      <Text style={styles.sectionTitle}>Startup Identity</Text>
      <View style={styles.card}>

        {/* Startup Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Startup Name</Text>
          <TextInput
            value={startupName}
            onChangeText={setStartupName}
            defaultValue="Acme AI"
            placeholder="e.g. Acme Inc."
            style={styles.input}
          />
        </View>

        {/* Industry */}
        <View style={styles.field}>
          <SelectField
            label="Industry"
            icon="layer-group"
            options={[
              "FinTech",
              "HealthTech",
              "Technology",
              "Renewable Energy",
              "AI / SaaS",
              "ECommerce",
              "EdTech",
              "AgriTech",
            ]}
            value={industry ?? ''}
            onSelect={setIndustry}
          />
        </View>

        {/* Stage */}
        <View style={styles.field}>
          <SelectField
            label="Current Stage"
            icon="chart-line"
            options={[
              "Idea Phase",
              "Prototype",
              "MVP",
              "Early Revenue",
              "Scaling",
              "Series A",
            ]}
            value={stage}
            onSelect={setStage}
          />
        </View>

      </View>

      {/* SECTION 2 - Funding Details */}
      <Text style={styles.sectionTitle}>Funding Details</Text>
      <View style={styles.card}>

        {/* Amount Raising */}
        <View style={styles.field}>
          <Text style={styles.label}>Amount Raising</Text>
          <View style={styles.inputWithIcon}>
            <Text style={{ marginRight: 6, fontWeight: "600" }}>ETB</Text>
            <TextInput
             value={fundingAmount}
             onChangeText={setFundingAmount}
              keyboardType="numeric"
              style={styles.inputNoBorder}
            />
          </View>
        </View>

        {/* Round Type Buttons */}
        <View style={styles.field}>
          <Text style={styles.label}>Round Type</Text>

          <View style={styles.segmentContainer}>
            {["Pre-Seed", "Seed", "Series A"].map((type) => {
              const isActive = roundType === type;

              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => setRoundType(type)}
                  style={[
                    styles.segmentBtn,
                    isActive && styles.segmentBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      isActive && styles.segmentTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Equity Toggle */}
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.labelDark}>Equity Offered</Text>
            <Text style={styles.helperText}>
              Willingness to negotiate equity
            </Text>
          </View>

          <Switch
            value={equityEnabled}
            onValueChange={setEquityEnabled}
          />
        </View>

      </View>

      {/* SECTION 3 - Location */}
      <Text style={styles.sectionTitle}>Location</Text>
      <View style={styles.card}>
      <View style={styles.field}>
        <SelectField
          label="Region"
          icon="map-pin"
          options={[
            "San Francisco, CA",
            "New York, NY",
            "London, UK",
            "Remote",
          ]}
          value={region ?? 'Addis Ababa'}
          onSelect={setRegion}
          isRegion={true}
        />
      </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 10,
    marginTop: 10,
    textTransform: "uppercase",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  field: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },

  labelDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },

  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  inputNoBorder: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },

  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 4,
    borderRadius: 12,
  },

  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },

  segmentBtnActive: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },

  segmentText: {
    fontSize: 12,
    color: "#6B7280",
  },

  segmentTextActive: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});