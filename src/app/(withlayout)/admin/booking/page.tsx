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
import {
  useApproveBookingMutation,
  useCancelBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
} from "@/redux/api/bookingApi";

const BookingTablePage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users,
    isLoading,
    refetch,
  } = useGetAllBookingsQuery(
    {},
    { refetchOnMountOrArgChange: true, pollingInterval: 2000 }
  );

  const filteredUsers = users || [];

  const [open, setOpen] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const [deleteHistory] = useDeleteBookingMutation();
  const [approval] = useApproveBookingMutation();
  const [cancel] = useCancelBookingMutation();

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

  const [serviceToDelete, setServiceToDelete] = useState<any>(null);
  const [approve, setApprove] = useState<any>(null);
  const [cancelled, setCancelled] = useState<any>(null);

  const cancelServiceHandler = async () => {
    if (cancelled) {
      try {
        const res = await cancel(cancelled._id);
        if (res) {
          message.success("Order cancelled");
          setOpenCancelModal(false);
          setServiceToDelete(null);
        }
      } catch (error: any) {}
    }
  };
  const approveServiceHandler = async () => {
    if (approve) {
      try {
        const res = await approval(approve._id);
        if (res) {
          message.success("Order Approved");
          setOpenApproveModal(false);
          setServiceToDelete(null);
        }
      } catch (error: any) {}
    }
  };
  const deleteServiceHandler = async () => {
    if (serviceToDelete) {
      try {
        const res = await deleteHistory(serviceToDelete._id);
        if (res) {
          message.success("Booking Successfully Deleted!");
          setOpen(false);
          setServiceToDelete(null);
        }
      } catch (error: any) {}
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Order Name",
      dataIndex: "orderName",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Order Time",
      dataIndex: "time",
    },
    {
      title: "Order Date",
      dataIndex: "date",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (data: string | number | Date | dayjs.Dayjs | null | undefined) =>
        data && dayjs(data).format("MMM D, YYYY hh:mm A"),
    },
    {
      title: "Action",
      render: (data: { status: string; id: React.SetStateAction<string> }) => (
        <>
          {data.status === "pending" && (
            <>
              <Button
                type="primary"
                onClick={() => {
                  setOpenApproveModal(true);
                  setApprove(data);
                }}
                danger
                style={{ marginLeft: "3px", backgroundColor: "#429d15" }}
              >
                Approve
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setOpenCancelModal(true);
                  setCancelled(data);
                }}
                style={{ marginLeft: "3px", backgroundColor: "#aa8e05" }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                  setServiceToDelete(data);
                }}
                danger
                style={{ marginLeft: "3px" }}
              >
                <DeleteOutlined />
              </Button>
            </>
          )}
          {data.status === "approved" && (
            <>
              <Button
                type="primary"
                onClick={() => {
                  setOpenCancelModal(true);
                  setCancelled(data);
                }}
                style={{ marginLeft: "3px", backgroundColor: "#aa8e05" }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                  setServiceToDelete(data);
                }}
                danger
                style={{ marginLeft: "3px" }}
              >
                <DeleteOutlined />
              </Button>
            </>
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
            label: "admin",
            link: "/admin",
          },
          {
            label: "history",
            link: "/admin/history",
          },
        ]}
        style={{ marginTop: "10px", marginBottom: "30px", color: "black" }}
      />

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={filteredUsers}
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
        title="Remove Booking"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteServiceHandler()}
      >
        <p className="my-5">Do you want to remove this user booking?</p>
      </UMModal>
      <UMModal
        title="Approve Booking"
        isOpen={openApproveModal}
        closeModal={() => setOpenApproveModal(false)}
        handleOk={() => approveServiceHandler()}
      >
        <p className="my-5">Do you want to approve this user booking?</p>
      </UMModal>
      <UMModal
        title="Cancel Booking"
        isOpen={openCancelModal}
        closeModal={() => setOpenCancelModal(false)}
        handleOk={() => cancelServiceHandler()}
      >
        <p className="my-5">Do you want to cancel this user booking?</p>
      </UMModal>
    </div>
  );
};

export default BookingTablePage;
