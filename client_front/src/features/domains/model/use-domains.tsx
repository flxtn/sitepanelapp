import axiosInstance from "@/shared/api/api-instance";
import { useState } from "react";

interface EditedField {
    [key: string]: string;
  }

export function useDomains(){
    const [domains, setDomains] = useState([]);
    const [editedFields, setEditedFields] = useState<Record<string, EditedField>>({});

  const handleDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/delete-domain/${id}`);
      domainsData();
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const handleEdit = (id:string, field: string, value: string) => {
    setEditedFields(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          [field]: value
        }
      }));
  };

  const handleCreate = async () => {
    try {
      const response = await axiosInstance.post("/create-domain");
      domainsData();
    } catch (error) {
      console.error("Creation error", error);
    }
  };

  const domainsData = async () => {
    try {
      const response = await axiosInstance.get("domains");
      setDomains(response.data.domains);
    } catch (error) {
      console.error("error", error);
    }
  };

  const renderCell = (id: string, field: string, value: string) => {
    const fieldValue = editedFields[id]?.[field] !== undefined ? editedFields[id][field] : value;
    return (
      <td
        onClick={() => handleEdit(id, field, fieldValue)}
      >

          <input
          className="text-center"
            type="text"
            value={fieldValue}
            onChange={(e) => handleEdit(id, field, e.target.value)}
          />

      </td>
    );
  };




  return {
    domains,
    editedFields,
    handleDelete,
    handleCreate,
    domainsData,
    setEditedFields,
    renderCell
  }
}