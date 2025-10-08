export interface LoginForm {
  username: string
  password: string
}

export interface UserPlatform {
  id: number | null
  username: string | null
  full_name: string | null
  company_name: string | null
  company_id: number | null
  company_code: string | null
  role: string | null
  expires_in: number | null
}