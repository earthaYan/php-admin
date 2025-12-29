import { $get } from "@/utils/request";
import type { IGetDepartListParams, IDepItem } from "./index.d";

export const getDepartList = (params?: IGetDepartListParams) => {
  return $get<IDepItem[]>("/dept/list", params);
};

export * from "./index.d";
