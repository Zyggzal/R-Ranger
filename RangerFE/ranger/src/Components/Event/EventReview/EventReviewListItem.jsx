import StarIcon from "../../Icons/StarIcon/StarIcon"

export const EventReviewsListItem = ({review}) => {
    return (
        <div key={review.id} className="list-group-item list-group-item-action justify-content-between">
            <div className="review-author">
                <img className="review-pfp" src="/Resources/Images/RangerPFP2.png" alt="profile"/>
                <div className="mt-3">
                    <h5>{review.user.lastName} {review.user.firstName}</h5>
                    <p className="text-secondary">@{review.user.login}</p>
                </div>
            </div>
            <div className="review-text">
                {review.comment}
            </div>
            <div className="review-rating pt-3">
                <div className="d-flex align-items-center">
                    <StarIcon fill={ review.rating === 5 ? 'full' : review.rating >= 2 ? 'half' : '' }/>
                    <div>{review.rating} / 5</div>
                </div>
                <div>{new Date(review.createdAt).toLocaleString()}</div>
            </div>
        </div>
    )
}