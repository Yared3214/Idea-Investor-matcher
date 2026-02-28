import { FontAwesome6 } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { Dispatch, SetStateAction } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  pitchTitle: string;
  setPitchTitle: Dispatch<SetStateAction<string>>;
  file: DocumentPicker.DocumentPickerAsset | null;
  setFile: Dispatch<SetStateAction<DocumentPicker.DocumentPickerAsset | null>>;
}

export default function StepPitchDetails({ 
  pitchTitle, 
  file, 
  setPitchTitle, 
  setFile }: Props) {

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    setFile(result.assets[0]);
  };

  const removeFile = () => {
    Alert.alert("Remove Pitch Deck", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setFile(null),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* SECTION 1 — Pitch Title */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pitch Title</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Headline</Text>

          <TextInput
            value={pitchTitle}
            onChangeText={setPitchTitle}
            placeholder="Enter a compelling pitch headline"
            placeholderTextColor="#D1D5DB"
            style={styles.headlineInput}
          />

          <Text style={styles.helper}>
            Keep it short and punchy (max 60 chars)
          </Text>
        </View>
      </View>

      {/* SECTION 2 — Pitch Deck */}
      <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pitch Deck</Text>

      <View style={styles.card}>
        {file ? (
          <>
            {/* File Info */}
            <View style={styles.fileRow}>
              <View style={styles.fileLeft}>
                <View style={styles.pdfIcon}>
                  <FontAwesome6 name="file-pdf" size={18} color="#EF4444" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={styles.fileName}>
                    {file.name}
                  </Text>
                  <Text style={styles.fileMeta}>
                    {file.size
                      ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                      : "Uploaded"}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={removeFile} style={styles.deleteBtn}>
                <FontAwesome6 name="xmark" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Replace */}
            <TouchableOpacity onPress={pickDocument} style={styles.replaceBtn}>
              <Text style={styles.replaceText}>Replace File</Text>
            </TouchableOpacity>
          </>
        ) : (
          /* Empty Upload State */
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={pickDocument}
          >
            <View style={styles.uploadIcon}>
              <FontAwesome6
                name="cloud-arrow-up"
                size={20}
                color="#6366F1"
              />
            </View>

            <Text style={styles.uploadTitle}>
              Upload your pitch deck
            </Text>

            <Text style={styles.uploadSubtitle}>
              PDF format only (Max 10MB)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>

      {/* SECTION 3 — Preview */}
      <View style={{ marginBottom: 120 }}>
        <Text style={styles.sectionTitle}>Preview</Text>

        <View style={styles.previewCard}>
          <View style={styles.badgeRow}>
            <View style={styles.stageBadge}>
              <Text style={styles.stageBadgeText}>SEED</Text>
            </View>
            <Text style={styles.locationText}>San Francisco</Text>
          </View>

          <Text style={styles.previewTitle}>Acme AI</Text>

          <Text numberOfLines={2} style={styles.previewDescription}>
            Revolutionizing the way businesses handle data processing
            with autonomous agents.
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 10,
    },
  
    section: {
      marginBottom: 24,
    },
  
    sectionTitle: {
      fontSize: 11,
      fontWeight: "600",
      color: "#6B7280",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 12,
      paddingHorizontal: 4,
    },
  
    card: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: "#F3F4F6",
    },
  
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: "#374151",
      marginBottom: 8,
    },
  
    headlineInput: {
      fontSize: 18,
      fontWeight: "600",
      color: "#111827",
      paddingVertical: 8,
      borderBottomWidth: 2,
      borderBottomColor: "#E5E7EB",
    },
  
    helper: {
      fontSize: 12,
      color: "#9CA3AF",
      marginTop: 6,
    },
  
    fileRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#F9FAFB",
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      marginBottom: 12,
    },
  
    fileLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
    },
  
    pdfIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: "#FEF2F2",
      alignItems: "center",
      justifyContent: "center",
    },
  
    fileName: {
      fontSize: 14,
      fontWeight: "500",
      color: "#111827",
    },
  
    fileMeta: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 2,
    },
  
    deleteBtn: {
      padding: 6,
    },
  
    replaceBtn: {
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
    },
  
    replaceText: {
      fontSize: 13,
      fontWeight: "600",
      color: "#4F46E5",
    },

    uploadContainer: {
      paddingVertical: 32,
      alignItems: "center",
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: "#E5E7EB",
      borderRadius: 16,
    },
  
    uploadIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#EEF2FF",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
  
    uploadTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: "#111827",
    },
  
    uploadSubtitle: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 4,
    },
  
    previewCard: {
      borderRadius: 18,
      padding: 20,
      backgroundColor: "#111827",
    },
  
    badgeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 8,
    },
  
    stageBadge: {
      backgroundColor: "rgba(99,102,241,0.2)",
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
  
    stageBadgeText: {
      fontSize: 10,
      fontWeight: "700",
      color: "#C7D2FE",
    },
  
    locationText: {
      fontSize: 12,
      color: "#9CA3AF",
    },
  
    previewTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 4,
    },
  
    previewDescription: {
      fontSize: 12,
      color: "#D1D5DB",
    },
  });