import { $post } from "@utils/request";
import { type ILoginParams } from "./index.d";

export const UserLogin = (data: ILoginParams) => {
  return $post<string>("/users/login", data);
};

export { type ILoginParams };
