import { authKey } from "@/constants/storageKey";
import { ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = getFromLocalStorage(authKey);
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
//@ts-ignore
instance.interceptors.response.use(function (response) {
  const responseObject:ResponseSuccessType = {
    data:response?.data?.data,
    meta:response?.data?.meta
   }
    return responseObject;
  }, function (error) {
  const responseObject = {
    statusCode: error?.response?.data?.statusCode|| 500,
    messages: error?.response?.data?.messages ||"Something went wrong" ,
    errorMessages: error?.response?.data?.messages,
  };
  return responseObject;
  //  return Promise.reject(error);
  });


export { instance };