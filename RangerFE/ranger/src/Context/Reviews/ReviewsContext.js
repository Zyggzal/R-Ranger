import {createContext, useContext, useState} from "react";
import DismissableAlert from "../../Components/DismissableAlert/DismissableAlert";
import useAPI from "../../Hooks/useAPI";
import {UserContext} from "../UserContext";

export const ReviewsContext = createContext();

export const ReviewsProvider = ({children}) => {

    const api = useAPI();
    const {user} = useContext(UserContext);

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const getReviewsByEvent = async (id) =>{
        if(!user) return;
        try{
            const response = await api.Get(`reviews/event/${id}`);
            if(response.status !== 200){
                throw response.message
            }
            return response.data;
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    return(
        <ReviewsContext.Provider value={{getReviewsByEvent}}>
            <div style={{position: 'relative'}}>
                {children}
                {showAlert && <DismissableAlert text={alertText} onClosed={() => setShowAlert(false)}/>}
            </div>
        </ReviewsContext.Provider>
    )
}