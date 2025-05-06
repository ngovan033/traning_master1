import { Tid } from "@/utils/hash";
import { IUser } from "@packages/types";
import axios, { AxiosError } from "axios";
import { useAuth } from "../contexts/auth";
import { useMst_District } from "./clientgate/Mst_DistrictApi";
import { useMst_Province_api } from "./clientgate/Mst_ProvinceApi";

// import { useMst_CostTypeApi } from "./clientgate/Mst_CostTypeApi";
import { FlagActiveConvertor } from "@packages/api/interceptors/flag-active-convertor";
import { useGetForCurrentUser } from "./clientgate/Api_GetForCurrentUser";
import { useMst_AreaApi } from "./clientgate/Mst_AreaApi";
import { useBtlBulletinDealerApi } from "./clientgate/carservice/BtlBulletinDealerApi";
import { useBtlBulletinHTVApi } from "./clientgate/carservice/BtlBulletinHTVApi";
import { useCarWarrantyInformationApi } from "./clientgate/carservice/CarWarrantyInformationApi";
import { useDanhSachHangBaoHiemNoApi } from "./clientgate/carservice/DanhSachHangBaoHiemNoApi";
import { useDealerHistoryShareMngApi } from "./clientgate/carservice/DealerHistoryShareMngApi";
import { useDieu_Chuyen } from "./clientgate/carservice/DieuChuyenApi";
import { useDlr_PDIRequestApi } from "./clientgate/carservice/Dlr_PDIRequestApi";
import { useJDP_Mst_JDPowerTerm } from "./clientgate/carservice/JDP_Mst_JDPowerTermApi";
import { useNPPCapNhatBaoHanhApi } from "./clientgate/carservice/NPPCapNhatNgayBaoHanh";
import { useNPPQLChienDichApi } from "./clientgate/carservice/NPPQLChienDichApi";
import { useNPPTimKiemXeApi } from "./clientgate/carservice/NPPTimKiemXeAPi";
import { usePhuTungChiaSeHeThongApi } from "./clientgate/carservice/PhuTungChiaSeHeThongApi";
import { useQLCongNoKhachHangApi } from "./clientgate/carservice/QLCongNoKhachHangApi";
import { useQLDanhSachNoNCCApi } from "./clientgate/carservice/QLDanhSachNoNCCApi";
import { useQLDatHangTonKhoToiUuApi } from "./clientgate/carservice/QLDatHangTonKhoToiUuApi";
import { useQLKhieuNaiDonHangApi } from "./clientgate/carservice/QLKhieuNaiDonHangApi";
import { useQLPhieuXuatTraHangNCCApi } from "./clientgate/carservice/QLPhieuXuatTraHangNCCApi";
import { useRO_Search_InfoApi } from "./clientgate/carservice/RO_Search_InfoApi";
import { useRepair_OrderApi } from "./clientgate/carservice/Repair_OrderApi";
import { useReq_PartPriceApi } from "./clientgate/carservice/Req_PartPriceApi";
import { useRptInventoryBalanceGroupByPart } from "./clientgate/carservice/RptInventoryBalanceGroupByPartApi";
import { useSearchRONPPApi } from "./clientgate/carservice/SearchRONPPApi";
import { useSearch_ROApi } from "./clientgate/carservice/Search_ROApi";
import { useSerAppApi } from "./clientgate/carservice/SerAppApi";
import { useSer_Inv_StockIn } from "./clientgate/carservice/SerInvStockIn";
import { useSerInvStockOutApi } from "./clientgate/carservice/SerInvStockOutApi";
import { useSerInvStockOutOrderApi } from "./clientgate/carservice/SerInvStockOutOrderApi";
import { useSerROApi } from "./clientgate/carservice/SerROApi";
import { useSerROWarrantyReportDealerApi } from "./clientgate/carservice/SerROWarrantyReportDealerApi";
import { useSerROWarrantyReportNPPApi } from "./clientgate/carservice/SerROWarrantyReportNPPApi";
import { useSerReceptionFApi } from "./clientgate/carservice/SerReceptionFApi";
import { useSer_Inv_QuoteApi } from "./clientgate/carservice/Ser_Inv_QuoteApi";
import { useSer_Inv_StockAdjApi } from "./clientgate/carservice/Ser_Inv_StockAdjApi";
import { useSer_Order_PartApi } from "./clientgate/carservice/Ser_Order_PartApi";
import { useSer_ROApi } from "./clientgate/carservice/Ser_ROApi";
import { useServiceStatusApi } from "./clientgate/carservice/ServiceStatusApi";
import { useStatusServiceAdminApi } from "./clientgate/carservice/StatusServiceAdminApi";
import { useTST_PartApi } from "./clientgate/carservice/TST_PartApi";
import { useThuVienKyThuatApi } from "./clientgate/carservice/ThuVienKyThuat";
import { useTimKiemPhuTungCanChiaSeApi } from "./clientgate/carservice/TimKiemPhuTungCanChiaSeApi";
import { useTongHopXuatTheoLenhApi } from "./clientgate/carservice/TongHopXuatTheoLenhApi";
import { useXuat_Kho } from "./clientgate/carservice/XuatKhoApi";
import { useSerCustomerCare24hApi } from "./clientgate/customerCare/SerCustomerCare24hApi";
import { useSerCustomerCare72hApi } from "./clientgate/customerCare/SerCustomerCare72hApi";
import { useSerCustomerCareBthApi } from "./clientgate/customerCare/SerCustomerCareBthApi";
import { useSerCustomerCareMaceApi } from "./clientgate/customerCare/SerCustomerCareMaceApi";
import { useBOMApi } from "./clientgate/master/BOMApi";
import { useRpt_PiVotChamTonToiThieuApi } from "./clientgate/master/BaoCaoPiVotChamTonToiThieuApi";
import { useMstSerAppTypeApi } from "./clientgate/master/MstSerAppTypeApi";
import { useMst_BieuMauIn } from "./clientgate/master/Mst_BieuMauIn";
import { useMst_CarModelStdApi } from "./clientgate/master/Mst_CarModelStd";
import { useMst_CompartmentApi } from "./clientgate/master/Mst_Compartment";
import { useMst_DeliveryFormApi } from "./clientgate/master/Mst_DeliveryForm";
import { useMst_DeliveryLocationApi } from "./clientgate/master/Mst_DeliveryLocation";
import { useMst_OrderComplainImageTypeApi } from "./clientgate/master/Mst_OrderComplainImageType";
import { useMst_OrderComplainTypeApi } from "./clientgate/master/Mst_OrderComplainType";
import { useMst_ParamApi } from "./clientgate/master/Mst_Param";
import { useMst_Param_Optional } from "./clientgate/master/Mst_Param_Optional";
import { useMst_StaffApi } from "./clientgate/master/Mst_Staff";
import { useMst_UserManagerApi } from "./clientgate/master/Mst_UserManager";
import { useMst_VINModelOrginalApi } from "./clientgate/master/Mst_VINModelOrginal";
import { useSerCustomerApi } from "./clientgate/master/SerCustomerApi";
import { useSerMSTROWarrantyTypeApi } from "./clientgate/master/SerMSTROWarrantyTypeApi";
import { useSer_CampaignApi } from "./clientgate/master/Ser_Campaign";
import { useSer_CampaignDLApi } from "./clientgate/master/Ser_CampaignDLAPI";
import { useSer_CavityApi } from "./clientgate/master/Ser_Cavity";
import { useSer_Customer_CarApi } from "./clientgate/master/Ser_CustomerCar";
import { useSer_Customer_GroupApi } from "./clientgate/master/Ser_CustomerGroup";
import { useSer_EngineerApi } from "./clientgate/master/Ser_Engineer";
import { useSer_GroupRepairApi } from "./clientgate/master/Ser_GroupRepair";
import { useSer_InsuranceAPIApi } from "./clientgate/master/Ser_InsuranceAPI";
import { useSer_InsuranceContractApi } from "./clientgate/master/Ser_InsuranceContractApi";
import { useSer_Inv_PartPriceApi } from "./clientgate/master/Ser_Inv_PartPricePageApi";
import { useSerInvStockApi } from "./clientgate/master/Ser_Inv_Stock";
import { useSer_MST_CustomerType } from "./clientgate/master/Ser_MST_CustomerType";
import { useSer_MST_Model } from "./clientgate/master/Ser_MST_Model";
import { useSer_MST_Part } from "./clientgate/master/Ser_MST_Part";
import { useSer_MST_PartGroup } from "./clientgate/master/Ser_MST_PartGroup";
import { useSer_MST_PartType } from "./clientgate/master/Ser_MST_PartType";
import { useSer_MST_ROComplaintDiagnosticError } from "./clientgate/master/Ser_MST_ROComplaintDiagnosticErrorApi";
import { useSer_MST_ROMaintanceSetting } from "./clientgate/master/Ser_MST_ROMaintanceSetting";
import { useSer_MST_ROWarrantyPhotoType } from "./clientgate/master/Ser_MST_ROWarrantyPhotoType";
import { useSer_MST_ROWarrantyType } from "./clientgate/master/Ser_MST_ROWarrantyTypeApi";
import { useSer_MST_ROWarrantyWork } from "./clientgate/master/Ser_MST_ROWarrantyWorkApi";
import { useSer_MST_Service } from "./clientgate/master/Ser_MST_Service";
import { useSer_MST_ServiceType } from "./clientgate/master/Ser_MST_ServiceTypeApi";
import { useSer_Mst_FilePathVideoApi } from "./clientgate/master/Ser_Mst_FilePathVideoApi";
import { useSer_Mst_Location } from "./clientgate/master/Ser_Mst_Location";
import { useSer_Mst_ModelAudImageApi } from "./clientgate/master/Ser_Mst_ModelAudImageApi";
import { useSer_Mst_SupplierApi } from "./clientgate/master/Ser_Mst_SupplierApi";
import { useSer_Mst_TradeMark } from "./clientgate/master/Ser_Mst_TradeMarkApi";
import { useSer_ServicePackageApi } from "./clientgate/master/Ser_ServicePackage";
import { useSys_GroupApi } from "./clientgate/master/Sys_GroupApi";
import { useTST_Mst_Exchange_Unit } from "./clientgate/master/TST_Mst_Exchange_UnitApi";
import { useTST_Mst_PartApi } from "./clientgate/master/TST_Mst_Part";
import { useReportKPIApi } from "./clientgate/report/ReportKPI";
import { useReport_ROByDateApi } from "./clientgate/report/ReportROByDate";
import { use_RptDMSSerDealerNetPricePartApi } from "./clientgate/report/RptDMSSerDealerNetPricePartApi";
import { useRpt_DMSSerRptDMSClaimApi } from "./clientgate/report/RptDMSSerRptDMSClaim";
import { useRptDMSSerWarrantyMainPartApi } from "./clientgate/report/RptDMSSerWarrantyMainPartApi";
import { useRpt_SerCamMarketingHTCSummaryApi } from "./clientgate/report/RptSerCamMarketingHTCSummary";
import { useRpt_Ability_Supply_PartsApi } from "./clientgate/report/Rpt_Ability_Supply_PartsApi";
import { useRpt_BaoHanhThongKeTheoModelApi } from "./clientgate/report/Rpt_BaoHanhThongKeTheoModelApi";
import { useRpt_BaoHanhThongKeTheoThangApi } from "./clientgate/report/Rpt_BaoHanhThongKeTheoThangApi";
import { useRpt_BaoHanhXeSOLATIApi } from "./clientgate/report/Rpt_BaoHanhXeSOLATIApi";
import { useRpt_Correct_Repair_RateApi } from "./clientgate/report/Rpt_Correct_Repair_RateApi";
import { useRpt_DMSSerXeConHanBaoHanhApi } from "./clientgate/report/Rpt_DMSSerXeConHanBaoHanhApi";
import { useSer_InvReportPartMinQuantityApi } from "./clientgate/report/Rpt_Ser_InvReportPartMinQuantityApi";
import { useRpt_SlowRotationPartsApi } from "./clientgate/report/Rpt_SlowRotationPartsApi";
import { useRpt_ThongKeTheoDaiLyApi } from "./clientgate/report/Rpt_ThongKeTheoDaiLyAPi";
import { useRpt_ThongKeTheoKhuVucApi } from "./clientgate/report/Rpt_ThongKeTheoKhuVucApi";
import { useRpt_VehicleServiceFrequencyApi } from "./clientgate/report/Rpt_VehicleServiceFrequencyApi";
import { useSer_CountCustomerOnlyHTCApi } from "./clientgate/report/SerCountCustomerOnlyHTC";
import { useSer_InvReportBalanceRptApi } from "./clientgate/report/SerInvReportBalanceRpt";
import { useSer_InvReportInsuranceDebitRptApi } from "./clientgate/report/SerInvReportInsuranceDebitRpt";
import { useSer_InvReportTotalStockInDetailRptApi } from "./clientgate/report/SerInvReportTotalStockInDetailRpt";
import { useSer_InvReportTotalStockInRptApi } from "./clientgate/report/SerInvReportTotalStockInRpt";
import { useSer_InvReportTotalStockOutDetailRptApi } from "./clientgate/report/SerInvReportTotalStockOutDetailRpt";
import { useSer_InvReportTotalStockOutRptApi } from "./clientgate/report/SerInvReportTotalStockOutRpt";
import { useSer_InventoryReportInOutBalanceApi } from "./clientgate/report/SerInventoryReportInOutBalance";
import { useSer_PaymentApi } from "./clientgate/report/SerPayment";
import { useSer_ROStatisticServiceByGroupApi } from "./clientgate/report/SerROStatisticServiceByGroup";
import { useSer_ROWarrantyReportHTCRLUApi } from "./clientgate/report/SerROWarrantyReportHTCRLU";
import { useSer_ReportReceivableDebitRptApi } from "./clientgate/report/SerReportReceivableDebitRpt";
import { useSer_WarrantyAcceptRptApi } from "./clientgate/report/SerWarrantyAcceptRpt";
import { useSer_Campaign_Dealer_RptApi } from "./clientgate/report/Ser_Campaign_Dealer_RptApi";
import { useSer_Count_CustomerApi } from "./clientgate/report/Ser_Count_CustomerApi";
import { useSer_Count_Customer_To_HTCApi } from "./clientgate/report/Ser_Count_Customer_To_HTCApi";
import { useSer_Customer_Care_RptApi } from "./clientgate/report/Ser_Customer_Care_RptApi";
import { useSer_InvReportCardStockRptApi } from "./clientgate/report/Ser_InvReportCardStockRpt";
import { useSer_InvReportCusDebitRptApi } from "./clientgate/report/Ser_InvReportCusDebitRpt";
import { useSer_InvReportPartTopProfitApi } from "./clientgate/report/Ser_InvReportPartTopProfitApi";
import { useSer_InvReportPartTopRevenueApi } from "./clientgate/report/Ser_InvReportPartTopRevenueApi";
import { useSer_InvReportPartTopRotateApi } from "./clientgate/report/Ser_InvReportPartTopRotateApi";
import { useSer_InvReportPartTopVariationPriceApi } from "./clientgate/report/Ser_InvReportPartTopVariationPriceApi";
import { useSer_InvReportRevenueRptApi } from "./clientgate/report/Ser_InvReportRevenueRpt";
import { useSer_ROWarrantyReportHTMVApi } from "./clientgate/report/Ser_ROWarrantyReportHTMVApi";
import { useSer_RO_ReportResult_RevenueApi } from "./clientgate/report/Ser_RO_ReportResult_Revenue";
import { useSer_ReportHistoryCostApi } from "./clientgate/report/Ser_ReportHistoryCostApi";
import { useSer_ReportRoVarianceCostApi } from "./clientgate/report/Ser_ReportRoVarianceCostApi";
import { useSer_Report_Customer_Not_BackApi } from "./clientgate/report/Ser_Report_Customer_Not_BackApi";
import { useThongKeBaoGiaChenhLechChuanApi } from "./clientgate/report/ThongKeBaoGiaChenhLechChuanApi";
import { useRpt_DMSSerThongKeBaoHanhTheoModelApi } from "./clientgate/report/ThongKeBaoHanhTheoModelApi";
import { useRpt_ThongKeCongViecApi } from "./clientgate/report/ThongKeCongViecApi";
import { useSerPartOOApi } from "./clientgate/storage/SerPartOOApi";
import { useCommonApi } from "./common-api";
// import { useRpt_BaoHanhThongKeTheoModelApi } from "./clientgate/report/Rpt_BaoHanhThongKeTheoModelApi";
// import { useMst_TCGCarPriceApi } from "./clientgate/Mst_TCGCarPriceApi";

// report start

// report end

/**
 * Creates an axios instance for making requests to the ClientGate API.
 * @param {IUser} currentUser - The current user's information.
 * @param {string} clientGateDomain - The base URL for the ClientGate API.
 * @param {string} networkId - The ID of the network.
 * @param {string} orgId - The ID of the organization.
 * @return {AxiosInstance} An axios instance configured for the ClientGate API.
 */
export const createReportApiBase = (
  currentUser: IUser,
  clientGateDomain: string,
  networkId: string,
  orgId: string
) => {
  const api = axios.create({
    baseURL: clientGateDomain,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      AppAgent: import.meta.env.VITE_AGENT,
      GwUserCode: import.meta.env.VITE_GW_USER,
      GwPassword: import.meta.env.VITE_GW_USER_PW,
      AppVerCode: "V1",
      Tid: Tid(),
      AppTid: Tid(),
      AppLanguageCode: currentUser.Language,
      UtcOffset: currentUser.TimeZone,
      NetworkId: networkId,
      OrgId: orgId,
    },
  });
  api.interceptors.request.use(
    FlagActiveConvertor.beforeRequest,
    function (error) {
      return Promise.reject(error);
    }
  );
  api.interceptors.request.use((config) => {
    config.headers.Tid = Tid();
    config.headers.AppTid = Tid();

    return config;
  });
  api.interceptors.response.use(
    function (response) {
      // with this API, it always falls to this case.
      const data = response.data;
      const result: any = {
        isSuccess: data.Data._strErrCode === "0" && !data.Data._excResult,
        debugInfo: data.Data._dicDebugInfo,
        errorInfo:
          data.Data._strErrCode === "0" ? undefined : data.Data._excResult,
        errorCode: data.Data._strErrCode,
        // customize
        _objTTime: data.Data._objTTime ?? "",
        _strAppTId: data.Data._strAppTId ?? "",
        _strErrCode: data.Data._strErrCode ?? "",
        _strTId: data.Data._strTId ?? "",
        _strType: data.Data._strType ?? "",
        _dicExcs: data.Data._dicExcs ?? {},
        _dicDebug: data.Data._dicDebug ?? {},
      };
      if (
        result.isSuccess &&
        !!data.Data._objResult &&
        !!data.Data._objResult.DataList
      ) {
        result.DataList = data.Data._objResult.DataList.map((item: any) => {
          // if `item` has `FlagActive` property
          if (Object.keys(item).includes("FlagActive")) {
            item.FlagActive = item.FlagActive === "1";
          }
          return {
            ...item,
          };
        });

        result.ItemCount = data.Data._objResult.ItemCount;
        result.PageCount = data.Data._objResult.PageCount;
        result.PageIndex = data.Data._objResult.PageIndex;
        result.PageSize = data.Data._objResult.PageSize;
      } else {
        if (
          !!data.Data?._objResult &&
          typeof data.Data?._objResult === "object"
        ) {
          result.Data = data.Data?._objResult.Data || data.Data?._objResult;
        } else if (typeof data.Data?._objResult !== "string") {
          result.Data = data.Data?._objResult?.map((item: any) => {
            // if `item` has `FlagActive` property
            if (Object.keys(item).includes("FlagActive")) {
              item.FlagActive = item.FlagActive === "1";
            }
            return {
              ...item,
            };
          });
        } else {
          result.Data = data.Data?._objResult;
        }
      }
      return result;
    },
    function (error: AxiosError) {
      if (error?.response?.status === 401) {
        location.href = "/login";
      }
      return Promise.reject(error.response?.data);
    }
  );
  return api;
};
/**
 * Creates an axios instance for making requests to the ClientGate API.
 * @param {IUser} currentUser - The current user's information.
 * @param {string} clientGateDomain - The base URL for the ClientGate API.
 * @param {string} networkId - The ID of the network.
 * @param {string} orgId - The ID of the organization.
 * @return {AxiosInstance} An axios instance configured for the ClientGate API.
 */
export const createClientGateApiBase = (
  currentUser: IUser,
  clientGateDomain: string,
  networkId: string,
  orgId: string
) => {
  const api = axios.create({
    baseURL: clientGateDomain,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      AppAgent: import.meta.env.VITE_AGENT,
      GwUserCode: import.meta.env.VITE_GW_USER,
      GwPassword: import.meta.env.VITE_GW_USER_PW,
      AppVerCode: "V1",
      Tid: Tid(),
      AppTid: Tid(),
      AppLanguageCode: currentUser.Language,
      UtcOffset: currentUser.TimeZone,
      NetworkId: networkId,
      OrgId: orgId,
    },
  });
  api.interceptors.request.use(
    FlagActiveConvertor.beforeRequest,
    function (error) {
      return Promise.reject(error);
    }
  );
  api.interceptors.request.use((config) => {
    config.headers.Tid = Tid();
    config.headers.AppTid = Tid();

    return config;
  });
  api.interceptors.response.use(
    function (response) {
      const data = response.data;
      const result: any = data.Data;
      result.isSuccess = result._strErrCode == "0";
      if (!!data.Data._objResult && !!data.Data._objResult.DataList) {
        result.DataList = data.Data._objResult.DataList.map((item: any) => {
          // if `item` has `FlagActive` property
          if (Object.keys(item).includes("FlagActive")) {
            item.FlagActive = item.FlagActive === "1";
          }
          return {
            ...item,
          };
        });

        result.ItemCount = data.Data._objResult.ItemCount;
        result.PageCount = data.Data._objResult.PageCount;
        result.PageIndex = data.Data._objResult.PageIndex;
        result.PageSize = data.Data._objResult.PageSize;
      } else {
        if (
          data.Data?._objResult &&
          typeof data.Data?._objResult !== "string"
        ) {
          if (data.Data?._objResult.Data) {
            result.Data = data.Data._objResult.Data;
          } else {
            result.Data = data.Data?._objResult.map((item: any) => {
              // if `item` has `FlagActive` property
              if (Object.keys(item).includes("FlagActive")) {
                item.FlagActive = item.FlagActive === "1";
              }
              return {
                ...item,
              };
            });
          }
        } else {
          result.Data = data.Data?._objResult;
        }
      }
      return result;
    },
    function (error: AxiosError) {
      if (error?.response?.status === 401) {
        location.href = "/login";
      }
      return Promise.reject(error.response?.data);
    }
  );

  return api;
};

export const createClientGateApi = (
  currentUser: IUser,
  clientgateDomain: string,
  networkId: string,
  orgId: string
) => {
  const apiBase = createClientGateApiBase(
    currentUser,
    clientgateDomain,
    networkId,
    orgId
  );
  const reportApiBase = createReportApiBase(
    currentUser,
    clientgateDomain,
    networkId,
    orgId
  );

  const CommonApi = useCommonApi(apiBase);
  const provinceApis = useMst_Province_api(apiBase);
  const mstDistrict = useMst_District(apiBase);
  const getCurrentUserApis = useGetForCurrentUser(reportApiBase);
  const mstAreaApi = useMst_AreaApi(apiBase);
  const ser_Mst_SupplierApi = useSer_Mst_SupplierApi(apiBase);
  const ser_Mst_TradeMark = useSer_Mst_TradeMark(apiBase);
  const TST_Mst_Exchange_Unit = useTST_Mst_Exchange_Unit(apiBase);
  const ser_MST_ServiceType = useSer_MST_ServiceType(apiBase);
  const Ser_Campaign_Dealer_RptApi = useSer_Campaign_Dealer_RptApi(apiBase);
  const ser_Count_CustomerApi = useSer_Count_CustomerApi(apiBase);
  const ser_Report_Customer_Not_BackApi =
    useSer_Report_Customer_Not_BackApi(apiBase);

  const get_Ser_Cavity_Api = useSer_CavityApi(apiBase);
  const get_Ser_GroupRepair_Api = useSer_GroupRepairApi(apiBase);
  const get_Mst_Staff_Api = useMst_StaffApi(apiBase);
  const get_Ser_Engineer_Api = useSer_EngineerApi(apiBase);
  const get_Mst_Compartment_Api = useMst_CompartmentApi(apiBase);
  const get_Ser_Campaign_Api = useSer_CampaignApi(apiBase);
  const get_Mst_Param_Api = useMst_ParamApi(apiBase);
  const get_Report_KPI = useReportKPIApi(apiBase);

  //LINHPV
  const useMstBieuMauIn = useMst_BieuMauIn(apiBase);
  const useSer_Inv_StockApi = useSerInvStockApi(apiBase);
  const useMstDeliveryLocationApi = useMst_DeliveryLocationApi(apiBase);
  const useMstDeliveryFormApi = useMst_DeliveryFormApi(apiBase);
  const useMstOrderComplainTypeApi = useMst_OrderComplainTypeApi(apiBase);
  const useTSTMstPartApi = useTST_Mst_PartApi(apiBase);
  const useSerCustomerCarApi = useSer_Customer_CarApi(apiBase);
  const ser_Count_Customer_To_HTCApi = useSer_Count_Customer_To_HTCApi(apiBase);
  const ser_Customer_Care_RptApi = useSer_Customer_Care_RptApi(apiBase);
  const rpt_Correct_Repair_RateApi = useRpt_Correct_Repair_RateApi(apiBase);
  const rpt_Ability_Supply_PartsApi = useRpt_Ability_Supply_PartsApi(apiBase);
  const ser_InvReportPartTopVariationPriceApi =
    useSer_InvReportPartTopVariationPriceApi(apiBase);
  const rpt_VehicleServiceFrequencyApi =
    useRpt_VehicleServiceFrequencyApi(apiBase);
  const ser_ReportHistoryCostApi = useSer_ReportHistoryCostApi(apiBase);
  const rpt_SlowRotationPartsApi = useRpt_SlowRotationPartsApi(apiBase);
  const useSerCustomerGroupApi = useSer_Customer_GroupApi(apiBase);
  const useMstCarModelStdApi = useMst_CarModelStdApi(apiBase);
  const useMstOrderComplainImageTypeApi =
    useMst_OrderComplainImageTypeApi(apiBase);

  const useSerROStatisticServiceByGroupApi =
    useSer_ROStatisticServiceByGroupApi(apiBase);
  const useSerInvReportTotalStockOutDetailRptApi =
    useSer_InvReportTotalStockOutDetailRptApi(apiBase);
  const useSerInvReportTotalStockInDetailRptApi =
    useSer_InvReportTotalStockInDetailRptApi(apiBase);
  const useSerInventoryReportInOutBalanceApi =
    useSer_InventoryReportInOutBalanceApi(apiBase);
  const useSerInvReportTotalStockOutRptApi =
    useSer_InvReportTotalStockOutRptApi(apiBase);
  const useSerInvReportTotalStockInRptApi =
    useSer_InvReportTotalStockInRptApi(apiBase);
  const useSerReportReceivableDebitRptApi =
    useSer_ReportReceivableDebitRptApi(apiBase);
  const useSerInvReportInsuranceDebitRptApi =
    useSer_InvReportInsuranceDebitRptApi(apiBase);
  const useSerInvReportCusDebitRptApi = useSer_InvReportCusDebitRptApi(apiBase);
  const useSerInvReportRevenueRptApi = useSer_InvReportRevenueRptApi(apiBase);
  const useSerInvReportBalanceRptApi = useSer_InvReportBalanceRptApi(apiBase);
  const useRptDMSSerRptDMSClaimApi = useRpt_DMSSerRptDMSClaimApi(apiBase);
  const useSerCountCustomerOnlyHTCApi = useSer_CountCustomerOnlyHTCApi(apiBase);
  const useSerServicePackageApi = useSer_ServicePackageApi(apiBase);
  const useSerWarrantyAcceptRptApi = useSer_WarrantyAcceptRptApi(apiBase);
  const useSerROWarrantyReportHTCRLUApi =
    useSer_ROWarrantyReportHTCRLUApi(apiBase);
  const useSerPaymentApi = useSer_PaymentApi(apiBase);
  const useSerInvReportCardStockRptApi =
    useSer_InvReportCardStockRptApi(apiBase);
  const useSerRO_ReportResultRevenueApi =
    useSer_RO_ReportResult_RevenueApi(apiBase);
  const useReportROByDateApi = useReport_ROByDateApi(apiBase);
  const useRptSerCamMarketingHTCSummaryApi =
    useRpt_SerCamMarketingHTCSummaryApi(apiBase);

  //LINHPV-End

  //DongNV
  const useSer_MST_ROWarrantyTypeAPI = useSer_MST_ROWarrantyType(apiBase);
  const useSer_MST_ROMaintanceSettingAPI =
    useSer_MST_ROMaintanceSetting(apiBase);
  const useSer_MST_ROWarrantyWorkAPI = useSer_MST_ROWarrantyWork(apiBase);
  const useSer_MST_ROWarrantyPhotoTypeAPI =
    useSer_MST_ROWarrantyPhotoType(apiBase);
  const useSer_ReportRoVarianceCost =
    useSer_ReportRoVarianceCostApi(reportApiBase);
  const useRpt_DMSSerThongKeBaoHanhTheoModel =
    useRpt_DMSSerThongKeBaoHanhTheoModelApi(reportApiBase);
  const useSerROWarrantyReportHTMV =
    useSer_ROWarrantyReportHTMVApi(reportApiBase);
  const useRpt_DMSSerXeConHanBaoHanh = useRpt_DMSSerXeConHanBaoHanhApi(apiBase);
  const useThongKeBaoGiaChenhLechChuan =
    useThongKeBaoGiaChenhLechChuanApi(reportApiBase);
  const useSer_CampaignDL = useSer_CampaignDLApi(reportApiBase);
  const Rpt_BaoHanhXeSOLATIApi = useRpt_BaoHanhXeSOLATIApi(reportApiBase);
  const useMstVINModelOrginalApi = useMst_VINModelOrginalApi(apiBase);
  const Rpt_BaoHanhThongKeTheoThangApi =
    useRpt_BaoHanhThongKeTheoThangApi(reportApiBase);
  const Rpt_BaoHanhThongKeTheoModelApi =
    useRpt_BaoHanhThongKeTheoModelApi(reportApiBase);

  const Rpt_ThongKeTheoDaiLyApi = useRpt_ThongKeTheoDaiLyApi(reportApiBase);
  const Rpt_ThongKeTheoKhuVuc = useRpt_ThongKeTheoKhuVucApi(reportApiBase);
  const Rpt_PiVotChamTonToiThieuApi =
    useRpt_PiVotChamTonToiThieuApi(reportApiBase);
  const RptDMSSerWarrantyMainPartApi =
    useRptDMSSerWarrantyMainPartApi(reportApiBase);

  // ====================================START THANGPV====================================
  // Masters
  const useSerMSTPartType = useSer_MST_PartType(apiBase);
  const useSerMstLocation = useSer_Mst_Location(apiBase);
  const useSerMSTCustomerType = useSer_MST_CustomerType(apiBase);
  const useSerMSTPartGroup = useSer_MST_PartGroup(apiBase);
  const useSerMSTModel = useSer_MST_Model(apiBase);
  const useMstParamOptional = useMst_Param_Optional(apiBase);
  const useSerMSTService = useSer_MST_Service(apiBase);
  const useSerMSTPart = useSer_MST_Part(apiBase);
  // Majors
  const useCarWarrantyInformation = useCarWarrantyInformationApi(apiBase); // 62. Tra cứu ngày đăng kí bảo hành
  const useSerInvStockIn = useSer_Inv_StockIn(apiBase); // 65. Quản lý phiếu nhập kho
  const useDlrPDIRequestApi = useDlr_PDIRequestApi(apiBase); // 60. Quản lý Yêu cầu PDI
  const useReqPartPriceApi = useReq_PartPriceApi(apiBase); // 76. Quản lý đề nghị nhà cung cấp
  const useSerOrderPartApi = useSer_Order_PartApi(apiBase); // 78. Quản lý đơn đặt hàng NCC
  const useServiceStatus = useServiceStatusApi(apiBase); // 43. Tình trạng dịch vụ
  const useStatusServiceAdmin = useStatusServiceAdminApi(apiBase); // 44. Trạng thái dịch vụ khách hàng
  const useROSearchInfoApi = useRO_Search_InfoApi(apiBase); // 48. Tìm kiếm lệnh sửa chữa
  const useSearchROApi = useSearch_ROApi(apiBase); // 49. Tìm kiếm thông tin sửa chữa
  const useTSTPartApi = useTST_PartApi(apiBase); // 79. Tra cứu phụ tùng
  const useDealerHistoryShareMng = useDealerHistoryShareMngApi(apiBase); // 50. Tra cứu lịch sử sửa chữa
  const useSerInvQuoteApi = useSer_Inv_QuoteApi(apiBase); // 51. 52. Quản lý báo giá phụ tùng
  const useSerInvStockAdjApi = useSer_Inv_StockAdjApi(apiBase); // 71. Quản lý điều chuyển kho
  const useRepairOrderApi = useRepair_OrderApi(apiBase); // 47. Lệnh sửa chữa
  const useSearchRONPP = useSearchRONPPApi(apiBase); // 157. NPP tìm kiếm thông tin sửa chữa
  const useJDPMstJDPowerTerm = useJDP_Mst_JDPowerTerm(apiBase); // 160. Quản lý kì khảo sát
  // ====================================END THANGPV====================================

  // KhanhNB
  const useBOM = useBOMApi(apiBase);
  const useSer_Mst_FilePathVideo = useSer_Mst_FilePathVideoApi(apiBase);
  const useSer_Mst_ModelAudImage = useSer_Mst_ModelAudImageApi(apiBase);
  const Ser_MST_ROComplaintDiagnosticErrorApi =
    useSer_MST_ROComplaintDiagnosticError(apiBase);
  const useSer_InsuranceAPI = useSer_InsuranceAPIApi(apiBase);
  const useSer_InsuranceContract = useSer_InsuranceContractApi(apiBase);
  const useRptDMSSerDealerNetPricePartApi =
    use_RptDMSSerDealerNetPricePartApi(apiBase);
  const useBtlBulletinDealerAPI = useBtlBulletinDealerApi(apiBase);
  const useSerAppAPI = useSerAppApi(apiBase);
  const useMstSerAppTypeAPI = useMstSerAppTypeApi(apiBase);
  const useSerReceptionFAPI = useSerReceptionFApi(apiBase);
  const useSerCustomerCareMaceAPI = useSerCustomerCareMaceApi(apiBase);
  const useSerCustomerCareBthAPI = useSerCustomerCareBthApi(apiBase);
  const useSerInvStockOutOrderAPI = useSerInvStockOutOrderApi(apiBase);
  const useSerROAPI = useSerROApi(apiBase);
  const useSerCustomerAPI = useSerCustomerApi(apiBase);
  const useSerCustomerCare72hAPI = useSerCustomerCare72hApi(apiBase);
  const useSerPartOOAPI = useSerPartOOApi(apiBase);
  const useSerROWarrantyReportDealerAPI =
    useSerROWarrantyReportDealerApi(apiBase);
  const useSerMSTROWarrantyTypeAPI = useSerMSTROWarrantyTypeApi(apiBase);
  const useBtlBulletinHTVAPI = useBtlBulletinHTVApi(apiBase);
  const useSerROWarrantyReportNPPAPI = useSerROWarrantyReportNPPApi(apiBase);
  const useSerCustomerCare24hAPI = useSerCustomerCare24hApi(apiBase);
  const useSerInvStockOutAPI = useSerInvStockOutApi(apiBase);

  //Quang
  const Ser_InvReportPartMinQuantityApi =
    useSer_InvReportPartMinQuantityApi(apiBase);
  const Ser_InvReportPartTopProfitApi =
    useSer_InvReportPartTopProfitApi(apiBase);
  const Ser_InvReportPartTopRevenueApi =
    useSer_InvReportPartTopRevenueApi(apiBase);
  const Ser_InvReportPartTopRotateApi =
    useSer_InvReportPartTopRotateApi(apiBase);
  const mst_UserManager = useMst_UserManagerApi(apiBase);
  const rptInventoryBalanceGroupByPart =
    useRptInventoryBalanceGroupByPart(apiBase); //75
  const thuVienKyThuat = useThuVienKyThuatApi(apiBase); //63
  const tongHopXuatTheoLenh = useTongHopXuatTheoLenhApi(apiBase); //68
  const timKiemPhuTungCanChiaSe = useTimKiemPhuTungCanChiaSeApi(apiBase); //69
  const phuTungChiaSeHeThong = usePhuTungChiaSeHeThongApi(apiBase); //70
  const qLCongNoKhachHang = useQLCongNoKhachHangApi(apiBase); //54
  const danhSachHangBaoHiemNo = useDanhSachHangBaoHiemNoApi(apiBase); //55
  const QLDanhSachNoNCC = useQLDanhSachNoNCCApi(apiBase); //56
  const NPPCapNhatBaoHanh = useNPPCapNhatBaoHanhApi(apiBase); //161
  const NPPTimKiemXe = useNPPTimKiemXeApi(apiBase); //162
  const QLKhieuNaiDonHang = useQLKhieuNaiDonHangApi(apiBase); //77
  const QLDatHangTonKhoToiUuApi = useQLDatHangTonKhoToiUuApi(apiBase); //72
  const QLPhieuXuatTraHangNCC = useQLPhieuXuatTraHangNCCApi(apiBase); //80
  const sys_GroupApi = useSys_GroupApi(apiBase); //80
  const NPPQLChienDich = useNPPQLChienDichApi(apiBase); //156
  const ThongKeCongViecApi = useRpt_ThongKeCongViecApi(apiBase);
  const Ser_Inv_PartPrice = useSer_Inv_PartPriceApi(apiBase); //11
  //NV
  const useXuatKho = useXuat_Kho(apiBase);
  const useDieuChuyen = useDieu_Chuyen(apiBase);

  //DungVA
  const useSer_ROAPI = useSer_ROApi(apiBase);
  return {
    ...Ser_Inv_PartPrice,
    ...ThongKeCongViecApi,
    ...NPPQLChienDich,
    ...sys_GroupApi,
    ...QLPhieuXuatTraHangNCC,
    ...QLDatHangTonKhoToiUuApi,
    ...QLKhieuNaiDonHang,
    ...NPPTimKiemXe,
    ...NPPCapNhatBaoHanh,
    ...QLDanhSachNoNCC,
    ...danhSachHangBaoHiemNo,
    ...qLCongNoKhachHang,
    ...useSerInvStockOutAPI,
    ...useSerCustomerCare24hAPI,
    ...useSerROWarrantyReportNPPAPI,
    ...useBtlBulletinHTVAPI,
    ...useSerMSTROWarrantyTypeAPI,
    ...useSerROWarrantyReportDealerAPI,
    ...useSerPartOOAPI,
    ...useSerCustomerCare72hAPI,
    ...useSerCustomerAPI,
    ...useSerROAPI,
    ...useSerInvStockOutOrderAPI,
    ...useSerCustomerCareBthAPI,
    ...useSerCustomerCareMaceAPI,
    ...useSerReceptionFAPI,
    ...useMstSerAppTypeAPI,
    ...useSerAppAPI,
    ...phuTungChiaSeHeThong,
    ...timKiemPhuTungCanChiaSe,
    ...tongHopXuatTheoLenh,
    ...thuVienKyThuat,
    ...RptDMSSerWarrantyMainPartApi,
    ...Rpt_PiVotChamTonToiThieuApi,
    ...rptInventoryBalanceGroupByPart,
    ...useBtlBulletinDealerAPI,
    ...useXuatKho,
    ...useDieuChuyen,
    ...CommonApi,
    ...useRptDMSSerDealerNetPricePartApi,
    ...mst_UserManager,
    ...useMstVINModelOrginalApi,
    ...Ser_InvReportPartTopProfitApi,
    ...Ser_InvReportPartTopRotateApi,
    ...Ser_InvReportPartMinQuantityApi,
    ...Ser_InvReportPartTopRevenueApi,
    ...get_Ser_GroupRepair_Api,
    ...get_Mst_Staff_Api,
    ...get_Report_KPI,
    ...get_Ser_Engineer_Api,
    ...get_Mst_Compartment_Api,
    ...mstDistrict,
    ...provinceApis,
    ...getCurrentUserApis,
    ...mstAreaApi,
    ...ser_Mst_SupplierApi,
    ...get_Ser_Campaign_Api,
    ...get_Mst_Param_Api,

    ...useMstBieuMauIn, //LINHPV
    ...useSer_Inv_StockApi, //LINHPV
    ...useMstDeliveryLocationApi, //LINHPV
    ...useMstDeliveryFormApi, //LINHPV
    ...useMstOrderComplainTypeApi, //LINHPV
    ...useTSTMstPartApi, //LINHPV
    ...useSerCustomerCarApi, //LINHPV
    ...useSerCustomerGroupApi, //LINHPV
    ...useSerROStatisticServiceByGroupApi, //LINHPV
    ...useSerInvReportTotalStockOutDetailRptApi, //LINHPV
    ...useSerInvReportTotalStockInDetailRptApi, //LINHPV
    ...useSerInventoryReportInOutBalanceApi, //LINHPV
    ...useSerInvReportCusDebitRptApi, //LINHPV
    ...useSerInvReportInsuranceDebitRptApi, //LINHPV
    ...useSerReportReceivableDebitRptApi, //LINHPV
    ...useSerInvReportTotalStockInRptApi, //LINHPV
    ...useSerInvReportTotalStockOutRptApi, //LINHPV
    ...useSerInvReportRevenueRptApi, //LINHPV
    ...useSerRO_ReportResultRevenueApi, //LINHPV
    ...useSerInvReportBalanceRptApi, //LINHPV
    ...useReportROByDateApi, //LINHPV
    ...useSerInvReportCardStockRptApi, //LINHPV
    ...useSerPaymentApi, //LINHPV
    ...useRptDMSSerRptDMSClaimApi, //LINHPV
    ...useSerCountCustomerOnlyHTCApi, //LINHPV
    ...useSerROWarrantyReportHTCRLUApi, //LINHPV
    ...useSerServicePackageApi, //LINHPV
    ...useMstCarModelStdApi, //LINHPV
    ...useMstOrderComplainImageTypeApi, //LINHPV
    ...useSerWarrantyAcceptRptApi, //LINHPV
    ...useRptSerCamMarketingHTCSummaryApi, //LINHPV
    ...Rpt_BaoHanhThongKeTheoThangApi, //DongNV
    ...useSer_CampaignDL, //DongNV
    ...Ser_Campaign_Dealer_RptApi, //Tuệ
    ...ser_Count_CustomerApi, //Tuệ
    ...ser_Count_Customer_To_HTCApi, //Tuệ
    ...ser_Customer_Care_RptApi, //Tuệ
    ...rpt_Correct_Repair_RateApi, //Tuệ
    ...ser_Report_Customer_Not_BackApi, //Tuệ
    ...rpt_Ability_Supply_PartsApi, //Tuệ
    ...ser_ReportHistoryCostApi, //Tuệ
    ...rpt_SlowRotationPartsApi, //Tuệ
    ...rpt_VehicleServiceFrequencyApi, //Tuệ
    ...ser_InvReportPartTopVariationPriceApi,
    ...useSerMSTPartType, // ThangPV
    ...useSerMstLocation, // ThangPV
    ...useSerMSTCustomerType, // ThangPV
    ...useSerMSTPartGroup, // ThangPV
    ...useSerMSTModel, // ThangPV
    ...useMstParamOptional, // ThangPV
    ...useSerMSTService, // ThangPV
    ...useSerMSTPart, // ThangPV
    ...useSerInvStockIn, // ThangPV
    ...useCarWarrantyInformation, // ThangPV
    ...useDlrPDIRequestApi, // ThangPV
    ...useReqPartPriceApi, // ThangPV
    ...useSerOrderPartApi, // ThangPV
    ...useServiceStatus, // ThangPV
    ...useStatusServiceAdmin, // ThangPV
    ...useROSearchInfoApi, // ThangPV
    ...useSearchROApi, // ThangPV
    ...useTSTPartApi, // ThangPV
    ...useDealerHistoryShareMng, // ThangPV
    ...useSerInvQuoteApi, // ThangPV
    ...useSerInvStockAdjApi, // ThangPV
    ...useRepairOrderApi, // ThangPV
    ...useSearchRONPP, // ThangPV
    ...useJDPMstJDPowerTerm, // ThangPV
    ...get_Ser_Cavity_Api,
    ...useSer_MST_ROMaintanceSettingAPI, //DongNV
    ...useSer_MST_ROWarrantyTypeAPI, // DongNV
    ...useSer_MST_ROWarrantyWorkAPI,
    ...useSer_MST_ROWarrantyTypeAPI, // DongNV
    ...useThongKeBaoGiaChenhLechChuan, //DongNV
    ...useRpt_DMSSerThongKeBaoHanhTheoModel, //DongNV
    ...Rpt_BaoHanhXeSOLATIApi, //DongNV
    ...useRpt_DMSSerXeConHanBaoHanh, //DongNV
    ...useSerROWarrantyReportHTMV, //DongNV
    ...Rpt_BaoHanhThongKeTheoModelApi, // DongNV
    ...ser_Mst_TradeMark, //Tuệ
    ...TST_Mst_Exchange_Unit, //Tuệ
    ...ser_MST_ServiceType, //Tuệ
    ...useSer_MST_ROWarrantyPhotoTypeAPI,
    ...Rpt_ThongKeTheoDaiLyApi,
    ...Rpt_BaoHanhThongKeTheoModelApi,
    ...Rpt_ThongKeTheoKhuVuc,
    ...useBOM,
    ...useSer_Mst_FilePathVideo,
    ...useSer_Mst_ModelAudImage,
    ...Ser_MST_ROComplaintDiagnosticErrorApi,
    ...useSer_ReportRoVarianceCost,
    ...useSer_InsuranceAPI,
    ...useSer_InsuranceContract,
    ...useSer_ROAPI, // DungVA
  };
};

export const useClientgateApi = () => {
  const {
    auth: { currentUser, networkId, orgData, clientGateUrl },
  } = useAuth();
  return createClientGateApi(
    currentUser!,
    clientGateUrl!,
    networkId,
    orgData?.Id!
  );
};
