import { StartupResponse } from "@/types/startups";
import { create } from "zustand";

export type Startup = {
  id: string;
  startupName: string;
  founderName: string;
  industry: string;
  stage: string;
  fundingAmount: number;
  roundType: string;
  region: string;
  equityOffered?: boolean;
  pitchTitle: string;
  description: string;
  pitchDeckUrl?: string;
  createdAt: string;
};

type StartupState = {
  startups: StartupResponse[];
  selectedStartup: StartupResponse | null;

  fetchStartups: (data: StartupResponse[]) => Promise<void>;
  fetchStartupById: (data: StartupResponse) => Promise<void>;
  createStartup: (newStartup: StartupResponse) => Promise<void>;
  updateStartup: (id: string, updated: StartupResponse) => Promise<void>;
  deleteStartup: (id: string) => Promise<void>;

  reset: () => void;
};

export const useStartupStore = create<StartupState>((set, get) => ({
  startups: [],
  selectedStartup: null,

  // 🔄 Fetch All Startups
  fetchStartups: async (data) => {
      set({
        startups: data || [],
      });
  },

  // 🔍 Fetch Single Startup
  fetchStartupById: async (data) => {
      set({
        selectedStartup: data
      });
  },

  // ➕ Create Startup
  createStartup: async (newStartup) => {
      set((state) => ({
        startups: [newStartup, ...state.startups],
        loading: false,
      }));
  },

  // ✏️ Update Startup
  updateStartup: async (id, updated) => {
      set((state) => ({
        startups: state.startups.map((s) =>
          s.id === id ? updated : s
        ),
        selectedStartup: state.selectedStartup?.id === id ? updated : state.selectedStartup,
        loading: false,
      }));
  },

  // ❌ Delete Startup
  deleteStartup: async (id) => {
      set((state) => ({
        startups: state.startups.filter((s) => s.id !== id),
        loading: false,
        selectedStartup: null,
      }));
  },

  reset: () =>
    set({
      startups: [],
      selectedStartup: null,
    }),
}));