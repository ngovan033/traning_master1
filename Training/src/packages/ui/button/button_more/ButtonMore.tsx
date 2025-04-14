import { Button } from "devextreme-react";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import { useUploadFile } from "../../upload-file/use-upload-file";
import { usePermissions } from "@/packages/contexts/permission";

interface IExcelOptions {
  handleExportExcel?: () => void;
  handleUploadFiles?: (files: File[], onClose: () => void) => void;
  handleDownloadTemplate?: () => void;
  showExportExcelButton?: boolean;
  permissionExportExcelCode?: string;
  permissionExportImportExcel?: string;
}

interface IButtonMore {
  excelOptions?: IExcelOptions;
}

const ButtonMore = ({ excelOptions }: IButtonMore) => {
  const { hasButtonPermission } = usePermissions();
  const { uploadButton, uploadDialog, closeButton } = useUploadFile({
    handleUploadFiles: excelOptions?.handleUploadFiles, // type [], sửa hàm upload files nhiều thay vì chỉ 1
    onDownloadTemplate: excelOptions?.handleDownloadTemplate,
    buttonClassName: "w-full",
    options: {
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
        "application/vnd.ms-excel": [],
      },
      maxFiles: 1,
      multiple: false,
    },
  });

  return (
    <div className="h-[30px]">
      <DropDownButton
        showArrowIcon={false}
        keyExpr={"id"}
        className="menu-items"
        displayExpr={"text"}
        wrapItemText={false}
        dropDownOptions={{
          width: 200,
          wrapperAttr: {
            class: "headerform__menuitems",
          },
        }}
        icon="/images/icons/more.svg"
      >
        {excelOptions?.permissionExportImportExcel ? (
          hasButtonPermission(excelOptions?.permissionExportImportExcel) && (
            <DropDownButtonItem
              render={(item: any) => {
                return <div>{uploadButton}</div>;
              }}
            />
          )
        ) : (
          <DropDownButtonItem
            render={(item: any) => {
              return <div>{uploadButton}</div>;
            }}
          />
        )}

        {/* Nếu có mã phân quyền thì ẩn/hiện theo phân quyền button
          <=> còn không điền mã phân quyền ( tức là "" or undefined) thì mặc định cho hiện nút */}
        {excelOptions?.permissionExportExcelCode ? (
          hasButtonPermission(excelOptions?.permissionExportExcelCode) && (
            <DropDownButtonItem
              visible={excelOptions?.showExportExcelButton ?? true}
              render={(item: any) => {
                return (
                  <Button
                    stylingMode="text"
                    hoverStateEnabled={false}
                    onClick={() => excelOptions?.handleExportExcel?.()}
                    text="Xuất excel"
                  />
                );
              }}
            />
          )
        ) : (
          <DropDownButtonItem
            visible={excelOptions?.showExportExcelButton ?? true}
            render={(item: any) => {
              return (
                <Button
                  stylingMode="text"
                  hoverStateEnabled={false}
                  onClick={() => excelOptions?.handleExportExcel?.()}
                  text="Xuất excel"
                />
              );
            }}
          />
        )}
      </DropDownButton>
      {uploadDialog}
    </div>
  );
};

export default ButtonMore;
