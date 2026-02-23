import { DocumentPickerAsset } from "expo-document-picker"

export type CreateStartupData = {
    startupName: string
    pitchTitle: string
    description: string | null
    industry: string
    stage: string
    fundingAmount: number
    equityOffered: boolean
    roundType: string | null
    region: string
    pitchDeck: DocumentPickerAsset | null
}