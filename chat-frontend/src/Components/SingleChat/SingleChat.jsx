import { useContext, useState } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { ArrowLeft } from "react-bootstrap-icons";
import ProfileModal from "../ProfileModal/ProfileModal";
import UpdateGroupChatModal from "../UpdateGroupChatModal/UpdateGroupChatModal";
import { PersonCircle } from "react-bootstrap-icons";

function SingleChat({ fetchChatsAgain, setFetchChatsAgain }) {
    const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
    const [showModal, setShowModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const singleChatContainerStyles = {
        backgroundColor: "white",
        width: "62vw",
        height: "89vh",
        borderRadius: "1em",
        margin: "1% 3%",
        marginBottom: "0%",
    };
    const chatNotSelectedStyles = {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "180%",
    };
    const selectedChatStyles = {
        textAlign: "center",
        height: "100%",
    };

    const getOppositeUser = (loggedUser, users) => {
        // access the users array only after it's value is intialized (not undefined)
        if (users) {
            return loggedUser._id === users[0]._id ? users[1] : users[0];
        }
    };

    return (
        <div className="singlechat-container" style={singleChatContainerStyles}>
            {!selectedChat ? (
                <div
                    className="chat-not-selected"
                    style={chatNotSelectedStyles}
                >
                    Select a chat to start chatting
                </div>
            ) : (
                <div className="selectedchat" style={selectedChatStyles}>
                    <div
                        className="singlechat-heading"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <ArrowLeft
                            style={{
                                backgroundColor: "white",
                                padding: "1%",
                                borderRadius: "5em",
                                margin: "1%",
                            }}
                            size={36}
                            cursor="pointer"
                            onClick={() => {
                                setSelectedChat("");
                            }}
                        />
                        <div
                            className="heading-content"
                            style={{ width: "100%" }}
                        >
                            {selectedChat.isGroupChat
                                ? selectedChat.chatName.toUpperCase()
                                : getOppositeUser(user, selectedChat.users)
                                      .name}
                        </div>
                        <div
                            className="view-other-user-profile"
                            style={{ margin: "0% 3%" }}
                        >
                            {!selectedChat.isGroupChat ? (
                                <ProfileModal
                                    show={showModal}
                                    setShow={setShowModal}
                                    info={getOppositeUser(
                                        user,
                                        selectedChat.users
                                    )}
                                >
                                    <PersonCircle
                                        color="lightblue"
                                        size={30}
                                        onClick={() => setShowModal(!showModal)}
                                        cursor="pointer"
                                    />
                                </ProfileModal>
                            ) : (
                                <div>
                                    <PersonCircle
                                        color="lightblue"
                                        size={30}
                                        onClick={() =>
                                            setShowGroupModal(!showModal)
                                        }
                                        cursor="pointer"
                                    />
                                    <UpdateGroupChatModal
                                        show={showGroupModal}
                                        setShow={setShowGroupModal}
                                    ></UpdateGroupChatModal>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="singlechat-content">
                        Single chat content
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleChat;
