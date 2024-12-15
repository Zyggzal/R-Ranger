import { useState } from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import ArrowDownIcon from '../../Components/Icons/ArrowDownIcon/ArrowDownIcon'
import './Login.css'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div className="login-body">
            {
                isLogin ?
                <div key={`login${isLogin}`} className="login-form">
                    <h1>Login</h1>
                    <LoginForm/>
                    <p className="link" onClick={()=>setIsLogin(false)}>First time here? <ArrowDownIcon rotate={-90}/></p>
                </div>
                :
                <div key={`register${isLogin}`} className="register-form">
                    <h1>Register</h1>
                    <RegisterForm/>
                    <p className="link" onClick={()=>setIsLogin(true)}><ArrowDownIcon rotate={90}/> Back to login</p>

                </div>
            }
            <div key={ `ribbon${!isLogin}` } className={`ribbon ribbon-right ribbon-${ isLogin ? 'curl' : 'stretch' }-right`}></div>
            <div key={ `ribbon${isLogin}` } className={`ribbon ribbon-left ribbon-${ isLogin ? 'stretch' : 'curl' }-left`}></div>
        </div>
    )
}

export {Login};