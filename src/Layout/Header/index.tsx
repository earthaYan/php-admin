import { Button, Dropdown, type MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import storage from "@/utils/storage";
import { useBaseStore, useUserStore } from "@/store";
import { getUserInfo } from "@/api/users";
import { useEffect } from "react";

const Header = () => {
  const { collapsed, updateCollapsed } = useBaseStore();
  const { userInfo, updateUserInfo } = useUserStore();
  const toggleCollapsed = () => {
    updateCollapsed();
  };
  const getUser = async () => {
    const info = await getUserInfo();
    updateUserInfo(info);
  };
  useEffect(() => {
    getUser();
  }, []);
  const items: MenuProps["items"] = [
    {
      key: "email",
      label: userInfo?.userEmail,
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
