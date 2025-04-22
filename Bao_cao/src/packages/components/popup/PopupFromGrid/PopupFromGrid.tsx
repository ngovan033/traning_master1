import { useI18n } from "@/i18n/useI18n";
import { useGetFieldComponent } from "@/packages/hooks/useGetFieldComponent";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import { Popup } from "devextreme-react";
import { IFormItemProps } from "devextreme-react/data-grid";
import { useSetAtom } from "jotai";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Controller, UseControllerProps, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface IColumnPopup {
  /**
   * DataField của cột
   *
   * @param dataField - DataField của cột
   *
   * @example
   * ```tsx
   * dataField: "LocationID"
   * dataField: "DealerCode"
   * ```
   */
  dataField: string;
  /**
   * Caption của cột
   *
   * @param caption - Caption của cột
   *
   * @example
   * ```tsx
   * caption: "Mã kho"
   * caption: "Mã đại lý"
   * ```
   */
  caption: string;
  /**
   * Loại của editor
   *
   * @param editorType - Loại của editor
   *
   * @example
   * ```tsx
   * editorType: "dxTextBox"
   * editorType: "dxNumberBox"
   * ```
   */
  editorType: IFormItemProps["editorType"];
  /**
   * Class của cột
   *
   * @param cssClass - custom class của cột
   *
   * @example
   * ```tsx
   * cssClass: "col-span-2"
   * cssClass: "col-span-3"
   * ```
   */
  cssClass?: string;
  /**
   * Rules của cột
   *
   * @param rules - Rules của cột
   *
   * @remarks https://www.react-hook-form.com/api/useform/register/#options
   *
   * @example
   * ```tsx
   * rules: { required: "Trường này không được để trống" }
   * rules: {validate: (value) => {
   *  if (value < 0) {
   *   return "Giá trị không được nhỏ hơn 0";}
   *   return true;
   * }}
   * ```
   */
  rules?: UseControllerProps["rules"];
  /**
   * Có bắt buộc hay không
   *
   * @param required - Có bắt buộc hay không
   *
   * @example
   * ```tsx
   * required: true
   * required: false
   * ```
   */
  required?: boolean;
  /**
   * EditorOptions của cột
   *
   * @param editorOptions - EditorOptions của cột
   *
   * @example
   * ```tsx
   * editorOptions: { maxLength: 10 }
   * editorOptions: { min: 0, max: 100 }
   * ```
   */
  editorOptions?: any;
  /**
   * Giá trị mặc định
   *
   * @param defaultValue - Giá trị mặc định
   *
   * @example
   * ```tsx
   * defaultValue: 0
   * defaultValue: [] - với trường hợp muốn sử dụng tagbox
   * ```
   */
  defaultValue?: any;

  visible?: boolean | ((data: any) => boolean);
}

export interface IGroupColumnPopup {
  columns: IColumnPopup[];
}

export interface IAPI {
  /**
   * API tạo mới
   *
   * @param api_create - API tạo mới
   *
   * @example
   * ```tsx
   * api_create: api.Ser_MST_Location_Create
   * ```
   */
  api_create: (param: any) => Promise<any>;
  /**
   * API cập nhật
   *
   * @param api_update - API cập nhật
   *
   * @example
   * ```tsx
   * api_update: api.Ser_MST_Location_Update
   * ```
   */
  api_update: (param: any) => Promise<any>;
  /**
   * API xóa
   *
   * @param api_delete - API xóa
   *
   * @example
   * ```tsx
   * api_delete: api.Ser_MST_Location_Delete
   * ```
   */
  api_delete: (param: any) => Promise<any>;
}

export interface ITitlePopup {
  /**
   * Title tạo mới
   *
   * @param title_create - Title tạo mới
   *
   * @example
   * ```tsx
   * title_create: "Tạo mới kho"
   * ```
   */
  title_create: string;
  /**
   * Title chi tiết
   *
   * @param title_detail - Title chi tiết
   *
   * @example
   * ```tsx
   * title_detail: "Chi tiết kho"
   * ```
   */
  title_detail: string;
}

export interface IButtonOptionsPopup {
  showButtonAdd?: boolean;
  showButtonDetail?: boolean;
  showButtonDelete?: boolean;
}

interface IProps {
  customWitdh?: number | string;
  onRefetchData: () => void;
  groupColumn: IGroupColumnPopup[];
  /**
   * Hàm gọi khi mở popup
   *
   * @param primaryKey - Hàm gọi khi mở popup, dùng để khởi tạo khi popup cần call api lấy dữ liệu đổ vào selectbox, tagbox, ...
   *
   *  VD: Khi cần dữ liệu đổ vào selectbox của trường StockNo, thì chúng ta cần trả 1 object có key = "ListStockNo" và value là mảng dữ liệu cần đổ vào selectbox
   *  StockNo -> ListStockNo, LocationType -> ListLocationType, thêm chữ List vào trước tên trường
   *
   * @example
   * ```tsx
   * onMountInitial: async () => {
   *    return {
   *       ListStockNo: await api.Ser_MST_Stock_GetAll(),
   *       ListLocationType: await api.Ser_MST_LocationType_GetAll(),
   *    };
   * };
   * ```
   */
  onMountInitial?: () => Promise<{ [key: string]: any }>;
  /**
   * API truyền vào popup
   *
   * @param title_detail - API truyền vào popup
   *
   * @example
   * ```tsx
   * api: {
   *    api_create: api.Ser_MST_Location_Create,
   *    api_update: api.Ser_MST_Location_Update,
   *    api_delete: api.Ser_MST_Location_Delete,
   * }
   * ```
   */
  api: IAPI;
  /**
   * key chính của popup (nếu có)
   *
   * @param primaryKey - key chính của popup (nếu có)
   *
   * @example
   * ```tsx
   * primaryKey: "LocationID"
   * primaryKey: ["LocationID", "DealerCode"]
   * primaryKey: null
   * ```
   */
  primaryKey?: string | string[] | null;

  /**
   * Tiền xử lý trước khi submit
   *
   * @param primaryKey - Tiền xử lý trước khi submit, dùng để validate thông tin như bắn toast, show modal trước khi submit
   *
   * @example
   * ```tsx
   * preSubmit: (data) => {
   *   if (data.LocationID == 0) {
   *      toast.error("Vui lòng chọn kho");
   *      return false }
   *    return true;
   *  }
   * ```
   */
  preSubmit?: (formData: any) => boolean;
  /**
   * Truyền locale dịch lỗi
   *
   * @param localeKey - Truyền locale dịch lỗi - chỉ cần truyền key
   *
   * @example
   * ```tsx
   * localeKey: "Ser_Mst_Location"
   * ```
   */
  localeKey?: string;

  buttonOptions?: IButtonOptionsPopup;

  title: ITitlePopup;

  minHeight?: string | number; // "" => ignore minHeight

  firstDefaultValue?: boolean;
  valueExpr?: string; // chỉ định key value cho selectbox theo ý muốn (đi cùng với firstDefaultValue)
  className?: string;
}

const PopupFromGrid = forwardRef(
  (
    {
      onRefetchData,
      groupColumn = [],
      onMountInitial,
      api,
      primaryKey = null,
      title,
      preSubmit,
      localeKey = "Error",
      buttonOptions = {
        showButtonAdd: true,
        showButtonDetail: true,
        showButtonDelete: true,
      },
      minHeight = 240,
      customWitdh,
      firstDefaultValue = false,
      valueExpr,
      className,
    }: IProps,
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      async showPopup({ type, data }) {
        setOpen(true);

        reset();

        clearErrors();

        setValue("Type", type);
        setValue("formData", data);

        if (data) {
          if (typeof primaryKey === "string" && primaryKey) {
            setValue(primaryKey, data[primaryKey]);
          }

          groupColumn.forEach((group) => {
            group.columns.forEach((item) => {
              setValue(item.dataField, data[item.dataField]);
            });
          });
        }
      },
    }));

    const refSubmitButton = useRef<HTMLButtonElement>(null);

    const setLoading = useSetAtom(loadPanelAtom);
    const showError = useSetAtom(showErrorAtom);
    const { getFieldComponent } = useGetFieldComponent();
    const { t: locale } = useI18n(localeKey);

    const [open, setOpen] = useState(false);

    const onHidding = () => {
      clearErrors();
      // reset();
      setOpen(false);
    };

    const defaultValues = groupColumn.reduce((acc, group) => {
      group.columns.forEach((item) => {
        acc[item.dataField] = item.defaultValue ?? null;
      });

      return acc;
    }, {});

    const {
      register,
      reset,
      unregister,
      watch,
      control,
      setValue,
      handleSubmit,
      setError,
      getValues,
      formState: { errors },
      clearErrors,
    } = useForm<any>({
      defaultValues: defaultValues,
    });

    const currentType = watch("Type");

    useEffect(() => {
      if (open && onMountInitial) {
        onMountInitial().then((initDataSource) => {
          Object.keys(initDataSource).forEach((key) => {
            setValue(key, initDataSource[key] ?? []);

            if (firstDefaultValue && currentType == "create") {
              const newKey = key.replace(/^List/, "");

              setValue(
                newKey,
                initDataSource?.[key]?.[0]?.[valueExpr ? valueExpr : newKey]
              );
            }
          });
        });
      }
    }, [open]);

    const handleSave = () => {
      if (refSubmitButton.current) {
        refSubmitButton.current.click();
      }
    };

    const onSubmit = async (data) => {
      setLoading(true);

      if (preSubmit && !preSubmit(data)) {
        setLoading(false);
        return;
      }

      if (data.Type == "create" && api.api_create) {
        const resp = await api.api_create(data);

        if (resp.isSuccess) {
          toast.success("Tạo mới thành công!");
          onRefetchData();
          onHidding();
          setLoading(false);
        } else {
          showError({
            message: locale(resp._strErrCode),
            _strErrCode: resp._strErrCode,
            _strTId: resp._strTId,
            _strAppTId: resp._strAppTId,
            _objTTime: resp._objTTime,
            _strType: resp._strType,
            _dicDebug: resp._dicDebug,
            _dicExcs: resp._dicExcs,
          });
          setLoading(false);
        }
      }

      if (data.Type == "detail" && api.api_update) {
        const resp = await api.api_update(data);

        if (resp.isSuccess) {
          toast.success("Cập nhật thành công!");
          onHidding();
          onRefetchData();
          setLoading(false);
        } else {
          showError({
            message: locale(resp._strErrCode),
            _strErrCode: resp._strErrCode,
            _strTId: resp._strTId,
            _strAppTId: resp._strAppTId,
            _objTTime: resp._objTTime,
            _strType: resp._strType,
            _dicDebug: resp._dicDebug,
            _dicExcs: resp._dicExcs,
          });
          setLoading(false);
        }
      }
    };

    const handleDelete = async () => {
      const data = getValues();

      const resp = await api.api_delete(data);

      if (resp.isSuccess) {
        toast.success("Xóa thành công!");
        onRefetchData();
        onHidding();
      } else {
        showError({
          message: locale(resp._strErrCode),
          _strErrCode: resp._strErrCode,
          _strTId: resp._strTId,
          _strAppTId: resp._strAppTId,
          _objTTime: resp._objTTime,
          _strType: resp._strType,
          _dicDebug: resp._dicDebug,
          _dicExcs: resp._dicExcs,
        });
      }
    };

    const gapBetweenEachGroup =
      groupColumn.length == 1 ? 62 : groupColumn.length == 2 ? 50 : 0;

    const labelWidth =
      groupColumn.length == 1
        ? "110px"
        : groupColumn.length == 2
        ? "100px"
        : "110px";

    const formSubmit = (e) => {
      e.stopPropagation();

      return handleSubmit(onSubmit)(e);
    };

    return (
      <Popup
        visible={open && groupColumn.length > 0}
        title={
          currentType == "create" ? title.title_create : title.title_detail
        }
        showCloseButton={true}
        onHiding={onHidding}
        // resizeEnabled
        width={
          customWitdh
            ? customWitdh
            : groupColumn.length == 1
            ? 500
            : groupColumn.length == 2
            ? 700
            : 900
        }
        height={"auto"}
        minHeight={minHeight}
        wrapperAttr={{
          class: `popup-from-grid ${className}`,
        }}
        id="popup-from-grid"
      >
        <form className="flex flex-col" id="editForm" onSubmit={formSubmit}>
          <div
            className={`grid grid-cols-${groupColumn.length} gap-[${gapBetweenEachGroup}px] popup-${groupColumn.length}-col`}
          >
            {groupColumn.map((group, index) => {
              return (
                <div className="flex flex-col ml-1">
                  {group.columns.map((column, columnIndex) => {
                    const isVisible =
                      typeof column.visible === "function"
                        ? column.visible(watch())
                        : column.visible
                        ? column.visible
                        : true;

                    if (!isVisible) {
                      return <></>;
                    }

                    return (
                      <div className={column.cssClass}>
                        <Controller
                          name={column.dataField}
                          control={control}
                          render={({ field }) => {
                            const isDisabled =
                              typeof column.editorOptions?.disabled ===
                              "function"
                                ? column.editorOptions.disabled(watch())
                                : column.editorOptions?.disabled;

                            return getFieldComponent({
                              field: field,
                              columnInfo: {
                                ...column,
                                editorOptions: {
                                  ...column.editorOptions,
                                  disabled: isDisabled,
                                  labelWidth: labelWidth,
                                  error: errors[column.dataField],
                                  dataSource:
                                    watch(`List${column.dataField}`) ?? [],
                                },
                              },
                            });
                          }}
                          rules={column.rules ?? {}}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <button
            hidden={true}
            ref={refSubmitButton}
            type={"submit"}
            form={"editForm"}
          ></button>
        </form>

        <div className="h-[55px] flex items-center justify-end popup-footer mt-[10px] gap-[8px]">
          <ButtonCommon
            onClick={handleSave} // Nút lưu tạo mới
            text="Lưu"
            visible={currentType == "create"}
            permissionCode="BTN_QT_DL_QUANLYNGUOIDUNG_TAOMOI"
          ></ButtonCommon>
          <ButtonCommon
            onClick={handleSave} // Nút lưu cập nhật
            text="Lưu"
            permissionCode="BTN_QT_DL_QUANLYNGUOIDUNG_SUA"
            visible={currentType == "detail"}
          ></ButtonCommon>
          <ButtonCommon
            onClick={handleDelete}
            text="Xóa"
            visible={currentType == "detail" && buttonOptions.showButtonDelete}
            permissionCode="BTN_QT_DL_QUANLYNGUOIDUNG_XOA"
          ></ButtonCommon>
          <ButtonCommon
            onClick={onHidding}
            text="Thoát"
            type="secondary"
          ></ButtonCommon>
        </div>
      </Popup>
    );
  }
);

export default PopupFromGrid;
