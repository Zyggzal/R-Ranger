import {FriendProvider} from "../../../Context/Friend/FriendContext";
import {useState} from "react";
import {ListUserFriends} from "../../../Components/Friend/listUserFriends";
import {AddFriend} from "../../../Components/Friend/addFriend";
import PersonPlusIcon from '../../../Components/Icons/PersonPlusIcon/PersonPlusIcon';

const Friends = () => {

    const [showFriendModal, setShowFriendModal] = useState(false);

    const [asc, setAsc] = useState('1')

    return (
        <FriendProvider>
            <div className="d-flex justify-content-between mb-3 user-profile-event-list-item">
                <button className="btn btn-crimson" onClick={() => setShowFriendModal(true)}>
                    <PersonPlusIcon/> Add friend
                </button>
                <div className="d-flex align-items-center user-profile-filters-container">
                    <p style={{ marginBottom: '0px', width: '100%' }}>Sort By Name:</p>
                    <select style={{ width: '50%' }} className="form-select add-page-input" value={asc} onChange={(e) => setAsc(e.target.value)}>
                        <option value='1'>Asc</option>
                        <option value='0'>Desc</option>
                    </select>
                </div>
            </div>
            <div>
                <ListUserFriends asc={asc} />
            </div>
            <AddFriend showModal={showFriendModal} onClose={() => setShowFriendModal(false)} />
        </FriendProvider>
    )
}

export default Friends;