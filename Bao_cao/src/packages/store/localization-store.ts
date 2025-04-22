import { atomsWithQuery } from "jotai-tanstack-query";
import { ccsApi } from "../api";

const [localeAtom] = atomsWithQuery((get) => ({
  queryKey: ["locale"],
  queryFn: async ({}) => {
    const res = await ccsApi.loadLocaleData();
    if (res.data.Success) {
      return res.data.Data;
    } else {
      return {};
    }
  },
  keepPreviousData: true,
}));

export { localeAtom };
