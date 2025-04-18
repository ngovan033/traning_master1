import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSetAtom } from "jotai";

export const useMstLocationDataSource = () => {
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const setLoading = useSetAtom(loadPanelAtom);

  const getListMSTPartType = async () => {
    setLoading(true);

    const resp = await api.Ser_MST_PartType_GetAllActive();
    if (resp.isSuccess) {
      setLoading(false);

      return resp.DataList ?? [];
    } else {
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

      setLoading(false);

      return [];
    }
  };
  const getListMSTPartGroup = async () => {
    setLoading(true);

    const resp = await api.Ser_MST_PartGroup_GetAllActive();
    if (resp.isSuccess) {
      setLoading(false);

      return resp.DataList ?? [];
    } else {
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

      setLoading(false);

      return [];
    }
  };
  return {
    getListMSTPartType,
    getListMSTPartGroup,
  };
};
