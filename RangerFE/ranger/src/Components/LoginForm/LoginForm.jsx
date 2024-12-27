import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAPI from "../../Hooks/useAPI";
import Loader from "../Loader/Loader";

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const { Login, isLoading } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (values) => {
        await Login(values.email, values.password);
        navigate('/profile/events');
    }
    return (
        isLoading ? <Loader/> :
        <form className="mb-3 form-left" onSubmit={handleSubmit(handleLogin)}>
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
                    type="password"
                    className="enter form-control"
                    id="password"
                    placeholder="User Password"
                    {...register("password", { required: true })}
                />
                {errors.password && <div className="enter-error">Password is required</div>}
            </div>
            <button type="submit" className="btn enter">Enter</button>
        </form>
    )
}

export default LoginForm;
