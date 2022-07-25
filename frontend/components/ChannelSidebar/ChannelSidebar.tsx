import { FaFire, FaPoo, FaYoutube, FaAlipay } from 'react-icons/fa';
import SidebarIcon from './SidebarIcon';

type ChannelSidebarProps = {
  children: React.ReactNode;
}

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({ children }) => {

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
      
        <SidebarIcon icon={<FaFire size="20" />} alt="fire" />
      
      </div>
    </>
  )
}

export default ChannelSidebar