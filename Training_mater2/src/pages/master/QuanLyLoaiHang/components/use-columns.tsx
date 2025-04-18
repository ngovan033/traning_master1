import { useI18n } from "@/i18n/useI18n";
import { Ser_MST_PartType } from "@/packages/types/master/Ser_MST_PartType";

interface UseGridColumnsProps {
  data: Ser_MST_PartType[];
  popupRef: any;
}

export const useGridColumns = ({ data, popupRef }: UseGridColumnsProps) => {
  
  const columns: any[] = [
   
    {
      dataField: "TypeName",
      caption:"Tên loại hàng",

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
