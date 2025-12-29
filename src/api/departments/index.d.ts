export interface IGetDepartListParams {
  deptName?: string;
}

export interface IDepItem {
  v?: number;
  _id?: string;
  children?: IDepItem[];
  createId?: number;
  createTime?: string;
  deptName?: string;
  parentId?: string;
  updateTime?: string;
  userName?: string;
}
