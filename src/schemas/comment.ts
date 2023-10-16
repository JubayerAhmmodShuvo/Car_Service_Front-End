import * as yup from "yup";

export const commentSchema = yup.object().shape({
  email: yup.string().required("User Email is required"),
  rating: yup.string().min(1).max(5).required(),
  comment: yup.string().required("Comment is required"),
});
// resolver={yupResolver(userSchema)}