import axiosInstance from "@/shared/api/api-instance";
import { useState } from "react";

interface EditedField {
    [key: string]: string;
  }

export function useHostings(){
    const [hostings, setHostings] = useState([]);
    const [editedFields, setEditedFields] = useState<Record<string, EditedField>>({});

  const handleDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/delete-hosting/${id}`);
      hostingsData();
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
      const response = await axiosInstance.post("/create-hosting");
      hostingsData();
    } catch (error) {
      console.error("Creation error", error);
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
    hostings,
    editedFields,
    handleDelete,
    handleCreate,
    hostingsData,
    setEditedFields,    
    renderCell
  }
}