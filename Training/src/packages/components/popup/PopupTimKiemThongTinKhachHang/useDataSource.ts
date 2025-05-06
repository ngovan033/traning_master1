import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { useSetAtom } from "jotai";

export const useDataSource = () => {
  const api = useClientgateApi();

  const showError = useSetAtom(showErrorAtom);

  const getListPartType = async () => {
    const resp = await api.Ser_MST_PartType_GetAllActive();

    return resp?.DataList ?? [];
  };

  const getListPartGroup = async () => {
    const resp = await api.Ser_MST_PartGroup_GetAllActive();

    return resp?.DataList ?? [];
  };

  const addPart = async (param) => {
    const resp = await api.Ser_MST_Part_Create(param);

    if (resp.isSuccess) {
      return true;
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

      return false;
    }
  };

  const updatePart = async (param) => {
    const resp = await api.Ser_MST_Part_Update(param);

    if (resp.isSuccess) {
      return true;
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

      return false;
    }
  };

  return {
    getListPartType,
    getListPartGroup,
    addPart, // Thêm phụ tùng
    updatePart, // Cập nhật phụ tùng
  };
};
