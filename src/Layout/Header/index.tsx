import { Button, Dropdown, type MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import storage from "@/utils/storage";
import { useBaseStore } from "@/store";

const Header = () => {
  const { collapsed, updateCollapsed } = useBaseStore();
  const toggleCollapsed = () => {
    updateCollapsed();
  };

  const items: MenuProps["items"] = [
    {
      key: "email",
      label: "邮箱：dawei@gami.com",
    },
    {
      key: "logout",
      label: "退出登录",
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }: { key: string }) => {
    if (key === "logout") {
      storage.remove("token");
      window.location.href = "/login";
    }
  };

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
        />
      </div>
      <div className={styles.right}>
        <Dropdown trigger={["click"]} menu={{ items, onClick }}>
          <span className={styles.nickName}>earthaYan</span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
