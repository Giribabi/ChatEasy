import { useContext } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { ArrowLeft } from "react-bootstrap-icons";
import ProfileModal from "../ProfileModal/ProfileModal";

function SingleChat({ fetchChatsAgain, setFetchChatsAgain }) {
    const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
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
        backgroundColor: "yellow",
        textAlign: "center",
        height: "100%",
    };

    const getOppositeUser = (loggedUser, users) => {
        // access the users array only after it's value is intialized (not undefined)
        if (users) {
            return loggedUser._id === users[0]._id ? users[1] : loggedUser;
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
                        <div className="view-other-user-profile">
                            <ProfileModal
                                user={getOppositeUser(user, selectedChat.users)}
                            />
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
