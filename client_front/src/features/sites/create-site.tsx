import { UiSelectField } from "@/shared/ui/ui-select-field";
import Link from "next/link";
import { useCreateSite } from "./model/use-create-site";
import { useEffect, useState } from "react";
import { Domain } from "../domains/domains";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { Hosting } from "../hostings/hostings";
import { UiButton } from "@/shared/ui/ui-button";
import { ChangeEvent } from "react";
import axiosInstance from "@/shared/api/api-instance";
import { useRouter } from "next/router";

export function CreateSite() {
  const { domains, hostings, domainsData, hostingsData } = useCreateSite();

  const router = useRouter();

  const [formData, setFormData] = useState({
    domain: "",
    description: "",
    hosting: "",
    account: "",
    db_type: "MySQL",
    ip: "",
    port: "",
    dbname: "",
    login: "",
    password: "",
    table_name: "",
    period: "",
  });

  const handleCreateSite = async () => {
    try {
      const response = await axiosInstance.post("/create-site", formData);
      router.push("/");
    } catch (error) {
      console.error("create error", error);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    domainsData();
    hostingsData();
  }, []);

  const hostingNames = hostings?.map((item: Hosting) => item.name);

  const domainNames = domains
    ?.filter((item: Domain) => !item.is_linked)
    .map((item: Domain) => item.name);

  return (
    <div className="flex flex-col items-start mt-20 mx-auto">
      <div className="flex justify-start w-full mb-6 flex-col">
        <span className="text-3xl text-gray-700">Create site</span>
        <Link href="/">
          <span className="text-sm text-gray-700 underline">To sites</span>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <UiSelectField
          label="Domain"
          options={["", ...domainNames]}
          selectProps={{
            value: formData.domain,
            onChange: handleSelectChange,
            name: "domain",
          }}
        />
        <UiTextField
          label="Description"
          inputProps={{ name: "description", onChange: handleInputChange }}
        />

        <UiSelectField
          label="Hosting"
          options={["", ...Array.from(new Set(hostingNames))]}
          selectProps={{ onChange: handleSelectChange, name: "hosting" }}
        />
        <UiSelectField
          label="Accounts"
          selectProps={{ name: "account", onChange: handleSelectChange }}
          options={[
            "",
            ...hostings
              ?.filter((item: Hosting) => item.name === formData.hosting)
              .map((item: Hosting) => item.login),
          ]}
        />
        <UiSelectField label="DB type" options={["MySQL"]} />
        <UiTextField
            label="Database name"
            inputProps={{ name: "dbname", onChange: handleInputChange }}
          />
        <div className="flex flex-row gap-2">
          <UiTextField
            label="ip"
            inputProps={{ name: "ip", onChange: handleInputChange }}
          />
          <UiTextField
            label="port"
            inputProps={{ name: "port", onChange: handleInputChange, type: 'number' }}
          />
        </div>
        <div className="flex flex-row gap-2">
          <UiTextField
            label="login"
            inputProps={{ name: "login", onChange: handleInputChange }}
          />
          <UiTextField
            label="password"
            inputProps={{ name: "password", onChange: handleInputChange }}
          />
        </div>
        <div className="flex flex-row gap-2">
          <UiTextField
            label="table name"
            inputProps={{ name: "table_name", onChange: handleInputChange }}
          />
          <UiTextField
            label="period (in s)"
            inputProps={{ name: "period", onChange: handleInputChange }}
          />
        </div>
        <UiButton variant="primary" onClick={handleCreateSite}>
          Create
        </UiButton>
      </div>
    </div>
  );
}
