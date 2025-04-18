import { useI18n } from "@/i18n/useI18n";
import { Ser_Mst_TradeMark } from "@/packages/types/master/Ser_Mst_TradeMark";
import { LinkCell } from "@/packages/ui/link-cell";
import { nanoid } from "nanoid";

interface UseGridColumnsProps {
  data: Ser_Mst_TradeMark[];
  popupRef: any;
}

export const useGridColumns = ({ data, popupRef }: UseGridColumnsProps) => {
  const columns: any[] = [
    {
      dataField: "TradeMarkCode",
      caption: "Mã hiệu xe",

      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
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
      dataField: "TradeMarkName",
      caption: "Tên hiệu xe",

      editorOptions: {
        placeholder: "Input",
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
  ];
  // return array of the first item only

  return columns;
};
