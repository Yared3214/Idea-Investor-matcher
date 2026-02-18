import EmailConfirmation from "@/components/EmailConfirmation";
import { useLocalSearchParams } from 'expo-router';


export default function VerifyEmailScreen() {
    const { email } = useLocalSearchParams<{ email: string }>()
    return (
        <EmailConfirmation email={email} />
    )
}