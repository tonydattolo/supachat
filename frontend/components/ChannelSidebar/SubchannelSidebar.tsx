const SubchannelSidebar: React.FC = () => {
  return (
    <div className="w-80 h-auto m-0 ml-16 bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-lg">
      <div className="flex items-center justify-center h-16 m-0 p-0">
        <h5 className="text-lg tracking-wider font-bold text-gray-600 dark:text-gray-400 mr-auto ml-4 my-auto align-middle">
          Subchannels
        </h5>
      </div>
      <div className="flex flex-col items-center justify-start p-1 m-0">
        <ul>
          <li>subchannel 1</li>
          <li>subchannel 2</li>
          <li>subchannel 3</li>
        </ul>
      </div>
    </div>
  );
};

export default SubchannelSidebar;
