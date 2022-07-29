import { AiFillPlusCircle } from "react-icons/ai";
import supabase from "@/utils/supabase";
import { useState } from "react";
import { useAccount } from "wagmi";
import Message from "@/types/Message";
import validateMessage from "@/utils/validateMessage";
import Alert from "@/components/Alerts/Alert";

const BottomTextInput: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { address } = useAccount();
  const [invalidMessage, setInvalidMessage] = useState(false);

  const handleSendMessage = async () => {
    // check if message is empty
    if (validateMessage(message) === false) {
      console.log("invalid message");
      setInvalidMessage(true);
      return;
    }

    const { error } = await supabase.from("messages").insert({
      address,
      message,
    });

    if (error) {
      console.error("error inserting new message", error);
    } else {
      console.log("message inserted");
      setMessage("");
    }
  };

  return (
    <>
      <div className="flex flex-col mb-25">
        {invalidMessage && (
          <div>
            <Alert
              message="Invalid message"
              type="error"
              onClose={() => setInvalidMessage(false)}
            />
          </div>
        )}

        <div
          className="flex flex-row items-center justify-between 
            fixed left-2 right-2 bottom-2 h-12 
            rounded-lg shadow-lg 
            bg-gray-400 dark:bg-gray-600
          "
        >
          <AiFillPlusCircle
            size="30"
            className="text-green-500 shadow-lg dark:shadow-lg mx-2 dark:text-green-500 hover:text-green-500 cursor-pointer bg-transparent"
            onClick={handleSendMessage}
          />
          <input
            type="text"
            placeholder="Enter a message..."
            className="bottom-bar-input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BottomTextInput;
