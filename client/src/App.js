import './App.scss';
import {useRoutes} from "./routes";
import Navbar from "./components/Navbar/Navbar";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";


function App() {
    const {jwt, login, logout, isAuth, userId} = useAuth()
    const routes = useRoutes(isAuth)

    return (
        <AuthContext.Provider value={{
            userId: userId,
            jwt: jwt,
            login: login,
            logout: logout,
            isAuth: isAuth
        }}>
            <div className="App">
                {isAuth && <Navbar/>}
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
