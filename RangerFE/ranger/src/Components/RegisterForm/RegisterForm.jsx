import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}, watch} = useForm();

    const { Register, isLoading } = useContext(UserContext);

    const navigate = useNavigate()

    const handleRegister = async (value) => {
        await Register(value.login, value.fname, value.lname, value.email, value.password);
        navigate('/profile/events');
    }
    return (
        isLoading ? <Loader /> :
        <form className="mb-3 form-right" onSubmit={handleSubmit(handleRegister)}>
            <div className="mb-3 input-cont">
                <input
                    type="text"
                    className="enter form-control"
                    id="fname"
                    placeholder="First Name"
                    {...register("fname", { required: true })}
                />
                {errors.fname && <div className="enter-error">First name is required</div>}
            </div>
            <div className="mb-3 input-cont">
                <input
                    type="text"
                    className="enter form-control"
                    id="lname"
                    placeholder="Last Name"
                    {...register("lname", { required: true })}
                />
                {errors.lname && <div className="enter-error">Last name is required</div>}
            </div>
            <div className="mb-3 input-cont">
                <input
                    type="email"
                    className="enter form-control"
                    id="email"
                    placeholder="User Email"
                    {...register("email", { required: true })}
                />
                {errors.email && <div className="enter-error">Email is required</div>}
            </div>
            <div className="mb-3 input-cont">
                <input
                    type="text"
                    className="enter form-control"
                    id="login"
                    placeholder="User Login"
                    {...register("login", { required: true })}
                />
                {errors.login && <div className="enter-error">Login is required</div>}
            </div>
            <div className="mb-3 input-cont">
                <input
                    type="password"
                    className="enter form-control"
                    id="password"
                    placeholder="User Password"
                    {...register("password", { required: true })}
                />
                {errors.password && <div className="enter-error">Password is required</div>}
            </div>
            <div className="mb-3 input-cont">
                <input
                    type="password"
                    className="enter form-control"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    {...register("confirm_password", {
                        validate: (val) => {
                          if (watch('password') !== val) {
                            return "Passwords do not match";
                          }
                        },
                       })}
                    />
                    {errors.confirm_password && <div className="enter-error">{errors.confirm_password.message}</div>}
            </div>
            <button type="submit" className="btn enter">Enter</button>
        </form>
    )
}

export default RegisterForm;