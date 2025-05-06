import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSetAtom } from "jotai";

interface ISearchParam_Customer_Car {
  CusName: string;
  FrameNo: string;
  PlateNo: string;
  CusID?: string;
}

interface ISearchParam_Ser_ServicePackage {
  ServicePackageID: string;
}

export const useLogicHandle = () => {
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const setLoading = useSetAtom(loadPanelAtom);

  const jsonResultEntry_Customer_Car = async ({
    CusName,
    FrameNo,
    PlateNo,
    CusID,
  }: ISearchParam_Customer_Car) => {
    setLoading(true);

    const resp = await api.Ser_CustomerCar_SearchDL({
      CusName: CusName,
      FrameNo: FrameNo,
      PlateNo: PlateNo,
      CusID: CusID,
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    if (resp.isSuccess) {
      setLoading(false);
      return {
        Success: true,
        Data: resp,
      };
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
      return {
        Success: false,
        Data: null,
      };
    }
  };

  const jsonResultEntry_RT_Ser_ServicePackage = async (
    { ServicePackageID }: ISearchParam_Ser_ServicePackage,
    gridRef: any
  ) => {
    setLoading(true);

    const resp =
      await api.Ser_ServicePackage_Ser_ServicePackage_Get_SearchCreateRO_ByServicePackageID_DL(
        {
          ServicePackageID: ServicePackageID,
          Ft_PageIndex: gridRef?.getGridRef()?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.getGridRef()?.getDxInstance().pageSize() ?? 100,
        }
      );

    if (resp.isSuccess) {
      setLoading(false);
      return {
        Success: true,
        Data: resp,
      };
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
      return {
        Success: false,
        Data: null,
      };
    }
  };

  return {
    jsonResultEntry_Customer_Car,
    jsonResultEntry_RT_Ser_ServicePackage,
  };
};
