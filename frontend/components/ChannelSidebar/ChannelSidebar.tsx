import SidebarIcon from "./SidebarIcon";
import Channel from "@/types/Channel";

type ChannelSidebarProps = {
  channels: Channel[];
};

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({
  channels,
}: ChannelSidebarProps) => {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
        {channels.map((channel: Channel) => (
          <SidebarIcon
            key={channel.id}
            icon={channel.icon}
            tooltip={channel.name}
          />
        ))}
      </div>
    </>
  );
};

export default ChannelSidebar;
