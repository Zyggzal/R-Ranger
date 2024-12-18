import {FriendProvider} from "../../../Context/Friend/FriendContext";
import {useState} from "react";
import {ListUserFriends} from "../../../Components/Friend/listUserFriends";
import {AddFriend} from "../../../Components/Friend/addFriend";
import PersonPlusIcon from '../../../Components/Icons/PersonPlusIcon/PersonPlusIcon';

const Friends = () => {

    const [showFriendModal, setShowFriendModal] = useState(false);
    
    return (
        <div>
            <div>
                <FriendProvider>
                    <button className="btn btn-crimson" onClick={() => setShowFriendModal(true)}>
                        <PersonPlusIcon/> Add friend
                    </button>
                    <div>
                        <ListUserFriends/>
                    </div>
                    <AddFriend showModal={showFriendModal} onClose={() => setShowFriendModal(false)} />
                </FriendProvider>
            </div>
        </div>
    )
}

export default Friends;