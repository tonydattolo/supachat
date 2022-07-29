import { FiX } from "react-icons/fi";

type AlertProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClick?: () => void;
};

const Alert: React.FC<AlertProps> = ({
  message,
  type = "info",
}: AlertProps) => {
  const infoColor = "blue";
  const successColor = "green";
  const errorColor = "red";
  const color =
    type === "success"
      ? successColor
      : type === "error"
      ? errorColor
      : infoColor;

  return (
    <>
      <div
        // className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded`}
        className={`bg-cyan-100 border border-cyan-400 text-cyan-700 px-4 py-3 rounded transition duration-300 ease-out`}
        role="alert"
      >
        <strong className="font-bold">message error &nbsp;&nbsp;</strong>
        <span className="">
          {message}
          <FiX
            size="24"
            className="inline ml-2 text-red-500 hover:text-red-500 cursor-pointer bg-transparent"
            onClick={() => {
              console.log("clicked");
            }}
          />
        </span>
      </div>
    </>
  );
};

export default Alert;
