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
import ChiTietPage from "../popup/ChiTietKH_Xe";

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
  const handleDetail = () => {
    popupRef.current?.showPopup();
  };
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
            <span>Thông tin khách hàng và xe</span>
            <ButtonCommon onClick={handleDetail}>Chi tiết</ButtonCommon>{" "}
            {/* Nút bạn muốn thêm */}
          </div>
        }
        render={
          <div className="flex flex-col">
            <div className="grid grid-cols-3 mx-[30px] gap-[75px] mt-[2px]  ">
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
                              value: "Thảo",
                            }}
                            label={"Tên KH"}
                            error={errors.CusName}
                            required
                            showClearButton
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                  <ButtonCommon
                    icon={<SearchPrimaryIcon />}
                    visible={!isNPP}
                    size="small"
                  ></ButtonCommon>
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
                              value: "Nguyễn Thị Thu",
                            }}
                            label="Họ và tên"
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
                            label="Địa chỉ"
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
                          <TextBoxField
                            field={field}
                            label="Di động"
                            error={errors.PlateNo}
                            showClearButton
                            showPlaceholder={false}
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
                            label="Yêu cầu của KH"
                            error={errors.PlateNo}
                            placeholder="Nhập"
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
                            field={{}}
                            label={"Biển số xe"}
                            error={errors.CusName}
                            required
                            showClearButton
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                  <ButtonCommon
                    icon={<SearchPrimaryIcon />}
                    visible={!isNPP}
                    size="small"
                  ></ButtonCommon>
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
                              value: "Nhập thường",
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
                            field={field}
                            label="Số máy"
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
                          <TextBoxField
                            field={{
                              value: "1,000,000",
                            }}
                            label="KM"
                            error={errors.PlateNo}
                            showClearButton={false}
                            showPlaceholder={false}
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
                            placeholder="Nhập"
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-[12px] text-green-700 text-[12px] font-medium underline cursor-pointer">
                    <span>Ảnh đính kèm</span>
                    <span>Hồ Sơ Bảo Hiểm</span>
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
                            label={"Số khung"}
                            error={errors.CusName}
                            required
                            showClearButton
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>
                  <ButtonCommon
                    icon={<SearchPrimaryIcon />}
                    visible={!isNPP}
                    size="small"
                  ></ButtonCommon>
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
                              value: "Continental",
                            }}
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
                            field={field}
                            label="Màu xe"
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
                <div className="flex items-center gap-[5px] justify-start">
                  <div className="flex-grow">
                    <Controller
                      name="PlateNo"
                      control={control}
                      render={({ field }) => (
                        <TextBoxField
                          field={field}
                          label="Mã hội viên"
                          error={errors.PlateNo}
                          showClearButton
                          showPlaceholder={false}
                          disabled={isNPP}
                          direction="horizontal"
                          spacing="0px"
                          labelWidth="110px"
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-[5px] text-green-700 text-[12px] font-medium underline cursor-pointer">
                    <span>Truy vấn</span>
                    <span>Chi tiết</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      ></CollapseHeader>
     <ChiTietPage ref={popupRef} />
      <button
        hidden={true}
        ref={refSubmitButton}
        type={"submit"}
        form={"FormCuocHen"}
      ></button>
    </form>
  );
};
