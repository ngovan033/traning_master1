import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Popup } from "devextreme-react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFindCustomerLocale } from "../PopupTimKiemThongTinKhachHang/useFindCustomerLocale";
import "./components/style/PopupUpdateCustomerInfo.scss";
import { useLogicHandle } from "./components/useLogicHandle";

interface IDataProps {
  CusID: number;
  CusName: string;
  Address: string;
  Sex: string;
  Mobile: string;
  Fax: string;
  Tel: string;
  Email: string;
  TaxCode: string;
}

interface IMethodProps {
  onUpdatedSuccess: (data) => void;
}

const PopupUpdateCustomerInfo = forwardRef(
  ({ onUpdatedSuccess }: IMethodProps, ref) => {
    useImperativeHandle(ref, () => ({
      showPopup(data: IDataProps) {
        setOpen(true);
        clearErrors();

        if (data) {
          setValue("CusID", data.CusID);
          setValue("CusName", data.CusName);
          setValue("Address", data.Address);
          setValue("Sex", data.Sex ? "1" : "0");
          setValue("Mobile", data.Mobile);
          setValue("Fax", data.Fax);
          setValue("Tel", data.Tel);
          setValue("Email", data.Email);
          setValue("TaxCode", data.TaxCode);
        } else {
          reset();
          clearErrors();
        }
      },
    }));

    const refSubmitButton = useRef<HTMLButtonElement>(null);

    const { DealerCode } = usePermissions();

    const { locale } = useFindCustomerLocale();
    const { commonLocale, requireLocale } = useCommonLocale();

    const [open, setOpen] = useState(false);

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
      clearErrors,
      formState: { errors },
    } = useForm<any>({
      defaultValues: {
        CusID: null,
        CusName: null,
        Address: null,
        Sex: null,
        Mobile: null,
        Fax: null,
        Tel: null,
        Email: null,
        TaxCode: null,
      },
    });

    const logicHandle = useLogicHandle();

    const handleClose = () => {
      setOpen(false);
      reset();
      clearErrors();
    };

    const handleSave = () => {
      if (refSubmitButton.current) {
        refSubmitButton.current.click();
      }
    };

    const onSubmit = async (data) => {
      const param = {
        CusID: data.CusID,
        CusName: data.CusName,
        Address: data.Address,
        Sex: data.Sex == "1",
        Mobile: data.Mobile,
        Fax: data.Fax,
        Tel: data.Tel,
        Email: data.Email,
        TaxCode: data.TaxCode,
        DealerCode: DealerCode,
      };

      await logicHandle.updateCustomer(param).then((resp) => {
        if (resp.isSuccess) {
          toast.success("Cập nhật khách hàng thành công");
          clearErrors();
          setOpen(false);
          onUpdatedSuccess(resp.data);
        }
      });
    };

    const dataSourceSex = [
      {
        key: "0",
        value: "Nữ",
      },
      {
        key: "1",
        value: "Nam",
      },
    ];

    const formSubmit = (e) => {
      e.stopPropagation();

      return handleSubmit(onSubmit)(e);
    };

    const checkKeyDown = (e) => {
      if (e.key === "Enter") e.preventDefault();
    };

    return (
      <Popup
        visible={open}
        onHiding={handleClose}
        showCloseButton
        title={"Thông tin khách hàng"}
        // resizeEnabled
        height={"auto"}
        width={640}
        wrapperAttr={{
          class: "update-normal-customer-popup",
        }}
      >
        <form
          id="updateCustomer"
          className="flex flex-col gap-[10px]"
          onSubmit={formSubmit}
          onKeyDown={checkKeyDown}
        >
          <div className="flex flex-col">
            <div>
              <Controller
                name={"CusName"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={"Họ tên"}
                      error={errors.CusName}
                      required
                      labelWidth="100px"
                    />
                  );
                }}
                rules={{
                  required: requireLocale("Tên khách hàng"),
                  validate: (value) => {
                    // check ký tự đặc biệt (trừ tiếng việt) và có cách khoảng trắng không hợp lệ
                    if (/[~`!@#$%^&*()]/.test(value)) {
                      return "Họ tên không được chứa ký tự đặc biệt!";
                    }

                    // check khoảng trắng ở đầu
                    if (value.trim() === "") {
                      return "Vui lòng nhập Tên khách hàng!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"Address"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={"Địa chỉ"}
                      labelWidth="100px"
                      required
                      error={errors.Address}
                    />
                  );
                }}
                rules={{
                  required: requireLocale("Địa chỉ"),
                  validate: (value) => {
                    // check ký tự đặc biệt (trừ tiếng việt)
                    if (/[~`!@#$%^&*()]/.test(value)) {
                      return "Địa chỉ không được chứa ký tự đặc biệt!";
                    }

                    // check khoảng trắng ở đầu
                    if (value.trim() === "") {
                      return "Vui lòng nhập Địa chỉ!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-[10px] ">
              <div>
                <Controller
                  name={"Sex"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={"Giới tính"}
                        error={errors.Sex}
                        labelWidth="100px"
                        dataSource={dataSourceSex}
                        valueExpr="key"
                        displayExpr="value"
                        required
                      />
                    );
                  }}
                  rules={{
                    required: requireLocale("Giới tính"),
                  }}
                />
              </div>
              <div>
                <Controller
                  name={"Mobile"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={"Di động"}
                        error={errors.Mobile}
                        labelWidth="100px"
                        required
                      />
                    );
                  }}
                  rules={{
                    required: requireLocale("Di động"),
                    validate: (value) => {
                      if (value.trim() === "") {
                        return "Vui lòng nhập Di động!";
                      }

                      return true;
                    },
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[10px]">
              <div>
                <Controller
                  name={"Fax"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={locale.Fax}
                        labelWidth="100px"
                      />
                    );
                  }}
                />
              </div>
              <div>
                <Controller
                  name={"Tel"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={"Điện thoại"}
                        labelWidth="100px"
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div>
              <Controller
                name={"Email"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={locale.Email}
                      labelWidth="100px"
                    />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name={"TaxCode"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={"MST"}
                      labelWidth="100px"
                    />
                  );
                }}
              />
            </div>
          </div>

          <button
            hidden={true}
            ref={refSubmitButton}
            type={"submit"}
            form={"updateCustomer"}
          ></button>
        </form>

        <div className="h-[55px] flex items-center justify-end popup-footer mt-[10px] gap-[8px]">
          <ButtonCommon onClick={handleSave} text="Lưu"></ButtonCommon>

          <ButtonCommon
            onClick={handleClose}
            text="Thoát"
            type="secondary"
          ></ButtonCommon>
        </div>

        {/* <ToolbarItem
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
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: commonLocale.BUTTON_EXIT,
            type: "default",
            stylingMode: "contained",
            onClick: handleClose,
          }}
        /> */}
      </Popup>
    );
  }
);

export default PopupUpdateCustomerInfo;
