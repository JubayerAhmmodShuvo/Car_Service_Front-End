// """use client";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   EyeOutlined,
//   ReloadOutlined,
// } from "@ant-design/icons";
// import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
// import UMTable from "@/components/ui/UMTable";

// import { Button, Input, message } from "antd";
// import Link from "next/link";
// import { useState } from "react";
// import ActionBar from "@/components/ui/ActionBar";
// import { useDebounced } from "@/redux/hooks";
// import dayjs from "dayjs";
// import {
//   useGetAllUsersQuery,
//   useDeleteUserProfileMutation,
// } from "@/redux/api/userProfile";
// import UMModal from "@/components/ui/UMModal";




// const UserTablePage = () => {
//   const query: Record<string, any> = {};

//   const [page, setPage] = useState<number>(1);
//   const [size, setSize] = useState<number>(10);
//   const [sortBy, setSortBy] = useState<string>("");
//   const [sortOrder, setSortOrder] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const {
//     data: user,
//     isLoading,
//     refetch,
//   } = useGetAllUsersQuery(
//     {},
//     { refetchOnMountOrArgChange: true, pollingInterval: 2000 }
    
//   );
//    const [open, setOpen] = useState<boolean>(false);
//    const [adminId, setAdminId] = useState<string>("");
//   const [deleteAdmin] = useDeleteUserProfileMutation();
  
//   const filteredUsers = user?.filter((user: { role: string; }) => user.role === "user") || [];
  

 
  
 
//   query["limit"] = size;
//   query["page"] = page;
//   query["sortBy"] = sortBy;
//   query["sortOrder"] = sortOrder;




//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Role",
//       dataIndex: "role",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//     },
//     {
//       title: "CreatedAt",
//       dataIndex: "createdAt",
//       render: function (data: any) {
//         return data && dayjs(data).format("MMM D, YYYY hh:mm A");
//       },
//       sorter: true,
//     },
//     {
//       title: "Action",
//       render: function (data: any) {
//         return (
//           <>
//             <Link href={`/admin/userprofile/${data?.id}`}>
//               <Button
//                 style={{
//                   margin: "0px 5px",
//                 }}
//                 onClick={() => console.log(data)}
//                 type="primary"
//               >
//                 <EditOutlined />
//               </Button>
//             </Link>
//             <Button
//               type="primary"
//               onClick={() => {
//                 setOpen(true);
//                 setAdminId(data);
//               }}
              
//               danger
//               style={{ marginLeft: "3px" }}
//             >
//               <DeleteOutlined />
//             </Button>
//           </>
//         );
//       },
//     },
//   ];

//   const onPaginationChange = (page: number, pageSize: number) => {
//     console.log("Page:", page, "PageSize:", pageSize);
//     setPage(page);
//     setSize(pageSize);
//   };
//   const onTableChange = (pagination: any, filter: any, sorter: any) => {
//     const { order, field } = sorter;
//     // console.log(order, field);
//     setSortBy(field as string);
//     setSortOrder(order === "ascend" ? "asc" : "desc");
//   };

//   const resetFilters = () => {
//     setSortBy("");
//     setSortOrder("");
//     setSearchTerm("");
//   };

//   const deleteAdminHandler = async (id: any) => {
   
//     try {
//       const fi = id?._id;
//      const res = await deleteAdmin(fi);
      
//       if (res) {
//         message.success("User Successfully Deleted!");
//         setOpen(false);
//       }
//     } catch (error: any) {
//       message.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <UMBreadCrumb
//         items={[
//           {
//             label: "super_admin",
//             link: "/super_admin",
//           },
//         ]}
//         style={{ marginTop: "10px",color:"black" }}
//       />

//       <ActionBar title="User List">
//         <Input
//           type="text"
//           size="large"
//           placeholder="Search..."
//           style={{
//             width: "20%",
//           }}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//           }}
//         />
//         <div>
//           <Link href="/admin/createuser">
//             <Button type="primary">Create User</Button>
//           </Link>
//           {(!!sortBy || !!sortOrder || !!searchTerm) && (
//             <Button
//               onClick={resetFilters}
//               type="primary"
//               style={{ margin: "0px 5px" }}
//             >
//               <ReloadOutlined />
//             </Button>
//           )}
//         </div>
//       </ActionBar>

//       <UMTable
//         loading={isLoading}
//         columns={columns}
//         dataSource={filteredUsers}
//         pageSize={size}
//         totalPages={100}
//         showSizeChanger={true}
//         onPaginationChange={onPaginationChange}
//         onTableChange={onTableChange}
//         showPagination={true}
//       />

//       <UMModal
//         title="Remove User"
//         isOpen={open}
//         closeModal={() => setOpen(false)}
//         handleOk={() => deleteAdminHandler(adminId)}
//       >
//         <p className="my-5">Do you want to remove this user?</p>
//       </UMModal>
//     </div>
//   );
// };

// export default UserTablePage;
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

const UserTablePage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const {
    data: users,
    isLoading,
    refetch,
  } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true, pollingInterval: 2000 }
  );

  const [open, setOpen] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [deleteAdmin] = useDeleteUserProfileMutation();

  useEffect(() => {
    if (users) {
      const sortedUsers = [...users];
      if (sortOrder === "ascend") {
        sortedUsers.sort((a, b) => {
          if (sortBy === "name") {
            return a.name.localeCompare(b.name);
          } else if (sortBy === "createdAt") {
            return a.createdAt - b.createdAt;
          }
         
        });
      } else if (sortOrder === "descend") {
        sortedUsers.sort((a, b) => {
          if (sortBy === "name") {
            return b.name.localeCompare(a.name);
          } else if (sortBy === "createdAt") {
            return b.createdAt - a.createdAt;
          }
         
        });
      }
      const newFilteredUsers = sortedUsers.filter((user) => {
        return (
          user.role === "user" && 
          (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredUsers(newFilteredUsers);
    }
  }, [users, searchTerm, sortBy, sortOrder]);

 
  const totalRecords = users ? users.length : 0;
  const totalPages = Math.ceil(totalRecords / size);

  const onPaginationChange = (page: React.SetStateAction<number>, pageSize: React.SetStateAction<number>) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: { current: any; pageSize: any; }, filter: any, sorter: { order: any; field: any; }) => {
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
    } catch (error:any) {
      message.error(error.message);
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
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (data: string | number | Date | dayjs.Dayjs | null | undefined) =>
        data && dayjs(data).format("MMM D, YYYY hh:mm A"),
  
    },
    {
      title: "Action",
      render: (data: { id: React.SetStateAction<string> }) => (
        <>
          <Link href={`/admin/userprofile/${data.id}`}>
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
              setAdminId(data.id);
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

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
        style={{ marginTop: "10px", color: "black" }}
      />

      <ActionBar title="User List">
        <div>
          <Input
            type="text"
            size="large"
            placeholder="Search..."
            style={{
              width: "30vw",
              margin:"0px 10px"
             
            }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); 
            }}
          />
          {searchTerm !== "" && (
            <span style={{ marginLeft: "1rem" }}>
              {filteredUsers.length} results found
            </span>
          )}
        </div>

        <div style={{
marginRight:"20px"
        }}>
          <Link href="/admin/createuser">
            <Button type="primary">Create User</Button>
          </Link>
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
        title="Remove User"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteAdminHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this user?</p>
      </UMModal>
    </div>
  );
};

export default UserTablePage;
