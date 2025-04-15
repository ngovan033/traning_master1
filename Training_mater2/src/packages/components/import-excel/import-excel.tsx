import { useI18n } from "@/i18n/useI18n";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { Button } from "devextreme-react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { BButton } from "../buttons";

interface IImportExcel {
  onDrop: (file: File[]) => void;
  customBtn?: boolean;
  options?: DropzoneOptions;
  isMdSize?: boolean;
}
export const ImportExcel = ({
  onDrop,
  customBtn = false,
  options = {},
  isMdSize = false,
}: IImportExcel) => {
  const { t } = useI18n("ImportExcelBtn");
  const { commonLocale } = useCommonLocale();

  // const onDrop = useCallback(async (acceptedFiles: any) => {}, []);
  const { getRootProps } = useDropzone({ onDrop, ...options });
  return (
    <div>
      <div {...getRootProps()}>
        {!customBtn ? (
          <BButton
            className={`btn-browse-file ${isMdSize ? "config_md_btn" : ""}`}
            label={t("ImportExcel")}
          />
        ) : (
          <Button
            stylingMode={"contained"}
            type="default"
            style={{
              margin: 0,
              minWidth: 100,
            }}
            className="btn-small"
            text={commonLocale.BUTTON_IMPORT_EXCEL}
          />
        )}
      </div>
    </div>
  );
};
