import { createIdeaApi, getMyStartupsApi } from "@/lib/api/entrepreneur.api";
import { getSingleStartupApi } from "@/lib/api/investor.api";
import { useStartupStore } from "@/store/startupStore";
import { CreateStartupData } from "@/types/entrepreneur";
import { router } from "expo-router";
import { useCallback, useState } from "react";

export function useEntrepreneur() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { fetchStartups, fetchStartupById } = useStartupStore()

    const createIdea = async(data: CreateStartupData) => {
        setError(null);
        setLoading(true);

        try {
            const res = await createIdeaApi(data);
            
            if(res?.success) {
                alert("Startup created successfully");
                router.back();
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create Startup')
        } finally {
            setLoading(false);
        }
    }

    const getMyStartups = useCallback(async () => {
        setError(null);
        setLoading(true);

        try{
            const res = await getMyStartupsApi();
            
            if(res?.success) {
                fetchStartups(res.data);
                return res;
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch Startups')
        } finally {
            setLoading(false);
        }
    },[fetchStartups]);

    const getSingleStartup = useCallback(async(id: string) => {
            setError(null);
            setLoading(true);
    
            try{
                const res = await getSingleStartupApi(id);
    
                if (res.success) {
                    fetchStartupById(res.data);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to fetch startups')
            } finally {
                setLoading(false)
            }
        },[fetchStartupById]);

    return { createIdea, getMyStartups, getSingleStartup, loading, error };
}