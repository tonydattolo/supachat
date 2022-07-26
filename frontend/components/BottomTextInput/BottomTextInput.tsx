import { BsPlusCircleFill } from "react-icons/bs";

const BottomTextInput: React.FC = () => {
  return (
    <div className="font-semibold w-full bg-transparent outline-none ml-0 mr-autotext-gray-500  dark:text-gray-400 placeholder-gray-500 cursor-text">
      <BsPlusCircleFill
        size="22"
        className="text-green-500 dark:shadow-lg mx-2 dark:text-primary"
      />
      <input
        type="text"
        placeholder="Enter a message..."
        className="font-semibold w-full bg-transparent outline-none ml-0 mr-auto text-gray-500  dark:text-gray-400 placeholder-gray-500 cursor-text"
      />
    </div>
  );
};

export default BottomTextInput;
