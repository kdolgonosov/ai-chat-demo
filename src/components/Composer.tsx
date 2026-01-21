import { useState } from 'react'
import { useChatStore } from '@/store/chatStore'
import { cn, generateStream } from '@/utils'

export const Composer = () => {
    const { addMessage, appendChunk, start, stop, isGenerating } = useChatStore()
    const [value, setValue] = useState('')

    const onGenerate = () => {
        const id = crypto.randomUUID()
        addMessage({ id, role: 'assistant', content: '' })
        start()

        generateStream(
            chunk => appendChunk(id, chunk),
            () => !useChatStore.getState().isGenerating,
            10_000
        )
    }

    return (
        <div className='flex gap-2 border-t border-neutral-700 p-3'>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder='Введите сообщение...'
                className='flex-1 rounded bg-neutral-800 px-3 py-2 text-sm'
            />

            <button
                onClick={onGenerate}
                disabled={isGenerating}
                className={cn('rounded bg-blue-600 px-4 py-2 transition-all hover:cursor-pointer hover:opacity-50', isGenerating && 'opacity-50 hover:cursor-default')}
            >
                Generate
            </button>

            <button
                onClick={stop}
                className={cn('rounded bg-red-600 px-4 py-2 transition-all hover:cursor-pointer hover:opacity-50', !isGenerating && 'opacity-50 hover:cursor-default')}
            >
                Stop Generating
            </button>
        </div>
    )
}
