import { createIdeaApi, deleteIdeaApi, getMyStartupsApi, updateIdeaApi } from "@/lib/api/entrepreneur.api";
import { getSingleStartupApi } from "@/lib/api/investor.api";
import { useStartupStore } from "@/store/startupStore";
import { CreateStartupData } from "@/types/entrepreneur";
import { router } from "expo-router";
import { useCallback, useState } from "react";

export function useEntrepreneur() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { fetchStartups, fetchStartupById, deleteStartup, updateStartup } = useStartupStore()

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

        const updateIdea = async(data:CreateStartupData, startupId: string) => {
            setError(null);
            setLoading(true);
    
            try {
                const res = await updateIdeaApi(data, startupId);
                
                if(res?.success) {
                    alert("Startup updated successfully");
                    console.log(res.data.idea);
                    updateStartup(startupId, res.data.idea);
                    router.back();
                }
            } catch (err: any) {
                setError(err.message || 'Failed to update Startup')
            } finally {
                setLoading(false);
            }
        }

        const deleteIdea = async(startupId: string) => {
            setError(null);
            setLoading(true);
    
            try {
                const res = await deleteIdeaApi(startupId);
                
                if(res?.success) {
                    alert("Startup deleted successfully");
                    deleteStartup(startupId);
                    router.back();
                }
            } catch (err: any) {
                setError(err.message || 'Failed to delete Startup')
            } finally {
                setLoading(false);
            }
        }

    return { createIdea, getMyStartups, getSingleStartup, updateIdea, deleteIdea, loading, error };
}