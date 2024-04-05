import React, { useContext } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
function UserListItem({ handleFunction }) {
    const { user } = useContext(ChatContext);
    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="lightgray"
            _hover={{
                background: "gray",
                color: "white",
            }}
            w="100%"
            d="flex"
            alignItems="center"
            color="black"
        ></Box>
    );
}

export default UserListItem;
