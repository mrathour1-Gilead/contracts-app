import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import gileadLogo from "/png/logo.png";
import { Dropdown, MenuProps, Tooltip } from "antd";
import { useNavigate } from "react-router";

export function GileadHeader({}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const { user } = useAppSelector((state) => state.auth);
  const displayName = user?.name || "User";

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-2 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img className="h-16" src={gileadLogo} alt="Gilead Logo" />
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Global Supply Chain - SSSM Contracts Summary Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip title="Master Data Configurations">
              <SettingOutlined onClick={() => navigate("/dropdowns")} style={{ fontSize: 22, cursor: "pointer" }} />
            </Tooltip>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {displayName}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{currentTime}</div>
            </div>
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="w-10 h-10 rounded-full bg-[#306e9a] text-white flex items-center justify-center text-sm font-bold shadow-md cursor-pointer hover:bg-[#275a7f] transition-colors">
                {displayName.charAt(0).toUpperCase()}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
