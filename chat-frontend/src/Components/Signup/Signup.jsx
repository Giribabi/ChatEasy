import { useState } from "react";
import show_password from "./../../assets/show-password.png";
import hide_password from "./../../assets/hide-password.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

// add loader while image is uploading and while sending data to backend

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [profilePicture, setProfilePicture] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const toast = useToast();

    const postPic = (pic) => {
        if (pic === undefined) {
            toast({
                title: "Select an image",
                status: "warning",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "chateasy-app");
            data.append("cloud_name", "giribabi");
            fetch("https://api.cloudinary.com/v1_1/giribabi/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setProfilePicture(data.url.toString());
                    //console.log(data.url.toString());
                    console.log("image upload completed");
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: "Error in uploading image",
                        status: "error",
                        duration: "5000",
                        isClosable: true,
                        position: "top-left",
                    });
                });
        } else {
            toast({
                title: "Select an image",
                status: "warning",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
        }
    };

    const handleSubmit = async () => {
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Enter all the fields",
                status: "warning",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
        }
        if (password !== confirmPassword) {
            toast({
                title: "Check your password",
                status: "warning",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
        }
        try {
            const config = {
                header: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                " https://chateasy-1.onrender.com/api/user",
                {
                    name,
                    email,
                    password,
                    profilePicture,
                },
                config
            );
            toast({
                title: "Successfully registered",
                status: "warning",
                duration: "5000",
                isClosable: true,
                position: "top-left",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
        } catch (err) {
            toast({
                title: "Error in registration",
                description: err.response.data.message,
                status: "warning",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
        }
    };

    return (
        <div className="login-box">
            <div className="input-sets-container">
                <div className="input-set1">
                    <div className="input-container">
                        <div className="input-heading">Name:</div>
                        <div className="input-box">
                            <input
                                type="text"
                                className="input"
                                placeholder="enter your name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
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
                </div>
                <div className="input-set2">
                    <div className="input-container">
                        <div className="input-heading">Password:</div>
                        <div className="input-box">
                            <input
                                type={show ? "text" : "password"}
                                className="password-input"
                                placeholder="password"
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
                                        alt="show_password"
                                    />
                                ) : (
                                    <img
                                        src={hide_password}
                                        height="25px"
                                        alt="hide_password"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <div className="input-heading">Confirm Password:</div>
                        <div className="input-box">
                            <input
                                type={show ? "text" : "password"}
                                className="password-input"
                                placeholder="password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            <div
                                className="show-password-button"
                                onClick={() => setShow(!show)}
                            >
                                {!show ? (
                                    <img
                                        src={show_password}
                                        height="25px"
                                        alt="show_password"
                                    />
                                ) : (
                                    <img
                                        src={hide_password}
                                        height="25px"
                                        alt="hide_password"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-container">
                <div className="input-heading">Upload picture:</div>
                <div className="input-box">
                    <input
                        type="file"
                        accept="file"
                        onChange={(e) => postPic(e.target.files[0])}
                    />
                </div>
            </div>
            <div className="login-button-container">
                <div className="signup-button" onClick={handleSubmit}>
                    Signup{" "}
                </div>
            </div>
        </div>
    );
}

export default Signup;
