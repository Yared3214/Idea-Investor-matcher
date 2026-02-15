import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

export default function ProtectedLayout() {
//   const { token, loading } = useAuthStore()

//   if (loading) return null

//   if (!token) return <Redirect href='/login' />

  return <Tabs screenOptions={{tabBarActiveTintColor: '#4f46e5'}}>
    <Tabs.Screen name='Ideas' options={{
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
