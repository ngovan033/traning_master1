import { useClientgateApi } from "@/packages/api";
import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useNewTabNavigate } from "@/packages/hooks/useNewTabNavigate";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./styles.scss";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import { useI18n } from "@/i18n/useI18n";
interface IProps {
  onRefetchData: () => void;
}

const PopupCustomerType = forwardRef(({ onRefetchData }: IProps, ref) => {
  const { t } = useI18n("Ser_MST_CustomerType");
  useImperativeHandle(ref, () => ({
    showPopup({ type, data }) {
      setOpen(true);

      reset();

      clearErrors();

      setValue("Type", type);

      if (data) {
        setValue("CusPersonType", data.CusPersonType);
        setValue("CusTypeName", data.CusTypeName);
        setValue("CusFactor", data.CusFactor);
        setValue("CusTypeID", data.CusTypeID);
      }
    },
  }));

  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const setLoading = useSetAtom(loadPanelAtom);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const { commonLocale } = useCommonLocale();
  const openTab = useNewTabNavigate();

  const [open, setOpen] = useState(false);

  const onHidding = () => {
    clearErrors();
    setOpen(false);
  };

  const listCusPersonType = [
    {
      value: "1",
      text: "Cá nhân",
    },
    {
      value: "2",
      text: "Tổ chức",
    },
  ];

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
    defaultValues: {},
  });

  const currentType = watch("Type");
  const currentStatus = watch("Status");

  const handleSave = () => {
    if (refSubmitButton.current) {
      refSubmitButton.current.click();
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const param = {
      CusTypeID: data.CusTypeID,
      CusFactor: data.CusFactor,
      CusTypeName: data.CusTypeName,
      CusPersonType: data.CusPersonType,
    };

    if (data.Type == "create") {
      delete param["CusTypeID"];

      const resp = await api.Ser_MST_CustomerType_Create(param);

      if (resp.isSuccess) {
        toast.success("Tạo mới thành công!");
        onRefetchData();
        onHidding();
        setLoading(false);
      } else {
        showError({
          message: t(resp._strErrCode),
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

    if (data.Type == "detail") {
      const resp = await api.Ser_MST_CustomerType_Update(param);

      if (resp.isSuccess) {
        toast.success("Cập nhật thành công!");
        onHidding();
        onRefetchData();
        setLoading(false);
      } else {
        showError({
          message: resp._strErrCode,
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
    const currentCusTypeID = getValues("CusTypeID");

    const resp = await api.Ser_MST_CustomerType_Delete(currentCusTypeID);

    if (resp.isSuccess) {
      toast.success("Xóa thành công!");
      onRefetchData();
      onHidding();
    } else {
      showError({
        message: resp._strErrCode,
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

  return (
    <Popup
      visible={open}
      title={
        currentType == "create"
          ? "Tạo mới loại khách hàng"
          : "Chi tiết loại khách hàng"
      }
      showCloseButton={true}
      onHiding={onHidding}
      resizeEnabled={false}
      width={500}
      height={"auto"}
      minHeight={240}
      wrapperAttr={{
        class: "popup-from-grid",
      }}
      id="popup-from-grid"
    >
      <form
        className="flex flex-col edit_form_v2"
        id="editForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <div className="">
            <Controller
              name={"CusPersonType"}
              control={control}
              render={({ field }) => {
                return (
                  <SelectBoxField
                    props={{
                      searchEnabled: false,
                    }}
                    field={field}
                    label={"Khách hàng"}
                    dataSource={listCusPersonType}
                    displayExpr={"text"}
                    required={true}
                    valueExpr="value"
                    error={errors.CusPersonType}
                  />
                );
              }}
              rules={{
                required: "Khách hàng không được để trống!",
              }}
            />
          </div>

          <div className="">
            <Controller
              name={"CusTypeName"}
              control={control}
              render={({ field }) => {
                return (
                  <TextBoxField
                    field={field}
                    label="Loại khách hàng"
                    required
                    error={errors.CusTypeName}
                  ></TextBoxField>
                );
              }}
              rules={{
                required: "Loại khách hàng không được để trống!",
              }}
            />
          </div>  

          <div className="">
            <Controller
              name={"CusFactor"}
              control={control}
              render={({ field }) => {
                return (
                  <NumberBoxField
                    field={field}
                    format={FORMAT_NUMBER.FLOAT_NUMBER_R2}
                    label="Hệ số giá"
                    required
                    props={{
                      min: 0,
                    }}
                    error={errors.CusFactor}
                  ></NumberBoxField>
                );
              }}
              rules={{
                required: "Hệ số giá không được để trống!",
              }}
            />
          </div>
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
          onClick={handleSave}
          text={commonLocale.BUTTON_SAVE}
        ></ButtonCommon>
        <ButtonCommon
          onClick={handleDelete}
          text={commonLocale.BUTTON_DELETE}
          visible={currentType == "detail"}
        ></ButtonCommon>
        <ButtonCommon
          onClick={onHidding}
          text={commonLocale.BUTTON_EXIT}
          type="secondary"
        ></ButtonCommon>
      </div>
      {/* <div className=" flex items-center justify-end popup-footer mt-[10px] gap-[8px]">
        <div>
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: commonLocale.BUTTON_SAVE,
              type: "default",
              stylingMode: "contained",
              onClick: handleSave,
            }}
          />
        </div>
        <div>
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: commonLocale.BUTTON_DELETE,
              type: "default",
              stylingMode: "contained",
              onClick: handleDelete,
            }}
            visible={currentType == "detail"}
          />
        </div>
        <div>
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: commonLocale.BUTTON_EXIT,
              onClick: onHidding,
              elementAttr: {
                // class: "cancel-button",
              },
            }}
          />
        </div>
      </div> */}
    </Popup>
  );
});

export default PopupCustomerType;
