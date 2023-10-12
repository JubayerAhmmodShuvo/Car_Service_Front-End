"use client";

import { Button, Col, Input, Row, Space, message } from "antd";
import signupImage from "../../assets/signup-image.png"; // Provide your signup image
import Image from "next/image";
import Form from "@/components/FORMS/Form";
import FormInput from "@/components/FORMS/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserSignUpMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/schemas/signup"; // Create a schema for signup validation
import Link from "next/link";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const [userSignup] = useUserSignUpMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userSignup({ ...data }).unwrap();
      if (res?.accessToken) {
        router.push("/profile");
        message.success("User registered successfully!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={signupImage} width={500} alt="signup image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
            justifyItems: "center",
            textAlign: "center",
            color: "blueviolet",
          }}
        >
          Sign Up for Your Account
        </h1>
        <div style={{ margin: "15px 0px", justifyItems: "center" }}>
          <Form submitHandler={onSubmit} resolver={yupResolver(signupSchema)}>
            <div>
              <FormInput
                name="name"
                type="text"
                size="large"
                label="Your Name"
                required
              />
            </div>
            <div style={{ margin: "15px 0px", justifyItems: "center" }}>
              <FormInput
                name="email"
                type="text"
                size="large"
                label="User Email"
                required
              />
            </div>
            <div style={{ margin: "15px 0px", justifyItems: "center" }}>
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
                required
              />
            </div>
            <Space
              direction="vertical"
              style={{ width: "100%", margin: "15px 0px" }}
            >
              <Button type="primary" block htmlType="submit">
                Sign Up
              </Button>
            </Space>
          </Form>
          <p style={{ textAlign: "center" ,fontSize:"20px" }}>
            Already have an account? Please <Link href="/login">Login</Link>.
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default SignupPage;
