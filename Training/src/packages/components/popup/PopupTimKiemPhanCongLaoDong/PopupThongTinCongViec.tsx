import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Popup } from "devextreme-react";
import { useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDataSource } from "./useDataSource";
import { useFindPhanCongLaoDongPopupLocale } from "./useFindPhanCongLaoDongPopupLocale";

interface IProps {
  type: "add" | "update";
  data: IDataProps;
}

interface IDataProps {
  SerID: string;
  SerCode: string;
  SerName: string;
  StdManHour: number;
  Cost: number;
  Price: number;
  VAT: number;
  Note: string;
  Model: string;
  FlagWarranty: string;
  TypeID: string;
}

interface IMethodProps {
  onRefetchData: () => void;
  onCloseParentPopup: (data) => void;
}

const PopupThongTinCongViec = forwardRef(
  ({ onRefetchData, onCloseParentPopup }: IMethodProps, ref) => {
    const COST = 90000;

    useImperativeHandle(ref, () => ({
      showPopup(props: IProps) {
        setOpen(true);
        setType(props.type);

        if (props.data) {
          setValue("SerID", props.data.SerID);
          setValue("SerCode", props.data.SerCode);
          setValue("SerName", props.data.SerName);
          setValue("StdManHour", props.data.StdManHour);
          setValue(
            "Cost",
            props.data.Cost ? props.data.Cost : props.data.StdManHour * COST
          );
          setValue("Price", props.data.Price);
          setValue("VAT", props.data.VAT);
          setValue("Note", props.data.Note);
          setValue("Model", props.data.Model);
          setValue("FlagWarranty", props.data.FlagWarranty);
        } else {
          reset();
        }
      },
    }));

    const { locale } = useFindPhanCongLaoDongPopupLocale();

    const { commonLocale, requireLocale } = useCommonLocale();

    const refSubmitButton = useRef<HTMLButtonElement>(null);
    const setLoading = useSetAtom(loadPanelAtom);

    const [open, setOpen] = useState(false);
    const [type, setType] = useState<"add" | "update">("add");

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
    } = useForm<any>({
      values: {
        SerCode: null,
        SerName: null,
        StdManHour: null,
        Cost: 0,
        Price: null,
        VAT: null,
        Note: null,
        Model: null,
        FlagWarranty: null,
      },
      defaultValues: {
        Cost: 0,
      },
    });

    const currentFlagWarranty = watch("FlagWarranty");

    const dataSource = useDataSource();

    const handleClose = () => {
      setOpen(false);
      reset();
    };

    const handleSave = () => {
      if (refSubmitButton.current) {
        refSubmitButton.current.click();
      }
    };

    const onSubmit = async (data) => {
      setLoading(true);

      const param = {
        SerID: data.SerID,
        SerCode: data.SerCode,
        SerName: data.SerName,
        StdManHour: data.StdManHour,
        Cost: data.Cost,
        Price: data.Price,
        VAT: data.VAT,
        Model: data.Model,
        Note: data.Note,
        SerTypeID: "1",
      };

      if (type == "add") {
        dataSource.addService(param).then((resp) => {
          if (resp.success == true) {
            toast.success("Thêm công việc thành công");
            onCloseParentPopup(resp.data);
            handleClose();
            setLoading(false);
            return;
          }
        });
      }

      if (type == "update") {
        dataSource.updateService(param).then((isSuccess) => {
          if (isSuccess) {
            toast.success("Cập nhật công việc thành công");
            handleClose();
            onRefetchData();
            setLoading(false);
          }
        });
      }

      setLoading(false);
    };

    const handleChangeStdManHour = (changedValue: number, field) => {
      field.onChange({
        target: {
          name: field.name,
          value: changedValue,
        },
      });

      setValue(
        "Cost",
        changedValue && changedValue != 0 ? changedValue * COST : 0
      );
    };

    const formSubmit = (e) => {
      e.stopPropagation();

      return handleSubmit(onSubmit)(e);
    };

    return (
      <Popup
        visible={open}
        onHiding={handleClose}
        showCloseButton
        title={type == "add" ? "Thêm mới công việc" : "Cập nhật công việc"}
        height={"auto"}
        minHeight={270}
        maxWidth={900}
      >
        <form
          id="ServiceForm"
          onSubmit={formSubmit}
          className="grid grid-cols-2 gap-[62px]"
        >
          <div className="flex flex-col">
            <div>
              <Controller
                name={"SerCode"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={locale.SerCode}
                      error={errors.SerCode}
                      required
                      disabled={type == "update" || currentFlagWarranty == "1"}
                    />
                  );
                }}
                rules={{
                  required: requireLocale(locale.SerCode),
                  validate: (value) => {
                    // check ký tự đặc biệt chỉ gồm tiếng anh / dấu chấm / dấu gạch ngang / dấu gạch chân

                    const regex = /^[a-zA-Z0-9._-]+$/;

                    if (!regex.test(value)) {
                      return "Mã công việc không được chứa các ký tự đặc biệt!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"SerName"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={locale.SerName}
                      error={errors.SerName}
                      required
                      disabled={currentFlagWarranty == "1"}
                    />
                  );
                }}
                rules={{
                  required: requireLocale(locale.SerName),
                  validate: (value) => {
                    if (value.trim() == "") {
                      return requireLocale(locale.SerName);
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"StdManHour"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={locale.StdManHour}
                      error={errors.StdManHour}
                      required
                      format={"#0.00"}
                      disabled={currentFlagWarranty == "1"}
                      props={{
                        onValueChange: (value) =>
                          handleChangeStdManHour(value, field),
                      }}
                    />
                  );
                }}
                rules={{
                  required: requireLocale(locale.StdManHour),
                  validate: (value) => {
                    if (value < 0) {
                      return "Giờ định mức không hợp lệ!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              {" "}
              <Controller
                name={"Cost"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={"Giá định mức"}
                      error={errors.Cost}
                      disabled
                    />
                  );
                }}
              />
            </div>
            {type == "update" && (
              <div>
                {" "}
                <Controller
                  name={"FlagWarranty"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={"Flag CV bảo hành"}
                        error={errors.FlagWarranty}
                        // disabled={currentFlagWarranty == "1"}
                        disabled
                      />
                    );
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div>
              <Controller
                name={"Price"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={locale.Price}
                      error={errors.Price}
                      required
                      disabled={currentFlagWarranty == "1"}
                    />
                  );
                }}
                rules={{
                  required: "Đơn giá không được bỏ trống!",
                  validate: (value) => {
                    if (value < 0) {
                      return "Giá bán không hợp lệ!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"VAT"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={locale.VAT}
                      error={errors.VAT}
                      required
                      disabled={currentFlagWarranty == "1"}
                      props={{
                        max: 100,
                        min: 0,
                      }}
                    />
                  );
                }}
                rules={{
                  required: "Thuế không được bỏ trống!",
                  validate: (value) => {
                    if (value < 0 || value > 100) {
                      return "VAT không hợp lệ!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"Note"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={locale.Note}
                      error={errors.Note}
                      disabled={currentFlagWarranty == "1"}
                    />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name={"Model"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={locale.Model}
                      error={errors.Model}
                      disabled={currentFlagWarranty == "1"}
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
            form={"ServiceForm"}
          ></button>
        </form>

        <div className="h-[55px] flex items-center justify-end popup-footer mt-[10px] gap-[8px]">
          <ButtonCommon
            onClick={handleSave}
            text="Lưu"
            visible={currentFlagWarranty != "1"}
          ></ButtonCommon>

          <ButtonCommon
            onClick={handleClose}
            text="Thoát"
            type="secondary"
          ></ButtonCommon>
        </div>
      </Popup>
    );
  }
);

export default PopupThongTinCongViec;
