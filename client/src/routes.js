import {Route, Navigate, Routes} from "react-router-dom"
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Routes>
                <Route path="/profile" element={<ProfilePage/>} exact/>
                <Route path="/create-link" element={<CreatePage/>} exact/>
                <Route path="*" element={<Navigate to="/profile" replace />}/>
            </Routes>
    )
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>} exact/>
            <Route path="/register" element={<RegisterPage/>} exact/>
            <Route path="*" element={<Navigate to="/login" replace />}/>
        </Routes>
    )
}