import {useCallback, useEffect, useState} from "react";

export const useAuth = () => {
    const [jwt, setJwt] = useState('')
    const [userId, setUserId] = useState('')
    const [isAuth, setIsAuth] = useState(false)

    const login = useCallback((jwt, userId) => {
        setJwt(jwt)
        setUserId(userId)

        localStorage.setItem('User', JSON.stringify({jwt: jwt, userId: userId}))
        setIsAuth(true)
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem('User')

        setJwt(null)
        setUserId(null)
        setIsAuth(false)
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'))

        if (user && user.jwt) {
            login(user.jwt, user.userId)
        }
    }, [login])

    return {jwt, userId, login, logout, isAuth}
}