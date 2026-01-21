import { useRef } from 'react'
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso'
import { useChatStore } from '@/store/chatStore'
import { MessageItem } from '@/components/MessageItem'

export const ChatList = () => {
    const { messages, autoScroll, setAutoScroll } = useChatStore()
    const virtuosoRef = useRef<VirtuosoHandle>(null)

    const scrollToBottom = () => {
        setAutoScroll(true)

        virtuosoRef.current?.scrollToIndex({
            index: messages.length - 1,
            align: 'end',
            behavior: 'smooth',
        })
    }

    return (
        <div className='relative h-full flex-1'>
            <Virtuoso
                ref={virtuosoRef}
                style={{ height: '100%' }}
                data={messages}
                initialTopMostItemIndex={messages.length - 1}
                followOutput={autoScroll ? 'auto' : false}
                itemContent={(_, message) => <MessageItem message={message} />}
                atBottomStateChange={atBottom => {
                    setAutoScroll(atBottom)
                }}
            />

            {!autoScroll && messages.length > 0 && (
                <button
                    onClick={scrollToBottom}
                    className='animate-in fade-in zoom-in absolute right-6 bottom-4 z-10 cursor-pointer rounded-full border border-neutral-600 bg-neutral-700 p-3 text-white shadow-lg transition-all duration-200 hover:bg-neutral-600'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <path d='M12 5v14M19 12l-7 7-7-7' />
                    </svg>
                </button>
            )}
        </div>
    )
}
