import { createContext, Dispatch, SetStateAction } from 'react'

interface IWindowContext {
    modalOpened: boolean
    setModalOpened: Dispatch<SetStateAction<boolean>> | null
    offsetX:number
    setOffsetX: Dispatch<SetStateAction<number>> | null
    offsetY: number
    setOffsetY: Dispatch<SetStateAction<number>> | null
    musicId: number
    setMusicId: Dispatch<SetStateAction<number>> | null
    musicUrl: string
    setMusicUrl: Dispatch<SetStateAction<string>> | null
    musicName: string
    setMusicName: Dispatch<SetStateAction<string>> | null
}

const WindowContext = createContext<IWindowContext>({
    modalOpened: false,
    setModalOpened: null,
    offsetX: 0,
    setOffsetX: null,
    offsetY: 0,
    setOffsetY: null,
    musicId: 0,
    setMusicId : null,
    musicUrl: '',
    setMusicName: null,
    musicName: '',
    setMusicUrl: null
})

export default WindowContext