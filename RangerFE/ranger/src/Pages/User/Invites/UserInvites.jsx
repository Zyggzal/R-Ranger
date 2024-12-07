import ListUserAllInvites from "../../../Components/Invite/listUserAllInvites";
import {InviteProvider} from "../../../Context/Invite/InviteContext";
import {ListUserSortedInvites} from "../../../Components/Invite/listUserSortedInvites";

const UserInvites = () => {
    return (
        <div>
            <InviteProvider>
                <h1>Your invites</h1>
                <ListUserAllInvites/>
                <hr/>
                <ListUserSortedInvites/>
            </InviteProvider>

        </div>
    )
}

export default UserInvites;