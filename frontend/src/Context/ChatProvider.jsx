import { createContext, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
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
            <ChatContext.Provider value={{ user, setUser }}>
                {children}
            </ChatContext.Provider>
        </div>
    );
};

export default ChatProvider;
