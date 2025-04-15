import { useI18n } from "@/i18n/useI18n";
import { showErrorAtom } from "@/packages/store";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";

const useColumnsPrintMult = () => {
  const { t } = useI18n("PRINTMODAL");

  const { t: error } = useI18n("ERROR");

  const showError = useSetAtom(showErrorAtom);

  const showErrorPrint = (data: any) => {
    showError({
      message: error(data?.resp?._strErrCode),
      _strErrCode: data?.resp?._strErrCode,
      _strTId: data?.resp?._strTId,
      _strAppTId: data?.resp?._strAppTId,
      _objTTime: data?.resp?._objTTime,
      _strType: data?.resp?._strType,
      _dicDebug: data?.resp?._dicDebug,
      _dicExcs: data?.resp?._dicExcs,
    });
  };

  const columns_valid: ColumnOptions[] = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 50,
      minWidth: 50,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "code",
      visible: true,
      caption: t("Code"),
    },
    {
      dataField: "link",
      visible: true,
      caption: t("Link"),
    },
  ];

  const columns_invalid: ColumnOptions[] = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 50,
      minWidth: 50,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "code",
      visible: true,
      caption: t("Code"),
    },
    {
      dataField: "link",
      visible: true,
      caption: t("Link"),
    },
    {
      dataField: "error",
      visible: true,
      caption: t("Error"),
      cellRender: ({ data }: any) => {
        return (
          <div
            className="hover:underline text-[#00703c] cursor-pointer"
            onClick={() => showErrorPrint(data)}
          >
            {data.error}
          </div>
        );
      },
    },
  ];

  return {
    columns_valid: columns_valid,
    columns_invalid: columns_invalid,
  };
};

export default useColumnsPrintMult;
