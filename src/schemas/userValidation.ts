
import * as yup from "yup";

export const orderValidationSchema = yup.object().shape({
  name: yup.string().required("Your Name is required"),
  number: yup.string().required("Your Contact No. is required"),
 
});
