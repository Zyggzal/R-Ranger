import ListUserAllInvites from "../../../Components/Invite/listUserAllInvites";
import {InviteProvider} from "../../../Context/Invite/InviteContext";
import { FriendProvider } from "../../../Context/Friend/FriendContext";
import { useState } from "react";
import { EventProvider } from "../../../Context/Event/EventContext";
import { GroupProvider } from "../../../Context/Group/GroupContext";

const UserInvites = () => {
    const [type, setType] = useState('all')
    const [sortBy, setSortBy] = useState('1')

    return (
        <InviteProvider>
            <FriendProvider>
                <EventProvider>
                    <GroupProvider>
                        <div className="d-flex justify-content-between">
                            <h1>Your invites</h1>
                            <div style={{ height: '5%', width: '30%' }} className="d-flex align-items-center">
                                <p style={{ marginBottom: '0px', width: '100%' }}>Sort By Date:</p>
                                <select className="form-select add-page-input me-2 ms-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value='1'>Asc</option>
                                    <option value='0'>Desc</option>
                                </select>
                                <select className="form-select add-page-input" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value={'all'}>All</option>
                                    <option value={'friends'}>Friends</option>
                                    <option value={'events'}>Events</option>
                                    {/* <option value={'groups'}>Groups</option> */}
                                </select>
                            </div>
                        </div>
                        <ListUserAllInvites type={type} asc={sortBy}/>
                    </GroupProvider>
                </EventProvider>
            </FriendProvider>
        </InviteProvider>
    )
}

export default UserInvites;