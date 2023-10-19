export const getBaseUrl = ():string => {
  
  return process.env.NEXT_PUBLIC_API_BASEURL || "http://:3030/api/v1";
}