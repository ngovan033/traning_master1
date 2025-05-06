import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { usePermissions } from "@/packages/contexts/permission";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { format } from "date-fns";
import { useSetAtom } from "jotai";
import { useParams } from "react-router-dom";

export const useDataSourceDanhSachNo = () => {
  const api = useClientgateApi();
  const { isDealer } = usePermissions();
  const setLoading = useSetAtom(loadPanelAtom);
  const { t } = useI18n("SerApp");
  const showError = useSetAtom(showErrorAtom);
  const { showDialog } = useDialog();
  // Lấy thông tin chi tiết cuộc hẹn

  const getSupplierDetail = async (SupplierID: string) => {
    setLoading(true);

    try {
      const resp = await api.QLDanhSachNoNCC_GetBySupplierId(SupplierID);

      if (resp.isSuccess && resp.Data) {
        const { lst_Ser_SupplierDebit, lst_Ser_Payment, lst_Ser_Mst_Supplier } =
          resp.Data;

          const GhiNoList =
          lst_Ser_SupplierDebit?.length > 0
            ? lst_Ser_SupplierDebit.map((item : any, index : any) => ({
                ...item,
                STT: index + 1,
              }))
            : [];
        
            const TraNoList =
            lst_Ser_Payment?.length > 0
              ? lst_Ser_Payment.map((item : any, index : any)  => ({
                  ...item,
                  STT: index + 1,
                }))
              : [];
          


        let SupplierList =
          lst_Ser_Mst_Supplier?.length > 0 ? lst_Ser_Mst_Supplier[0] : {};

        // Tính tổng DebitAmount và PaymentAmount
        const totalDebitAmount = GhiNoList.reduce(
          (sum: number, item: any) => sum + (item?.DebitAmount || 0),
          0
        );
        const totalPaymentAmount = TraNoList.reduce(
          (sum: number, item: any) => sum + (item?.PaymentAmount || 0),
          0
        );
        const conNo = totalDebitAmount - totalPaymentAmount;
        // Gộp tổng vào SupplierList
        SupplierList = {
          ...SupplierList,
          TotalDebitAmount: totalDebitAmount,
          TotalPaymentAmount: totalPaymentAmount,
          conNo: conNo,
        };
        console.log(SupplierList);

        return { SupplierList, GhiNoList, TraNoList };
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

        return { SupplierList: {}, GhiNoList: [], TraNoList: [] };
      }
    } catch (error) {
      console.error(error);
      showError({ message: "Có lỗi xảy ra khi lấy thông tin nhà cung cấp." });

      return { SupplierList: {}, GhiNoList: [], TraNoList: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    getSupplierDetail,
  };
};
