import { Outlet, Navigate } from 'react-router-dom'
import AuthService from "../services/auth.service";
const PrivateRouteLogin = () => {

    const currentUser = AuthService.getCurrentUser();
    return(
        currentUser ? <Navigate to="/profile"/> : <Outlet/>
    )
}

export default PrivateRouteLogin;