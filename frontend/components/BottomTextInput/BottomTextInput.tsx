import { BsPlusCircleFill } from "react-icons/bs";

const BottomTextInput: React.FC = () => {
  return (
    <div className="bottom-bar">
      <BsPlusCircleFill
        size="22"
        className="text-green-500 dark:shadow-lg mx-2 dark:text-primary"
      />
      <input
        type="text"
        placeholder="Enter a message..."
        className="bottom-bar-input"
      />
    </div>
  );
};

export default BottomTextInput;
