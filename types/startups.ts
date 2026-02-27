export type StartupResponse = {
    id: string
    founderId?: string
    founderName: string 
    startupName: string
    pitchTitle: string
    description?: string
    industry: string
    stage: string
    fundingAmount: number
    roundType?: string
    equityOffered: boolean
    region: string
    pitchDeckUrl: string
    createdAt: string
    updatedAt?: string
    founder?: {
        id: string
        email: string
    }
}