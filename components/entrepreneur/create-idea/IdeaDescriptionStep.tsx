import React, { Dispatch, SetStateAction } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Editor from '../../dom-components/hello-dom';
import StepHeader from './StepHeader';
// import your RichTextEditor here

interface Props {
  editorState: string | null;
  setEditorState: Dispatch<SetStateAction<string | null>>;
}

export default function IdeaDescriptionStep({
  editorState,
  setEditorState,
}: Props) {

  const maxChars = 1500;

  return (
    <View style={{ marginBottom: 45 }}>
      <StepHeader
        title="Describe your idea"
        subtitle="Explain the problem, solution, and business model."
      />

      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.descriptionHeader}>
          <Text style={styles.label}>Detailed Description</Text>
          <Text style={styles.counter}>
            {editorState?.length}/{maxChars}
          </Text>
        </View>

          <View style={{ height: 300 }}>
            <Editor
                setEditorState={setEditorState}
            />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  counter: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  richWrapper: {
    minHeight: 250,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
});