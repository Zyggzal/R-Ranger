import ListUserAllInvites from "../../../Components/Invite/listUserAllInvites";
import {InviteProvider} from "../../../Context/Invite/InviteContext";
import { FriendProvider } from "../../../Context/Friend/FriendContext";
import { useState } from "react";
import { EventProvider } from "../../../Context/Event/EventContext";
import { GroupProvider } from "../../../Context/Group/GroupContext";
import MaGlassIcon from "../../../Components/Icons/MaGlassIcon/MaGlassIcon";

const UserInvites = () => {
    const [type, setType] = useState('all')
    const [sortBy, setSortBy] = useState('1')
    const [searchName, setSearchName] = useState('');

    return (
        <InviteProvider>
            <FriendProvider>
                <EventProvider>
                    <GroupProvider>
                        <div className="d-flex justify-content-between profile-user-events-header">
                            <h1>Your invites</h1>
                            <div className="d-flex align-items-center user-profile-filters-container">
                                <p style={{marginBottom: '0px', width: '100%'}}>Sort By Date:</p>
                                <select className="form-select add-page-input" value={type}
                                        onChange={(e) => setType(e.target.value)}>
                                    <option value={'all'}>All</option>
                                    <option value={'friends'}>Friends</option>
                                    <option value={'events'}>Events</option>
                                    <option value={'groups'}>Groups</option>
                                </select>
                                <select className="form-select add-page-input me-2 ms-2" value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}>
                                    <option value='1'>Asc</option>
                                    <option value='0'>Desc</option>
                                </select>
                            </div>
                        </div>
                        <div className="user-profile-events-search-container">
                            <div className="search-input mt-3 mb-3">
                                <MaGlassIcon/>
                                <input
                                    className={`add-page-input form-control`}
                                    type="text"
                                    placeholder="Search"
                                    value={searchName} 
                                    onChange={(e) => setSearchName(e.target.value)}
                                />
                            </div>
                        </div>
                        <ListUserAllInvites type={type} asc={sortBy} searchName={searchName}/>
                    </GroupProvider>
                </EventProvider>
            </FriendProvider>
        </InviteProvider>
    )
}

export default UserInvites;