import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { format } from "date-fns";

export const useColumns = () => {

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "ItemName",
        visible: true,
        caption: "Tên khách hàng",
        width: 174,
      },
      {
        dataField: "Address",
        visible: true,
        caption: "Địa chỉ",
        width: 115,
      },
      {
        dataField: "Phone",
        visible: true,
        caption: "Số điện thoại",

        width: 136,
      },
      {
        dataField: "Remark",
        visible: true,
        caption: "Bảo hiểm nợ",
        width: 137,
      },

      {
        dataField: "DebitAmount",
        visible: true,
        caption: "Tổng số tiền",
        width: 137,
      },
     
    ];
  }, []);

  return columns;
};
