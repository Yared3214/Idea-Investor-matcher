import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={["#eef2ff", "#faf5ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}   // FULL SCREEN
    >
    <ScrollView 
    contentContainerStyle={{
      paddingHorizontal: 20,
      paddingBottom: 20,
    }}>
    <SafeAreaView style={{flex: 1,}}>
      <View style={{ 
        alignItems: "center", 
        justifyContent: "center", 
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 10,
      }}>
        <Image
          source={
            require("../../assets/images/landing-icon.png")
          }
          style={{ width: 100, height: 100,}}
        />
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>ConnectIdea</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize:15, paddingHorizontal: 20}}>Bridge the gap between innovative </Text>
        <Text style={{fontSize:15, paddingHorizontal: 20}}>ideas and strategic investors</Text>
        </View>
      </View>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        padding: 30,
        backgroundColor: 'white',
        borderRadius: 8,
      }}>
      <View style={{
        backgroundColor: '#e0e7ff',
        padding: 16,
        borderRadius: 15,
        width: 70,
        height: 60,
      }}>
      <Svg
      width={30}
      height={30}
      viewBox="0 0 512 512"
      fill="none"
    >
      <Path
        d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
        fill={'#4f46e5'}
      />
    </Svg>
    </View>
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 6,
    }}>
    <Text style={{fontSize: 22, fontWeight: 'bold'}}>For Entrepreneurs</Text>
    <Text numberOfLines={4} style={{fontSize: 16, color: '#6b7280'}}>Showcase your ideas and{"\n"} connect with matched{"\n"} investors</Text>
    </View>
      </View>


      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        padding: 30,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 8,
      }}>
      <View style={{
        backgroundColor: '#f3e8ff',
        padding: 16,
        borderRadius: 15,
        width: 70,
        height: 60,
      }}>
      <Svg
      width={30}
      height={30}
      viewBox="0 0 512 512"
      fill="none"
    >
      <Path
        d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"
        fill={'#9333ea'}
      />
    </Svg>
    </View>
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 6,
    }}>
    <Text style={{fontSize: 22, fontWeight: 'bold'}}>For Investors</Text>
    <Text numberOfLines={4} style={{fontSize: 16, color: '#6b7280'}}>Discover high-potential ideas{"\n"} aligned with your interests</Text>
    </View>
      </View>

      <Link 
      style={styles.container} 
      href={{
    pathname: "/signup",
    params: { role: "ENTREPRENEUR" },
  }} push asChild>
            <Pressable
            onPress={() => {
              // Handle button press, e.g., navigate to another screen
            }}
            style={({ pressed }) => [
              pressed && styles.pressed,
            ]}
          >
            <LinearGradient
              colors={["#4F46E5", "#4338CA"]} // indigo-600 → indigo-700
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.text}>I&apos;m an Entrepreneur</Text>
            </LinearGradient>
          </Pressable>
            </Link>

            <Link 
      style={styles.container} 
      href={{
    pathname: "/signup",
    params: { role: "INVESTOR" },
  }} push asChild>
    <Pressable
      onPress={() => {
        // Handle button press, e.g., navigate to another screen
      }}
      style={({ pressed }) => [
        pressed && styles.pressed,
      ]}
    >
      <LinearGradient
        colors={["#9333EA", "#7E22CE"]} // purple-600 → purple-700
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>I&apos;m an Investor</Text>
      </LinearGradient>
    </Pressable>
    </Link>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
        marginTop: 20,
      }}>
    <Text style={{
      color: '#6b7280'
    }}> Already have an account?</Text>
    <Link href='/login' push asChild>
    <Text style={{
      color: '#4f46e5'
    }}>Login</Text>
    </Link>
    </View>
      </SafeAreaView>
      </ScrollView>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", // w-full
    marginTop: 20, // mt-5
  },
  gradient: {
    paddingVertical: 16, // py-4
    borderRadius: 12, // rounded-xl
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1", // indigo-200 shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5, // Android shadow
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16, // text-base
    fontWeight: "600", // font-semibold
  },
  pressed: {
    transform: [{ scale: 0.95 }], // active:scale-95
  },
});

