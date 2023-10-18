
import { useEffect } from "react";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";


export function withRoleAccess(allowedRoles: string | string[]) {
  return (WrappedComponent: React.ComponentType) => (props: any) => {
     const router = useRouter();
    const { role } = getUserInfo() as any; 

    useEffect(() => {
     router.push("/unauthorized");
    }, [role]);

    if (!allowedRoles.includes(role)) {
      return null; 
    }

   
    return <WrappedComponent {...props} />;
  };
}
