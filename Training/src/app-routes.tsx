import { adminRoutes } from "./routes/admin-routes";
import { RouteItem } from "./types";

export const protectedRoutes: RouteItem[] = [...adminRoutes];
