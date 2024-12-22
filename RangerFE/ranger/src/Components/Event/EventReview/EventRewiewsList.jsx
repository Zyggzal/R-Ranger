import {useContext, useEffect, useState} from "react";
import {ReviewsContext, ReviewsProvider} from "../../../Context/Reviews/ReviewsContext";
import Loader from "../../Loader/Loader";
import NoContent from "../../NoContent/NoContent";
import styles from "./EventReview.css";
import LockIcon from "../../Icons/LockIcon/LockIcon";
import ClockIcon from "../../Icons/ClockIcon/ClockIcon";
import {NavLink} from "react-router-dom";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon/ThreeDotsIcon";

export const EventReviewsList = ({id}) =>{

    const {getReviewsByEvent} = useContext(ReviewsContext);
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        if(!id) return;
        const fetchReviews = async () => {
            const newReviews = await  getReviewsByEvent(id);
            setReviews(newReviews);
        }
       fetchReviews();
    }, [id])
    console.log(reviews);

    if(!reviews) return <Loader/>
    if(reviews.length === 0) return <NoContent/>
    return(
            <div>
                <div>{reviews.length} reviews</div>
                <div className="user-list-container list-group">
                    {
                        reviews.map((review) => (
                            <div key={review.id}
                                 className="list-group-item list-group-item-action justify-content-between">
                                <div className="review-author">
                                    @{review.user.login}
                                </div>
                                <div className="review-text">
                                    {review.comment}
                                </div>
                                <div className="review-rating">

                                    <div>{review.rating} / 5</div>
                                    <div>{new Date(review.createdAt).toLocaleString()}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
    )
}