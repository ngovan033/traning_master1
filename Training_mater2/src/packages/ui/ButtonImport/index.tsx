import { useUploadFile } from "@/packages/ui/upload-file/use-upload-file";
import "./buttonImport.scss";
import React from "react";
import { DropzoneOptions } from "react-dropzone";

interface Props {
  handleUploadFiles: any;
  onDownloadTemplate: any;
  handleRef?: any;
  className?: any;
  buttonClassName?: any;
  label?: any;
  options?: DropzoneOptions;
  msgFileRejection?: string;
}

const ButtonImport = ({
  handleUploadFiles,
  onDownloadTemplate,
  handleRef,
  className = "mr-4",
  buttonClassName,
  label,
  options,
  msgFileRejection,
}: Props) => {
  const { uploadButton, uploadDialog } = useUploadFile({
    handleUploadFiles,
    onDownloadTemplate,
    buttonClassName: buttonClassName,
    handleRef,
    label,
    options,
    msgFileRejection,
  });

  return (
    <div className={className}>
      {uploadButton} {uploadDialog}
    </div>
  );
};

export default ButtonImport;
