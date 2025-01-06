import {useForm} from "react-hook-form";
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext";
import {GroupContext} from "../../Context/Group/GroupContext";
import {Modal} from "react-bootstrap";

export const AddGroup = ({showModal, onClose}) => {
    const {register, handleSubmit, /*watch,*/ formState: {errors}} = useForm();

    const {user} = useContext(UserContext);
    const {addGroup} = useContext(GroupContext);

    const onSubmit = (values) => {

        const newGroup = {...values, createdBy: user.id};

        addGroup(newGroup);
        onClose();
    };

    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Groups</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Group Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Group Name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <div className="text-danger">Name is required</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isPublic" className="form-label">
                            Group Type
                        </label>
                        <select
                            className="form-select add-page-input"
                            id="isPublic"
                            {...register("isPublic")}
                        >
                            <option value={1}>Public</option>
                            <option value={0}>Private</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-crimson">
                            Add Group
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>

    )
}