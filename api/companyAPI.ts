import type { CompanyType } from "~/types/companyType";
import type { ApiResponse } from "./APIResponse";

export const API_GetListBusCompany = async (): Promise<ApiResponse<CompanyType[]>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie('platform_access_token');
  try {
    return await $fetch<ApiResponse<CompanyType[]>>(`${apiGateWay}/v3/platform-company/get-list-bus-company`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.value}`
      }
    });
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
