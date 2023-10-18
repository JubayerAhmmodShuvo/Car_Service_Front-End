import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Popover,
  Row,
  Space,
} from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";

const { Header: AntHeader } = Layout;

interface IDebounced {
  searchQuery: string;
  delay: number;
}

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  const {
    data: services,
    isLoading,
    isError,
  } = useSearchServicesQuery(useDebounced({ searchQuery, delay: 300 }));

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

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 0) {
      setShowPopover(true);
    } else {
      setShowPopover(false);
    }
  };
  return (
    <>
      <AntHeader style={{ background: "#fff" }}>
        <Row justify="end" align="middle" style={{ height: "100%" }}>
          <Popover
            content={
              <div style={{ width: "300px", textAlign: "center" }}>
                {services && searchQuery.length > 0 ? (
                  <div>
                    <h3>Total {services.length} Services Found</h3>
                    <ul style={{ listStyleType: "none" }}>
                      {services?.map((service: any) => (
                        <li key={service.id}>
                          <Link
                            style={{ textDecoration: "none", fontSize: "16px" }}
                            href={`/viewservice/${service?._id}`}
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <h3>No services found</h3>
                )}
              </div>
            }
            title="Matched Services"
            trigger="click"
            visible={showPopover}
            onVisibleChange={setShowPopover}
          >
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search services"
              style={{ width: 200, margin: "0 10px" }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Popover>
          {window.innerWidth >= 768 ? (
            <p style={{ margin: "0 5px" }}>{name}</p>
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
