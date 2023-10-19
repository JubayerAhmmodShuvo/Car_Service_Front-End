"use client"
import React from "react";
import FormInput from "@/components/FORMS/FormInput";
import { Col, Row } from "antd";

const Order = () => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        marginBottom: "10px",
        marginTop: "30px",
        padding: "20px",
        maxWidth: "400px", 
        width: "90%", 
        margin: "0 auto", 
      }}
    >
      <FormInput type="name" name="name" size="large" label="Your Name"  required/>
      <FormInput
        type="number"
        name="number"
        size="large"
        label="Your Contact No."
        required
      />
    </div>
  );
};

export default Order;
