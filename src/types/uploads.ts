import axios from "axios";
export const uploadCloudinary = async (file: string | Blob) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "gxvi8iae");
  const { data } = await axios.post(
    "https://api-ap.cloudinary.com/v1_1/dznko9wjf/image/upload",
    formData
  );
  return { publicId: data?.public_id, url: data?.secure_url };
};
