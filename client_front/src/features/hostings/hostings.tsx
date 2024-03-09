import axiosInstance from "@/shared/api/api-instance";
import { UiButton } from "@/shared/ui/ui-button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useHostings } from "./model/use-hostings";
import { tdStyle, thStyle } from "@/shared/constants/table-styles";

export type Hosting = {
  name: string;
  login: string;
  password: string;
  tariff: string;
  linked_sites: number;
  id: string;
};


export function Hostings() {

    const {hostings,
        editedFields,
        handleDelete,
        handleCreate,
        hostingsData,
        setEditedFields,
        renderCell} = useHostings();


  const handleSave = async (id: string) => {
    try {
      await axiosInstance.put(`/hostings/${id}`, editedFields[id]);
      setEditedFields((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      hostingsData();
    } catch (error) {
      console.error("Error updating domain:", error);
    }
  };


  useEffect(() => {
    hostingsData();
  }, []);

  return (
    <div className="flex flex-col items-start mt-20 mx-auto">
      <div className="flex justify-start w-full mb-2 flex-col">
        <span className="text-3xl text-gray-700">Hostings</span>
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
              <th className={thStyle}>Name</th>
              <th className={thStyle}>Login</th>
              <th className={thStyle}>Password</th>
              <th className={thStyle}>Tariff</th>
              <th className={thStyle}>Linked sites</th>
              <th className={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {hostings?.map((item: Hosting) => (
              <tr key={item.id} className="border-t border-gray-400">
                <td className={tdStyle}>{renderCell(item.id, "name", item.name)}</td>
                <td className={tdStyle}>{renderCell(item.id, "login", item.login)}</td>
                <td className={tdStyle}>{renderCell(item.id, "password", item.password)}</td>
                <td className={tdStyle}>{renderCell(item.id, "tariff", item.tariff)}</td>
                <td className={tdStyle}>{item.linked_sites}</td>
                <td className={tdStyle}>
                  {editedFields[item.id] ? (
                    <button
                      className="underline"
                      onClick={() => handleSave(item.id)}
                    >
                      Save
                    </button>
                  ) : item.linked_sites ? (
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
