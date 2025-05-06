import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSetAtom } from "jotai";

export const useLogicHandle = () => {
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const setLoading = useSetAtom(loadPanelAtom);

  const updateCustomer = async (param) => {
    setLoading(true);
    const resp = await api.SerCustomer_SaveForCusNormal(param);

    if (resp.isSuccess) {
      setLoading(false);
      return {
        isSuccess: true,
        data: resp.Data,
      };
    } else {
      setLoading(false);
      showError({
        message: resp._strErrCode,
        _strErrCode: resp._strErrCode,
        _strTId: resp._strTId,
        _strAppTId: resp._strAppTId,
        _objTTime: resp._objTTime,
        _strType: resp._strType,
        _dicDebug: resp._dicDebug,
        _dicExcs: resp._dicExcs,
      });

      return {
        isSuccess: false,
        data: null,
      };
    }
  };

  return {
    updateCustomer,
  };
};
