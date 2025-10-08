export interface PointType {
    id: number | null;
    name: string | null;
    short_name: string | null;
    province_code: number | null;
    ward_code: number | null;
    address: string | null;
    province_name?: string;
    ward_name?: string;
}

export interface ProvinceType {
    id: number;
    name: string;
    code: number;
}

export interface WardType {
    id: number;
    name: string;
    code: number;
}

export interface PointNameType {
    id: number;
    name: string;
}