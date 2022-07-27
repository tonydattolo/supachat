import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";
import truncateAddress from "@/utils/truncateAddress";

const MainChatArea: React.FC = () => {
  const [messages, setMessages] = useState([]);

  const handleGrabMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at");

    console.log("data from messages: ", JSON.stringify(data));
    if (error) {
      console.error(error);
    }
    setMessages(data);
  };

  useEffect(() => {
    handleGrabMessages();
  }, []);

  return (
    <div className="content-list">
      <Message
        id={1666}
        address="Ada"
        created_at="one week ago"
        message={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
      />
      <Message
        id={1667}
        address="Ada"
        created_at="one week ago"
        message={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
            ipsum dolor sit amet consectetur adipisicing elit.`}
      />

      <>
        {messages.map((message: Message) => (
          <Message
            key={message.id}
            address={message.address}
            created_at={message.created_at}
            message={message.message}
          />
        ))}
      </>
    </div>
  );
};

type Message = {
  key?: number;
  id?: number;
  address: string;
  created_at: string;
  message: string;
};

const Message: React.FC<Message> = ({ id, address, created_at, message }) => {
  const seed = Math.round(Math.random() * 100);
  return (
    <div key={id} className="post">
      <div className="avatar-wrapper">
        <img
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
          alt=""
          className="avatar"
        />
        <span>{truncateAddress(address) ?? "no address"}</span>
      </div>

      <div className="post-content">
        <p className="post-owner">
          {address ?? "no address"}
          <small className="created_at">{" at: " + created_at}</small>
        </p>
        <p className="post-text">{message}</p>
      </div>
    </div>
  );
};

export default MainChatArea;
