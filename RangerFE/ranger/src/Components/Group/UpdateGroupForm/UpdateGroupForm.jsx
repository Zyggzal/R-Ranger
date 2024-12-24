import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../../../Context/Group/GroupContext";
import LockIcon from "../../Icons/LockIcon/LockIcon";
import { useForm } from "react-hook-form";

const UpdateGroupForm = ({ onSubmit, group }) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const { updateGroup } = useContext(GroupContext);
    
    const [formIsPublic, setFormIsPublic] = useState(false)

    const handleUpdateGroup = async (values) => {
        await updateGroup(group.id, values.name, formIsPublic);
        onSubmit();
    }

    useEffect(() => {
        if(group) {
            setValue('name', group.name);
            setFormIsPublic(group.isPublic);
        }
    }, [group])

    return (
        <form className="mb-3 form-left update-user-form d-flex justify-content-between" onSubmit={handleSubmit(handleUpdateGroup)}>
            <div style={{ rowGap: '5px' }} className="mb-3 input-cont d-flex flex-wrap">
                <div>
                    <input
                        type="text"
                        className="add-page-input form-control"
                        id="name"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <div className="enter-error" style={{ fontSize: '15px' }}>Name must not be empty</div>}
                </div>
                <div className="ms-3">
                    <input 
                        type="checkbox" 
                        className="btn-check" 
                        id="btncheck1" 
                        checked={formIsPublic}
                        onChange={(e) => setFormIsPublic(e.target.checked)}
                    />
                    <label className="btn btn-outline-danger" htmlFor="btncheck1"><LockIcon unlocked={formIsPublic} /></label>
                </div>
            </div>
            <div>
                <button type="submit" className="btn btn-danger">Confirm</button>
            </div>
        </form>
    )
}

export default UpdateGroupForm;