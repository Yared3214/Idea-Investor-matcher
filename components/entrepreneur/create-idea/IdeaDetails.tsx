import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { Dispatch, SetStateAction } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import StepHeader from './StepHeader';

interface Props {
  title: string;
  file: DocumentPicker.DocumentPickerAsset | null;
  setTitle: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<DocumentPicker.DocumentPickerAsset | null>>;
}

export default function IdeaDetails({
  title,
  setTitle,
  file,
  setFile
}: Props) {

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      if (file.size && file.size > MAX_FILE_SIZE) {
        Alert.alert('File too large', 'Max size is 10MB');
        return;
      }

      setFile(file);

      // const formData = new FormData();
      // formData.append('pitchDeck', {
      //   uri: file.uri,
      //   name: file.name,
      //   type: file.mimeType || 'application/octet-stream',
      // } as any);

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Upload failed');
    }
  };

  return (
    <View style={{ marginBottom: 45 }}>
      <StepHeader
        title="Pitch Basics"
        subtitle="Start with a strong one-line summary."
      />

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Pitch Title */}
        <View>
          <Text style={styles.label}>Pitch Title</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="e.g. Uber for Dog Walking"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
              style={styles.titleInput}
            />
          </View>
        </View>

        {/* Upload Card */}
        <View>
          <Text style={styles.label}>
            Pitch Deck <Text style={styles.optional}>(Optional)</Text>
          </Text>

          <Pressable
            onPress={handleUpload}
            style={({ pressed }) => [
              styles.uploadCard,
              pressed && { backgroundColor: '#F3F4F6' },
            ]}
          >
            <View style={styles.uploadIcon}>
                <Feather name="upload-cloud" size={22} color="#4F46E5" />
            </View>

            <Text style={styles.uploadTitle}>
              {file ? 'Uploaded:' : 'Tap to upload'}
            </Text>

            <Text style={styles.uploadSub}>
              {file ? file.name : 'PDF, PPTX up to 10MB'}
            </Text>
          </Pressable>
        </View>

        {/* AI Suggestion */}
        <View style={styles.aiCard}>
          <View style={styles.aiIcon}>
            <FontAwesome5 name="magic" size={12} color="#4F46E5" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>AI Suggestion</Text>
            <Text style={styles.aiText}>
              Keep your title simple and outcome-driven.
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  optional: {
    color: '#9CA3AF',
    fontWeight: '400',
  },
  inputWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  titleInput: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  uploadCard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  uploadSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  aiCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  aiIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  aiTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#312E81',
  },
  aiText: {
    fontSize: 12,
    color: '#4338CA',
    marginTop: 2,
    lineHeight: 18,
  },
});