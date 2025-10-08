export interface RouteItemType {
    id: number;
    route_name: string;
    status: boolean;
    selectedPoints?: number[];
    isSubmitting?: boolean;
}