import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Popup } from "devextreme-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDataSource } from "./useDataSource";
import { useFindPhuTungLocale } from "./useFindPhuTungLocale";

interface IProps {
  type: "add" | "update";
  data: IDataProps;
}

interface IDataProps {
  PartTypeID: string;
  PartGroupID: string;
  PartCode: string;
  VieName: string;
  EngName: string;
  Unit: string;
  Price: number;
  VAT: number;
  Model: string;
  InStockQuantity: number;
  Cost: number;
  Location: string;
  MinQuantity: number;
  Note: string;
  FreqUsed: string;
  PartTypeName: string;
  PartGroupName: string;
  FlagInTST: any;
  IsActive: any;
  PartID: any;
  PriceEffect: any;
}

interface IMethodProps {
  onRefetchData: () => void;
  onCloseParentPopup: (data: any) => void;
}

const PopupThongTinPhuTung = forwardRef(
  ({ onRefetchData, onCloseParentPopup }: IMethodProps, ref) => {
    useImperativeHandle(ref, () => ({
      showPopup(props: IProps) {
        setOpen(true);
        setType(props.type);

        if (props.data) {
          setValue("PartTypeID", props.data.PartTypeID);
          setValue("PartGroupID", props.data.PartGroupID);
          setValue("PartID", props.data.PartID);
          setValue("PartCode", props.data.PartCode);
          setValue("VieName", props.data.VieName);
          setValue("EngName", props.data.EngName);
          setValue("Unit", props.data.Unit);
          setValue("Price", props.data.PriceEffect);
          setValue("VAT", props.data.VAT);
          setValue("Model", props.data.Model);
          setValue("InStockQuantity", props.data.InStockQuantity);
          setValue("Cost", props.data.Cost);
          setValue("Location", props.data.Location);
          setValue("MinQuantity", props.data.MinQuantity);
          setValue("Note", props.data.Note);
          setValue("FreqUsed", props.data.FreqUsed == "1");
          setValue("PartTypeName", props.data.PartTypeName);
          setValue("PartGroupName", props.data.PartGroupName);
          setValue("FlagInTST", props.data.FlagInTST == "1");
          setValue("IsActive", props.data.IsActive ?? "1");
        } else {
          reset();
        }
      },
    }));

    const refSubmitButton = useRef<HTMLButtonElement>(null);

    const { locale } = useFindPhuTungLocale();
    const { commonLocale, requireLocale } = useCommonLocale();
    const { showDialog } = useDialog();

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
        PartTypeDataSource: [],
        PartGroupDataSource: [],
        PartTypeID: null,
        PartGroupID: null,
        PartID: null,
        PartCode: null,
        VieName: null,
        EngName: null,
        Unit: null,
        Price: null,
        VAT: null,
        Model: null,
        InStockQuantity: null,
        Cost: null,
        Location: null,
        MinQuantity: 0,
        Note: null,
        FreqUsed: null,
        FlagInTST: false,
      },
    });

    const partTypeDataSource = watch("PartTypeDataSource");
    const partGroupDataSource = watch("PartGroupDataSource");

    const dataSource = useDataSource();

    useEffect(() => {
      if (open) {
        dataSource.getListPartType().then((listPartType) => {
          setValue("PartTypeDataSource", listPartType);
        });

        dataSource.getListPartGroup().then((listPartGroup) => {
          setValue("PartGroupDataSource", listPartGroup);
        });
      }
    }, [open]);

    const handleClose = () => {
      setOpen(false);
      reset();
    };

    const handleSave = () => {
      if (refSubmitButton.current) {
        refSubmitButton.current.click();
      }
    };

    const flagInTST = watch("FlagInTST");

    const onSubmit = async (data) => {
      if (data.Price == null || data.Price == undefined) {
        showDialog({
          title: "Thông báo",
          message: "Giá bán không được để trống!",
        });

        return;
      }

      if (data.Cost == null || data.Cost == undefined) {
        showDialog({
          title: "Thông báo",
          message: "Giá nhập không được để trống!",
        });

        return;
      }

      if (data.VAT == null || data.VAT == undefined) {
        showDialog({
          title: "Thông báo",
          message: "VAT không được để trống!",
        });

        return;
      }

      const param = {
        PartID: data.PartID,
        PartGroupID: data.PartGroupID,
        PartTypeID: data.PartTypeID,
        PartCode: data.PartCode,
        EngName: data.EngName,
        VieName: data.VieName,
        Note: data.Note,
        Unit: data.Unit,
        Location: data.Location,
        VAT: data.VAT,
        Quantity: data.MinQuantity,
        MinQuantity: data.MinQuantity ?? 0,
        Cost: data.Cost,
        Price: data.Price,
        Model: data.Model,
        FreqUsed: data.FreqUsed ? "1" : "0",
        IsActive: "1",
      };

      if (type == "add") {
        dataSource.addPart(param).then((resp) => {
          if (resp.success == true) {
            toast.success("Thêm phụ tùng thành công");
            onCloseParentPopup(resp.data);
            handleClose();
            return;
          }
        });
      }

      if (type == "update") {
        dataSource.updatePart(param).then((isSuccess) => {
          if (isSuccess) {
            toast.success("Cập nhật phụ tùng thành công");
            handleClose();
            onRefetchData();
          }
        });
      }
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
        title={type == "add" ? "Thêm mới phụ tùng" : "Cập nhật phụ tùng"}
        resizeEnabled={false}
        height={320}
      >
        <form
          id="PartForm"
          className="grid grid-cols-3 gap-[62px]"
          onSubmit={formSubmit}
        >
          <div className="flex flex-col">
            <div>
              <Controller
                name={"PartTypeID"}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectBoxField
                      field={field}
                      labelWidth="100px"
                      label={locale.PartTypeID}
                      error={errors.PartTypeID}
                      required
                      dataSource={partTypeDataSource}
                      displayExpr={"TypeName"}
                      valueExpr="PartTypeID"
                      disabled={flagInTST}
                    />
                  );
                }}
                rules={{
                  required: requireLocale(locale.PartTypeID),
                }}
              />
            </div>
            <div>
              <Controller
                name={"PartGroupID"}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectBoxField
                      field={field}
                      labelWidth="100px"
                      label={locale.PartGroupID}
                      error={errors.PartGroupID}
                      required
                      dataSource={partGroupDataSource}
                      displayExpr={"GroupName"}
                      valueExpr="PartGroupID"
                      // disabled={flagInTST}
                    />
                  );
                }}
                rules={{
                  required: requireLocale(locale.PartGroupID),
                }}
              />
            </div>
            <div>
              <Controller
                name={"PartCode"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      labelWidth="100px"
                      label={locale.PartCode}
                      error={errors.PartCode}
                      required
                      disabled={type == "update"}
                    />
                  );
                }}
                rules={{
                  required: requireLocale(locale.PartCode),
                  validate: (value) => {
                    // check ký tự đặc biệt (trừ tiếng việt và dấu gạch ngang)
                    if (/[~`!@#$%^&*()]/.test(value)) {
                      return "Mã phụ tùng không được chứa ký tự đặc biệt!";
                    }

                    // check khoảng trắng ở đầu
                    if (value.trim() !== value || value.trim() === "") {
                      return "Vui lòng nhập Mã phụ tùng!";
                    }

                    // check co khoang trang o giua
                    if (/\s/.test(value)) {
                      return "Mã phụ tùng không được chứa ký tự đặc biệt!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"VieName"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      labelWidth="100px"
                      label={locale.VieName}
                      error={errors.VieName}
                      required
                      disabled={flagInTST}
                    />
                  );
                }}
                rules={{
                  required: requireLocale(locale.VieName),
                  validate: (value) => {
                    if (value.trim() === "") {
                      return requireLocale(locale.VieName);
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"EngName"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      labelWidth="100px"
                      label={locale.EngName}
                      error={errors.EngName}
                    />
                  );
                }}
              />
            </div>
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
                      labelWidth="100px"
                      label={"Giá bán"}
                      error={errors.Price}
                      required
                      disabled={type == "update"}
                    />
                  );
                }}
                rules={{
                  required: requireLocale("Giá bán"),
                  validate: (value) => {
                    if (Number(value) < 0) {
                      return "Giá bán phải là số nguyên dương!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"Cost"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      labelWidth="100px"
                      label={locale.Cost}
                      error={errors.Cost}
                      required
                      disabled={flagInTST}
                    />
                  );
                }}
                rules={{
                  required: requireLocale(locale.Cost),
                  validate: (value) => {
                    if (Number(value) < 0) {
                      return "Giá nhập phải là số nguyên dương!";
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
                      labelWidth="100px"
                      label={"VAT"}
                      error={errors.VAT}
                      required
                      disabled={flagInTST}
                      props={{
                        max: 100,
                      }}
                    />
                  );
                }}
                rules={{
                  required: requireLocale("VAT"),
                  validate: (value) => {
                    if (Number(value) < 0) {
                      return "VAT phải là số nguyên dương!";
                    }

                    if (Number(value) > 100) {
                      return "VAT không hợp lệ!";
                    }

                    return true;
                  },
                }}
              />
            </div>
            <div>
              <Controller
                name={"Unit"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      labelWidth="100px"
                      label={"ĐVT"}
                      error={errors.Unit}
                      required
                      disabled={flagInTST}
                    />
                  );
                }}
                rules={{
                  required: requireLocale("ĐVT"),
                  validate: (value) => {
                    if (value.trim() === "") {
                      return "Vui lòng nhập Đơn vị tính!";
                    }

                    return true;
                  },
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <Controller
                name={"MinQuantity"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      labelWidth="100px"
                      label={locale.MinQuantity}
                      error={errors.MinQuantity}
                      format="#,##0.00"
                      disabled={flagInTST}
                      props={{
                        min: 0,
                      }}
                    />
                  );
                }}
                rules={{
                  validate: (value) => {
                    if (Number(value) < 0) {
                      return "SL tối thiểu phải là số nguyên dương!";
                    }

                    return true;
                  },
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
                      labelWidth="100px"
                      label={locale.Model}
                      error={errors.Model}
                      props={{
                        maxLength: 200,
                      }}
                    />
                  );
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
                      labelWidth="100px"
                      label={locale.Note}
                      error={errors.Note}
                    />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name={"FreqUsed"}
                control={control}
                render={({ field }) => {
                  return (
                    <CheckBoxField
                      field={field}
                      labelWidth="100px"
                      label={locale.FreqUsed}
                      labelPosion="left"
                      // parentClassName={"ml-[112px]"}
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
            form={"PartForm"}
          ></button>
        </form>
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
            text: commonLocale.BUTTON_CANCEL,
            type: "default",
            stylingMode: "contained",
            onClick: handleClose,
          }}
        /> */}

        <div className="h-[55px] flex items-center justify-end popup-footer mt-[10px] gap-[8px] ">
          <ButtonCommon onClick={handleSave} text="Lưu"></ButtonCommon>

          <ButtonCommon
            onClick={handleClose}
            text="Đóng"
            type="secondary"
          ></ButtonCommon>
        </div>
      </Popup>
    );
  }
);

export default PopupThongTinPhuTung;
