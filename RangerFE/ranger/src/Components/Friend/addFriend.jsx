import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {UserContext} from "../../Context/UserContext";
import {FriendContext} from "../../Context/Friend/FriendContext";
import {Modal} from "react-bootstrap";

export const AddFriend = ({showModal, onClose}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const {user, idByLogin} = useContext(UserContext);
    const {addFriend} = useContext(FriendContext);
    const [userNotFoundError, setUserNotFoundError] = useState(false);

    const onSubmit = async (values) => {
        const userId = await idByLogin(values.login);
        console.log(userId);
        if(userId === -1){
            setUserNotFoundError(true);
        }
        else{
            setUserNotFoundError(false);
            addFriend(userId);
            onClose();
        }
    };

    if(!user) return <div>Loading...</div>
    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Friends</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">
                            User Login
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            placeholder="User Login"
                            {...register("login", { required: true })}
                            onChange={e => setUserNotFoundError(false)}
                        />
                        {errors.login && <div className="text-danger">Login is required</div>}
                        {userNotFoundError ? <div className="text-danger">The Login is doesn't exist</div>: null}
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-success">
                            Send Friend Invite
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}