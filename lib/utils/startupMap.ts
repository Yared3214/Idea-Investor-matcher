export const startupMap: Record<string, {
  category: string;
  color: [string, string, ...string[]];
  categoryColor: string;
  categoryBackcolor: string;
  icon: string;
}> = {
  "TECHNOLOGY": {
    category: "Technology",
    color: ["#1E40AF", "#1D4ED8"],
    categoryColor: "#1E3A8A",
    categoryBackcolor: "#E0E7FF",
    icon: "cpu",
  },
  "HEALTHCARE": {
    category: "HealthTech",
    color: ["#3B82F6", "#06B6D4"],
    categoryColor: "#2563eb",
    categoryBackcolor: "#dbeafe",
    icon: "briefcase",
  },
  "FINTECH": {
    category: "FinTech",
    color: ["#22C55E", "#10B981"],
    categoryColor: "#16a34a",
    categoryBackcolor: "#dcfce7",
    icon: "dollar-sign",
  },
  "ENERGY": {
    category: "Renewable Energy",
    color: ["#FACC15", "#EAB308"],
    categoryColor: "#CA8A04",
    categoryBackcolor: "#FEF9C3",
    icon: "sun",
  },
  "AI": {
    category: "AI/SaaS",
    color: ["#f97316", "#f59e0b"],
    categoryColor: "#ea580c",
    categoryBackcolor: "#ffedd5",
    icon: "cloud",
  },
  "ECOMMERCE": {
    category: "ECommerce",
    color: ["#14b8a6", "#06b6d4"],
    categoryColor: "#0d9488",
    categoryBackcolor: "#ccfbf1",
    icon: "shopping-cart",
  },
  "EDTECH": {
    category: "EdTech",
    color: ["#A855F7", "#EC4899"],
    categoryColor: "#9333ea",
    categoryBackcolor: "#f3e8ff",
    icon: "book-open",
  },
  "AGRITECH": {
    category: "AgriTech",
    color: ["#65A30D", "#4D7C0F"],
    categoryColor: "#3F6212",
    categoryBackcolor: "#ECFDF5",
    icon: "feather",
  },
}

export const stageMap: Record<string, {
  stage: string;
  icon: string;
}> = {
  "IDEA_STAGE": {
    stage: "Idea Phase",
    icon: "lightbulb",
  },
  "PROTOTYPE": {
    stage: "Prototype",
    icon: "flask",
  },
  "MVP": {
    stage: "MVP",
    icon: "cube",
  },
  "EARLY_REVENUE": {
    stage: "Early Revenue",
    icon: "chart-line",
  },
  "SCALING": {
    stage: "Scaling",
    icon: "rocket",
  },
  "SERIES_A": {
    stage: "Series A",
    icon: "rocket",
  },
} 

export const mapStage: Record<string, string> = {
  "Idea Phase": "IDEA_STAGE",
  "Prototype": "PROTOTYPE",
  "MVP": "MVP",
  "Early Revenue": "EARLY_REVENUE",
  "Scaling": "SCALING",
  "Series A": "SERIES_A",
};

export const mapIndustry: Record<string, string> = {
  "Technology": "TECHNOLOGY",
  "HealthTech": "HEALTHCARE",
  "FinTech": "FINTECH",
  "Renewable Energy": "ENERGY",
  "AI/SaaS": "AI",
  "ECommerce": "ECOMMERCE",
  "EdTech": "EDTECH",
  "AgriTech": "AGRITECH",
  "Food & Beverage": "FOOD_AND_BEVERAGE",
}