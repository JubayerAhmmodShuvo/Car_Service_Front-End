import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password can't exceed 32 characters")
    .required("Password is required"),
  gender: yup.string().required("Gender is required"),

  role: yup.string().required("Role is required"),
  bloodGroup: yup.string().required("Blood Group is required"),
  number: yup.string().required("Number is required"),
  bio: yup.string().required("Bio is required"),
  address: yup.string().required("Address is required"),
});
