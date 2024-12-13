import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import {Modal} from "react-bootstrap";
import { InviteContext } from "../../../Context/Invite/InviteContext";

export const InviteUserModal = ({showModal, onClose, event, eventInvites}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const {user, idByLogin} = useContext(UserContext);
    const {inviteUserToEvent} = useContext(InviteContext);
    const [userNotFoundError, setUserNotFoundError] = useState(false);

    const onSubmit = async (values) => {
        const userId = await idByLogin(values.login);

        if(userId === -1){
            setUserNotFoundError(true);
        }
        else{
            setUserNotFoundError(false);
            await inviteUserToEvent(userId, event, eventInvites, values.role)
            onClose(true);
        }
    };

    if(!user) return <div>Loading...</div>
    return (
        <Modal show={showModal} onHide={()=>onClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Invite User</Modal.Title>
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
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">
                            User Role
                        </label>
                        <select
                            className="form-select"
                            {...register("role")}
                            defaultValue="member"
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </select>
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