import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { Tooltip, Avatar } from "@chakra-ui/react";

function ScrollableChat({ messages }) {
    const { user } = useContext(ChatContext);
    const messagesEndRef = useRef();

    const isLastSenderMessage = (messages, ind, userId) => {
        return (
            (ind < messages.length - 1 &&
                messages[ind].sender._id !== userId &&
                messages[ind + 1].sender._id === userId) ||
            (ind === messages.length - 1 && messages[ind].sender._id !== userId)
        );
    };

    const scrollToLastMessage = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToLastMessage();
    }, [messages]);

    // I have written 3 functions into one single simpler function which would be used to align positions and avatar display of sender messages.

    return (
        <div style={{ height: "68vh", overflowY: "auto" }}>
            {messages &&
                messages.map((messageText, index) => (
                    <div
                        className="message"
                        style={{
                            width: "96%",
                            display: "flex",
                            justifyContent:
                                messageText.sender._id === user._id
                                    ? "flex-end"
                                    : "flex-start",
                            margin: "0.5em",
                        }}
                        key={`${index}` + messageText.sender._id}
                    >
                        <div
                            className=""
                            style={{ display: "flex" }}
                            key={messageText._id}
                        >
                            <Tooltip
                                label={messageText.sender.name}
                                placement="bottom-start"
                                hasArrow
                            >
                                <Avatar
                                    style={{
                                        opacity: isLastSenderMessage(
                                            messages,
                                            index,
                                            user._id
                                        )
                                            ? "1"
                                            : "0",
                                    }}
                                    m={2}
                                    size="sm"
                                    cursor="pointer"
                                    name={messageText.sender.name}
                                    src={messageText.sender.pic}
                                />
                            </Tooltip>
                            <span
                                style={{
                                    backgroundColor:
                                        messageText.sender._id === user._id
                                            ? "lightgreen"
                                            : "lightblue",
                                    borderRadius: "18px",
                                    padding: "10px",
                                }}
                            >
                                {messageText.content}
                            </span>
                        </div>
                    </div>
                ))}
            <div className="message-end" ref={messagesEndRef}></div>
        </div>
    );
}

export default ScrollableChat;
