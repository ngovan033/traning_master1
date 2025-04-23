import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { format } from "date-fns";

export const  useColumns = () => {
  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "RONO",
        visible: true,
        caption: "Lệnh",
        width: 174,
      },
      {
        dataField: "PlateNo",
        visible: true,
        caption: "Biển số xe",
        width: 115,
      },
      {
        dataField: "SerName",
        visible: true,
        caption: "Công việc",
        // cellRender: (data: any) => {
        //   return <TextMaxLength text={data.data.CUSREQUEST ?? ""} />;
        // },
        width: 136,
      },
      {
        dataField: "CheckInDate",
        visible: true,
        caption: "Ngày vào xưởng",
        width: 156,
        customizeText: ({ value }: any) => {
          if (!value) {
            return "";
          }
          return format(new Date(value), "yyyy-MM-dd");
        },
      },
      {
        dataField: "GroupRName",
        visible: true,
        caption: "Tổ thực hiện",
        width: 145,
      },
      {
        dataField: "Amount",
        visible: true,
        caption: "Tiền công",
        width: 145,
      },
      {
        dataField: "StatusName",
        visible: true,
        caption: "Trạng thái",  
        width: 108,
      },
    ];
  }, []);

  return columns;
};
