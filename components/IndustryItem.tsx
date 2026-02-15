import Checkbox from "expo-checkbox";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const IndustryItem = ({
    label,
    Icon,
    checked,
    color,
    fillColor,
    onPress,
  }: any) => (
    <Pressable style={styles.industryItem} onPress={onPress}>
      <View style={styles.industryLeft}>
        <View style={[
          styles.iconBox,
          { backgroundColor: `${color}`}
          ]}>
          <Icon size={18} color={fillColor} />
        </View>
        <Text style={styles.industryText}>{label}</Text>
      </View>
  
      <Checkbox value={checked} onValueChange={onPress} />
    </Pressable>
  );

  
  const styles = StyleSheet.create({
    industryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        marginBottom: 12,
      },
      industryLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      },
    
      iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
    
      industryText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827",
      },

  })