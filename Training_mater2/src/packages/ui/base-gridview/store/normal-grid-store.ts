import { atom } from "jotai";

interface GridState {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}
export const gridStateAtom = atom<GridState>({
  pageIndex: 0,
  pageSize: 100,
  pageCount: 0,
  totalCount: 0,
});
export const normalGridSelectionKeysAtom = atom<string[]>([]);
export const normalGridDeleteMultipleConfirmationBoxAtom = atom<boolean>(false);
export const normalGridDeleteSingleConfirmationBoxAtom = atom<boolean>(false);
export const normalGridSingleDeleteItemAtom = atom<string>("");
export const showPoppup = atom<boolean>(false);
export const checkDataPopPup = atom<boolean>(true);
