import { useI18n } from "@/i18n/useI18n";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { logger } from "@/packages/logger";
import { useConfiguration } from "@packages/hooks";
import { Button } from "devextreme-react/button";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import "./upload-dialog.scss";
import { toast } from "react-toastify";

type UploadDialogProps = {
  visible: boolean;
  onUpload: (files: File[], onClose?: () => void) => void;
  onCancel: () => void;
  onDownloadTemplate?: () => void;
  className?: string;
  options?: DropzoneOptions;
  msgFileRejection?: string;
};

export const UploadDialog = ({
  visible,
  onUpload,
  onCancel,
  onDownloadTemplate,
  className = "",
  options,
  msgFileRejection = "File import excel không đúng định dạng",
}: UploadDialogProps) => {
  const { t } = useI18n("Common");
  const config = useConfiguration();
  const { showDialog } = useDialog();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileSelection = (event: any) => {
    logger.debug("files:", event);
    setFiles(event.value);
  };

  const handleUploadClick = () => {
    if (files.length === 0) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng chọn file để upload!",
      });

      return;
    }
    onUpload(files, handleCancelClick);
    // setFiles([]);
  };

  const handleCancelClick = () => {
    onCancel();
    setFiles([]);
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      ...options,
    });

  useEffect(() => {
    fileRejections.length > 0 && toast.error(msgFileRejection);
  }, [fileRejections]);

  return (
    <Popup
      visible={visible}
      dragEnabled={true}
      showTitle={true}
      title={t("UploadFiles")}
      onHiding={handleCancelClick}
      height={360}
      width={570}
      deferRendering={false}
      className={`upload-popup ${className}`}
      wrapperAttr={{
        class: "upload-popup-wrapper",
      }}
    >
      <div {...getRootProps()} id={"upload-box"}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className={"guide-text"}>{t("DropFileHere")}</p>
        ) : (
          <p className={"guide-text"}>{t("DragAndDropHere")}</p>
        )}
        <Button
          className={"btn-browse-file"}
          text={t("BrowseFile")}
          icon="/images/icons/upload.svg"
        />
        <p className={"mt-2"}>{t("MaxFileSize")}</p>
      </div>
      {files.length > 0 && (
        <div
          className={
            "file-container mt-2 mx-auto flex-col rounded border shadow items-center"
          }
        >
          <div className={""}>
            {files.map((f, idx) => {
              return (
                <>
                  <div className="flex items-center justify-between">
                    <div className="truncate">
                      <Button
                        stylingMode={"text"}
                        icon={"/images/icons/excel-file.svg"}
                        hoverStateEnabled={false}
                        focusStateEnabled={false}
                        activeStateEnabled={false}
                      />
                      {f.name}
                    </div>
                    <button
                      className="ml-2 mr-1 w-[6%] hover:bg-[#817e7e]"
                      onClick={() => {
                        const file = files.filter(
                          (item, index) => index !== idx
                        );
                        setFiles(file);
                      }}
                    >
                      x
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
      <ToolbarItem location="before" toolbar={"bottom"}>
        <Button
          onClick={onDownloadTemplate}
          icon={"/images/icons/download.svg"}
          id={"btn-trigger"}
          className={"apply-button"}
          type={"default"}
          stylingMode={"text"}
          hoverStateEnabled={false}
          text={t("DownloadTemplateFile")}
        />
      </ToolbarItem>
      <ToolbarItem location="after" toolbar={"bottom"}>
        <Button
          text={t("Upload")}
          onClick={handleUploadClick}
          stylingMode="contained"
          type="default"
        />
      </ToolbarItem>
      <ToolbarItem location="after" toolbar={"bottom"}>
        <Button
          className="cancel-button"
          text={t("Cancel")}
          onClick={handleCancelClick}
        />
      </ToolbarItem>
    </Popup>
  );
};
