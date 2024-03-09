import { UiSelectField } from "@/shared/ui/ui-select-field";
import Link from "next/link";
import { useCreateSite } from "./model/use-create-site";
import { useEffect, useState } from "react";
import { Domain } from "../domains/domains";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { Hosting } from "../hostings/hostings";
import { UiButton } from "@/shared/ui/ui-button";

export function CreateSite() {
  const { domains, hostings, domainsData, hostingsData } = useCreateSite();
  const [currentHosting, setCurrentHosting] = useState("");

  useEffect(() => {
    setCurrentHosting(uniqueHostings[0]);
  }, [hostings]);

  useEffect(() => {
    domainsData();
    hostingsData();
  }, []);
  const uniqueHostings = Array.from(
    new Set(hostings?.map((item: Hosting) => item.name))
  );

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
          options={domains?.map((item: Domain) => item.name)}
        />
        <UiTextField label="Description" />

        <UiSelectField
          label="Hosting"
          options={uniqueHostings}
          selectProps={{ onChange: (e) => setCurrentHosting(e.target.value) }}
        />
        <UiSelectField
          label="Accounts"
          options={hostings
            ?.filter((item: Hosting) => item.name === currentHosting)
            .map((item: Hosting) => item.login)}
        />
        <UiSelectField label="DB type" options={["MySQL"]} />
        <div className="flex flex-row gap-2">
          <UiTextField label="ip" />
          <UiTextField label="port" />
        </div>
        <div className="flex flex-row gap-2">
          <UiTextField label="login" />
          <UiTextField label="password" />
        </div>
        <div className="flex flex-row gap-2">
          <UiTextField label="table name" />
          <UiTextField label="period (in s)" />
        </div>
        <UiButton variant="primary">Create</UiButton>
      </div>
    </div>
  );
}
