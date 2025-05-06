import { useI18n } from "@/i18n/useI18n";

export const useCommonLocale = () => {
  const { t: common } = useI18n("Common");

  const buttonLocale = {
    BUTTON_ADD: common("Add"),

    BUTTON_EXPORT_EXCEL: common("ExportExcel"),
    BUTTON_TOGGLE_COLUMN: common("ToggleColumn"),
    BUTTON_APPLY: common("Apply"),
    BUTTON_CANCEL: common("Cancel"),
    BUTTON_SELECT_ALL: common("SelectAll"),
    BUTTON_SELECT: common("Select"),
    BUTTON_SEARCH: common("Search"),
    BUTTON_SAVE: common("Save"),
    BUTTON_SEARCH_SHARED_CAR: common("SearchSharedCar"),
    BUTTON_FIND: common("Find"),
    BUTTON_UPDATE_CUSTOMER: common("UpdateCustomer"),
    BUTTON_CONFIRM: common("Confirm"),
    BUTTON_DELETE: common("Delete"),
    BUTTON_EXIT: common("Exit"),
    BUTTON_IMPORT_EXCEL: common("ImportExcel"),
    BUTTON_STOCKOUT: common("StockOut"),
    BUTTON_BROWSE: common("Browse"),
    BUTTON_EXPORT_TEMPLATE: common("ExportTemplate"),
    BUTTON_QUERY: common("Query"),
    BUTTON_SEARCH_SER_PACKAGE: common("SearchSer_Package"),
    BUTTON_CREATE: common("Create"),
    BUTTON_EXPAND: common("Expand"),
    BUTTON_COLLAPSE: common("Collapse"),
    BUTTON_PRINT: common("Print"),
    BUTTON_CLOSE: common("Close"),
    BUTTON_YES: common("BTN_Yes"),
    BUTTON_NO: common("BTN_No"),
  };

  const placeholderLocale = {
    PLACEHOLDER_SELECT: common("Select"),
    PLACEHOLDER_INPUT: common("Input"),
  };

  const checkboxLocale = {
    CHECKBOX_FLAG_WH: common("FlagWH"),
  };

  const toastLocale = {
    TOAST_EXPORT_EXCEL_SUCESSFULLY: common("ExportExcelSuccessfully"),
    TOAST_DELETE_SUCCESSFULLY: common("DeleteSuccessfully"),
    TOAST_REJECT_CUSTOMERCARE: "Đã chuyển trạng thái sang không liên hệ!",
    TOAST_RESPONSE_CUSTOMERCARE:
      "Đã chuyển trạng thái sang đã liên hệ, đã phản hồi!",
    TOAST_PENDING_CUSTOMERCARE:
      "Đã chuyển trạng thái sang chưa liên hệ, chờ phản hồi!",
    TOAST_EXPORT_TEMPLATE_SUCCESSFULLY: common("ExportTemplateSuccessfully"),
    TOAST_IMPORT_EXCEL_SUCCESSFULLY: common("ImportExcelSuccessfully"),
    TOAST_UPDATE_SUCCESSFULLY: common("UpdateSuccessfully"),
  };

  const warrantyStatusLocale = {
    WarrantyStatus_PEND: common("WarrantyStatus_PEND"), // Chưa gửi
    WarrantyStatus_SENT: common("WarrantyStatus_SENT"), // Chờ xem xét
    WarrantyStatus_CONF: common("WarrantyStatus_CONF"), // Chờ duyệt
    WarrantyStatus_ACCE: common("WarrantyStatus_ACCE"), // Đã chấp thuận
    WarrantyStatus_REJ: common("WarrantyStatus_REJ"), // Không chấp thuận
    WarrantyStatus_REVERT: common("WarrantyStatus_REVERT"), // HTV hoàn trả
  };
  const commonCaptionLocale = {
    EditMultiRows: common("EditMultiRows"), // Sửa nhiều dòng
    EditCloumns: common("EditCloumns"), // Cột thay đổi giá trị
    DoYouWantToDelete: common("DoYouWantToDelete"), // Bạn có muốn xóa dòng đã chọn?
    ValueField: common("ValueField"), // Giá trị
  }

  const commonLocale = {
    ...buttonLocale,
    ...placeholderLocale,
    ...checkboxLocale,
    ...toastLocale,
    ...warrantyStatusLocale,
    ...commonCaptionLocale,
  };

  const requireLocale = (key: string) => {
    return common("Require field") + " " + key + "!";
  };

  return {
    commonLocale,
    requireLocale,
  };
};
