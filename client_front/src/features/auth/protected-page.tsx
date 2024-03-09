
import axiosInstance from "@/shared/api/api-instance";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactElement, useEffect } from "react";
import { checkTokenValidity } from "./check-token";

export function protectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {

    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
          const isValid = await checkTokenValidity();
          if (!isValid) {
            router.push('/signin'); 
          }
        };
  
        checkToken();
      }, []);



        return <Component {...props} />;

  };
}
