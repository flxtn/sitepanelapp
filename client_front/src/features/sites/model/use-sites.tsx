import axiosInstance from "@/shared/api/api-instance";
import { useState } from "react";

export function useSites(){

    const [sites, setSites] = useState([]);

    const siteData = async () => {
        try {
          const response = await axiosInstance.get("sites");
          setSites(response.data.sites);
        } catch (error) {
          console.error("error", error);
        }
      };


      return {
        sites,
        siteData
      }
}
