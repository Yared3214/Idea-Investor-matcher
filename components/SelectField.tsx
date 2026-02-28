import { locations } from "@/lib/utils/location";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface SelectFieldProps {
  label: string;
  icon: string;
  options: string[];
  value: string;
  isRegion?: boolean;
  onSelect: (value: string) => void;
}

export function SelectField({
  label,
  icon,
  options,
  value,
  isRegion = false,
  onSelect,
}: SelectFieldProps) {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const open = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.selectBox} onPress={open}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome6 name={icon as any} size={14} color="#6B7280" />
          <Text style={styles.selectText}>
            {value || "Select an option"}
          </Text>
        </View>
        <FontAwesome6 name="chevron-down" size={12} color="#9CA3AF" />
      </Pressable>

      <Modal transparent visible={visible} animationType="none">
        <Pressable style={styles.overlay} onPress={close}>
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.sheetTitle}>{label}</Text>

            {isRegion ? <FlatList
              data={locations}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onSelect(item.name);
                    close();
                  }}
                >     
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                    <Image
                    source={item.flag} 
                    style={{
                      width: 24,
                      height: 16,
                      borderRadius: 2,
                    }}/>
                    <Text
                    style={[
                      styles.optionText,
                      item.name === value && styles.optionActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                    </View>
                  
                </Pressable>
              )}
            />
            :
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    close();
                  }}
                >
                    <Text
                    style={[
                      styles.optionText,
                      item === value && styles.optionActive,
                    ]}
                  >
                    {item}
                  </Text>
                  
                </Pressable>
              )}
            />}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#374151", // gray-700
        marginBottom: 6,
      },
    selectBox: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
      },
      
      selectText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#111827",
      },
      
      overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-end",
      },
      
      bottomSheet: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "60%",
      },
      
      sheetTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 16,
      },
      
      option: {
        paddingVertical: 14,
      },
      
      optionText: {
        fontSize: 15,
        color: "#374151",
      },
      
      optionActive: {
        color: "#4F46E5",
        fontWeight: "600",
      },
})