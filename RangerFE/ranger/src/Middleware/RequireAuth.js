import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

const RequireAuth = ( {children} ) => {
    const { isValid } = useContext(UserContext);
    const location = useLocation();

    if (!isValid()) {
        return <Navigate to='/login' state={{ from: location.pathname }}/>
    }

    return children;
}

export {RequireAuth};