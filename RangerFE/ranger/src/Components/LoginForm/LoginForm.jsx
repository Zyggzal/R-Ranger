import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAPI from "../../Hooks/useAPI";
import Loader from "../Loader/Loader";

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const { Login } = useContext(UserContext);

    const navigate = useNavigate();

    const api = useAPI()

    const handleLogin = async (values) => {
        await Login(values.email, values.password);
        console.log("A")
        navigate(-2);
        console.log("B")
    }
    return (
        api.isBusy ? <Loader/> :
        <form onSubmit={handleSubmit(handleLogin)}>
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

export default LoginForm;
