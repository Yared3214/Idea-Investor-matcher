import { InvestorOnboardingData } from "@/types/investorOnboarding";
import { useAuthStore } from "@/store/useAuthStore";
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.API_URL

export async function investorOnboardingApi(data: InvestorOnboardingData) {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/investor/onboarding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(data),
    })

    if (res.status === 201) {
        return { success: true }
    } else {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to onboard investor')
    }
}

