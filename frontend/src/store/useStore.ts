import { create } from 'zustand'

export interface ChildStats {
  colors: number
  animals: number
  shapes: number
  numbers: number
  emotions: number
  vehicles: number
  food: number
  alphabet: number
  weather: number
  clothing: number
  sports: number
  body: number
  totalStars: number
  timeLearned: number // in minutes
}

export interface ChildProfile {
  id: string
  name: string
  avatar: string
  stats: ChildStats
}

export type Language = 'en' | 'bn'

interface AppState {
  language: Language
  setLanguage: (lang: Language) => void
  children: ChildProfile[]
  currentUser: ChildProfile | null
  setCurrentUser: (user: ChildProfile | null) => void
  addChild: (child: ChildProfile) => void
  updateChildStats: (id: string, category: string, score: number, stars: number) => void
}

const defaultStats: ChildStats = {
  colors: 0, animals: 0, shapes: 0, numbers: 0,
  emotions: 0, vehicles: 0, food: 0, alphabet: 0,
  weather: 0, clothing: 0, sports: 0, body: 0, 
  totalStars: 0, timeLearned: 0
}

export const useStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  children: [
    {
      id: 'demo-1',
      name: 'Leo',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Leo&backgroundColor=b6e3f4',
      stats: { ...defaultStats, colors: 85, animals: 92, shapes: 60, numbers: 75, weather: 50, clothing: 65, totalStars: 15, timeLearned: 45 }
    }
  ],
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  addChild: (child) => set((state) => ({ children: [...state.children, child] })),
  updateChildStats: (id, category, score, stars) => set((state) => ({
    children: state.children.map(c => {
      if (c.id === id) {
        const catKey = category as keyof ChildStats
        return { 
          ...c, 
          stats: { 
            ...c.stats, 
            [catKey]: Math.min(100, (c.stats[catKey] || 0) + score), 
            totalStars: c.stats.totalStars + stars,
            timeLearned: c.stats.timeLearned + 2
          } 
        }
      }
      return c
    }),
    currentUser: state.currentUser?.id === id 
      ? { 
          ...state.currentUser, 
          stats: { 
            ...state.currentUser.stats, 
            [category as keyof ChildStats]: Math.min(100, (state.currentUser.stats[category as keyof ChildStats] || 0) + score), 
            totalStars: state.currentUser.stats.totalStars + stars,
            timeLearned: state.currentUser.stats.timeLearned + 2
          } 
        }
      : state.currentUser
  }))
}))
