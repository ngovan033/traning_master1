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
interface IProps {
  onRefetchData: () => void;
  traNoRef: any;
}

const PopupTraNo = forwardRef(({ onRefetchData }: IProps, ref) => {
  useImperativeHandle(ref, () => ({
    showPopup({ data }) {
      setOpen(true);
      reset();

      clearErrors();
      setValue("Type", "add");

      if (data) {
        setValue("PaymentAmount", data.PaymentAmount);
        setValue("PayPersonName", data.PayPersonName);
        setValue("PayPersonIDCardNo", data.PayPersonIDCardNo);
        setValue("PayDate", data.PayDate);
        setValue("Note", data.Note);
        setValue("SupplierID", data.SupplierID);
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

  const onSubmit = async (data: any) => {
    setLoading(true);

    const param = {
      PaymentAmount: data.PaymentAmount,
      PayPersonName: data.PayPersonName,
      PayPersonIDCardNo: data.PayPersonIDCardNo,
      PayDate: data.PayDate,
      Note: data.Note,
      SupplierID: data.SupplierID,
    };

    const resp = await api.QLDanhSachNoNCC_UpdateCreateDL(param);

    if (resp.isSuccess) {
      toast.success("Tạo mới thành công!");
  
      onRefetchData();
      onHidding();
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
  };

  return (
    <Popup
      visible={open}
      title="Phiếu thu tiền trả nợ"
      showCloseButton
      onHiding={onHidding}
      width={600}
      height={"auto"}
      minHeight={240}
      wrapperAttr={{ class: "popup-from-grid" }}
      id="popup-from-grid"
    >
      <form
        className="px-4 py-2"
        id="editForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-2">
          {/* Ngày trả */}
          <div className="col-span-3 flex items-center">
            <label className="text-sm font-medium">
              Ngày trả <label className=" text-red-600">*</label>
            </label>
          </div>
          <div className="col-span-9">
            <Controller
              name={"PayDate"}
              control={control}
              render={({ field }) => (
                <TextBoxField field={field} error={errors.PayDate} />
              )}
            />
          </div>

          {/* Người trả */}
          <div className="col-span-3 flex items-center">
            <label className="text-sm font-medium">Người trả</label>
          </div>
          <div className="col-span-9">
            <Controller
              name={"PayPersonName"}
              control={control}
              render={({ field }) => (
                <TextBoxField field={field} error={errors.PayPersonName} />
              )}
            />
          </div>

          {/* CCCD */}
          <div className="col-span-3 flex items-center">
            <label className="text-sm font-medium">CCCD</label>
          </div>
          <div className="col-span-9">
            <Controller
              name={"PayPersonIDCardNo"}
              control={control}
              render={({ field }) => (
                <TextBoxField field={field} error={errors.PayPersonIDCardNo} />
              )}
            />
          </div>

          {/* Số tiền trả */}
          <div className="col-span-3 flex items-center">
            <label className="text-sm font-medium ">
              Số tiền trả <label className=" text-red-600">*</label>
            </label>
          </div>
          <div className="col-span-9">
            <Controller
              name={"PaymentAmount"}
              control={control}
              rules={{ required: "Số tiền trả phải > 0!" }}
              render={({ field }) => (
                <TextBoxField field={field} error={errors.PaymentAmount} />
              )}
            />
          </div>

          {/* Ghi chú */}
          <div className="col-span-3 flex items-center">
            <label className="text-sm font-medium">Ghi chú</label>
          </div>
          <div className="col-span-9 ">
            <Controller
              name={"Note"}
              control={control}
              render={({ field }) => (
                <TextBoxField field={field} error={errors.Note} />
              )}
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end items-center mt-6 gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={onHidding}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Đóng
          </button>
        </div>
      </form>
    </Popup>
  );
});

export default PopupTraNo;
