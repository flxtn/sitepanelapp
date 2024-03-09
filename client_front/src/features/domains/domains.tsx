import axiosInstance from "@/shared/api/api-instance";
import { UiButton } from "@/shared/ui/ui-button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDomains } from "./model/use-domains";
import { useRouter } from "next/router";
import { tdStyle, thStyle } from "@/shared/constants/table-styles";

export type Domain = {
  registrator: string;
  name: string;
  login: string;
  password: string;
  date: string;
  is_linked: boolean;
  id: string;
};

export function Domains() {
  const {
    domains,
    domainsData,
    handleCreate,
    handleDelete,
    editedFields,
    setEditedFields,
    renderCell
  } = useDomains();

  const router = useRouter();

  const handleSave = async (id: string) => {
    try {
      await axiosInstance.put(`/domains/${id}`, editedFields[id]);
      setEditedFields((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      domainsData();
    } catch (error) {
      console.error("Error updating domain:", error);
    }
  };


  useEffect(() => {
    domainsData();
  }, []);

  return (
    <div className="flex flex-col items-start mt-20 mx-auto">
      <div className="flex justify-start w-full mb-2 flex-col">
        <span className="text-3xl text-gray-700">Domains</span>
        <Link href="/">
          <span className="text-sm text-gray-700 underline">To sites</span>
        </Link>
      </div>

      <div className="flex items-center justify-end w-full mb-2">
        <UiButton variant="primary" onClick={handleCreate}>
          Create
        </UiButton>
      </div>

      <div className="w-full overflow-hidden overflow-y-auto">
        <table className="bg-white divide-y divide-gray-300 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className={thStyle}>Registrator</th>
              <th className={thStyle}>Login</th>
              <th className={thStyle}>Password</th>
              <th className={thStyle}>Domain</th>
              <th className={thStyle}>Date</th>
              <th className={thStyle}>Is Linked</th>
              <th className={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {domains?.map((item: Domain) => (
              <tr key={item.id} className="border-t border-gray-400">
                <td className={tdStyle}>{renderCell(item.id, "registrator", item.registrator)}</td>
                <td className={tdStyle}>{renderCell(item.id, "login", item.login)}</td>
                <td className={tdStyle}>{renderCell(item.id, "password", item.password)}</td>
                <td className={tdStyle}>{renderCell(item.id, "name", item.name)}</td>
                <td className={tdStyle}>{renderCell(item.id, "date", item.date)}</td>
                <td className={tdStyle}>{item.is_linked ? "Yes" : "No"}</td>
                <td className={tdStyle}>
                  {editedFields[item.id] ? (
                    <button
                      className="underline"
                      onClick={() => handleSave(item.id)}
                    >
                      Save
                    </button>
                  ) : item.is_linked ? (
                    <span></span>
                  ) : (
                    <button
                      className="underline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
