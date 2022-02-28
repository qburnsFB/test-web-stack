import { atom } from "recoil";
import { User } from "@lib/gql/generated";

export const usersAtom = atom<User[]>({
  key: "usersAtom",
  default: [],
});
