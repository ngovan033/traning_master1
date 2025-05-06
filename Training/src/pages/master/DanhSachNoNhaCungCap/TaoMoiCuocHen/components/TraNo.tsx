import { useClientgateApi } from "@/packages/api";
import { useConvertNumber } from "@/packages/common";
import { FindPhanCongLaoDongPopup } from "@/packages/components/popup/PopupTimKiemPhanCongLaoDong/FindPhanCongLaoDongPopup";
import { useFindPhanCongLaoDongPopupLocale } from "@/packages/components/popup/PopupTimKiemPhanCongLaoDong/useFindPhanCongLaoDongPopupLocale";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import SearchPrimaryIcon from "@/packages/ui/icons/svg/search-primary";
import { ColumnOptions } from "@/types";
import { TextBox } from "devextreme-react";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import { forwardRef, useImperativeHandle, useRef } from "react";


const TraNoGrid = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    getData: () => {
      return gridRef.current?.getData();
    },
    setData: (data) => {
      gridRef.current?.setData(data);
    },
  }));

  const { isHQ } = usePermissions();
  const { convertMoneyVND, convertPercent } = useConvertNumber();

  const isNPP = isHQ();

  const api = useClientgateApi();

  const gridRef = useRef();
  const textBoxRef = useRef();

  const columns: ColumnOptions[] = [
    {
      dataField: "PayDate",
      caption: "Ngày trả nợ",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 150,
    },
    {
      dataField: "PaymentAmount",
      caption: "Số tiền trả",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      format: "#,##0"
    },
    {
      dataField: "PayPersonName",
      caption: "Người trả",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "PayPersonIDCardNo",
      caption: "CCCD",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Note",
      caption: "Ghi chú",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];

  return (
    <>
      <CollapseHeader
        showCollapse={false}
        className="small-monitor"
        title=""
        render={
          <div className="mx-[16px] mt-[5px]">
            <GridViewOne
              ref={gridRef}
              dataSource={[]}
              columns={columns}
              autoFetchData={false}
              allowSelection={true}
              // editMode={false}
              keyExpr={"CusDebitID"}
              storeKey={"GhiNoGrid"}
              isHidenHeaderFilter
              isHiddenCheckBox
              customHeight={205}
              editingOptions={{
                allowDeleting: !isNPP,
                allowUpdating: false,
              }}
              editMode={!isNPP}
              hideHeader={true}
              loadPanel={false}
            
            >
              <Summary>
                <TotalItem
                  name="SummaryPaymentAmount"
                  column={"PaymentAmount"}
                  summaryType={"sum"}
                  customizeText={(itemInfo: {
                    value: string | number | any;
                    valueText: string;
                  }) => {
                    const dblResult = Math.round(+itemInfo.value);

                    return `${"Tổng"}: ${convertMoneyVND(dblResult)}`;
                  }}
                ></TotalItem>
              </Summary>
            </GridViewOne>
          </div>
        }
      ></CollapseHeader>
    </>
  );
});

export default TraNoGrid;
