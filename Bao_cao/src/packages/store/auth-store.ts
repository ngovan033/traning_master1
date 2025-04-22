import { AuthState } from "@/types";
import { atom } from "jotai";

const emptyState: AuthState = {
  token: localStorage.getItem("token") || undefined,
  networkId: "0",
  clientGateUrl: localStorage.getItem("clientGateUrl") || undefined,
  currentUser: undefined,
  clientGate: undefined,
  permissions: undefined,
};

export const authAtom = atom<AuthState>(emptyState);

export const loggedInAtom = atom((get) => {
  return !!get(authAtom).token;
});
