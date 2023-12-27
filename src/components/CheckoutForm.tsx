"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUserInfo } from "@/services/auth.service";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";

const stripeKey: string = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

interface Product {
  
  
  _id: string;
  name: string;
  price: number;
  image: string;
}

function generateTransactionId() {
  const timestamp = new Date().getTime();
  const randomValue = Math.floor(Math.random() * 1000);
  return `txn_${timestamp}_${randomValue}`;
}

export default function PaymentForm({ product }: { product: Product }) {
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState({
    price: 0,
    name: "",
    transactionId: "",
  });

  const [createPayment, { isSuccess, isError }] = useCreatePaymentMutation();

  const { role, name, email } = getUserInfo() as any;

  useEffect(() => {
    if (product) {
      setPaymentInfo({
        price: product.price,
        name: product.name,
        transactionId: generateTransactionId(),
      });
    }
  }, [product]);

  const onSubmit = async (product: any) => {
    const stripe = await loadStripe(stripeKey);
    try {
      const result: any = await createPayment(product);

      const url = result?.data?.sessionUrl;

      router.push(url);
    } catch (err: any) {}
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        type="primary"
        style={{
          backgroundColor: "#001529",
          borderColor: "#001529",
          width: "200px",
        }}
        onClick={() => onSubmit(product)}
      >
        Checkout
      </Button>
    </div>
  );
}
