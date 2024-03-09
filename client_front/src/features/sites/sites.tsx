import { tdStyle, thStyle } from "@/shared/constants/table-styles";
import { UiButton } from "@/shared/ui/ui-button";
import { useSites } from "./model/use-sites";
import { useEffect } from "react";
import Link from "next/link";

type Site = {
  id: string;
  queries: number;
  hosting: string;
  description: string;
  domain: string;
  status: string;
};

export function Sites() {
  const { sites, siteData } = useSites();

  useEffect(() => {
    siteData();
  }, []);

  return (
    <div className="flex flex-col items-start mt-20 mx-auto">
      <div className="flex justify-start w-full mb-2">
        <span className="text-3xl text-gray-700">Sites</span>
      </div>
      <div className="flex items-center justify-end w-full mb-2">
        <UiButton variant="secondary">Search</UiButton>
      </div>
      <div className="w-full overflow-hidden overflow-y-auto">
        <table className="bg-white divide-y divide-gray-300 w-full">
          <thead className="bg-gray-200">
            <tr>
              <Link href="/create-site">
                <th className={thStyle}>Domain</th>
              </Link>
              <th className={thStyle}>Description</th>
              <th className={thStyle}>Records</th>
              <th className={thStyle}>Hosting</th>
              <th className={thStyle}>Status</th>
              <th className={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sites?.map((item: Site) => (
              <tr key={item.id} className="border-t border-gray-400">
                <td className={tdStyle}>{item.domain}</td>
                <td className={tdStyle}>{item.description}</td>
                <td className={tdStyle}>{item.queries}</td>
                <td className={tdStyle}>{item.hosting}</td>
                <td className={tdStyle}>{item.status}</td>
                <td className={tdStyle}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
