import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { format } from "date-fns";

export const useColumns = () => {

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "InsVieName",
        visible: true,
        caption: "Tên hãng bảo hiểm",
        width: 174,
      },
      {
        dataField: "Address",
        visible: true,
        caption: "Địa chỉ",
        width: 115,
      },
      {
        dataField: "TelePhone",
        visible: true,
        caption: "Số điện thoại",

        width: 136,
      },
      {
        dataField: "TGD",
        visible: true,
        caption: "Đầy kỳ",
        width: 137,
      },

      {
        dataField: "PST",
        visible: true,
        caption: "PS tăng",
        width: 137,
      },
      {
        dataField: "PSG",
        visible: true,
        caption: "PS giảm",
        width: 145,
      },
      {
        dataField: "TGC",
        visible: true,
        caption: "Cuối lỳ",
        width: 108,
      },
    ];
  }, []);

  return columns;
};
