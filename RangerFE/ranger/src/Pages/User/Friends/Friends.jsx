import {FriendProvider} from "../../../Context/Friend/FriendContext";
import {useState} from "react";
import {ListUserFriends} from "../../../Components/Friend/listUserFriends";
import {AddFriend} from "../../../Components/Friend/addFriend";

const Friends = () => {

    const [showFriendModal, setShowFriendModal] = useState(false);

    return (
        <div>
            <div>
                <FriendProvider>
                    <div>
                        <ListUserFriends/>
                    </div>
                    <button onClick={() => setShowFriendModal(true)}>
                        Add friend
                    </button>
                    <AddFriend showModal={showFriendModal} onClose={() => setShowFriendModal(false)} />
                </FriendProvider>
            </div>
        </div>
    )
}

export default Friends;