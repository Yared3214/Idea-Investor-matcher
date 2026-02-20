import { investorOnboardingApi } from "@/lib/api/investor.api"
import { useAuthStore } from "@/store/useAuthStore"
import { InvestorOnboardingData } from "@/types/investorOnboarding"
import { router } from "expo-router"
import { useState } from "react"

export function useInvestor() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { updateUser } = useAuthStore();

  const investorOnboarding = async (data: InvestorOnboardingData) => {
    setError(null)
    setLoading(true)

    try {
        const res = await investorOnboardingApi(data)
        
        if (res.success) {
            alert('Thanks for taking the time to complete your profile')
            await updateUser({isOnboarded: true});
            router.replace('/');
        }
    } catch (err: any) {
        setError(err.message || 'Failed to onboard investor')
    } finally {
        setLoading(false)
    }
    }
    
    
    return { investorOnboarding, loading, error }
}