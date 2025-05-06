import { useDataSource } from "@/packages/components/popup/PopupThongTinKhachHangVaXe/datasource/useDataSource";
import PopupThongTinKhachHangVaXe from "@/packages/components/popup/PopupThongTinKhachHangVaXe/PopupThongTinKhachHangVaXe";
import { PopupTimKiemXeChiaSe } from "@/packages/components/popup/PopupTimKiemXeChiaSe/PopupTimKiemXeChiaSe";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import SearchPrimaryIcon from "@/packages/ui/icons/svg/search-primary";
import { format } from "date-fns";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useDataSourceDanhSachNo } from "../datasource/useDataSourceDanhSachNo";
import { FindCustomerPopup } from "../find-customer/FindCustomerPopup";
import CustomAppDTime from "./custom-datetime/CustomAppDTime";
import { useLogicHandle } from "./useLogicHandle";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";

const values = {
  // AppDateTimeFrom: initAppDateTimeFrom,
  SupplierCode: null,
  Address: null,
  Phone: null,
  ContactName: null,
  SupplierName: null,
  ContactPhone: null,
  DealerCode: null,
  DebitAmount: null,
  TotalDebitAmount: null,
  TotalPaymentAmount: null,
  conNo: null,
};

const FormChiTIetNo = forwardRef(({ onSaving }: any, ref) => {
  const { commonLocale, requireLocale } = useCommonLocale();
  const { isHQ } = usePermissions();
  const isNPP = isHQ();

  const { Type } = useParams();

  const initAppDateTimeFrom = new Date();

  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const logicHandle = useLogicHandle();

  const genTel = (tel: string, mobile: string) => {
    if (tel && mobile) {
      return `${tel}/${mobile}`;
    }

    return tel ?? mobile;
  };

  useImperativeHandle(ref, () => ({
    setValues: ({ SupplierList }) => {
      setValue("SupplierID", SupplierList.SupplierID);
      setValue("SupplierCode", SupplierList.SupplierCode);
      setValue("Address", SupplierList.Address);
      setValue("SupplierName", SupplierList.SupplierName);
      setValue("Phone", SupplierList.Phone);
      setValue("ContactName", SupplierList.ContactName);
      setValue("ContactPhone", SupplierList.ContactPhone);
      setValue("TotalDebitAmount", SupplierList.TotalDebitAmount);
      setValue("TotalPaymentAmount", SupplierList.TotalPaymentAmount);
      setValue("conNo", SupplierList.conNo);
    },
  }));

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
    values: values,
    defaultValues: {
      AppDateTimeFrom: initAppDateTimeFrom,
      AppTimeFrom: initAppDateTimeFrom,
      AppDateTimeFromDate: initAppDateTimeFrom,
      AppDateTimeFromTime: initAppDateTimeFrom,
      FlagSharedCar: "0",
    },
  });

  // useEffect(() => {
  //   getSupplierDetail().then((data) => {
  //     setValue("SupplierDataSource", data);
  //   });
  // }, []);

  const handleOpen = () => {};

  const handleOpenPopupFindCustomerByName = async (currentCusName?: string) => {
    const cusName = currentCusName ?? getValues("CusName");

    await logicHandle
      .isOnlyFindOneCustomer({
        CusName: cusName,
        FrameNo: "",
        PlateNo: "",
      })
      .then((resp) => {
        if (resp?.Length == 1) {
          onSelectedCustomerFromDealer(resp.Data);
        }
      });
  };

  const handleOpenPopupFindCustomerByPlate = async (currentPlateNo: string) => {
    const plateNo = currentPlateNo ?? getValues("PlateNo");

    await logicHandle
      .isOnlyFindOneCustomer({
        CusName: "",
        FrameNo: "",
        PlateNo: plateNo,
      })
      .then((resp) => {
        if (resp?.Length == 1) {
          onSelectedCustomerFromDealer(resp.Data);
        }

        // if (resp?.Length > 1) {
        //   if (findCustomerPopupRef.current) {
        //     findCustomerPopupRef.current.searchWithPlateNo(plateNo);
        //   }
        // }

        // if (resp?.Length == 0) {
        //   if (findShareCarPopupRef.current) {
        //     findShareCarPopupRef.current.showPopupOnly(plateNo);
        //   }
        // }
      });
  };

  const onSelectedCustomerFromDealer = (Supplier: any) => {
    setValue("SupplierID", Supplier.SupplierID);
    setValue("SupplierCode", Supplier.SupplierCode);
    setValue("Address", Supplier.Address);
    setValue("SupplierName", Supplier.SupplierName);
    setValue("Phone", Supplier.Phone);
  };

  return (
    <form id="FormChiTIetNo" className="flex flex-col">
      <CollapseHeader
        showCollapse={false}
        className="mt-[5px]"
        title=""
        render={
          <div className="grid grid-cols-3 mx-[30px] gap-[75px] pb-[10px]">
            <div className="flex flex-col">
              <div className="">
                <Controller
                  name={"SupplierName"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label="Tên nhà cung cấp"
                        disabled
                      />
                    );
                  }}
                />
              </div>
              <div className="hook-field">
                <Controller
                  name={"Phone"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField field={field} label="Điện thoại" disabled />
                    );
                  }}
                />
              </div>
              <div className="hook-field">
                <Controller
                  name={"Address"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField field={field} label="Địa chỉ" disabled />
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="hook-field">
                <Controller
                  name={"ContactName"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label="Người liên hệ"
                        disabled
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"ContactPhone"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label="Số ĐT liên hệ"
                        disabled
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="">
                <Controller
                  name={"TotalDebitAmount"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <NumberBoxField field={field} label="Tổng nợ" disabled />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"TotalPaymentAmount"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <NumberBoxField
                        field={field}
                        label="Tổng đã trả"
                        disabled
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"conNo"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <NumberBoxField field={field} label="Còn nợ" disabled />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        }
      ></CollapseHeader>

      <button
        hidden={true}
        ref={refSubmitButton}
        type={"submit"}
        form={"FormCuocHen"}
      ></button>

      {/* <FindCustomerPopup
        ref={findCustomerPopupRef}
        onSelectedCustomer={onSelectedCustomerFromDealer}
      />

      <PopupTimKiemXeChiaSe
        ref={findShareCarPopupRef}
        onSelectedCustomer={onSelectedCarFromHQ}
      />

      <PopupThongTinKhachHangVaXe
        ref={customerPopupRef}
        onSaving={onUpdateCustomerSuccess}
      /> */}
    </form>
  );
});

export default FormChiTIetNo;
