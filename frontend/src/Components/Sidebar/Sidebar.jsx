import React, { useContext, useState } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Bell } from "react-bootstrap-icons";
import Avatar from "react-avatar";
import { ChatContext } from "../../Context/ChatProvider";
import "./Sidebar.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useNavigate } from "react-router";

function Sidebar() {
    // const [search, setSearch] = useState("");
    // const [searchResult, setSearchResult] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [loadingChat, setLoadingChat] = useState();
    const [showModal, setShowModal] = useState(false);

    const { user } = useContext(ChatContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <div className="sidebar-container">
            <div className="search-button-container">
                <OverlayTrigger
                    delay={{ hide: 350, show: 300 }}
                    overlay={(props) => (
                        <Tooltip {...props}>Search Users to chat</Tooltip>
                    )}
                    placement="bottom"
                >
                    <Button variant="outline-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                            style={{ marginRight: " 3px" }}
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        <span className="search-button">Search Users</span>
                    </Button>
                </OverlayTrigger>
            </div>
            <div className="heading">ChatEasy</div>
            <div className="menus">
                <div className="notifications-menu">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary">
                            <Bell />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Action 1</Dropdown.Item>
                            <Dropdown.Item>Action 2</Dropdown.Item>
                            <Dropdown.Item>Action 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="profile-menu">
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="outline-info"
                            style={{ padding: "4% 3%" }}
                        >
                            <Avatar
                                size="32"
                                round={true}
                                name={user.name}
                                src={user.pic}
                                cursor="pointer"
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <ProfileModal
                                show={showModal}
                                setShow={setShowModal}
                                info={user}
                            >
                                <Dropdown.Item
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    My Profile
                                </Dropdown.Item>
                            </ProfileModal>
                            <Dropdown.Item onClick={handleLogOut}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
