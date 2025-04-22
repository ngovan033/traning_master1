import { useI18n } from "@/i18n/useI18n";
import { requiredType } from "@packages/common/Validation_Rules";

import { Ser_MST_Model } from "@/packages/types/master/Ser_MST_Model";
import { LinkCell } from "@packages/ui/link-cell";
import { nanoid } from "nanoid";
interface UseGridColumnsProps {
  data: Ser_MST_Model[];
  popupRef: any;
}

export const useGridColumns = ({ data, popupRef }: UseGridColumnsProps) => {
  const columns: any[] = [
    {
      dataField: "TradeMarkCode", 
      caption: "Mã hiệu xe", // Mã phụ tùng
      validationRules: [requiredType],
      editorOptions: {
        validationMessageMode: "always",
        placeholder: "Input",
      },
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, rowIndex, value }: any) => {
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
      dataField: "ModelCode",
      caption: "Mã Model",
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "ModelName",
      caption: "Tên Model",
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "ProductionCode",
      caption: "Mã sản phẩm",
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "ModelName",
      caption: "Tên mô tả xe",
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
  ];


  return columns;
};
