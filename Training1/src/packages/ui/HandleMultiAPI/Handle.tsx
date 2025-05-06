import { atom, useSetAtom } from "jotai";
import { dataMultiAtom } from "./store";

export const useHandleMutilAPI = () => {
  const setDataMulti = useSetAtom(dataMultiAtom);

  return {
    handleMulti: (data: any, tilteNotify: string) => {
      setDataMulti({ data, tilteNotify });
    },
  };
};
