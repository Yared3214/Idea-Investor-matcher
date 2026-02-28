import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';


interface Props {
    onNext: () => void;
    submit: () => void;
    loading: boolean;
    step: number
}
export default function BottomCTA({onNext, submit, loading, step}: Props) {
  const isLastStep = step === 4;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(249,250,251,0)", "#F9FAFB", "#F9FAFB"]}
        style={styles.gradient}
      >
        {isLastStep? 
        <Pressable
        onPress={submit}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          {loading ? 
            <ActivityIndicator color="#FFFFFF" />
          : 
          (
            <>
            <Text style={styles.buttonText}>Submit</Text>
            <FontAwesome5 name="arrow-up" size={14} color="#ffffff" />
            </>
          )}
        </Pressable> 
        : 
        <Pressable
        disabled={step === 4}
        onPress={onNext}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <FontAwesome5 name="arrow-right" size={14} color="#ffffff" />
        </Pressable>}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  gradient: {
    padding: 24,
    paddingTop: 40,
  },
  button: {
    height: 56,
    backgroundColor: '#2563EB', // primary color
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});