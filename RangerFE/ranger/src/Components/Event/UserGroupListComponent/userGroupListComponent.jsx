import LockIcon from "../../Icons/LockIcon/LockIcon";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon/ThreeDotsIcon";
import ClockIcon from "../../Icons/ClockIcon/ClockIcon";
import {DateToAgo} from "../../../Utils/DateTransformer";
import {NavLink} from "react-router-dom";

const UserGroupListComponent = ({group}) => {

    return (
        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <h2>{group.name}</h2>
                <p className="text-secondary"><ClockIcon/>Created {DateToAgo(group.createdAt)}</p>
            </div>
            <div className="d-flex flex-column align-items-end">

            <NavLink className='btn p-1 btn-outline-danger mb-2'
                         to={`/groups/${group.id}`}><ThreeDotsIcon/></NavLink>
            </div>
        </div>
    )
}

export {UserGroupListComponent};