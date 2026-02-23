import { createIdeaApi } from "@/lib/api/entrepreneur.api";
import { CreateStartupData } from "@/types/createStartup";
import { router } from "expo-router";
import { useState } from "react";

export function useEntrepreneur() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

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

    return { createIdea, loading, error };
}