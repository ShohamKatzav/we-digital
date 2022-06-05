
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate();
    const [UserName, SetUserName] = useState("");
    const [Password, SetPassword] = useState("");
    var ConnectedUser;


    useEffect(() => {
        getUsers();
        const UserAlreadyConnected = () => {
            if (localStorage.getItem("ConnectedUser") !== null) {
                sessionStorage.setItem("ConnectedUser", localStorage.getItem("ConnectedUser"));
                navigate('/Home', { replace: true });
            }
        }
        UserAlreadyConnected();
    });

    const onSubmit = (e) => {
        e.preventDefault();
        isValidFormData();
    }
    const NotifyLoginSuccess = () => {
        toast.success(ConnectedUser.username + " has been login successfully", {
            onClose: () => {
                navigate('/Home', { replace: true });
            }
        });
    }
    const NotifyLoginNotSuccess = () => {
        toast.error("Access denied, please enter your input again.", {
            onClose: () => {
                navigate('/', { replace: true });
            }
        });
    }
    const NotifyEmptyFields = () => {
        toast.warning("Do not leave any requied field empty");
    }

    async function isValidFormData() {
        var found = false;
        if (UserName.trim() === "" || Password.trim() === "") {
            NotifyEmptyFields();
            return;
        }
        const users = JSON.parse(localStorage.getItem("users"));
        users.forEach(user => {
            if (UserName === user.username && Password === user.password) {
                ConnectedUser = user;
                RememberMe();
                NotifyLoginSuccess();
                found = true;
            }
        });
        if (!found)
            NotifyLoginNotSuccess();
    }

    async function getUsers() {
        let myObject = await fetch('users.json');
        let myText = await myObject.text()
        localStorage.setItem("users", myText);
    }

    const RememberMe = () => {
        if (document.getElementById("RememberMe").checked) {
            localStorage.setItem("ConnectedUser", JSON.stringify(ConnectedUser));
            sessionStorage.setItem("ConnectedUser", JSON.stringify(ConnectedUser));
        }
        else
            sessionStorage.setItem("ConnectedUser", JSON.stringify(ConnectedUser));
    }



    return (
        <div className='LoginBody'>
            <form className='form' onSubmit={onSubmit}>
                <h1 className='control'>Sign In</h1>
                <div className="control block-cube block-input">
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        onInput={
                            (e) => SetUserName(e.target.value)
                        }
                        placeholder="Enter User Name"
                    />
                    <div className="bg-top">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-right">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg">
                        <div className="bg-inner"></div>
                    </div>
                </div>

                <div className="control block-cube block-input">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onInput={(e) => SetPassword(e.target.value)}
                        placeholder="Enter Password"
                    />
                    <div className="bg-top">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-right">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg">
                        <div className="bg-inner"></div>
                    </div>
                </div>

                <label className="RememberMeLabel">Remember me</label>
                <input type="checkbox" id="RememberMe"></input> <br />

                <button className="btn block-cube block-cube-hover" type="submit">
                    <div className="bg-top">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg-right">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="bg">
                        <div className="bg-inner"></div>
                    </div>
                    <div className="text">
                        Connect
                    </div></button>
            </form >
            <ToastContainer position='top-center' autoClose='2000' />
        </div>
    );


}



