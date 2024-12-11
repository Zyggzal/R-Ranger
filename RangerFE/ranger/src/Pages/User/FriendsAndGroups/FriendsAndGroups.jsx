import {GroupProvider} from "../../../Context/Group/GroupContext";
import {FriendProvider} from "../../../Context/Friend/FriendContext";
import {useState} from "react";
import {ListUserGroups} from "../../../Components/Group/listUserGroups";
import {ListUserFriends} from "../../../Components/Friend/listUserFriends";
import {AddGroup} from "../../../Components/Group/addGroup";
import {AddFriend} from "../../../Components/Friend/addFriend";

const FriendsAndGroups = () => {

    const [active, setActive] = useState('groups');
    const [showFriendModal, setShowFriendModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);

    function actionHandler(type) {
        setActive(type);
    }

    return (
        <div>
            <div>
                <button className={`btn ${active === 'groups' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => actionHandler('groups')}>Groups</button>
                <button className={`btn ${active === 'friends' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => actionHandler('friends')} >Friends</button>
            </div>
            <div>
                {active === 'groups' &&
                    <GroupProvider>
                        <div>
                            <ListUserGroups/>
                        </div>
                        <button onClick={() => setShowGroupModal(true)}>
                            Create Group
                        </button>
                        <AddGroup showModal={showGroupModal} onClose={() => setShowGroupModal(false)} />
                    </GroupProvider>
                }
                {active === 'friends' &&
                    <FriendProvider>
                        <div>
                            <ListUserFriends/>
                        </div>
                        <button onClick={() => setShowFriendModal(true)}>
                            Add friend
                        </button>
                        <AddFriend showModal={showFriendModal} onClose={() => setShowFriendModal(false)} />
                    </FriendProvider>
                }
            </div>
        </div>
    )
}

export default FriendsAndGroups;