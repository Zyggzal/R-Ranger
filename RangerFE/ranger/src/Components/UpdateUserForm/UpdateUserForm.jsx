import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";

const UpdateUserForm = ({ onSubmit }) => {
    const {register, handleSubmit, formState: {errors}, watch} = useForm();

    const { user, editUser } = useContext(UserContext);
    
    const [formFName, setFormFName] = useState('')
    const [formLName, setFormLName] = useState('')

    const handleUpdateUser = async (values) => {
        await editUser(user.id, formFName, formLName, values.oldpassword, values.password);
        onSubmit();
    }

    useEffect(() => {
        setFormFName(user.firstName);
        setFormLName(user.lastName);
    }, [])

    return (
        <form className="mb-3 form-left update-user-form" onSubmit={handleSubmit(handleUpdateUser)}>
            <h1>Edit Profile</h1>
            <div className="mb-3 input-cont">
                <input
                    type="password"
                    className="enter form-control"
                    id="oldpassword"
                    placeholder="Password"
                    {...register("oldpassword", { required: true })}
                />
                {errors.oldpassword && <div className="enter-error">Enter Your password to confirm the change</div>}
            </div>
            <div className="mb-3 input-cont">
                <input
                    type="text"
                    className="enter form-control"
                    id="fname"
                    placeholder="First Name"
                    value={formFName}
                    onChange={(e) => setFormFName(e.target.value)}
                />
            </div>
            <div className="mb-3 input-cont">
                <input
                    type="text"
                    className="enter form-control"
                    id="lname"
                    placeholder="Last Name"
                    value={formLName}
                    onChange={(e) => setFormLName(e.target.value)}
                />
            </div>
            <hr/>
            <div className="mb-3 input-cont">
                <input
                    type="password"
                    className="enter form-control"
                    id="password"
                    placeholder="New Password"
                    {...register("password")}
                />
            </div>
            <div className="mb-3 input-cont">
                <input
                    type="password"
                    className="enter form-control"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    {...register("confirm_password", {
                        validate: (val) => {
                          if (watch('password') && watch('password') !== val) {
                            return "Passwords do not match";
                          }
                        },
                       })}
                    />
                    {errors.confirm_password && <div className="enter-error">{errors.confirm_password.message}</div>}
            </div>
            <div>
                <button type="submit" className="btn enter">Update</button>
                <p className="btn cancel" onClick={()=>onSubmit(null)}>Cancel</p>
            </div>
        </form>
    )
}

export default UpdateUserForm;