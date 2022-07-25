import { ReactNode } from "react";
import { IconType } from "react-icons";

type SidebarIconProps = {
  icon: JSX.Element;
  tooltip?: string;
};

const SidebarIcon: React.FC<SidebarIconProps> = ({
  icon,
  tooltip = "tooltip",
}: SidebarIconProps) => {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
    </div>
  );
};

export default SidebarIcon;
