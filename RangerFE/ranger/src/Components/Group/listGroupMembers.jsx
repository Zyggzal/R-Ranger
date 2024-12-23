import LockIcon from "../Icons/LockIcon/LockIcon";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import {NavLink} from "react-router-dom";
import ThreeDotsIcon from "../Icons/ThreeDotsIcon/ThreeDotsIcon";

export const ListGroupMembers = ({members}) =>{

    return (
        <div className="user-list-container list-group w-75">
            {
                members.map((user) => (
                    <div key={user.id}
                         className="list-group-item list-group-item-action d-flex justify-content-between">
                        <div>
                            @{user.login}
                        </div>
                        <div>
                            {user.UsersGroups.role}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}