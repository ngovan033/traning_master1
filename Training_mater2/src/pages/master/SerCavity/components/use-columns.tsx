import { useI18n } from "@/i18n/useI18n";
import { requiredType } from "@packages/common/Validation_Rules";

import { Ser_Cavity } from "@/packages/types/master/Ser_Cavity";
import { LinkCell } from "@packages/ui/link-cell";
import { nanoid } from "nanoid";
interface UseGridColumnsProps {
  data: Ser_Cavity[];
  popupRef: any;
}

export const useGridColumns = ({ data, popupRef }: UseGridColumnsProps) => {
  const { t } = useI18n("Ser_Cavity");
  const columns: any[] = [
    {
      dataField: "CavityNo",
      caption: t("CavityNo"),
      validationRules: [requiredType],

      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
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
      dataField: "CavityName",
      caption: t("CavityName"),

      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      // dataField: "NewCavityType",
      dataField: "NewCavityType",
      caption: t("CavityType"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
      },
    },
    {
      dataField: "Note",
      caption: t("Note"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "StartUseDate",
      caption: t("StartUseDate"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "FinishUseDate",
      caption: t("FinishUseDate"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
  ];
  // return array of the first item only

  return columns;
};
