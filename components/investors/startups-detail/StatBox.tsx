import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

export const StatBox = ({ color1, color2, title, subtitle, textColor }: any) => (
    <LinearGradient
      colors={[color1, color2]}
      style={styles.statBox}
    >
      <Text style={[styles.statBoxTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.statBoxSub, { color: textColor }]}>{subtitle}</Text>
    </LinearGradient>
  );


const styles = StyleSheet.create({
    statBox: {
        width: "48%",
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
      },
    
      statBoxTitle: {
        fontSize: 18,
        fontWeight: "700",
      },
    
      statBoxSub: {
        fontSize: 12,
        marginTop: 4,
      },
})