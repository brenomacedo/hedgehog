import { createContext, Dispatch, SetStateAction } from 'react'

interface IPlaylist {
    id: number
    name: string
    userId: number
}

interface IMusic {
    id: number
    name: string
    author: string
    avatar: string
    url: string
}

interface IUserInfoContext {
    musics: IMusic[]
    setMusics: Dispatch<SetStateAction<IMusic[]>> | null
    playlists: IPlaylist[]
    setPlaylists: Dispatch<SetStateAction<IPlaylist[]>> | null
    selectedPlaylistMusics: IMusic[]
    setSelectedPlaylistMusics: Dispatch<SetStateAction<IMusic[]>> | null
    playingNow: string
    setPlayingNow: Dispatch<SetStateAction<string>> | null
    playingNowName: string
    setPlayingNowName: Dispatch<SetStateAction<string>> | null
    playingNowId: number
    setPlayingNowId: Dispatch<SetStateAction<number>> | null
}

const UserInfoContext = createContext<IUserInfoContext>({
    musics: [],
    setMusics: null,
    playlists: [],
    setPlaylists: null,
    selectedPlaylistMusics: [],
    setSelectedPlaylistMusics: null,
    playingNow: '',
    setPlayingNow: null,
    playingNowName: '',
    setPlayingNowName: null,
    playingNowId: 0,
    setPlayingNowId: null
})

export default UserInfoContext