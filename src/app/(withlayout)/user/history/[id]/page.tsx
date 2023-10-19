"use client";

type User = {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt: Date;
};
import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import UMModal from "@/components/ui/UMModal";
import dayjs from "dayjs";
import Link from "next/link";
import {
  useGetAllUsersQuery,
  useDeleteUserProfileMutation,
} from "@/redux/api/userProfile";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useCancelBookingMutation, useDeleteBookingMutation, useGetUserBookingByIdQuery } from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";

type IDProps = {
  params: any;
};

const History = ({ params }: IDProps) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const { id:serviceId } = params;

 

  const { data: users, isLoading } = useGetUserBookingByIdQuery(serviceId, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 2000,
  });

 

  const history = users || [];

  const [open, setOpen] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [deleteAdmin] = useCancelBookingMutation();



  const totalRecords = users ? users.length : 0;
  const totalPages = Math.ceil(totalRecords / size);

  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (
    pagination: { current: any; pageSize: any },
    filter: any,
    sorter: { order: any; field: any }
  ) => {
    const { current, pageSize } = pagination;

    onPaginationChange(current, pageSize);
    if (sorter.field && sorter.order) {
      setSortBy(sorter.field);
      setSortOrder(sorter.order);
    } else {
      setSortBy("");
      setSortOrder("");
    }
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteAdminHandler = async (id: string) => {
    try {
      const res = await deleteAdmin(id);
      if (res) {
        message.success("User Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Order Name",
      dataIndex: "orderName",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Order Date",
      dataIndex: "date",
    },
    {
      title: "Order Time",
      dataIndex: "time",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (data: string | number | Date | dayjs.Dayjs | null | undefined) =>
        data && dayjs(data).format("MMM D, YYYY hh:mm A"),
    },
    {
      title: "Action",
      render: (data: {
        status: string; id: React.SetStateAction<string> 
}) => (
        <>
          {data.status === "approved" && (
            <Link href={`/super_admin/userprofile/${data.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                  backgroundColor: "#8A2BE2",
                }}
                type="primary"
              >
                Payment
              </Button>
            </Link>
          )}

          {data.status === "pending" && (
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setAdminId(serviceId);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              Delete
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "User",
            link: "/user",
          },
          {
            label: "order history",
            link: "/user/orderhistory",
          },
        ]}
        style={{ marginTop: "10px", color: "black" }}
      />

      <ActionBar
       
        title="User History"
      >
        <div
          style={{
            marginRight: "20px",
          }}
        >
          {(sortBy || sortOrder || searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={history}
        pageSize={size}
        totalPages={totalPages}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        sortOrder={sortOrder}
        sortBy={sortBy}
      />

      <UMModal
        title="Cancel Order"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteAdminHandler(adminId)}
      >
        <p className="my-5">Do you want to cancel this user?</p>
      </UMModal>
    </div>
  );
};

export default History;
