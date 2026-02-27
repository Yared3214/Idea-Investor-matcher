import { useAuthStore } from "@/store/useAuthStore";
import { StartupResponse } from "@/types/startups";
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL

export async function createIdeaApi(data: any) {
    const token = useAuthStore.getState().token;

    const formData = new FormData();

    formData.append("startupName", data.startupName);
    formData.append("industry", data.industry);
    formData.append("stage", data.stage);
    formData.append("fundingAmount", String(data.fundingAmount));
    formData.append("roundType", data.roundType ?? "");
    formData.append("region", data.region);
    formData.append("equityOffered", String(data.equityOffered));
    formData.append("pitchTitle", data.pitchTitle);
    formData.append("description", data.description ?? "");

    // ✅ Append file properly
    if (data.pitchDeck) {
        formData.append("pitchDeck", {
        uri: data.pitchDeck.uri,
        name: data.pitchDeck.name || "pitch.pdf",
        type: data.pitchDeck.mimeType || "application/pdf",
        } as any);
    }


    const res = await fetch(`${API_URL}/entrepreneur/ideas`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, },
        body: formData,
    })

    if (res.status === 201) {
        return { success: true }
    } else {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to create Ideas')
    }
}

export async function getMyStartupsApi() {
    const token = useAuthStore.getState().token;

    const res = await fetch(`${API_URL}/entrepreneur/ideas`,{
        headers: { Authorization: `Bearer ${token}`}
    });

    if (res.status === 200) {
            return Promise.resolve({ success: true, data: await res.json() }) as Promise<{ 
                success: boolean;
                data: StartupResponse[]
                }>;
        } else {
            const errorData = await res.json()
            throw new Error(errorData.message || 'Failed to fetch Startups')
        }
}