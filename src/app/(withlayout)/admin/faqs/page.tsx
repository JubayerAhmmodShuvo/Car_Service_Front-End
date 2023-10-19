"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";

import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import ActionBar from "@/components/ui/ActionBar";
import { useDebounced } from "@/redux/hooks";
import dayjs from "dayjs";

import UMModal from "@/components/ui/UMModal";

import { useDeleteFaqMutation, useGetAllFaqQuery } from "@/redux/api/faqApi";

const FaqTablePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, refetch } = useGetAllFaqQuery(
    {},
    { refetchOnMountOrArgChange: true, pollingInterval: 2000 }
  );
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const [deleteblog] = useDeleteFaqMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
          
            <Link href={`/admin/faqs/updatefaq/${data?._id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
              
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setAdminId(data);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteAdminHandler = async (id: any) => {
    try {
      const fi = id?._id;

      const res = await deleteblog(fi);

      if (res) {
        message.success("Blog Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "faq",
            link: "/admin/faq",
          },
        ]}
        style={{ marginTop: "10px", color: "black" }}
      />

      <ActionBar title="FAQ's List">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div style={{ overflowX: "hidden" }}>
          <Link href="/admin/faqs/addfaq">
            <Button type="primary">Add New FAQ</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
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
        dataSource={data}
        pageSize={size}
        totalPages={100}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true} sortOrder={""} sortBy={""}      />

      <UMModal
        title="Remove blog"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteAdminHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this blog?</p>
      </UMModal>
    </div>
  );
};

export default FaqTablePage;
