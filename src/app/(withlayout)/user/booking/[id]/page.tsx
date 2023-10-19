"use client";
import StepperForm from "@/components/StepperForm/StepperForm";
import UserInfo from "@/components/ui/OrderForm/UserInfo";

import { useCreateBookingMutation } from "@/redux/api/bookingApi";

import { message } from "antd";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

import OrderForm from "@/components/ui/OrderForm/OrderForm";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { useGetServiceByIdQuery } from "@/redux/api/serviceApi";
import { useRouter } from "next/navigation";

type IDProps = {
  params: any;
};

const CreateOrderPage = ({ params }: IDProps) => {
  const { id: serviceId } = params;
  const { data: service } = useGetServiceByIdQuery(serviceId);

  const { role, id: userId } = getUserInfo() as any;
  const { data: individualId } = useGetUserProfileQuery(userId);

  const [createOrder] = useCreateBookingMutation();

  const steps = [
    {
      title: "User Information",
      content: <UserInfo />,
    },
    {
      title: "Order Information",
      content: <OrderForm />,
    },
  ];
   const router = useRouter();

  const handleStudentSubmit = async (values: any) => {
    try {
      values.user = individualId?._id;
      values.service = service?._id;
      values.orderName = service?.title;
      values.number = values.number;

      const newVal = {
        user: values.user,
        service: values.service,

        date: values.date,
        time: values.time,
        orderName: values.orderName,
        name: values.name,
        number: values.number,
      };

      message.loading("Creating...");
      const response = await createOrder(newVal);
       router.push("/");

      if (response) {
        message.success("Order created successfully!");
      } else {
        message.error("order creation failed.");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "manage-order", link: `/${role}/manage-order` },
        ]}
      />
      <h1 style={{ margin: "10px 0", textAlign: "center", color: "#2F4F4F" }}>
        Book The Order
      </h1>
      <h2 style={{ textAlign: "center", color: "#483D8B" }}>
        You are Booking For &nbsp;
        <span
          style={{ color: "#FF6347", fontWeight: "bold", fontStyle: "italic" }}
        >
          {service?.title}
        </span>
      </h2>
      <h2 style={{ textAlign: "center", color: "#483D8B" }}>
        You will cost &nbsp; &nbsp;
        <span
          style={{ color: "#FF6347", fontWeight: "bold", fontStyle: "italic" }}
        >
          ${service?.pricing}
        </span>
      </h2>

      <StepperForm
        persistKey="order-create-form"
        submitHandler={(value) => {
          handleStudentSubmit(value);
        }}
        steps={steps}
      />
    </div>
  );
};

export default CreateOrderPage;
