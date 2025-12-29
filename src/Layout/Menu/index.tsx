import { Menu, type MenuProps } from "antd";
import styles from "./index.module.less";
import {
  LaptopOutlined,
  MenuOutlined,
  PieChartOutlined,
  SettingOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useBaseStore } from "@/store";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "/dashboard",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "/users",
    icon: <SettingOutlined />,
    label: "用户模块",
    children: [
      { key: "/user", label: "用户管理", icon: <UserOutlined /> },
      { key: "/menu", label: "菜单管理", icon: <MenuOutlined /> },
      {
        key: "/role",
        label: "角色管理",
        icon: <SolutionOutlined />,
      },
      {
        key: "/department",
        label: "部门管理",
        icon: <LaptopOutlined />,
      },
    ],
  },
];
const SiderMenu = () => {
  const navigate = useNavigate();
  const { collapsed } = useBaseStore();
  const menuClick = ({ key }: { key: string }) => {
    navigate(key);
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.logo}>
        <img src="/imgs/logo.png" className={styles.img} alt="logo" />
        {collapsed ? null : <span>后台应用</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        defaultOpenKeys={["/user"]}
        inlineCollapsed={collapsed}
        items={items}
        onClick={menuClick}
      />
    </div>
  );
};

export default SiderMenu;
