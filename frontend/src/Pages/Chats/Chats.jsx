import React, { useContext } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MyChats from "../../Components/MyChats/MyChats";
import SingleChat from "../../Components/SingleChat/SingleChat";
import { ChatContext } from "../../Context/ChatProvider";
import "./Chats.css";

function Chats() {
    const { user } = useContext(ChatContext);
    //console.log(chatContext.user);
    return (
        <div className="chats-page">
            {user && <Sidebar />}
            <div className="chats-container">
                <div className="chats-list">
                    <MyChats />
                </div>
                <div className="single-chat">
                    <SingleChat />
                </div>
            </div>
        </div>
    );
}

export default Chats;
