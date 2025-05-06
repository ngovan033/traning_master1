import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSetAtom } from "jotai";

export const useMstLocationDataSource = () => {
  const { t } = useI18n("Error");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const setLoading = useSetAtom(loadPanelAtom);

  const getListCavityType = async () => {
    setLoading(true);

    const resp = await api.Mst_Compartment_GetAllActive();
    if (resp.isSuccess) {
      setLoading(false);

      return resp.DataList ?? [];
    } else {
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

      setLoading(false);

      return [];
    }
  };

  return {
    getListCavityType,
  };
};
