
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
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import UMTable2 from "@/components/ui/UMTable2";
import { useDeleteServiceMutation, useGetAllServiceQuery } from "@/redux/api/serviceApi";
import UMModal from "@/components/ui/UMModal";

const ServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useGetAllServiceQuery({});
  
  const service = data || [];
 
  
  

  const [deleteService] = useDeleteServiceMutation();


  
   const [serviceToDelete, setServiceToDelete] = useState<any>(null); 

   const deleteServiceHandler = async () => {
     if (serviceToDelete) {
       try {
         const res = await deleteService(serviceToDelete._id); 
         if (res) {
           message.success("Service Successfully Deleted!");
           setOpen(false);
           setServiceToDelete(null);
         }
       } catch (error: any) {
        
       }
     }
   }


  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "pricing",
    },
    {
      title: "Contact Number",
      dataIndex: "contactInfo",
    },
    {
      title: "Overall Rating",
      dataIndex: "overallRating",
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
      render: (data: {
        [x: string]: any; id: React.SetStateAction<string> 
}) => (
        <>
          <Link href={`/super_admin/editservice/${data?._id}`}>
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
              setServiceToDelete(data);
            }}
            danger
            style={{ marginLeft: "3px" }}
          >
            <DeleteOutlined />
          </Button>
        </>
      ),
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

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "servicetable",
            link: "/super_admin/servicetable",
          },
        ]}
      />

      <ActionBar title="Service List">
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
        <div>
          <Link href="/super_admin/create">
            <Button type="primary">Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
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
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={service}
        pageSize={size}
        totalPages={100}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        sortOrder={""}
        sortBy={""}
      />

      <UMModal
        title="Remove User"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteServiceHandler()}
      >
        <p className="my-5">Do you want to remove this service?</p>
      </UMModal>
    </div>
  );
};

export default ServicePage;
