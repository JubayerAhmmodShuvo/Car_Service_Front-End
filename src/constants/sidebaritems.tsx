import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  UserOutlined,
  ControlOutlined,
  BookOutlined,
  HistoryOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { getUserInfo } from "@/services/auth.service";
export const sidebarItems = (role: string) => {
  const { id } = getUserInfo() as any;
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
       
        {
          label: <Link href={"/"}>Home</Link>,
          key: `/${role}/home`,
        },
        {
          label: <Link href={`/${role}/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/edit/${id}`}>Update Profile</Link>,

          key: `/${role}/update`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
  
  
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "User Management",
      key: "user-management",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={`/${role}/user-table`}>User Table</Link>,
          key: `/${role}/user-table`,
        },
      ],
    },
    {
      label: "Service Management",
      key: "service-management",
      icon: <ControlOutlined />,
      children: [
        {
          label: <Link href={`/${role}/servicetable`}>Service Table</Link>,
          key: `/${role}/servicetable`,
        },
      ],
    },
    {
      label: "Booking Management",
      key: "Booking-management",
      icon: <BookOutlined />,
      children: [
       

        {
          label: <Link href={`/${role}/booking`}>Booking Table</Link>,
          key: `/${role}/booking`,
        },
      ],
    },
    {
      label: "Content Management",
      key: "content-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/blogs/addblog`}>Add Blogs</Link>,
          key: `/${role}/add-blogs`,
        },
        {
          label: <Link href={`/${role}/blogs`}>Blogs</Link>,
          key: `/${role}/blogs`,
        },
        {
          label: <Link href={`/${role}/faqs`}>FAQs</Link>,
          key: `/${role}/faqs`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "User Management",
      key: "user-management",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={`/${role}/user-table`}>User Table</Link>,
          key: `/${role}/user-table`,
        },
        {
          label: <Link href={`/${role}/admin-table`}>Admin Table</Link>,
          key: `/${role}/admin-table`,
        },
      ],
    },
    {
      label: "Service Management",
      key: "service-management",
      icon: <ControlOutlined />,
      children: [
        {
          label: <Link href={`/${role}/servicetable`}>Service Table</Link>,
          key: `/${role}/servicetable`,
        },
      ],
    },
    {
      label: "Booking Management",
      key: "Booking-management",
      icon: <BookOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booking`}>Booking Table</Link>,
          key: `/${role}/booking`,
        },
      ],
    },
    {
      label: "Content Management",
      key: "content-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/blogs/addblog`}>Add Blogs</Link>,
          key: `/${role}/add-blogs`,
        },
        {
          label: <Link href={`/${role}/blogs`}>Blogs</Link>,
          key: `/${role}/blogs`,
        },
        {
          label: <Link href={`/${role}/faqs`}>FAQs</Link>,
          key: `/${role}/faqs`,
        },
      ],
    },
  ];

  

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/history/${id}`}>Order History</Link>,
      icon: <HistoryOutlined />,
      key: `/${role}/history`,
    },
    {
      label: <Link href={`/${role}/blog`}>Blogs</Link>,
      icon: <BookOutlined />,
      key: `/${role}/blog`,
    },
    {
      label: <Link href={`/${role}/faq`}>FAQs</Link>,
      icon: <BulbOutlined />,
      key: `/${role}/faqs`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.User) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
