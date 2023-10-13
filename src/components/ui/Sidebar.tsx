"use clilent"
import { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button, Space } from "antd";
import { getUserInfo } from "@/services/auth.service";
import { sidebarItems } from "@/constants/sidebaritems";
import Link from "next/link";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [isMobileDrawerVisible, setIsMobileDrawerVisible] = useState(false);

  const { role } = getUserInfo() as any;

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileDrawer = () => {
    setIsMobileDrawerVisible(!isMobileDrawerVisible);
  };

  return (
    <div>
      {window.innerWidth < 768 ? (
        <Button
          type="primary"
         
          onClick={toggleMobileDrawer}
          style={{
            position: "absolute",
            top: "1rem",
            left: "8px",
            zIndex: 1002,
          }}
        >
          Menu
        </Button>
      ) : (
        // Render the sidebar on large devices when the drawer is not open
        !isMobileDrawerVisible && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={260}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: ".5rem",
                  padding: "10px 0px",
                }}
              >
                Budget
              </Link>
            </div>
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={sidebarItems(role)}
            />
          </Sider>
        )
      )}
      <Drawer
        title={
          <Space size={14}>
            <span>Budget</span>
            <Button
              style={{
                color: "white",
                fontWeight: "bolder",
                backgroundColor: "red",
              }}
              type="text"
              onClick={toggleMobileDrawer}
            >
              X
            </Button>
          </Space>
        }
        placement="left"
        closable={false}
        onClose={toggleMobileDrawer}
        visible={isMobileDrawerVisible}
        width={260}
        zIndex={1001}
      >
        <div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={sidebarItems(role)}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
