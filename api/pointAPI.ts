import type { PointNameType, PointType, ProvinceType, WardType } from "~/types/pointType";
import type { ApiResponse } from "./APIResponse";

export const API_GetListProvince = async (): Promise<
  ApiResponse<ProvinceType[]>
> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<ProvinceType[]>>(
      `${apiGateWay}/v2/platform-point/provinces`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const API_GetListWard = async (
  provinceCode: number
): Promise<ApiResponse<WardType[]>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<WardType[]>>(
      `${apiGateWay}/v2/platform-point/wards/${provinceCode}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const API_CreatePoint = async (
  data: PointType
): Promise<ApiResponse<PointType>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<PointType>>(
      `${apiGateWay}/v2/platform-point/create-point`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
        body: data,
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const API_UpdatePoint = async (
  data: PointType
): Promise<ApiResponse<PointType>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<PointType>>(
      `${apiGateWay}/v2/platform-point/update-point/${data.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
        body: data,
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const API_GetListPoint = async (): Promise<ApiResponse<PointType[]>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<PointType[]>>(
      `${apiGateWay}/v2/platform-point/get-list-point`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const API_DeletePoint = async (
  pointId: number
): Promise<ApiResponse<void>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<void>>(
      `${apiGateWay}/v2/platform-point/delete-point/${pointId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const API_GetListPointName = async (): Promise<
  ApiResponse<PointNameType[]>
> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<PointNameType[]>>(
      `${apiGateWay}/v2/platform-point/get-list-point-name`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
