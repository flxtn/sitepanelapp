import axiosInstance from "@/shared/api/api-instance";
import { useState } from "react";

export function useCreateSite(){
    const [domains, setDomains] = useState([]);
    const [hostings, setHostings] = useState([]);

    const domainsData = async () => {
        try {
          const response = await axiosInstance.get("domains");
          setDomains(response.data.domains);
        } catch (error) {
          console.error("error", error);
        }
      };

      const hostingsData = async () => {
        try {
          const response = await axiosInstance.get("hostings");
          setHostings(response.data.hostings);
        } catch (error) {
          console.error("error", error);
        }
      };


      return {
        hostings,
        domains,
        domainsData,
        hostingsData
      }

}

