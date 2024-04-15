import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatContext } from "../../Context/ChatProvider";
import { Tooltip, Avatar } from "@chakra-ui/react";

function ScrollableChat({ messages }) {
    const { user } = useContext(ChatContext);
    const isSameSender = (messages, m, ind, userId) => {
        return (
            ind < messages.lendth - 1 &&
            (messages[ind + 1].sender._id === m.sender._id ||
                messages[ind + 1].sender._id === undefined) &&
            messages[ind].sender._id !== userId
        );
    };

    const isLastMessage = (messages, ind, userId) => {
        return (
            ind === messages.length - 1 &&
            messages[messages.length - 1].sender._id !== userId &&
            messages[messages.length - 1].sender._id
        );
    };
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, index) => (
                    <div className="" style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, index, user._id) ||
                            isLastMessage(messages, index, user._id)) && (
                            <Tooltip
                                label={m.sender.name}
                                placement="bottom-start"
                                hasArrow
                            >
                                <Avatar
                                    m={2}
                                    size="sm"
                                    cursor="pointer"
                                    name={m.sender.name}
                                    src={m.sender.pic}
                                />
                            </Tooltip>
                        )}
                    </div>
                ))}
        </ScrollableFeed>
    );
}

export default ScrollableChat;
