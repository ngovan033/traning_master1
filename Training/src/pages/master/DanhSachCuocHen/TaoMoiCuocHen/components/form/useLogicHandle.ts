import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSetAtom } from "jotai";

interface IParam {
  CusName: string;
  FrameNo: string;
  PlateNo: string;
}

export const useLogicHandle = () => {
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const setLoading = useSetAtom(loadPanelAtom);
  const { t } = useI18n("SerApp");
  const isOnlyFindOneCustomer = async ({
    CusName,
    FrameNo,
    PlateNo,
  }: IParam) => {
    setLoading(true);

    const resp = await api.Ser_CustomerCar_SearchDL({
      CusName: CusName,
      FrameNo: FrameNo,
      PlateNo: PlateNo,
      Ft_PageIndex: 0,
      Ft_PageSize: 2,
    });

    if (resp.isSuccess) {
      if (!resp.DataList || resp.DataList.length == 0) {
        setLoading(false);
        return {
          Data: null,
          Length: 0,
        };
      }

      if (resp.DataList.length == 1) {
        setLoading(false);
        return {
          Data: resp.DataList[0],
          Length: 1,
        };
      }

      if (resp.DataList.length > 1) {
        setLoading(false);
        return {
          Data: null,
          Length: resp.DataList.length,
        };
      }
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
      return {
        Length: 0,
        Data: null,
      };
    }
  };

  return {
    isOnlyFindOneCustomer,
  };
};
