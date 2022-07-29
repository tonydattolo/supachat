import { AiFillPlusCircle } from "react-icons/ai";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
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
      // set invalid message to true for 5 seconds
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

  useEffect(() => {
    if (invalidMessage === true) {
      setTimeout(() => {
        setInvalidMessage(false);
      }, 5000);
    }
  }, [invalidMessage]);

  return (
    <>
      {/* <div className="flex flex-col"> */}
      {invalidMessage && (
        <div className="flex fixed left-2 right-2 bottom-16 h-12 transition duration-300 ease-in-out">
          <Alert
            message="Invalid message"
            onClick={() => setInvalidMessage(false)}
          />
        </div>
      )}

      <div
        className="flex flex-row items-center justify-between 
            fixed left-2 right-2 bottom-2 h-12 
            rounded-lg shadow-lg 
            bg-gray-400 dark:bg-gray-600
            overflow-y-auto

          "
        // contentEditable={true}
      >
        <AiFillPlusCircle
          size="30"
          className="text-green-500 shadow-lg dark:shadow-lg mx-2 dark:text-green-500 hover:text-green-500 cursor-pointer bg-transparent"
          onClick={handleSendMessage}
        />
        <input
          type="text"
          placeholder="Enter a message..."
          className="font-semibold w-full max-w-full
          bg-transparent outline-none 
          ml-0 mr-auto
          text-gray-500  dark:text-gray-400 placeholder-gray-500
          cursor-text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          contentEditable={true}
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default BottomTextInput;
