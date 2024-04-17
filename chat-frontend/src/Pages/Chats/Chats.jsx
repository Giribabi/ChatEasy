import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MyChats from "../../Components/MyChats/MyChats";
import SingleChat from "../../Components/SingleChat/SingleChat";
import { ChatContext } from "../../Context/ChatProvider";
import "./Chats.css";

function Chats() {
    const { user, selectedChat } = useContext(ChatContext);
    const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    //console.log(windowWidth);
    useEffect(() => {
        const handleResize = () => {
            console.log(windowWidth);
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
    }, [windowWidth]);
    //console.log(chatContext.user);
    return (
        <div className="chats-page">
            {user && <Sidebar />}
            <div className="chats-container">
                {user &&
                    ((windowWidth < 700 && !selectedChat) ||
                        windowWidth >= 700) && (
                        <div className="chats-list">
                            <MyChats fetchChatsAgain={fetchChatsAgain} />
                        </div>
                    )}
                {user &&
                    ((windowWidth < 700 && selectedChat) ||
                        windowWidth >= 700) && (
                        <div className="single-chat">
                            <SingleChat
                                fetchChatsAgain={fetchChatsAgain}
                                setFetchChatsAgain={setFetchChatsAgain}
                            />
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Chats;
