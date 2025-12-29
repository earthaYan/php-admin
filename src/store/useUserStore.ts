import type { IUserInfo } from "@/api/users";
import { create } from "zustand";

interface UserState {
  userInfo: IUserInfo | null;
  updateUserInfo: (info: IUserInfo) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  updateUserInfo: (info) => set(() => ({ userInfo: info })),
}));
