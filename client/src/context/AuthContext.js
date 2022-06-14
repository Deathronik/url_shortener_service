import {createContext} from "react";

const noop = () => {}

export const AuthContext = createContext({
    userId: null,
    jwt: null,
    login: noop,
    logout: noop,
    isAuth: false
})