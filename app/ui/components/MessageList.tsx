import { getMessages } from "@/app/actions";

// const MessageList = () => {}

async function MessageList() {
  const messages = await getMessages();

  return (
    <ul>
      {messages.map((message) => (
        <li key={message.text}>{message.text}</li>
      ))}
    </ul>
  );
}

export { MessageList };
