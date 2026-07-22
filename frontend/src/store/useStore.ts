import { create } from 'zustand'
import { usersAPI } from '../services/api'

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
  id: string | number
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
  addChild: (child: ChildProfile) => Promise<void>
  updateChildStats: (id: string | number, category: string, score: number, stars: number) => Promise<void>
  fetchInitialData: () => Promise<void>
}

export const defaultStats: ChildStats = {
  colors: 0, animals: 0, shapes: 0, numbers: 0,
  emotions: 0, vehicles: 0, food: 0, alphabet: 0,
  weather: 0, clothing: 0, sports: 0, body: 0,
  totalStars: 0, timeLearned: 0
}

export const useStore = create<AppState>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  children: [],
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  
  fetchInitialData: async () => {
    try {
      const response = await usersAPI.getAllUsers()
      // Ensure backend data maps properly to frontend models (e.g. missing stats default)
      const mappedChildren = response.data.map((user: any) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        stats: { ...defaultStats, ...(user.stats || {}) }
      }))
      set({ children: mappedChildren })
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  },

  addChild: async (child) => {
    try {
      // Optimistic update
      set((state) => ({ children: [...state.children, child] }))
      
      const response = await usersAPI.createUser({
        name: child.name,
        avatar: child.avatar,
        stats: child.stats
      })
      
      // Update ID with the one from the database
      set((state) => ({
        children: state.children.map(c => c.id === child.id ? { ...c, id: response.data.id } : c),
        currentUser: state.currentUser?.id === child.id ? { ...state.currentUser, id: response.data.id } : state.currentUser
      }))
    } catch (error) {
      console.error("Failed to create user:", error)
    }
  },

  updateChildStats: async (id, category, score, stars) => {
    // 1. Calculate new stats synchronously so UI feels instant
    const state = get()
    const targetChild = state.children.find(c => c.id === id)
    if (!targetChild) return

    const catKey = category as keyof ChildStats
    const newStats = {
      ...targetChild.stats,
      [catKey]: Math.min(100, ((targetChild.stats[catKey] as number) || 0) + score),
      totalStars: targetChild.stats.totalStars + stars,
      timeLearned: targetChild.stats.timeLearned + 2
    }

    // 2. Optimistic UI update
    set((state) => ({
      children: state.children.map(c => c.id === id ? { ...c, stats: newStats } : c),
      currentUser: state.currentUser?.id === id ? { ...state.currentUser, stats: newStats } : state.currentUser
    }))

    // 3. Background sync to database
    try {
      // Only sync if it's a real database ID (number), not a temporary frontend ID (string)
      if (typeof id === 'number') {
        await usersAPI.updateStats(id.toString(), newStats)
      }
    } catch (error) {
      console.error("Failed to sync stats to database:", error)
      // Note: we could rollback the optimistic update here if desired
    }
  }
}))
