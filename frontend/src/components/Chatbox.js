import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={4}
      bg="rgba(255,255,255,0.15)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(255,255,255,0.18)"
      boxShadow="0 25px 60px rgba(0,0,0,0.35)"
      w={{ base: "100%", md: "70%" }}
      borderRadius="2xl"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
