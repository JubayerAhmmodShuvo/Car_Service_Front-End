import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import React, { CSSProperties } from "react"; // Import React and CSSProperties

const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  const { role, name } = getUserInfo() as any;

  return (
    <>
      <AntHeader
        style={{
          background: "#fff",
        }}
      >
        <Row
          justify="end"
          align="middle"
          style={{
            height: "100%",
          }}
        >
         
          {window.innerWidth >= 768 ? (
            <p
              style={{
                margin: "0px 5px",
              }}
            >
              {name}
            </p>
          ) : null}

          <Dropdown menu={{ items }}>
            <a>
              <Space wrap size={16}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </Row>
      </AntHeader>
    </>
  );
};

export default Header;
