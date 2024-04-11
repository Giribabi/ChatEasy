import { useState } from "react";
import show_password from "./../../assets/show-password.png";
import hide_password from "./../../assets/hide-password.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const handleSubmit = async () => {
        if (!email || !password) {
            toast({
                title: "Please fill all the credentials",
                status: "warning",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        try {
            const config = {
                header: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                " http://localhost:3030/api/user/login",
                {
                    email,
                    password,
                },
                config
            );
            toast({
                title: "Login successful",
                status: "success",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
        } catch (err) {
            window.alert(`Error occured! Check your credentials`);
        }
    };

    return (
        <div className="login-box">
            <div className="input-container">
                <div className="input-heading">Email:</div>
                <div className="input-box">
                    <input
                        type="email"
                        className="input"
                        placeholder="enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="input-container">
                <div className="input-heading">Password:</div>
                <div className="input-box">
                    <input
                        type={show ? "text" : "password"}
                        className="password-input"
                        placeholder="enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                        className="show-password-button"
                        onClick={() => setShow(!show)}
                    >
                        {!show ? (
                            <img
                                src={show_password}
                                height="25px"
                                width="30px"
                                alt="show_password"
                            />
                        ) : (
                            <img
                                src={hide_password}
                                height="25px"
                                width="30px"
                                alt="hide_password"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="login-button-container">
                <div className="login-button" onClick={handleSubmit}>
                    Login
                </div>
            </div>
        </div>
    );
}

export default Login;
