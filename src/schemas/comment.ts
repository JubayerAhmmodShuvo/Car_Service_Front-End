import * as yup from "yup";

export const commentSchema = yup.object().shape({
  // email: yup.string().required("User Email is required"),
  rating: yup.number().min(1).max(5).required("Rating should be between 1-5"),
  comment: yup.string().required("Comment is required"),
});
// resolver={yupResolver(commentSchema)}