import { createContext, Dispatch, SetStateAction } from 'react'

interface IWindowContext {
    modalOpened: boolean
    setModalOpened: Dispatch<SetStateAction<boolean>> | null
    offset: { x: number, y: number }
    setOffset: Dispatch<SetStateAction<{ x: number, y: number }>> | null
    musicId: number
    setMusicId: Dispatch<SetStateAction<number>> | null
}

const WindowContext = createContext<IWindowContext>({
    modalOpened: false,
    setModalOpened: null,
    offset: { x: 0, y: 0 },
    setOffset: null,
    musicId: 0,
    setMusicId : null
})

export default WindowContext