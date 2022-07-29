import { useState, useEffect, useRef } from "react";
import supabase from "@/utils/supabase";
import truncateAddress from "@/utils/truncateAddress";
import Message from "@/types/Message";
import { SupabaseRealtimePayload } from "@supabase/supabase-js";
import generateAvatarSeedFromHexAddress from "@/utils/generateAvatarSeedFromHexAddress";
import dateFormatter from "@/utils/dateFormatter";

const MainChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [scrolledPostLoad, setScrolledPostLoad] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subscription = supabase
      .from<Message>("messages")
      .on("INSERT", (payload: SupabaseRealtimePayload<Message>) => {
        console.log("payload: ", payload);
        setMessages((currMessages): Message[] => [
          ...currMessages,
          payload.new,
        ]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const handleGrabMessages = async () => {
    const { data, error } = await supabase
      .from<Message>("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
    }
    setMessages(data);
  };

  useEffect(() => {
    handleGrabMessages();
  }, []);

  const handleScrollToBottomOfChat = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    handleScrollToBottomOfChat();
  }, [messages]);

  return (
    <div
      className="flex flex-1 flex-col items-center 
        my-16 ml-0 px-0 pb-0 w-full bottom-16
        overflow-y-auto
        "
      id="SCROLLER"
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
      <div ref={bottomRef}></div>
    </div>
  );
};

const Message: React.FC<Message> = ({ id, address, created_at, message }) => {
  const seed = generateAvatarSeedFromHexAddress(address);
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
          className="flex-none w-12 h-full rounded-full shadow-md object-cover bg-gray-100 mb-auto mt-0 mx-0"
        />
        <span className="text-cyan-700 dark:text-cyan-500 ">
          {truncateAddress(address) ?? "no address"}
        </span>
      </div>

      <div className="w-4/5 flex flex-col justify-start ml-auto">
        <p className="text-left font-semibold mr-2 text-cyan-700 dark:text-cyan-500">
          {address ?? "no address"}
          <small className="created_at italic ml-4 font-thin">
            {dateFormatter(created_at)}
          </small>
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
