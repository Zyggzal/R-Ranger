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
            const ret = []
            ret[0] = response.data.find((r) => r.UserId === user.id)
            ret[1] = response.data.filter((r) => r.UserId !== user.id)
            return ret;
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    const addReview = async (EventId, comment, rating) => {
        if(!user) return;
        try{
            const response = await api.Post(`reviews/`, { EventId, UserId: user.id, comment, rating });
            if(response.status !== 200){
                throw response.message
            }
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    const editReview = async (ReviewId, comment, rating) => {
        if(!user) return;
        try{
            const response = await api.Patch(`reviews/${ReviewId}`, { comment, rating });
            if(response.status !== 200){
                throw response.message
            }
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    return(
        <ReviewsContext.Provider value={{getReviewsByEvent, addReview, editReview}}>
            <div style={{position: 'relative'}}>
                {children}
                {showAlert && <DismissableAlert text={alertText} onClosed={() => setShowAlert(false)}/>}
            </div>
        </ReviewsContext.Provider>
    )
}