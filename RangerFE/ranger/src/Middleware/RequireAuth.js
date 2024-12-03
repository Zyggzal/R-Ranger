import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

const RequireAuth = ( {children} ) => {
    const { isValid } = useContext(UserContext);
    
    if (!isValid()) {
        return <Navigate to='/login' />
    }

    return children;
}

export {RequireAuth};