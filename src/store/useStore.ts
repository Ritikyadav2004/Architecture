import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface College {
  id: string;
  name: string;
  type: 'Government' | 'Private';
  fees: string;
  location: string;
  ranking: number;
}

interface UserState {
  completedSteps: string[];
  savedColleges: College[];
  mindsetScore: number | null;
  toggleStep: (stepId: string) => void;
  saveCollege: (college: College) => void;
  removeCollege: (collegeId: string) => void;
  setMindsetScore: (score: number) => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      completedSteps: [],
      savedColleges: [],
      mindsetScore: null,
      toggleStep: (stepId) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(stepId)
            ? state.completedSteps.filter((id) => id !== stepId)
            : [...state.completedSteps, stepId],
        })),
      saveCollege: (college) =>
        set((state) => ({
          savedColleges: state.savedColleges.find((c) => c.id === college.id)
            ? state.savedColleges
            : [...state.savedColleges, college],
        })),
      removeCollege: (collegeId) =>
        set((state) => ({
          savedColleges: state.savedColleges.filter((c) => c.id !== collegeId),
        })),
      setMindsetScore: (score) => set({ mindsetScore: score }),
    }),
    {
      name: 'archpath-storage',
    }
  )
);
