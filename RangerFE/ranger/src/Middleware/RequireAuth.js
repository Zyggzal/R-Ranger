import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { toast } from 'react-custom-alert';
const RequireAuth = ( {children} ) => {
    const { isValid } = useContext(UserContext);

    if (!isValid()) {
        toast.warning("You must authorize to perform this action")
        return <Navigate to='/login'/>
    }

    return children;
}

export {RequireAuth};