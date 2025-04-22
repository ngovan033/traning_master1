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
        dataField: "PLATENO",
        visible: true,
        caption: "Biển số xe",
        width: 115,
      },
      {
        dataField: "SERCODE",
        visible: true,
        caption: "Mã công việc",
        // cellRender: (data: any) => {
        //   return <TextMaxLength text={data.data.CUSREQUEST ?? ""} />;
        // },
        width: 136,
      },

      {
        dataField: "SERNAME",
        visible: true,
        caption: "Tên công việc",
        width: 137,
      },
      {
        dataField: "CHECKINDATE",
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
        dataField: "AMOUNT",
        visible: true,
        caption: "Tiền công",
        width: 145,
      },
      {
        dataField: "STATUSNAME",
        visible: true,
        caption: "Trạng thái",  
        width: 108,
      },
    ];
  }, []);

  return columns;
};
