export type InvestorOnboardingData = {
    preferredStages: string[]
    industries: string[]
    minFunding: number
    maxFunding: number
    investmentThesis: string
}

export type FetchStartupsQuery = {
    industry?: string
    stage?: string
    minFunding?: number
    maxFunding?: number
    region?: string
    page?: number
}