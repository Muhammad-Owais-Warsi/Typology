import { create } from 'zustand'

export const useStore = create((set) => ({
  timer: 0,
  setTimer: (time) => set(() => ({ timer: time })),
}))


export const useCodeStore = create((set) => ({
  code: '',
  setCode: (code) => set(() => ({code: code}))
}))