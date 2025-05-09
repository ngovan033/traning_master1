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
import { Button } from "devextreme-react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const ThongTinKhachHangPage = () => {
  const { commonLocale, requireLocale } = useCommonLocale();
  const { isHQ } = usePermissions();
  const isNPP = isHQ();
  const { Type } = useParams();
  const initAppDateTimeFrom = new Date();
  const dataSourceTTKHVX = useDataSource();
  const popupRef = useRef();
  const findCustomerPopupRef = useRef();
  const findShareCarPopupRef = useRef();
  const customerPopupRef = useRef();

  const { showDialog } = useDialog();

  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const genTel = (tel: string, mobile: string) => {
    if (tel && mobile) {
      return `${tel}/${mobile}`;
    }

    return tel ?? mobile;
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
  } = useForm<any>({
    defaultValues: {
      AppDateTimeFrom: initAppDateTimeFrom,
      AppTimeFrom: initAppDateTimeFrom,
      AppDateTimeFromDate: initAppDateTimeFrom,
      AppDateTimeFromTime: initAppDateTimeFrom,
      FlagSharedCar: "0",
    },
  });

  return (
    <form id="FormCuocHen" className="flex flex-col mt-[5px]">
      <CollapseHeader
        showCollapse={true}
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "15px",
            }}
          >
            <span>Thông tin khách hàng </span>

            <span className="ml-[620px]">Thông tin xe </span>
          </div>
        }
        render={
          <div className="flex flex-col">
            <div className="grid grid-cols-4 mx-[30px] gap-[75px] mt-[2px]  ">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-[5px] hook-field">
                  <div className="flex-grow">
                    <Controller
                      name={"CusName"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{
                              value: "CTY TNHH TM DV Tân Phú",
                            }}
                            label={"Họ và tên"}
                            error={errors.CusName}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{
                              value: "CTY TNHH TM DV Tân Phú",
                            }}
                            label="Người liên lạc"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label="Di Động"
                            error={errors.PlateNo}
                            showClearButton
                            disabled={isNPP}
                            showPlaceholder={false}
                          />
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextAreaField
                            field={field}
                            label="Yêu cầu của KH"
                            error={errors.PlateNo}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextAreaField
                            field={field}
                            label="Địa chỉ"
                            error={errors.PlateNo}
                            placeholder="Phường Yên Hòa, Quận 1, TP.HCM"
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label="MST KH"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextAreaField
                            field={field}
                            label="Tình trạng khi tiếp nhận xe"
                            error={errors.PlateNo}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-[5px] hook-field">
                  <div className="flex-grow">
                    <Controller
                      name={"CusName"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{
                              value: "6A-12345",
                            }}
                            label={"Biển số"}
                            error={errors.CusName}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{
                              value: "HUYNDAI",
                            }}
                            label="Hiệu xe"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{ value: "G4A6L87H7" }}
                            label="Số máy"
                            error={errors.PlateNo}
                            disabled={isNPP}
                            showPlaceholder={false}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{ value: "88" }}
                            label="KM"
                            error={errors.PlateNo}
                            disabled={isNPP}
                            showPlaceholder={false}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{ value: "6A7HSNHAYY" }}
                            label="Số Vin"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{ value: "I10 NEW" }}
                            label="Model"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{ value: "Đen" }}
                            label="Màu xe"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      ></CollapseHeader>
      <CollapseHeader
        showCollapse={true}
        title={"Thông tin hội viên"}
        render={
          <div className="flex flex-col">
            <div className="grid grid-cols-4 mx-[30px] gap-[75px] mt-[2px]  ">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-[5px] hook-field">
                  <div className="flex-grow">
                    <Controller
                      name={"CusName"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={"Mã kỳ xét hạng"}
                            error={errors.CusName}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{
                              value: "",
                            }}
                            label="Hạng thẻ"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-[5px] hook-field">
                  <div className="flex-grow">
                    <Controller
                      name={"CusName"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={"Hạng thẻ sau tích"}
                            error={errors.CusName}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{
                              value: "",
                            }}
                            label="Giá trị TD còn lại"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={{
                              value: "",
                            }}
                            label="Điểm tích TD trong lượt DV"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label="Điểm tích XH trong lượt DV"
                            error={errors.PlateNo}
                            showClearButton={false}
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
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
    </form>
  );
};
