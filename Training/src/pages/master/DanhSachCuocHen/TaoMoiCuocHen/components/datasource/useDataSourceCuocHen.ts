import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { usePermissions } from "@/packages/contexts/permission";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { format } from "date-fns";
import { useSetAtom } from "jotai";

export const useDataSourceCuocHen = () => {
  const api = useClientgateApi();
  const { isDealer } = usePermissions();
  const setLoading = useSetAtom(loadPanelAtom);
  const { t } = useI18n("SerApp");
  const showError = useSetAtom(showErrorAtom);
  const { showDialog } = useDialog();

  // Loại cuộc hẹn
  const getAppTypeCodeDataSource = async () => {
    const resp: any = await api.MstSerAppType_GetAllActive();

    const result = resp.DataList ?? [];

    return result;
  };

  // Lấy thông tin cố vấn dịch vụ
  const getCVDVCodeDataSource = async () => {
    const resp: any = await api.Ser_Engineer_GetForSerAppDL();

    const result = resp.Data?.lst_Ser_Engineer ?? [];

    return result;
  };

  // Lấy thông tin CavityID
  const getCavityIDDataSource = async () => {
    const resp: any = await api.Ser_Cavity_GetForSerApp();

    const result = resp.Data?.lst_Ser_Cavity ?? [];

    return result;
  };

  // Lấy thông tin chi tiết cuộc hẹn
  const getDetailSerApp = async (AppNo: string) => {
    setLoading(true);
    const resp = isDealer
      ? await api.SerApp_GetByAppIdDL({ AppID: AppNo, FlagWH: "0" })
      : await api.SerApp_GetByAppIdHQ({ AppID: AppNo, FlagWH: "0" });

    if (resp.isSuccess) {
      const SerApp =
        resp.Data && resp.Data.lst_Ser_App && resp.Data.lst_Ser_App.length > 0
          ? resp.Data.lst_Ser_App[0]
          : {};

      const Ser_AppServiceItems =
        resp.Data &&
        resp.Data.lst_Ser_AppServiceItems &&
        resp.Data.lst_Ser_AppServiceItems.length > 0
          ? resp.Data.lst_Ser_AppServiceItems?.map((item, index) => {
              return {
                ...item,
                STT: index + 1,
              };
            })
          : [];

      const Ser_AppPartItems =
        resp.Data &&
        resp.Data.lst_Ser_AppPartItems &&
        resp.Data.lst_Ser_AppPartItems.length > 0
          ? resp.Data.lst_Ser_AppPartItems?.map((item, index) => {
              return {
                ...item,
                InStockQuantity: item.InventoryQuantity,
                STT: index + 1,
              };
            })
          : [];

      setLoading(false);

      return {
        SerApp,
        Ser_AppServiceItems,
        Ser_AppPartItems,
      };
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
        SerApp: {},
        Ser_AppServiceItems: [],
        Ser_AppPartItems: [],
      };
    }
  };

  // Tạo mới cuộc hẹn
  const createSerApp = async (param) => {
    setLoading(true);
    const resp: any = await api.SerApp_CreateDL({
      strJson: JSON.stringify(param),
    });

    if (resp.isSuccess) {
      setLoading(false);
      const appId = resp.Data?.lst_Ser_App?.[0]?.AppId;

      return {
        success: true,
        AppId: appId,
      };
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
        success: false,
        AppId: null,
      };
    }
  };

  // Cập nhật cuộc hẹn
  const updateSerApp = async (param) => {
    setLoading(true);
    const resp = await api.SerApp_UpdateDL({
      strJson: JSON.stringify(param),
    });

    if (resp.isSuccess) {
      setLoading(false);
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

      setLoading(false);

      return false;
    }
  };

  // Xác nhận cuộc hẹn
  const confirmSerApp = async (AppId: string) => {
    setLoading(true);
    const resp = await api.SerApp_ConfirmDL(AppId);

    if (resp.isSuccess) {
      setLoading(false);
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

      setLoading(false);

      return false;
    }
  };

  // Hủy cuộc hẹn
  const cancelSerApp = async (AppId: string) => {
    setLoading(true);
    const resp = await api.SerApp_CancelDL(AppId);

    if (resp.isSuccess) {
      setLoading(false);
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

      setLoading(false);

      return false;
    }
  };

  // Tạo cuộc hẹn từ màn chăm sóc khách hàng 72h
  const getDetailSerAppFromCusCareID = async (CusCareID: string) => {
    setLoading(true);
    const resp = await api.SerApp_GetForSerCustomerCare72hDL(CusCareID);

    let result = {
      SerApp: {},
      Ser_AppServiceItems: [],
      Ser_AppPartItems: [],
    };

    if (resp.isSuccess) {
      const data = resp.Data;

      const SerApp =
        data && data.lst_Ser_App && data.lst_Ser_App.length > 0
          ? data.lst_Ser_App[0]
          : {
              AppTimeFrom: null,
              AppTime: null,
            };

      if (!SerApp.AppTimeFrom) {
        SerApp.AppTimeFrom = null;
      }

      if (!SerApp.AppTime) {
        SerApp.AppTime = null;
      }

      if (!SerApp.AppDateTimeFromDate) {
        SerApp.AppDateTimeFromDate = format(new Date(), "yyyy-MM-dd");
      }

      if (!SerApp.AppDateTimeFrom) {
        SerApp.AppDateTimeFrom = format(new Date(), "yyyy-MM-dd");
      }

      const Ser_AppServiceItems =
        data?.lst_Ser_AppServiceItems?.map((item, index) => {
          return {
            ...item,
            STT: index + 1,
          };
        }) ?? [];

      const Ser_AppPartItems =
        data?.lst_Ser_AppPartItems?.map((item, index) => {
          return {
            ...item,
            Quantity: item.Need,
            InStockQuantity: item.InventoryQuantity,
            STT: index + 1,
          };
        }) ?? [];

      result = {
        SerApp: {
          ...SerApp,
          TrademarkNameModel: SerApp.TradeMarkName,
        },
        Ser_AppServiceItems,
        Ser_AppPartItems,
      };
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

    return result;
  };

  // Tạo cuộc hẹn từ báo giá
  const getDetailSerAppFromRO = async (ROID: string) => {
    setLoading(true);
    const resp = await api.SerRO_GetForSerAppDL(ROID);

    if (resp.isSuccess) {
      const data = resp.Data;

      const SerApp =
        data && data.Lst_Ser_App && data.Lst_Ser_App.length > 0
          ? data.Lst_Ser_App[0]
          : {
              AppTimeFrom: format(new Date(), "HH:mm:ss"),
              AppTime: format(new Date(), "HH:mm:ss"),
            };

      if (!SerApp.AppTimeFrom) {
        SerApp.AppTimeFrom = format(new Date(), "HH:mm:ss");
      }

      if (!SerApp.AppTime) {
        SerApp.AppTime = format(new Date(), "HH:mm:ss");
      }

      if (!SerApp.AppDateTimeFromDate) {
        SerApp.AppDateTimeFromDate = format(new Date(), "yyyy-MM-dd");
      }

      if (!SerApp.AppDateTimeFrom) {
        SerApp.AppDateTimeFrom = format(new Date(), "yyyy-MM-dd");
      }

      const Ser_AppServiceItems =
        data?.Lst_Ser_AppServiceItems?.map((item, index) => {
          return {
            ...item,
            STT: index + 1,
          };
        }) ?? [];

      const Ser_AppPartItems =
        data?.Lst_Ser_AppPartItems?.map((item, index) => {
          return {
            ...item,
            Quantity: item.Need,
            InStockQuantity: item.InventoryQuantity,
            STT: index + 1,
          };
        }) ?? [];

      if (SerApp.CusID && SerApp.CarID) {
        const respKH = await api.SerCustomerCar_GetByCusIDDL(SerApp.CusID);

        if (!respKH.isSuccess || !respKH.Data) {
          showDialog({
            title: "Thông báo",
            message: "Không tìm thấy thông tin khách hàng",
          });

          setLoading(false);

          return {
            SerApp: {
              ...SerApp,
              TrademarkNameModel: SerApp.TradeMarkName,
            },
            Ser_AppServiceItems: Ser_AppServiceItems,
            Ser_AppPartItems: Ser_AppPartItems,
          };
        }

        if (Array.isArray(respKH.Data)) {
          const listKH = respKH.Data;

          if (listKH.length == 0) {
            showDialog({
              title: "Thông báo",
              message: "Không tìm thấy thông tin khách hàng",
            });

            setLoading(false);

            return {
              SerApp: {
                ...SerApp,
                TrademarkNameModel: SerApp.TradeMarkName,
              },
              Ser_AppServiceItems: Ser_AppServiceItems,
              Ser_AppPartItems: Ser_AppPartItems,
            };
          }

          const findKH = listKH.find((item) => item.CarID == SerApp.CarID);
          const firstKH = listKH[0];

          if (!findKH) {
            showDialog({
              title: "Thông báo",
              message: "Không tìm thấy thông tin xe",
            });

            setLoading(false);

            return {
              SerApp: {
                ...SerApp,
                FlagRO: "1",
                CusName: firstKH.CusName,
                CusTel: firstKH.CusTel,
                CusMobile: firstKH.CusMobile,
                TrademarkNameModel: SerApp.TradeMarkName,
              },
              Ser_AppServiceItems: Ser_AppServiceItems,
              Ser_AppPartItems: Ser_AppPartItems,
            };
          } else {
            setLoading(false);

            return {
              SerApp: {
                ...SerApp,
                ...findKH,
                TrademarkNameModel: findKH.ModelName,
              },
              Ser_AppServiceItems: Ser_AppServiceItems,
              Ser_AppPartItems: Ser_AppPartItems,
            };
          }
        }
      }

      setLoading(false);

      return {
        SerApp: {
          ...SerApp,
          TrademarkNameModel: SerApp.TradeMarkName,
        },
        Ser_AppServiceItems,
        Ser_AppPartItems,
      };
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
        SerApp: {},
        Ser_AppServiceItems: [],
        Ser_AppPartItems: [],
      };
    }
  };

  const getByCusID = async (CusID: string) => {
    setLoading(true);
    const resp = await api.Ser_CustomerCar_SearchDL({
      CusID: CusID,
      Ft_PageIndex: 0,
      Ft_PageSize: 1,
    });
    setLoading(false);

    return resp.DataList?.[0] ?? null;
  };

  return {
    getAppTypeCodeDataSource,
    getCVDVCodeDataSource,
    getCavityIDDataSource,
    getDetailSerApp,
    createSerApp,
    updateSerApp,
    confirmSerApp,
    cancelSerApp,
    getDetailSerAppFromCusCareID,
    getDetailSerAppFromRO,
    getByCusID,
  };
};
