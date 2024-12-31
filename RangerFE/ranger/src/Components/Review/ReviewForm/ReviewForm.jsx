import { useForm } from "react-hook-form";
import { ReviewsContext } from "../../../Context/Reviews/ReviewsContext";
import { useContext, useState } from "react";
import './ReviewForm.css'
import RatingComponent from "../RatingComponent/RatingComponent";

// rating, comment, EventId, UserId
const ReviewForm = ({ id, onConfirm, review }) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();

    const { addReview, editReview } = useContext(ReviewsContext);
    const [rating, setRating] = useState(0);

    const handleAddReview = async (value) => {
        if(review) {
            await editReview(review.id, value.content, rating);
        }
        else {
            await addReview(id, value.content, rating === 0 ? rating + 1 : rating);
        }
        onConfirm();
    }

    useState(() => {
        if(review) {
            setRating(review.rating)
            setValue('content', review.comment)
        }
    }, [review])

    return (
        <form className="mb-3 review-form" onSubmit={handleSubmit(handleAddReview)}>
            <div className="d-flex align-items-center review-form-rating-line">
                <h4 className="me-3">Rating: </h4>
                <RatingComponent rating={rating} setRating={setRating}/>
            </div>
            <div className="mb-3 input-cont">
                <textarea
                    className="form-control"
                    id="reviewcontent"
                    placeholder="Review text..."
                    {...register("content", { required: true })}
                />
                {errors.content && <div className="enter-error">Your review must have content</div>}
            </div>
            <div>
                <button type="submit" className="btn btn-crimson">Confirm</button>
            </div>
        </form>
    )
}

export default ReviewForm;