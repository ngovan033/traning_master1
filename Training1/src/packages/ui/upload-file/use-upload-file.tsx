import { useI18n } from "@/i18n/useI18n";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useVisibilityControl } from "@packages/hooks";
import { UploadDialog } from "@packages/ui/upload-dialog/upload-dialog";
import Button from "devextreme-react/button";
import { useImperativeHandle } from "react";
import { DropzoneOptions } from "react-dropzone";

interface UploadFileProps {
  handleUploadFiles: (files: File[], onClose?: () => void) => void;
  onDownloadTemplate: () => void;
  buttonClassName?: string;
  dialogClassName?: string;
  handleRef?: any;
  label?: any;
  options?: DropzoneOptions;
  msgFileRejection?: string;
  closeButton?: () => void;
}
export const useUploadFile = ({
  handleUploadFiles,
  onDownloadTemplate,
  buttonClassName,
  dialogClassName,
  handleRef,
  label,
  options,
  msgFileRejection,
}: UploadFileProps) => {
  const { t } = useI18n("Common");
  const controlVisible = useVisibilityControl({});
  const toggleDialog = () => {
    controlVisible.toggle();
  };
  const { commonLocale } = useCommonLocale();

  useImperativeHandle(handleRef, () => ({
    close: () => controlVisible.close(),
  }));

  const uploadButton = () => {
    return (
      <Button
        // stylingMode="text"
        hoverStateEnabled={false}
        className={buttonClassName}
        onClick={toggleDialog}
        text={label ?? t("ImportExcel")}
        type="default"
      />
    );
  };

  const uploadCustomizeButton = () => {
    return (
      <Button
        //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
        stylingMode={"contained"}
        type="default"
        text={commonLocale.BUTTON_IMPORT_EXCEL}
        onClick={toggleDialog}
      />
    );
  };

  const closeButton = () => {
    controlVisible.close();
  };

  const uploadDialog = () => {
    return (
      <UploadDialog
        msgFileRejection={msgFileRejection}
        options={options}
        visible={controlVisible.visible}
        onDownloadTemplate={onDownloadTemplate}
        onCancel={closeButton}
        onUpload={handleUploadFiles}
        className={dialogClassName}
      />
    );
  };
  return {
    uploadButton: uploadButton(),
    closeButton: () => {
      closeButton();
    },
    uploadDialog: uploadDialog(),
    uploadCustomizeButton: uploadCustomizeButton(),
  };
};
