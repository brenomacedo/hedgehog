import { createContext, Dispatch, SetStateAction } from 'react'

interface IUserContext {
    id: number
    setId: Dispatch<SetStateAction<number>> | null
    name: string
    setName: Dispatch<SetStateAction<string>> | null
    email: string
    setEmail: Dispatch<SetStateAction<string>> | null
    avatar: string
    setAvatar: Dispatch<SetStateAction<string>> | null
    token: string
    setToken: Dispatch<SetStateAction<string>> | null
    isAuth: boolean
    setIsAuth: Dispatch<SetStateAction<boolean>> | null
}

const UserContext = createContext<IUserContext>({
    id: 0,
    setId: null,
    name: '',
    setName: null,
    email: '',
    setEmail: null,
    avatar: '',
    setAvatar: null,
    token: '',
    setToken: null,
    isAuth: false,
    setIsAuth: null
})

export default UserContext