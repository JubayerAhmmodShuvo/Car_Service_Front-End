export const getBaseUrl = ():string => {
  
  return (
    process.env.NEXT_PUBLIC_API_BASEURL ||
    "https://car-service-backend-khaki.vercel.app/api/v1"
  );
}