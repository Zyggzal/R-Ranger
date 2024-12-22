import {useCallback, useContext, useEffect, useState} from "react";
import {ReviewsContext, ReviewsProvider} from "../../../Context/Reviews/ReviewsContext";
import Loader from "../../Loader/Loader";
import NoContent from "../../NoContent/NoContent";
import styles from "./EventReview.css";
import LockIcon from "../../Icons/LockIcon/LockIcon";
import ClockIcon from "../../Icons/ClockIcon/ClockIcon";
import {NavLink} from "react-router-dom";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon/ThreeDotsIcon";
import ReviewForm from "../../Review/ReviewForm/ReviewForm";
import { EventReviewsListItem } from "./EventReviewListItem";
import EditIcon from "../../Icons/EditIcon/EditIcon";

export const EventReviewsList = ({id}) =>{

    const {getReviewsByEvent} = useContext(ReviewsContext);
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState(null);
    const [editReview, setEditReview] = useState(false);
    
    const fetchReviews = useCallback(async () => {
        if(!id) return;

        const newReviews = await getReviewsByEvent(id);
        setUserReview(newReviews[0])
        setReviews(newReviews[1]);
    }, [id]);

    useEffect(()=>{
       fetchReviews();
    }, [fetchReviews])

    if(!reviews) return <Loader/>
    return(
            <div className="user-list-container list-group">
                <h3>Your review: 
                    { userReview && (editReview ?
                    <button className="btn edit-btn" onClick={() => setEditReview(false)}><strong>X</strong></button>
                    :
                    <button className="btn edit-btn" onClick={() => setEditReview(true)}><EditIcon/></button>
                    )}
                </h3>
                {
                    editReview || !userReview ?
                    <ReviewForm id={id} onConfirm={() => {
                        fetchReviews();
                        setEditReview(false);
                    }} review={userReview}/>
                    :
                    <EventReviewsListItem review={userReview}/>
                }
                <hr/>
                <div>{reviews.length} review{reviews.length !== 1 && 's'}</div>
                <div>
                    {
                        reviews.length === 0 ? <NoContent/>
                        :
                        reviews.map((review) => (
                            <EventReviewsListItem  key={review.id} review={review}/>
                        ))
                    }
                </div>
            </div>
    )
}