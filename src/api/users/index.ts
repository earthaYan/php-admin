import { $post, $get } from "@utils/request";
import { type ILoginParams, type IUserInfo } from "./index.d";

export const UserLogin = (data: ILoginParams) => {
  return $post<string>("/users/login", data);
};

export const getUserInfo = () => {
  return $get<IUserInfo>("/users/getUserInfo");
};
export * from "./index.d";
