import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    step: number;
    totalSteps: number;
    error: string | null;
    stepError: string | null;
    onBack: () => void;
}
export default function StepProgress({step, totalSteps, stepError, error, onBack}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                    
                    {/* Back Button */}
                    <Pressable disabled={step === 1} style={styles.backButton} onPress={onBack}>
                      <Feather name="chevron-left" size={20} color="#4B5563" />
                    </Pressable>
            
                    {/* Progress Bars */}
                    <View style={styles.progressContainer}>
                      {Array.from({ length: totalSteps }).map((_, index) => (
                        <View
                          key={index}
                          style={[
                            styles.progressBar,
                            index < step
                              ? styles.progressActive
                              : styles.progressInactive,
                          ]}
                        />
                      ))}
                    </View>
            
                    {/* Spacer for alignment */}
                    <View style={{ width: 40 }} />
                  </View>
                  {/* Step Label */}
                        <Text style={styles.stepLabel}>
                          Step {step} of {totalSteps}
                        </Text>

                        { error ? 
                          <Text style={{padding: 10, borderRadius: 9, backgroundColor: "#fee2e2", color: "red", textAlign: "center" }}>
                          {error}
                          </Text> : null}

                        {stepError && (
                          <Text
                            style={{
                              padding: 10,
                              borderRadius: 9,
                              backgroundColor: "#fee2e2",
                              color: "red",
                              marginTop: 12,
                              textAlign: "center",
                            }}
                          >
                            {stepError}
                          </Text>
                        )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 8,
      },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      },
    
      backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F9FAFB", // gray-50
        justifyContent: "center",
        alignItems: "center",
      },
    
      progressContainer: {
        flexDirection: "row",
        gap: 8,
      },
    
      progressBar: {
        height: 6,
        width: 64,
        borderRadius: 999,
      },
    
      progressActive: {
        backgroundColor: "#6366F1", // primary
      },
    
      progressInactive: {
        backgroundColor: "#E5E7EB", // gray-200
      },
    
      stepLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6366F1",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 4,
      },
})