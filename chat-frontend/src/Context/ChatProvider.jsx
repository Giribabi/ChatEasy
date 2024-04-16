import { createContext, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("userInfo"));
        setUser(currentUser);
        //console.log("inside context", currentUser);
        if (!currentUser) {
            //not logged in, so navigate to login page
            navigate("/");
        }
    }, [navigate]);
    return (
        <div>
            <ChatContext.Provider
                value={{
                    user,
                    setUser,
                    selectedChat,
                    setSelectedChat,
                    chats,
                    setChats,
                    notifications,
                    setNotifications,
                }}
            >
                {children}
            </ChatContext.Provider>
        </div>
    );
};

export default ChatProvider;
