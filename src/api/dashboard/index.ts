import { $get } from "@/utils/request";
import type {
  IReportData,
  ILineChartData,
  IPieData,
  IRadarResponse,
} from "./index.d";

export const getReportData = () => {
  return $get<IReportData>("/order/dashboard/getReportData");
};

export const getLineChartData = () => {
  return $get<ILineChartData>("/order/dashboard/getLineData");
};

export const getPieCityData = () => {
  return $get<IPieData[]>("/order/dashboard/getPieCityData");
};

export const getPieAgeData = () => {
  return $get<IPieData[]>("/order/dashboard/getPieAgeData");
};

export const getRadarData = () => {
  return $get<IRadarResponse>("/order/dashboard/getRadarData");
};

export * from "./index.d";
