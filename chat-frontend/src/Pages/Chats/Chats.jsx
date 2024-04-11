import React, { useContext, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MyChats from "../../Components/MyChats/MyChats";
import SingleChat from "../../Components/SingleChat/SingleChat";
import { ChatContext } from "../../Context/ChatProvider";
import "./Chats.css";

function Chats() {
    const { user } = useContext(ChatContext);
    const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
    //console.log(chatContext.user);
    return (
        <div className="chats-page">
            {user && <Sidebar />}
            <div className="chats-container">
                {user && (
                    <div className="chats-list">
                        <MyChats fetchChatsAgain={fetchChatsAgain} />
                    </div>
                )}
                {user && (
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
