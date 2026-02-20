import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

export default function Layout() {

  return <Tabs screenOptions={{tabBarActiveTintColor: '#4f46e5'}}>
    <Tabs.Screen name='(home)' options={{
        headerShown: false,
        title: 'Ideas',
        tabBarIcon: ({color, size}) => {
            return <FontAwesome5 
            name="lightbulb" 
            size={size}
            color={color} />
        }
    }}/>
    <Tabs.Screen name='Create' options={{
        tabBarIcon: ({color, size}) => {
            return <Ionicons 
            name="add-circle" 
            size={size}
            color={color} />
        }
    }}/>
    <Tabs.Screen name='Profile' options={{
        tabBarIcon: ({color, size}) => {
            return <MaterialCommunityIcons 
            name="account" 
            size={size}
            color={color} />
        }
    }}/>
  </Tabs>
}
