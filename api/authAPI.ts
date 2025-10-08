import type { LoginForm } from "~/types/authType";
import type { ApiResponse } from "./APIResponse";

export const API_LoginInternalPlatform = async (data: LoginForm) => {
  const config = useRuntimeConfig();
  const apiGateWay = config.public.apiGateWay;
  try {
    return await $fetch<ApiResponse<any>>(
      `${apiGateWay}/v3/platform-auth/login-internal-platform`,
      {
        method: "POST",
        body: data,
      }
    );
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
