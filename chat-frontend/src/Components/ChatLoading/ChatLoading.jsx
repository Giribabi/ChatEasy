import React from "react";
import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

function ChatLoading() {
    return (
        <div>
            <Stack>
                {[...Array(12)].map(() => (
                    <Skeleton height="45px" />
                ))}
            </Stack>
        </div>
    );
}

export default ChatLoading;
