import { defineStore } from "pinia";
import type { UserPlatform } from "~/types/authType";
const LOCAL_KEY = "user_platform";
export const useUserStore = defineStore("user_platform", {
    state: (): UserPlatform => ({
        id: null,
        username: null,
        full_name: null,
        company_name: null,
        company_id: null,
        company_code: null,
        role: null,
        expires_in: null,
    }),
    actions: {
        setUserInfo(user: UserPlatform) {
            this.id = user.id;
            this.username = user.username;
            this.full_name = user.full_name;
            this.company_name = user.company_name;
            this.company_id = user.company_id;
            this.company_code = user.company_code;
            this.role = user.role;
            this.expires_in = user.expires_in;

            if (import.meta.client) {
                localStorage.setItem(LOCAL_KEY, JSON.stringify(user));
            }
        },
        loadUserInfo() {
            if (import.meta.client) {
                const saved = localStorage.getItem(LOCAL_KEY);
                if (saved) {
                    const user = JSON.parse(saved);
                    this.$patch(user);
                }
            }
        },
        clearUserInfo() {
            this.$reset();
            if (import.meta.client) {
                localStorage.removeItem(LOCAL_KEY);
                const cookie_access_token = useCookie("platform_access_token");
                cookie_access_token.value = null;
            }
        }
    },
});