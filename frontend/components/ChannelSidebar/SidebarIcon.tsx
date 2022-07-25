import { ReactNode } from 'react'
import { IconType } from 'react-icons'

type SidebarIconProps = {
  icon: JSX.Element,
  // icon: ReactNode,
  alt: string,
  onClick?: () => void,
  imageUrl?: string,
  tooltip?: string,
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ 
  icon,
  alt,
  onClick,
  imageUrl,
  tooltip = 'tooltip',
 }) => {
  return (
    <div className='sidebar-icon group'>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">
        {tooltip}
      </span>

    </div>
  )
}

export default SidebarIcon