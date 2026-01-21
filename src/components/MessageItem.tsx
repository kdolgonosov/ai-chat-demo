import { memo } from 'react'
import { type Message } from '@/store/chatStore'
import { renderMarkdown } from '@/utils'

export const MessageItem = memo(({ message }: { message: Message }) => {
    return (
        <div className='px-4 py-2'>
            <div className={message.role === 'assistant' ? 'text-blue-300' : 'text-green-300'} dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }} />
        </div>
    )
})
