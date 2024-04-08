import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import axios from "axios";

function MyChats() {
    const [loggedUser, setLoggerUser] = useState();
    const { user, selectedChat, setSelectedChat, chats, setChats } =
        useContext(ChatContext);
    const toast = useToast();
    // check whether the 'user' object is available or not before accessing 'user.token'
    const userToken = user ? user.token : null;
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };
            const { data } = await axios.get(
                "http://localhost:3030/api/chat",
                config
            );
            console.log("chats:");
            console.log(data);
            setChats(data);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error in fetching all your chats",
                status: "warning",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
        }
    };

    useEffect(() => {
        setLoggerUser(JSON.parse(localStorage.getItem("userInfo")));
        if (user && user.token) {
            fetchChats();
        }
        // added 'user' object in the dependency array so that use effect is executed after change in user object.
    }, [user, chats.length]);

    return (
        <div>
            <Box></Box>
        </div>
    );
}

export default MyChats;
