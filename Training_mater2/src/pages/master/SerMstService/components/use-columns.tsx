import { useI18n } from "@/i18n/useI18n";
import { requiredType } from "@packages/common/Validation_Rules";

import { Ser_MST_Service } from "@/packages/types/master/Ser_MST_Service";
import { LinkCell } from "@packages/ui/link-cell";
import { nanoid } from "nanoid";

interface UseGridColumnsProps {
  data: Ser_MST_Service[];
  popupRef: any;
}

export const useGridColumns = ({ data, popupRef }: UseGridColumnsProps) => {

  const columns: any[] = [
    {
      dataField: "SerCode",
      caption: "Mã công việc",
      width : 1,
      validationRules: [requiredType],
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Input",
      },
    
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() =>
              popupRef.current?.showPopup({
                type: "detail",
                data: data,
              })
            }
            value={value}
          />
        );
      },
    },
    {
      dataField: "SerName",
      caption: "Tên công việc",
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "StdManHour",
      caption: "Giờ định mức",
      editorType: "dxNumberBox",
      
      editorOptions: {
        placeholder: "Input",
        showSpinButtons: true,
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Model",
      caption: "Model",
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Cost",
      caption: "Giá định mức",
      editorType: "dxNumberBox",
      editorOptions: {
        placeholder: "Input",
        format: "#,##0.##",
        showSpinButtons: true,
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Price",
      caption: "Giá bán",
      editorType: "dxNumberBox",
      editorOptions: {
        placeholder: "Input",
        format: "#,##0.##",
        showSpinButtons: true,
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "VAT",
      caption: "VAT",
      editorType: "dxNumberBox",
      editorOptions: {
        placeholder: "Input",
        format: "#,##0.##",
        showSpinButtons: true,
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Note",
      caption: "Ghi chú",
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "FlagWarranty",
      caption: "Cờ công việc bảo hành",
      editorType: "dxCheckBox",
      editorOptions: {
        text: "IsWarranty",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
  ];

  return columns;
};
