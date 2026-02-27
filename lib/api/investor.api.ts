import { useAuthStore } from "@/store/useAuthStore";
import { FetchStartupsQuery, InvestorOnboardingData } from "@/types/investor";
import { StartupResponse } from "@/types/startups";
import Constants from 'expo-constants';

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

export async function getStartupsWithQueryApi(QueryData: FetchStartupsQuery) {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/investor/ideas?industry=${QueryData.industry}&stage=${QueryData.stage}&minFunding=${QueryData.minFunding}&maxFunding=${QueryData.maxFunding}region=${QueryData.region}&page=${QueryData.page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = res.json

    if (res.status === 201) {
        return { success: true, data }
    } else {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to fetch Startups')
    }
}

export async function getStartupsApi() {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/investor/ideas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (res.status === 200) {
        return Promise.resolve({ success: true, data: await res.json() }) as Promise<{ 
            success: boolean;
            data: {
                data: StartupResponse[]
            }}>;
    } else {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to fetch Startups')
    }
}

export async function getSingleStartupApi(id: string) {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/investor/idea/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (res.status === 200) {
        return Promise.resolve({ success: true, data: await res.json() }) as Promise<{ 
            success: boolean;
            data: StartupResponse; }>;
    } else {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to fetch Startup')
    }
}

