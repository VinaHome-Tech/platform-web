import type { RouteItemType } from "~/types/routeType";
import type { ApiResponse } from "./APIResponse";
import type { RoutePointItemType } from "~/types/routePointType";

export const API_GetListRouteByCompany = async (
  company_id: string
): Promise<ApiResponse<RouteItemType[]>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<RouteItemType[]>>(
      `${apiGateWay}/v2/platform-route/get-list-route-by-company/${company_id}`,
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

export const API_GetRoutePoints = async (
  route_id: number
): Promise<ApiResponse<RoutePointItemType[]>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<RoutePointItemType[]>>(
      `${apiGateWay}/v2/platform-route/get-route-points/${route_id}`,
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

export const API_UpdateRoutePoints = async (
  route_id: number,
  point_ids: number[]
): Promise<ApiResponse<any>> => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  const cookie = useCookie("platform_access_token");
  try {
    return await $fetch<ApiResponse<any>>(
      `${apiGateWay}/v2/platform-route/update-route-points/${route_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookie.value}`
        },
        body: {
          point_ids
        }
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
