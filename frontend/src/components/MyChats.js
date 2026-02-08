import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={4}
      bg="rgba(15,23,42,0.75)"
      color="white"
      backdropFilter="blur(18px)"
      w={{ base: "100%", md: "30%" }}
      borderRadius="2xl"
      border="1px solid rgba(255,255,255,0.15)"
      boxShadow="0 20px 50px rgba(0,0,0,0.35)"
    >
      {/* Header */}
      <Box
        pb={4}
        px={2}
        fontSize="2xl"
        fontWeight="bold"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            size="sm"
            bgGradient="linear(to-r, blue.400, purple.500)"
            color="white"
            borderRadius="full"
            _hover={{
              bgGradient: "linear(to-r, blue.500, purple.600)",
            }}
            rightIcon={<AddIcon />}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>

      {/* Chat list container */}
      <Box
        d="flex"
        flexDir="column"
        p={2}
        w="100%"
        h="100%"
        borderRadius="xl"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="auto" spacing={2}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat
                    ? "linear-gradient(135deg, #4F8CFF, #7C3AED)"
                    : "whiteAlpha.200"
                }
                color="white"
                px={4}
                py={3}
                borderRadius="xl"
                transition="all 0.2s"
                _hover={{
                  bg: "whiteAlpha.300",
                  transform: "translateX(4px)",
                }}
                key={chat._id}
              >
                <Text fontWeight="semibold">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>

                {chat.latestMessage && (
                  <Text fontSize="xs" color="gray.200" mt={1}>
                    <b>{chat.latestMessage.sender.name}:</b>{" "}
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
