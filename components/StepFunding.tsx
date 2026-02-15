import { InfoIcon } from "@/lib/utils/Icons";
import { Dispatch, SetStateAction } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Preset } from "./PresetButton";

interface Props {
    minAmount: string;
    maxAmount: string;
    setMinAmount: Dispatch<SetStateAction<string>>;
    setMaxAmount: Dispatch<SetStateAction<string>>;
}

export default function StepFunding({minAmount, maxAmount, setMinAmount, setMaxAmount}: Props) {
    return (
        <ScrollView>
        {/* FUNDING RANGE */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Funding Amount Range</Text>

        <Text style={styles.inputLabel}>Minimum Amount</Text>
        <View style={styles.moneyInput}>
          <Text style={styles.dollar}>$</Text>
          <TextInput
            value={minAmount}
            onChangeText={setMinAmount}
            style={styles.input}
          />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.toText}>to</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.inputLabel}>Maximum Amount</Text>
        <View style={styles.moneyInput}>
          <Text style={styles.dollar}>$</Text>
          <TextInput
            value={maxAmount}
            onChangeText={setMaxAmount}
            style={styles.input}
          />
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <InfoIcon size={14} color="#2563EB" />
          <Text style={styles.infoText}>
            Your preferences help us match you with relevant investment
            opportunities within your budget range.
          </Text>
        </View>
      </View>

      {/* QUICK PRESETS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quick Presets</Text>

        <View style={styles.grid}>
          <Preset title="Angel" subtitle="$25K - $100K" />
          <Preset title="Seed" subtitle="$100K - $500K" />
          <Preset title="Series A" subtitle="$500K - $2M" />
          <Preset title="Series B+" subtitle="$2M+" />
        </View>
      </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
    marginBottom: 24,
    },
          
    sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    },

    inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 6,
    },
      
    moneyInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    },
      
    dollar: {
    marginRight: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    },

    input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    },

    grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    },

    dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    },
          
    divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
    },
          
    toText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: "#9CA3AF",
    },

    infoBox: {
    marginTop: 16,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#DBEAFE",
    padding: 12,
    borderRadius: 10,
    },
          
    infoText: {
    fontSize: 12,
    color: "#1E3A8A",
    flex: 1,
    },
})