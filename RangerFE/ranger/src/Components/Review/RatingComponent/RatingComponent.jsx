import { useRef } from "react";
import StarIcon from "../../Icons/StarIcon/StarIcon";

const RatingComponent = ({ rating, setRating }) => {
    const container = useRef('')

    const Shine = (count) => {
        for(let i = 0; i < container.current.children.length; i++) {
            container.current.children[i].style.color = i < count ? '#E5383B' : '#B1A7A6';
        }
    }

    const Reset = (count) => {
        for(let i = 0; i < container.current.children.length; i++) {
            container.current.children[i].style.color = i < count ? "#A4161A" : "grey";
        }
    }

    const clickHandler = (count) => {
        setRating(count)
        Reset(count)
    }
    return (
        <div className="rating-container d-flex pt-3 pb-3" ref={container} onMouseLeave={() => Reset(rating)}>
            <div onMouseEnter={() => Shine(1)} onClick={()=>clickHandler(1)}><StarIcon fill={ rating >= 1 && "full" }/></div>
            <div onMouseEnter={() => Shine(2)} onClick={()=>clickHandler(2)}><StarIcon fill={ rating >= 2 && "full" }/></div>
            <div onMouseEnter={() => Shine(3)} onClick={()=>clickHandler(3)}><StarIcon fill={ rating >= 3 && "full" }/></div>
            <div onMouseEnter={() => Shine(4)} onClick={()=>clickHandler(4)}><StarIcon fill={ rating >= 4 && "full" }/></div>
            <div onMouseEnter={() => Shine(5)} onClick={()=>clickHandler(5)}><StarIcon fill={ rating >= 5 && "full" }/></div>
        </div>
    )
}

export default RatingComponent;