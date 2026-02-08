import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import moment from "moment";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={`${m._id}-${i}`}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                background:
                  m.sender._id === user._id
                    ? "linear-gradient(135deg, #4F8CFF, #7C3AED)"
                    : "rgba(255,255,255,0.85)",
                color: m.sender._id === user._id ? "white" : "#1a202c",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 4 : 10,
                borderRadius: "18px",
                padding: "8px 16px",
                maxWidth: "75%",
                boxShadow:
                  m.sender._id === user._id
                    ? "0 8px 20px rgba(79,140,255,0.35)"
                    : "0 4px 12px rgba(0,0,0,0.15)",
                backdropFilter: "blur(6px)",
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>{m.content}</span>

              <span
                style={{
                  fontSize: "10px",
                  marginTop: "4px",
                  opacity: 0.75,
                  alignSelf: "flex-end",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {moment(m.createdAt).format("HH:mm")}

                {m.sender._id === user._id && (
                  <span style={{ fontSize: "11px" }}>
                    {m.readBy && m.readBy.length > 1 ? "✓✓" : "✓"}
                  </span>
                )}
              </span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
