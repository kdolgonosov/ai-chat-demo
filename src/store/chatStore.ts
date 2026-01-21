import { create } from 'zustand'
import { generateMockHistory } from '@/utils'

export type Message = {
    id: string
    role: 'user' | 'assistant'
    content: string
}

interface ChatState {
    messages: Message[]
    isGenerating: boolean
    autoScroll: boolean
    addMessage: (m: Message) => void
    appendChunk: (id: string, chunk: string) => void
    stop: () => void
    start: () => void
    setAutoScroll: (v: boolean) => void
}

export const useChatStore = create<ChatState>(set => ({
    messages: generateMockHistory(),
    isGenerating: false,
    autoScroll: true,

    addMessage: m => set(s => ({ messages: [...s.messages, m] })),

    appendChunk: (id, chunk) =>
        set(s => ({
            messages: s.messages.map(m => (m.id === id ? { ...m, content: m.content + chunk } : m)),
        })),

    start: () => set({ isGenerating: true }),
    stop: () => set({ isGenerating: false }),
    setAutoScroll: v => set({ autoScroll: v }),
}))
