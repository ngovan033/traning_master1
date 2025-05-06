import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { showErrorAtom } from "@/packages/store";
import { useSetAtom } from "jotai";

export const useDataSource = () => {
  const api = useClientgateApi();
  const { showDialog } = useDialog();
  const showError = useSetAtom(showErrorAtom);
  const { t } = useI18n("PopupCongViec");

  const addService = async (param) => {
    const resp = await api.SerMSTService_CreateForCommonDL(param);

    if (resp.isSuccess) {
      return {
        success: true,
        data: resp?.DataList?.[0] ?? null,
      };
    } else {
      if (resp._strErrCode == "ErrCarSv.Ser_ServiceCode_Exist") {
        showDialog({
          title: "Thông báo",
          message: "Mã công việc đã tồn tại!",
        });

        return {
          success: false,
          data: null,
        };
      }

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

      return {
        success: false,
        data: null,
      };
    }
  };

  const updateService = async (param) => {
    const resp = await api.SerMSTService_UpdateForCommonDL(param);

    if (resp.isSuccess) {
      return true;
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

      return false;
    }
  };

  return {
    addService,
    updateService,
  };
};
