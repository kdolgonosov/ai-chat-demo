import { ChatList, Composer } from '@/components'
import './globals.css'

export const App = () => {
    return (
        <div className='flex h-screen flex-col bg-neutral-900 text-white'>
            <ChatList />
            <Composer />
        </div>
    )
}
