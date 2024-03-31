import { useState } from "react";
import show_password from "./../../assets/show-password.png";
import hide_password from "./../../assets/hide-password.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// add loader while image is uploading and while sending data to backend

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [profilePicture, setProfilePicture] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const postPic = (pic) => {
        if (pic === undefined) {
            window.alert("Select an image");
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
                });
        } else {
            window.alert("Select an image");
        }
    };

    const handleSubmit = async () => {
        if (!name || !email || !password || !confirmPassword) {
            window.alert("Enter all the fields");
        }
        if (password !== confirmPassword) {
            window.alert("Check your passwords");
        }
        try {
            const config = {
                header: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                " http://localhost:3030/api/user",
                {
                    name,
                    email,
                    password,
                    profilePicture,
                },
                config
            );
            window.alert("Successfully registered");
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
        } catch (err) {
            window.alert(`Error occured ${err.response.data.message}`);
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
