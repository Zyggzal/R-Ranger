import LockIcon from "../Icons/LockIcon/LockIcon";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import {NavLink} from "react-router-dom";
import ThreeDotsIcon from "../Icons/ThreeDotsIcon/ThreeDotsIcon";
import InfoIcon from "../Icons/InfoIcon/InfoIcon";

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
                            <InfoIcon content={
                                <p>
                                    {
                                        user.UsersGroups.role === 'member' &&
                                        <><strong>Members</strong> can view this group and its' events without changing them</>
                                    }
                                    {
                                        user.UsersGroups.role === 'admin' &&
                                        <><strong>Admins</strong> can manage this group's members (<strong>invite, remove, promote, demote</strong>)</>
                                    }
                                    {
                                        user.UsersGroups.role === 'creator' &&
                                        <><strong>Creator</strong> can edit this group's information as well as manage its' members</>
                                    }
                                </p>
                            }/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}