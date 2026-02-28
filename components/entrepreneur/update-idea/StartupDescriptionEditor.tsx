import Editor from "@/components/dom-components/hello-dom";
import React, { Dispatch, SetStateAction } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

interface Props {
  setDesc: Dispatch<SetStateAction<string | null>>;
}
export default function StartupDescriptionEditor({ setDesc }: Props) {

  return (
    <View style={styles.wrapper}>
        {/* Header Section */}
        <View style={styles.headerSection}>
        <Text style={styles.sectionLabel}>Pitch Description</Text>
        <Text style={styles.headerTitle}>Tell Your Story</Text>
        <Text style={styles.headerSubtitle}>
            Clearly explain your vision, traction, market opportunity, and business model.
        </Text>
        </View>
        <View style={{ height: 300 }}>
            <Editor
                setEditorState={setDesc}
            />
        </View>

         {/* Character Counter */}
        {/* <View style={styles.counter}>
          <Text style={styles.counterText}>
            {text?.length} / 2000
          </Text>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 16,
    },

    headerSection: {
        marginBottom: 14,
      },
      
      sectionLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
        textTransform: "uppercase",
        marginBottom: 6,
      },
      
      headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
      },
      
      headerSubtitle: {
        fontSize: 13,
        color: "#6B7280",
        lineHeight: 18,
      },
  
  
    /* ================= Counter ================= */
  
    counter: {
      position: "absolute",
      bottom: 12,
      right: 14,
      backgroundColor: "rgba(255,255,255,0.9)",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
  
    counterText: {
      fontSize: 11,
      fontWeight: "600",
      color: "#9CA3AF",
    },
  });