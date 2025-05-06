import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { custom } from "devextreme/ui/dialog";
import { useSetAtom } from "jotai";

export const useDataSource = () => {
  const api = useClientgateApi();
  const setLoading = useSetAtom(loadPanelAtom);
  const showError = useSetAtom(showErrorAtom);
  const { t } = useI18n("PopupPhuTung");

  const getListPartType = async () => {
    const resp = await api.Ser_MST_PartType_GetAllActive();

    return resp?.DataList ?? [];
  };

  const getListPartGroup = async () => {
    const resp = await api.Ser_MST_PartGroup_GetAllActive();

    return resp?.DataList ?? [];
  };

  const addPart = async (param) => {
    setLoading(true);
    const resp = await api.SerMSTPart_CreateForCommonDL(param);

    if (resp.isSuccess) {
      setLoading(false);

      return {
        success: true,
        data: resp.DataList?.[0] ?? null,
      };
    } else {
      const currentError = resp._strErrCode;

      if (currentError == "ErrCarSv.Ser_PartCode_Exist") {
        custom({
          title: "Đã xảy ra lỗi",
          messageHtml: `<p>Mã phụ tùng đã tồn tại!</p>`,
          buttons: [
            {
              text: "OK",
              onClick: (e) => {
                return;
              },
            },
          ],
        }).show();
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
      }

      setLoading(false);

      return {
        success: false,
        data: null,
      };
    }
  };

  const updatePart = async (param) => {
    const resp = await api.SerMSTPart_UpdateForCommonDL(param);

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
    getListPartType,
    getListPartGroup,
    addPart, // Thêm phụ tùng
    updatePart, // Cập nhật phụ tùng
  };
};
