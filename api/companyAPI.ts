import type { ApiResponse } from "./APIResponse";

export const getListCompanyAPI = async (): Promise<ApiResponse<CompanyType[]>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  try {
    return await $fetch<ApiResponse<CompanyType[]>>(`${apiGateWay}/v3/bus-company/get-list-company`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error fetching company list:", error);
    throw error;
  }
};
