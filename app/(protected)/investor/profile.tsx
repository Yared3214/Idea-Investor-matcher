import { useAuth } from "@/hooks/useAuth";
import { Button, View } from "react-native";

export default function ProfileScreen() {

  const { logout } = useAuth();
  return (
    <View style={{ justifyContent: 'center', flex: 1, padding: 20}}> 
      <Button title="Logout" onPress={logout} />    
      </View>
  )
}