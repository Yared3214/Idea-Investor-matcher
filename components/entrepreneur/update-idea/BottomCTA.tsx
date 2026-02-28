import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Props { 
    onPress: () => void;
    saveChanges: () => void;
    step: number;
    loading: boolean;
}

export default function BottomCTA({ onPress, saveChanges, step, loading }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const isLastStep = step === 3;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["rgba(249,250,251,0)", "#F9FAFB", "#F9FAFB"]}
        style={styles.gradient}
      />

      {/* Button */}
      {isLastStep ? 
      <TouchableWithoutFeedback
      onPress={saveChanges}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={["#4F46E5", "#2563EB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          {loading ? 
            <ActivityIndicator color="#FFFFFF" />
            : (
              <>
          <Text style={styles.buttonText}>
            Save Changes
          </Text>
          <FontAwesome6
            name="arrow-up"
            size={14}
            color="white"
            style={{ marginLeft: 6 }}
          />
          </>)}
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
    : 
    <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
          <LinearGradient
            colors={["#4F46E5", "#2563EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {step === 1 ? 'Continue to Pitch Details' 
              : 'Edit Detailed Description'}
            </Text>
            <FontAwesome6
              name="arrow-right"
              size={14}
              color="white"
              style={{ marginLeft: 6 }}
            />
          </LinearGradient>
        </Animated.View>
      </TouchableWithoutFeedback>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#4F46E5",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});