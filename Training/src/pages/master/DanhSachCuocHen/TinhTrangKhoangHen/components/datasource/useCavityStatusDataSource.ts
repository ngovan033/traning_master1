import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSetAtom } from "jotai";

export const useCavityStatusDataSource = () => {
  const api = useClientgateApi();
  const setLoading = useSetAtom(loadPanelAtom);
  const showError = useSetAtom(showErrorAtom);
  const { t } = useI18n("SerApp");
  const getForCavityDL = async (param) => {
    setLoading(true);
    const resp = await api.SerApp_GetForCavityDL({
      ...param,
    });

    if (resp.isSuccess) {
      setLoading(false);

      return resp?.Data?.lst_Ser_App ?? [];
    } else {
      setLoading(false);

      showError({
        message: t(resp._strErrCode),
        _strErrCode: resp._strErrCode,
        _strTId: resp._strTId,
        _strAppTId: resp._strAppTId,
        _objTTime: resp._objTTime,
        _strType: resp._strType,
        _dicDebug: resp._dicDebug,
        _dicExcs: resp._dicExcs,
      });

      return [];
    }
  };

  const getAllCavity = async () => {
    const resp = await api.Ser_Cavity_GetAllActive();

    return resp.DataList ?? [];
  };

  return {
    getForCavityDL,
    getAllCavity,
  };
};
