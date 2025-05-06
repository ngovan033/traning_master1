import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";
import TextMaxLength from "../TextMaxLength";
import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { format } from "date-fns";

export const useColumns = () => {
  const { t } = useI18n("ReportROByDate");
  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "RONO",
        visible: true,
        caption: t("RONO"),
        width: 174,
      },
      {
        dataField: "PLATENO",
        visible: true,
        caption: t("PLATENO"),
        width: 115,
      },
      {
        dataField: "CUSREQUEST",
        visible: true,
        caption: t("CUSREQUEST"),
        // cellRender: (data: any) => {
        //   return <TextMaxLength text={data.data.CUSREQUEST ?? ""} />;
        // },
        width: 136,
      },
      {
        dataField: "CHECKINDATE",
        visible: true,
        caption: t("CHECKINDATE"),
        width: 156,
        customizeText: ({ value }: any) => {
          if (!value) {
            return "";
          }
          return format(new Date(value), "yyyy-MM-dd");
        },
      },
      {
        dataField: "ASSISTANT",
        visible: true,
        caption: t("ASSISTANT"),
        width: 137,
      },
      {
        dataField: "KM",
        visible: true,
        caption: t("KM"),
        width: 80,
        dataType: "number",
        editorType: "dxNumberBox",
        format: FORMAT_NUMBER.INT_NUMBER,
      },
      {
        dataField: "SOPHIEUTHANHTOAN",
        visible: true,
        caption: "Số phiếu TT",
        width: 145,
      },
      {
        dataField: "STATUSNAME",
        visible: true,
        caption: t("STATUSNAME"),
        width: 108,
      },
      {
        dataField: "REVENUE",
        visible: true,
        caption: "Giá trị",
        width: 133,
        dataType: "number",
        editorType: "dxNumberBox",
        format: FORMAT_NUMBER.INT_NUMBER,
      },
      {
        dataField: "TRADEMARKNAMEMODEL",
        visible: true,
        caption: "Hiệu xe - Model",
        width: 175,
      },
      {
        dataField: "SCAR_WARRANTYREGISTRATIONDATE",
        visible: true,
        caption: t("SCAR_WARRANTYREGISTRATIONDATE"),
        width: 186,
        customizeText: ({ value }: any) => {
          if (!value) {
            return "";
          }
          return format(new Date(value), "yyyy-MM-dd");
        },
      },
    ];
  }, []);

  return columns;
};
