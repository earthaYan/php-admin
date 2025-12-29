export interface IReportData {
  codeLine: number;
  salary: number;
  icafeCount: number;
  projectNum: number;
}

export interface ILineChartData {
  label: string[];
  money: number[];
  order: number[];
}

export interface IPieData {
  name: string;
  value: number;
}

export interface IRadarData {
  name?: string;
  value?: number[];
}
export interface Indicator {
  max: number;
  name: string;
}
export interface IRadarResponse {
  data: IRadarData[];
  indicator: Indicator[];
}
