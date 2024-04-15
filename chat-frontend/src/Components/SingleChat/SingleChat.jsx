import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { ArrowLeft } from "react-bootstrap-icons";
import ProfileModal from "../ProfileModal/ProfileModal";
import UpdateGroupChatModal from "../UpdateGroupChatModal/UpdateGroupChatModal";
import { PersonCircle } from "react-bootstrap-icons";
import Loader from "../Loader/Loader";
import { FormControl, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import ScrollableChat from "../ScrollableChat/ScrollableChat";

function SingleChat({ fetchChatsAgain, setFetchChatsAgain }) {
    const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
    const [showModal, setShowModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);

    const [userToken, setUserToken] = useState(user ? user.token : null);

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    useEffect(() => {
        if (user) {
            setUserToken(user.token);
        }
    }, [userToken, user]);

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

    const fetchMessages = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };
            const { data } = await axios.get(
                `http://localhost:3030/api/message/${selectedChat._id}`,
                config
            );
            console.log(data);
            setMessages(data);
        } catch (error) {
            console.log(error);
            toast({
                title: "Oops! error occured",
                description: "Failed to load messages",
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "top-left",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                };
                const { data } = await axios.post(
                    "http://localhost:3030/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                //console.log(data);
                setNewMessage("");
                setMessages([...messages, data]);
            } catch (error) {
                console.log(error);
                toast({
                    title: "Oops! error occured",
                    description: "Failed to send message",
                    status: "error",
                    duration: "5500",
                    isClosable: true,
                    position: "top-left",
                });
            }
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        //typing indication
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
                            style={{ width: "100%", textAlign: "start" }}
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
                                        fetchChatsAgain={fetchChatsAgain}
                                        setFetchChatsAgain={setFetchChatsAgain}
                                        fetchMessages={fetchMessages}
                                    ></UpdateGroupChatModal>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        style={{ backgroundColor: "lightgray", height: "80%" }}
                        className="singlechat-content-container"
                    >
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="single-chat-content">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                    </div>
                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        <Input
                            variant="filled"
                            bg="whitesmoke"
                            placeholder="Type a message"
                            onChange={handleTyping}
                            mx={1}
                            width="90%"
                        />
                    </FormControl>
                </div>
            )}
        </div>
    );
}

export default SingleChat;
