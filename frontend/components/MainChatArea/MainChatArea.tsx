import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";
import truncateAddress from "@/utils/truncateAddress";
import Message from "@/types/Message";
import { SupabaseRealtimePayload } from "@supabase/supabase-js";

const MainChatArea: React.FC = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = supabase
      .from("messages")
      // .on("INSERT", (payload: SupabaseRealtimePayload<Message>) => {
      .on("INSERT", (payload) => {
        console.log("payload: ", payload);
        setMessages((currMessages) => [...currMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const handleGrabMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    // console.log("data from messages: ", JSON.stringify(data));
    if (error) {
      console.error(error);
    }
    setMessages(data);
  };

  useEffect(() => {
    handleGrabMessages();
    setTimeout(() => {}, 1000);
  }, []);

  const handleMessageInserted = (payload: SupabaseRealtimePayload<Message>) => {
    console.log("handleMessageInserted: ", payload);
    // setMessages([...messages, payload.data]);
  };

  window.scrollTo(0, document.body.scrollHeight);

  return (
    <div
      className="flex flex-1 flex-col items-center 
        my-16 ml-0 px-0 pb-0 w-full bottom-16
        overflow-y-auto
        "
      // className="flex flex-1 flex-col items-center
      //   h-screen w-full
      //   mt-0 ml-0 mx-auto px-0 pb-12
      //   overflow-y-scroll
      //   overflow-x-hidden
      //   scroll-snap-type: x mandatory;
      //   "
    >
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

// type Message = {
//   key?: number;
//   id?: number;
//   address: string;
//   created_at: string;
//   message: string;
// };

const Message: React.FC<Message> = ({ id, address, created_at, message }) => {
  const seed = Math.round(Math.random() * 100);
  // const seed = Math.round(address);
  return (
    <div
      key={id}
      className="
        w-full
        flex flex-row items-center justify-evenly
        py-4 px-8 m-0
      "
    >
      <div className="avatar-wrapper">
        <img
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
          alt=""
          className="avatar"
        />
        <span>{truncateAddress(address) ?? "no address"}</span>
      </div>

      <div className="w-4/5 flex flex-col justify-start ml-auto">
        <p className="post-owner">
          {address ?? "no address"}
          <small className="created_at">{" at: " + created_at}</small>
        </p>
        <p
          className="text-lg text-left text-gray-800 dark:text-white 
            mr-auto whitespace-normal"
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default MainChatArea;
