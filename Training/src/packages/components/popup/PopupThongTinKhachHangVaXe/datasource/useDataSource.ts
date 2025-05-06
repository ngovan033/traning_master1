import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSetAtom } from "jotai";

export const useDataSource = () => {
  const api = useClientgateApi();
  const setLoading = useSetAtom(loadPanelAtom);
  const showError = useSetAtom(showErrorAtom);
  const { showDialog } = useDialog();
  const { t } = useI18n("PopupThongTinKhachHangVaXe");

  const cusPersonTypeListDataSource = [
    {
      type: "1",
      display: "Cá nhân",
    },
    {
      type: "2",
      display: "Tổ chức",
    },
  ];

  const genderListDataSource = [
    {
      key: "0",
      value: "Nữ",
    },
    {
      key: "1",
      value: "Nam",
    },
  ];

  const plateColorCodeListDataSource = [
    {
      key: "XANH",
      value: "Xanh",
    },
    {
      key: "ĐỎ",
      value: "Đỏ",
    },
    {
      key: "TRẮNG",
      value: "Trắng",
    },

    {
      key: "VÀNG",
      value: "Vàng",
    },
  ];

  const customerTypeListDataSource = async () => {
    setLoading(true);
    const resp = await api.Ser_MST_CustomerType_GetForCustomerCar();

    const result = resp?.DataList ?? [];

    setLoading(false);
    return result;
  };

  const provinceListDataSource = async () => {
    setLoading(true);
    const resp = await api.Mst_Province_GetAllActive();

    // const result =
    //   resp?.DataList?.sort((a, b) => {
    //     if (a.ProvinceName < b.ProvinceName) return -1;
    //     if (a.ProvinceName > b.ProvinceName) return 1;
    //     return 0;
    //   }) ?? [];

    const result = resp?.DataList ?? [];

    setLoading(false);
    return result;
  };

  const getDistrictListDataSource = async (provinceCode: string) => {
    setLoading(true);
    const resp = await api.Mst_District_GetByProvinceCode(provinceCode);

    // const result =
    //   resp?.DataList?.sort((a, b) => {
    //     if (a.DistrictName < b.DistrictName) return -1;
    //     if (a.DistrictName > b.DistrictName) return 1;
    //     return 0;
    //   }) ?? [];

    const result = resp?.DataList ?? [];

    setLoading(false);
    return result;
  };

  const getTradeMarkCodeListDataSource = async () => {
    setLoading(true);
    const resp = await api.Ser_Mst_TradeMark_GetAllActive();

    const result = resp?.DataList ?? [];

    setLoading(false);
    return result;
  };

  const getModelCodeListDataSource = async (tradeMarkCode: string) => {
    setLoading(true);
    const resp = await api.Ser_MST_Model_GetByTradeMarkCode(tradeMarkCode);

    const result =
      // resp?.DataList?.filter((item) => item.TradeMarkCode === tradeMarkCode) ??
      resp?.DataList ?? [];

    setLoading(false);
    return result;
  };

  const getInsuranceActive = async () => {
    setLoading(true);
    const resp = await api.Ser_InsuranceAPI_GetAllActive();

    const result = resp?.DataList ?? [];

    setLoading(false);
    return result;
  };

  const getMstPlateColorActive = async () => {
    setLoading(true);
    const resp = await api.MstPlateColor_GetAllActive();

    const result = resp?.DataList ?? [];

    setLoading(false);
    return result;
  };

  const getByCusAndCarID = async ({ CusID, CarID }: any) => {
    setLoading(true);

    if (!CusID && !CarID) {
      setLoading(false);
      return {
        Customer: {},
        Car: {},
      };
    }

    const resp: any = await api.SerCustomerCar_GetDL({
      CusID,
      CarID,
    });

    let result: any = {
      Customer: {},
      Car: {},
    };

    if (resp.isSuccess) {
      const customer = resp?.Data?.lst_Ser_Customer?.[0] ?? {};

      const car = resp?.Data?.lst_Ser_Car?.[0] ?? {};

      result.Customer = customer;
      result.Car = car;
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return result;
  };

  const saveDL = async (params: any) => {
    setLoading(true);
    const resp: any = await api.SerCustomerCar_SaveDL({
      strJson: JSON.stringify(params),
    });

    if (!resp.isSuccess) {
      setLoading(false);

      if (resp._strErrCode == "ErrCarSv.Ser_PlateNo_Exist") {
        showDialog({
          title: "Thông báo",
          message: "Biển số xe đã tồn tại trong hệ thống!",
        });

        return {
          success: false,
          data: null,
        };
      }

      if (resp._strErrCode == "ErrCarSv.mycheck_Ser_Customer_ExistIDCardNo") {
        showDialog({
          title: "Thông báo",
          message: "Số CMND đã tồn tại!",
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

    const Ser_Customer = resp.Data?.lst_Ser_Customer?.[0] ?? {};
    const Ser_Car = resp.Data?.lst_Ser_Car?.[0] ?? {};

    setLoading(false);
    return {
      success: true,
      data: {
        Ser_Customer: Ser_Customer,
        Ser_Car: Ser_Car,
      },
    };
  };

  return {
    genderListDataSource,
    customerTypeListDataSource,
    provinceListDataSource,
    getDistrictListDataSource,
    cusPersonTypeListDataSource,
    getTradeMarkCodeListDataSource,
    getModelCodeListDataSource,
    plateColorCodeListDataSource,
    getByCusAndCarID,
    saveDL,
    getInsuranceActive,
    getMstPlateColorActive,
  };
};
