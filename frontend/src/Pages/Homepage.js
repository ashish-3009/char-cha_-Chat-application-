import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="rgba(255,255,255,0.18)"
        backdropFilter="blur(18px)"
        border="1px solid rgba(255,255,255,0.25)"
        boxShadow="0 20px 60px rgba(0,0,0,0.35)"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="2xl"
      >
        <Text
          fontSize="4xl"
          fontWeight="bold"
          bgGradient="linear(to-r, blue.400, purple.400)"
          bgClip="text"
        >
          CHAR-CHA
        </Text>
      </Box>
      <Box
        bg="rgba(255,255,255,0.18)"
        backdropFilter="blur(18px)"
        border="1px solid rgba(255,255,255,0.25)"
        boxShadow="0 20px 60px rgba(0,0,0,0.35)"
        w="100%"
        p={4}
        borderRadius="2xl"
        borderWidth="1px"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
