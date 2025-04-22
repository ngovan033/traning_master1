import usePrint from "@/components/print/usePrint";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useDataSource } from "@/packages/components/popup/PopupThongTinKhachHangVaXe/datasource/useDataSource";
import PopupThongTinKhachHangVaXe from "@/packages/components/popup/PopupThongTinKhachHangVaXe/PopupThongTinKhachHangVaXe";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useGetTime } from "@/packages/hooks/useGetTime";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { Button, Form, NumberBox, Popup } from "devextreme-react";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { Position, ToolbarItem } from "devextreme-react/popup";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { useAtomValue, useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { toast } from "react-toastify";
import { dataViewAtom, refecthAtom } from "../components/store";
import { PopupPayment } from "./popup-payment";
import "./styles.scss";
import { isValidDateTime } from "@/packages/common/date_utils";
import HeaderFormDebit from "./header-form-debit";

interface IPopupViewDebitProps {
  visible: boolean;
  container: string;
  formDebit: any;
}

export const PopupViewDebit = forwardRef(
  ({ visible, container, formDebit }: IPopupViewDebitProps, popupRef: any) => {
    const { t } = useI18n("Ser_CustomerCar");
    const { t: common } = useI18n("Common");
    const api = useClientgateApi();
    const dataSourceTTKHVX = useDataSource();
    const showPopup = useVisibilityControl({ defaultVisible: visible });
    const { quickPrint } = usePrint();
    const { convertTimeISOtoDate } = useGetTime();
    const showPaymentPopup = useVisibilityControl({
      defaultVisible: false,
    });
    const customerPopupRef = useRef<any>(null);
    const formDetailRef = useRef<any>(null);
    const paymentPopupRef = useRef<any>(null);
    const formPayRef = useRef<any>();
    const gridDebit1Ref = useRef<any>();
    const gridDebit2Ref = useRef<any>();

    const refetchAtom = useSetAtom(refecthAtom);
    const showError = useSetAtom(showErrorAtom);
    const setLoad = useSetAtom(loadPanelAtom);
    const dataView = useAtomValue(dataViewAtom);

    useImperativeHandle(popupRef, () => ({
      show() {
        showPopup.open();
      },
      async setDataFor2Grid(data1: any, data2: any) {
        await gridDebit1Ref.current?.setData(data1);
        await gridDebit2Ref.current?.setData(data2);
      },
    }));

    //===========================callAPI=====================================

    //===========================callAPI-end=====================================

    //===========================handle=====================================
    const handleClose = () => {
      showPopup.close();
      formPayRef?.current?.selectForm("0", {});
    };

    const handleClickPayBtn = () => {
      paymentPopupRef?.current.show();
      paymentPopupRef.current.setData({
        action: "create",
        CusID: dataView.CustomerInfo.CusID,
        PayDate: new Date(),
        PaymentAmount: 0,
        PayPersonName: "", //  dataView?.CustomerInfo?.CusName, // mặc định trống khi mở popup tạo mới
        PayPersonIDCardNo: "",
        Note: "",
      });
    };

    const handleClickViewDetail = async (CusID: any) => {
      await dataSourceTTKHVX
        .getByCusAndCarID({
          CusID: CusID,
          CarID: "",
        })
        .then((data: any) => {
          if (customerPopupRef.current) {
            customerPopupRef.current.showPopup(data);
          }
        });
    };

    //===========================handle-end=====================================

    //===========================columns1=====================================\
    const columns1: ColumnOptions[] = [
      {
        dataField: "IdxGrid",
        visible: true,
        caption: t("STT"),
        cssClass: "table-data-center table-data-stt",
        width: 80,
        alignment: "center",
        allowEditing: false,
        allowSorting: false,
        allowFiltering: false,
        allowSearch: false,
        allowResizing: false,
        editorOptions: { readOnly: true },
        cellRender: ({ rowIndex }) => {
          return <span>{rowIndex + 1}</span>;
        },
      },
      {
        dataField: "DebitDate",
        caption: t("DebitDate"),
        visible: true,
        width: 150,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
      },
      {
        dataField: "PlateNo",
        caption: t("PlateNo"),
        visible: true,
        width: 150,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
      },
      {
        dataField: "RONo",
        caption: t("RONo"),
        visible: true,
        width: 150,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
      },
      {
        dataField: "DebitAmount",
        caption: t("DebitAmount"),
        visible: true,
        width: 200,
        editorType: "dxNumberBox",
        dataType: "number",
        format: FORMAT_NUMBER.INT_NUMBER,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Note",
        caption: t("Note"),
        visible: true,
        width: 150,
        editorOptions: {
          readOnly: true,
        },
      },
    ];
    //===========================columns1-end=====================================

    //===========================columns2=====================================
    const columns2: ColumnOptions[] = [
      {
        dataField: "IdxGrid",
        visible: true,
        caption: t("STT"),
        cssClass: "table-data-center table-data-stt",
        width: 80,
        alignment: "center",
        allowEditing: false,
        allowSorting: false,
        allowFiltering: false,
        allowSearch: false,
        allowResizing: false,
        editorOptions: { readOnly: true },
        cellRender: ({ rowIndex }) => {
          return <span>{rowIndex + 1}</span>;
        },
      },
      {
        dataField: "PayDate",
        caption: t("PayDate"),
        width: 150,
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
      },
      {
        dataField: "PaymentAmount",
        caption: t("PaymentAmount"),
        visible: true,
        width: 200,
        editorType: "dxNumberBox",
        dataType: "number",
        format: FORMAT_NUMBER.INT_NUMBER,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
      },

      {
        dataField: "PayPersonName",
        visible: true,
        caption: t("PayPersonName"),
        width: 150,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "PayPersonIDCardNo",
        visible: true,
        caption: t("PayPersonIDCardNo"),
        width: 150,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "Note",
        caption: t("Note"),
        visible: true,
        width: 150,
        editorOptions: {
          readOnly: true,
        },
      },
    ];

    // In phiếu thu
    const handlePrint = async () => {
      const selectedData = gridDebit2Ref.current.getSelectedRowsData();
      if (!selectedData[0]) {
        toast.warning("Chưa chọn phiếu thu để in!");
        return;
      }
      setLoad(true);
      const response = await api.QLCongNoKhachHang_PrintDL(
        selectedData[0].PaymentID,
        false
      );
      setLoad(false);
      if (response?.isSuccess && response.Data) {
        quickPrint({
          url: response.Data!,
        });
      } else {
        showError({
          message: t(response!._strErrCode),
          _strErrCode: response!._strErrCode,
          _strTId: response!._strTId,
          _strAppTId: response!._strAppTId,
          _objTTime: response!._objTTime,
          _strType: response!._strType,
          _dicDebug: response!._dicDebug,
          _dicExcs: response!._dicExcs,
        });
      }
    };

    // Xóa nợ
    const handleDeleteRowsDebit = async (e: any) => {
      ConfirmComponent({
        asyncFunction: async () => {
          const {
            row: { data },
          } = e;
          setLoad(true);
          const response = await api.QLCongNoKhachHang_DeleteDebitDL(
            data.CusDebitID
          );
          setLoad(false);
          if (response?.isSuccess) {
            toast.success(t("Successfully Successfully"));
            refetchAtom(Date.now().toString());
          } else {
            showError({
              message: t(response!._strErrCode),
              _strErrCode: response!._strErrCode,
              _strTId: response!._strTId,
              _strAppTId: response!._strAppTId,
              _objTTime: response!._objTTime,
              _strType: response!._strType,
              _dicDebug: response!._dicDebug,
              _dicExcs: response!._dicExcs,
            });
          }
        },
        title: common("Confirm"),
        contentConfirm: common("Do you want to delete?"),
      });
    };

    // Xóa thanh toán
    const handleDeleteRowsPayment = async (e: any) => {
      ConfirmComponent({
        asyncFunction: async () => {
          const {
            row: { data },
          } = e;
          setLoad(true);
          const response = await api.QLCongNoKhachHang_DeleteDL(data.PaymentID);
          setLoad(false);
          if (response?.isSuccess) {
            toast.success(t("Successfully Successfully"));
            refetchAtom(Date.now().toString());
          } else {
            showError({
              message: t(response!._strErrCode),
              _strErrCode: response!._strErrCode,
              _strTId: response!._strTId,
              _strAppTId: response!._strAppTId,
              _objTTime: response!._objTTime,
              _strType: response!._strType,
              _dicDebug: response!._dicDebug,
              _dicExcs: response!._dicExcs,
            });
          }
        },
        title: common("Confirm"),
        contentConfirm: common("Do you want to delete?"),
      });
    };

    //
    const handleSaveCusDebitPayment = async () => {
      const validate = formDetailRef.current?.instance?.validate();
      const paymentFormRef = paymentPopupRef.current.getFormRef();
      const dataForm = paymentFormRef.instance.option("formData");
      const TotalDebt =
        formDebit.lst_Ser_Customer.TotalDebt < 0
          ? 0
          : formDebit.lst_Ser_Customer.TotalDebt;
      // return;
      // Check luật
      // 1. Số tiền phải trả nhỏ hơn số tiền nợ
      // 2. Bạn đã thanh toán hết
      // 3. Giá trị phải lớn hơn 0
      // Nhập > 0 và <= số tiền Còn nợ thì được qua luật
      // 1. Số tiền trả phải <= số tiền còn nợ
      // 2. Nhập = 0 thì thông báo " Số tiền trả phải > 0"
      if (!validate?.isValid) {
        return;
      }

      if (
        dataForm.PayDate === "" ||
        dataForm.PayDate === null ||
        dataForm.PayDate === undefined
      ) {
        toast.warning("Thời gian không được để trống!");
        return;
      }

      const isValidPayDate = isValidDateTime(
        convertTimeISOtoDate(dataForm.PayDate)
      );
      if (!isValidPayDate) {
        toast.warning("Ngày trả không đúng định dạng!");
        return;
      }

      if (
        dataForm.PayDate === "" ||
        dataForm.PayDate === null ||
        dataForm.PayDate === undefined
      ) {
        toast.warning("Thời gian không được để trống!");
        return;
      }

      if (
        dataForm.PaymentAmount === "" ||
        dataForm.PaymentAmount === null ||
        dataForm.PaymentAmount === undefined
      ) {
        toast.warning("Số tiền trả không được bỏ trống!");
        return;
      }

      if (dataForm.PaymentAmount <= 0) {
        toast.warning("Số tiền trả phải > 0");
        return;
      }

      if (dataForm.PaymentAmount > TotalDebt) {
        toast.warning("Số tiền trả phải <= số tiền còn nợ");
        return;
      }

      ConfirmComponent({
        asyncFunction: async () => {
          const dataSave = {
            DealerCode: "",
            CusID: dataForm.CusID,
            PaymentAmount: dataForm.PaymentAmount,
            PayPersonName: dataForm.PayPersonName,
            PayPersonIDCardNo: dataForm.PayPersonIDCardNo,
            PayDate: convertTimeISOtoDate(dataForm.PayDate),
            Note: dataForm.Note,
            InsNo: 0,
            SupplierID: "",
            PaymentID: dataForm.PaymentID,
          };
          setLoad(true);
          const response = await api.QLCongNoKhachHang_UpdateCreateDL(
            dataForm.action === "update" ? true : false,
            dataSave
          );
          setLoad(false);
          if (response.isSuccess) {
            refetchAtom(Date.now().toString());
            paymentPopupRef.current.closePopup();
            toast.success(t("Successfully CusDebitPayment"));
          } else {
            showError({
              message: t(response._strErrCode),
              _strErrCode: response._strErrCode,
              _strTId: response._strTId,
              _strAppTId: response._strAppTId,
              _objTTime: response._objTTime,
              _strType: response._strType,
              _dicDebug: response._dicDebug,
              _dicExcs: response._dicExcs,
            });
          }
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    };

    //===========================columns2-end=====================================

    //===========================SubgridToolBar=====================================
    const subGridToolbarsPayment: ToolbarItemProps[] = [];
    const subGridToolbarsDebit: ToolbarItemProps[] = [
      {
        location: "left",
        text: "Print",
        render: () => {
          return <BButton label={t("In")} onClick={() => handlePrint()} />;
        },
      },
    ];
    //===========================SubgridToolBar-end=====================================

    return (
      <Popup
        visible={showPopup.visible}
        title={"Công nợ chi tiết"}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "config_md_popup",
        }}
        onHiding={handleClose}
        height={580}
        // height={"auto"}
        width={"95%"}
      >
        {/* <Position at="bottom" my="center" collision="fit" /> */}
        <HeaderFormDebit
          ref={formDetailRef}
          formDebit={formDebit}
          handleClickViewDetail={handleClickViewDetail}
        />

        <TabPanel
          deferRendering={false} // force all tab visible immidately when component mounted
        >
          <Item title={t("Ghi nợ")}>
            <GridViewOne
              ref={gridDebit1Ref}
              toolbarItems={subGridToolbarsPayment}
              keyExpr={"PartCode"}
              customHeight={320}
              showSTT={false}
              allowMultiRowDelete={false}
              dataSource={[]} // {formDebit.lst_Ser_CusDebit}
              defaultPageSize={999}
              columns={columns1}
              isHiddenCheckBox
              isHidenHeaderFilter
              storeKey={"Ser_CustomerCar_AddNew_ViewDebit1"}
              allowSelection={false}
              // onRowClick={(e) => handleClickGrid1(e)}
              editingOptions={{
                allowUpdating: false,
              }}
              editMode={true} // fix selection
              onRowDeleteBtnClick={handleDeleteRowsDebit}
            >
              <Summary>
                <TotalItem
                  column={"DebitAmount"}
                  summaryType={"sum"}
                  displayFormat={`${t("Sum")} : {0}`}
                  valueFormat="#,##0.##"
                ></TotalItem>
              </Summary>
            </GridViewOne>
          </Item>
          <Item title={t("Trả nợ")}>
            <GridViewOne
              ref={gridDebit2Ref}
              toolbarItems={subGridToolbarsDebit}
              keyExpr={"PaymentID"}
              customHeight={320}
              showSTT={false}
              allowMultiRowDelete={false}
              dataSource={[]} // {formDebit.lst_Ser_Payment}
              defaultPageSize={999}
              columns={columns2}
              isHidenHeaderFilter
              storeKey={"Ser_CustomerCar_AddNew_ViewDebit2"}
              // onRowClick={(e) => handleClickGrid2(e)}
              onRowDeleteBtnClick={handleDeleteRowsPayment}
              editingOptions={{
                allowUpdating: false,
              }}
              editMode={true} // fix selection
              allowSelection={true}
              isSingleSelection
            >
              <Summary>
                <TotalItem
                  column={"PaymentAmount"}
                  summaryType={"sum"}
                  displayFormat={`${t("Sum")} : {0}`}
                  valueFormat="#,##0.##"
                ></TotalItem>
              </Summary>
            </GridViewOne>
          </Item>
        </TabPanel>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: "Trả nợ",
            type: "default",
            stylingMode: "contained",
            onClick: handleClickPayBtn,
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: handleClose,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
        <PopupPayment
          handleSave={handleSaveCusDebitPayment}
          ref={paymentPopupRef}
          visible={showPaymentPopup.visible}
          container={".dx-viewport"}
        />

        <PopupThongTinKhachHangVaXe
          ref={customerPopupRef}
          onSaving={() => {}}
          isEditing={false}
        />
      </Popup>
    );
  }
);
