import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader/Loader";
import useAPI from "../../Hooks/useAPI";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const { Register } = useContext(UserContext);
    
    const api = useAPI();

    const navigate = useNavigate()

    const handleRegister = async (value) => {
        await Register(value.login, value.fname, value.lname, value.email, value.password);
        navigate('/profile');
    }
    return (
        api.isBusy ? <Loader /> :
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="First Name"
                    {...register("fname", { required: true })}
                />
                {errors.email && <div className="text-warning">First name is required</div>}
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="lname"
                    placeholder="Last Name"
                    {...register("lname", { required: true })}
                />
                {errors.email && <div className="text-warning">Last name is required</div>}
            </div>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="User Email"
                    {...register("email", { required: true })}
                />
                {errors.email && <div className="text-warning">Email is required</div>}
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="login"
                    placeholder="User Login"
                    {...register("login", { required: true })}
                />
                {errors.email && <div className="text-warning">Login is required</div>}
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="User Password"
                    {...register("password", { required: true })}
                />
                {errors.password && <div className="text-warning">Password is required</div>}
            </div>
            <button type="submit" className="btn btn-warning">Enter</button>
        </form>
    )
}

export default RegisterForm;