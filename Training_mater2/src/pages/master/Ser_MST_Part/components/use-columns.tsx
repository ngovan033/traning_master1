import { useI18n } from "@/i18n/useI18n";
import { requiredType } from "@packages/common/Validation_Rules";

import { Ser_MST_Part } from "@/packages/types/master/Ser_MST_Part";
import { LinkCell } from "@packages/ui/link-cell";
import { nanoid } from "nanoid";
interface UseGridColumnsProps {
  data: Ser_MST_Part[];
  popupRef: any;
}

export const useGridColumns = ({ data, popupRef }: UseGridColumnsProps) => {
  const columns: any[] = [
    {
      dataField: "PartCode",
      caption: "Mã phụ tùng", // Mã phụ tùng
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
      dataField: "VieName",
      caption: "Tên phụ tùng", // Tên phụ tùng
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "EngName",
      caption: "Tên tiếng anh", // Tên tiếng anh
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "PartTypeName",
      caption: "Loại hàng", // Loại hàng
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "PartGroupName",
      caption: "Loại vật tư", // Loại vật tư
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Unit",
      caption: "Đơn vị", // Đơn vị
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Cost",
      caption: " Giá nhập", // Giá nhập
      editorOptions: {
        placeholder: "Input",
        format: "#,##0",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "PriceEffect",
      caption: "Giá bán", // Giá bán
      editorOptions: {
        placeholder: "Input",
        format: "#,##0",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "TSTPriceBefore",
      caption: "Giá bán NY từ TST (gần nhất)", // Giá bán NY từ TST (gần nhất)
      editorOptions: {
        placeholder: "Input",
        format: "#,##0",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "TSTPrice",
      caption: "Giá bán NY từ TST (hiện tại)", // Giá bán NY từ TST (hiện tại)
      editorOptions: {
        placeholder: "Input",
        format: "#,##0",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Location",
      caption: "Vị trí", // Vị trí
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Model",
      caption: "Model", // Model
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "FreqUsed",
      caption: "Tình trạng sử dụng", // Tình trạng sử dụng
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "Note",
      caption: "Ghi chú", // Ghi chú 
      minWitdh:100,
      maxWitdh:100,

      witdh:100,
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "FlagInTST",
      caption: "Phụ tùng TST", // Phụ tùng TST
      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
  ];
  // return array of the first item only

  return columns;
};
