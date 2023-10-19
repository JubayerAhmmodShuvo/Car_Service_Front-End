"use client";
import { Button, Col, Input, Row, Space, message } from "antd";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Form from "@/components/FORMS/Form";
import FormInput from "@/components/FORMS/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {

  
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
        router.push("/profile");
        message.success("User logged in successfully!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
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
      <Col sm={10} md={16} lg={10}>
        <Image src={loginImage} width={350} alt="login image" />
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
          First Login In Your Account
        </h1>
        <div style={{ width: "100%", margin: "15px 0px" }}>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                name="email"
                type="text"
                size="large"
                label="User Email"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
                justifyItems: "center",
              }}
            >
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
                Login
              </Button>
            </Space>
          </Form>
          <p style={{ textAlign: "center", fontSize: "20px" }}>
            Don&rsquo;t have an account? Please{" "}
            <Link href="/signup">Signup</Link>.
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
