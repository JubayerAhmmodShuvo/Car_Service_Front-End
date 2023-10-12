import SignupPage from "@/components/SignUp/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget Car Service | SignUp",
};


const SignUp = () => {
  return (
    <div>
      <SignupPage />
    </div>
  );
};

export default SignUp;