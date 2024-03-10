import axiosInstance from "@/shared/api/api-instance";
import { useState } from "react";
import { Site } from "../sites";

enum ColumnName {
  Domain = 'domain',
  Hosting = 'hosting',
  Description = 'description',
}

interface SearchData {
  searchText: string;
  columnName: ColumnName;
}

export function useSites() {
  const [sites, setSites] = useState([]);
  const [searchData, setSearchData] = useState<SearchData>({
    searchText: "",
    columnName: ColumnName.Domain,
  });

  const siteData = async () => {
    try {
      const response = await axiosInstance.get("sites");
      setSites(response.data.sites);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSearchSite = () => {
    if (searchData.searchText === ''){
      siteData()
      return 
    }
    const newSites = sites?.filter((item: Site) =>
      item[searchData.columnName].includes(searchData.searchText)
    );
    setSites(newSites);
  };

  return {
    sites,
    siteData,
    searchData,
    setSearchData,
    handleSearchSite,
  };
}
