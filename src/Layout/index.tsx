import { Layout } from "antd";
import styles from "./index.module.less";
import { Outlet } from "react-router-dom";
import NavHeader from "./Header";
import { useBaseStore } from "@/store";
import SiderMenu from "./Menu";
const { Sider } = Layout;

const BaseLayout = () => {
  const { collapsed } = useBaseStore();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SiderMenu />
      </Sider>
      <Layout>
        <NavHeader />

        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Outlet />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};
export default BaseLayout;
