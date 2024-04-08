import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { useToast, Button } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { Plus } from "react-bootstrap-icons";
import { Stack } from "@chakra-ui/layout";
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
            //console.log("chats:");
            // console.log(data);
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

    // for group chat, we can display group name while showing chat list, but for 1v1 chat, we need to show the
    //user name who is not logged in the current device
    const getOppositeUser = (loggedUser, users) => {
        // access the users array only after it's value is intialized (not undefined)
        if (users) {
            return loggedUser._id === users[0]._id
                ? users[1].name
                : loggedUser.name;
        }
    };

    return (
        <div>
            <Box
                d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
                flexDir="column"
                alignItems="center"
                p={3}
                bg="white"
                w={{ base: "100%", md: "60%" }}
                borderRadius="lg"
                borderWidth="1px"
            >
                <Box
                    pb={3}
                    px={3}
                    fontSize={{ base: "28px", md: "30px" }}
                    fontFamily="Work sans"
                    d="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    My Chats
                    <Button
                        d="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<Plus />}
                        m={2}
                    >
                        New Group Chat
                    </Button>
                </Box>
                <Box
                    d="flex"
                    flexDir="column"
                    p={3}
                    bg="gray"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                    {chats ? (
                        <Stack overflowY="scroll">
                            {chats.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    bg={
                                        selectedChat === chat
                                            ? "cyan"
                                            : "lightgray"
                                    }
                                    color={
                                        selectedChat === chat
                                            ? "white"
                                            : "black"
                                    }
                                    px={3}
                                    py={2}
                                    mx={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                >
                                    <Text>
                                        {chat.isGroupChat
                                            ? chat.chatName
                                            : getOppositeUser(
                                                  loggedUser,
                                                  chat.users
                                              )}
                                    </Text>
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        ""
                    )}
                </Box>
            </Box>
        </div>
    );
}

export default MyChats;
