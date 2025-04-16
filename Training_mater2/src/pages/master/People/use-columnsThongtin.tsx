import { useI18n } from "@/i18n/useI18n";
import { requiredType } from "@packages/common/Validation_Rules";
import { LinkCell } from "@packages/ui/link-cell";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

// Định nghĩa interface cho dữ liệu
export interface ThongTin {
  name: string;
  age: number;
  dateOfBirth: string;
}
interface UseGridColumnsProps {
  popupRef: any;
  data: ThongTin[];
}

export const useGridColumnsThongTin = ({ popupRef }: UseGridColumnsProps) => {
  const { t } = useI18n("ThongTinGrid");
  const columns: any[] = [
    {
      dataField: "name",
      caption: t("Name"),
      validationRules: [requiredType],
      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
      },
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({
        data,
        value,
      }: {
        data: ThongTin;
        value: any;
        rowIndex: number;
      }) => {
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
      dataField: "age",
      caption: t("Age"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "dateOfBirth",
      caption: t("Date of Birth"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
      },
    },
  ];

  return columns;
};
