import { getSingleStartupApi, getStartupsApi, investorOnboardingApi } from "@/lib/api/investor.api"
import { useStartupStore } from "@/store/startupStore"
import { useAuthStore } from "@/store/useAuthStore"
import { InvestorOnboardingData } from "@/types/investor"
import { router } from "expo-router"
import { useCallback, useState } from "react"

export function useInvestor() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { fetchStartups, fetchStartupById } = useStartupStore();

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

    const getStartups = useCallback(async() => {
        setError(null);
        setLoading(true);

        try{
            const res = await getStartupsApi();

            if (res.success) {
                fetchStartups(res.data.data);
                return res;
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch startups')
        } finally {
            setLoading(false)
        }
    },[fetchStartups]);

    const getSingleStartup = useCallback(async(id: string) => {
        setError(null);
        setLoading(true);

        try{
            const res = await getSingleStartupApi(id);

            if (res.success) {
                fetchStartupById(res.data);
                return res;
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch startups')
        } finally {
            setLoading(false)
        }
    },[fetchStartupById]);
    
    
    return { investorOnboarding, getStartups, getSingleStartup, loading, error }
}