"use client";
import AdminUpdate from '@/components/ui/AdminUpdate';
import { useGetAllBookingsQuery } from '@/redux/api/bookingApi';
import React from 'react';

const AdminUpdatePage = () => {

 
  return (
    <>
      <AdminUpdate />
    </>
  );
};

export default AdminUpdatePage;