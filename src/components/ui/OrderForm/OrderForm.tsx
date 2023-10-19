"use client";

import FormDatePicker from "@/components/FORMS/FormDatePicker";
import FormInput from "@/components/FORMS/FormInput";
import FormTimePicker from "@/components/FORMS/FormTimePicker";
import { Row, Col } from "antd";
import React from "react";

const OrderForm = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
        marginTop: "10px",
        width: "100%", 
      }}
    >
      <div style={{ width: "100%", margin: "10px 0" }}>
        <FormDatePicker name="date" label="Reservation Date" size="large" />
      </div>
      <div style={{ width: "100%", margin: "10px 0" }}>
        <FormTimePicker name="time" label="Reservation Time" />
      </div>
    </div>
  );
};

export default OrderForm;
