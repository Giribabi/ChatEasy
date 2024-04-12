import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Loader from "../Loader/Loader";
import { ChatContext } from "../../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";

function UpdateGroupChatModal({
    show,
    setShow,
    fetchChatsAgain,
    setFetchChatsAgain,
    children,
}) {
    const { selectedChat, setSelectedChat, user } = useContext(ChatContext);

    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchedResult, setSearchedResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    return (
        <div>
            <Modal show={show} size="lg" centered>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>{selectedChat.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ textAlign: "center" }}>{}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline-success"
                            onClick={() => setShow(false)}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default UpdateGroupChatModal;
