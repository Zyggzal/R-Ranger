import {NavLink} from "react-router-dom";
import ClockIcon from "../../Icons/ClockIcon/ClockIcon";
import {DateToAgo} from "../../../Utils/DateTransformer";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon/ThreeDotsIcon";

export const PublicGroupSearchComponent = ({group}) => {

    return (
        <div key={`grouplistitem${group.id}`}
             className="list-group-item list-group-item-action d-flex justify-content-between">
            <div>
                <h5>{group.name}</h5>
                <p className="text-secondary">Created by
                    <NavLink to={`/users/${group.creator.login}`} className="m-1 event-group-link">
                        @{group.creator ? group.creator.login : group.login}
                    </NavLink>
                </p>
            </div>
            <div className="d-flex flex-column align-items-end">
                <p className="text-secondary"><ClockIcon/>Created {DateToAgo(group.createdAt)}</p>
                <NavLink className='btn p-1 btn-outline-secondary mb-2'
                         to={`/groups/${group.id}`}><ThreeDotsIcon/></NavLink>
            </div>
        </div>
    )
}