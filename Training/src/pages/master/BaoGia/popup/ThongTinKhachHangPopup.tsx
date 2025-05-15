import { usePermissions } from "@/packages/contexts/permission";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Controller, useForm } from "react-hook-form";

const ThongTInKhachHangPopup = () => {
  const { isHQ } = usePermissions();
  const isNPP = isHQ();
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
  } = useForm<any>({});
  return (
    <CollapseHeader 
      showCollapse={false}
      title={
        <div className="flex items-center gap-2">
          <span>Thông tin khách hàng</span>
          <input type="checkbox" id="sameContact" className="checkbox" />
          <label htmlFor="sameContact" className="text-sm">
            Khách hàng cũng là người liên lạc
          </label>
        </div>
      }
      render={
        <div className="flex flex-col">
          <div className="grid grid-cols-3 mx-[30px] gap-[75px] mt-[2px]  ">
            <div className="flex flex-col justify-start ">
              <div className="flex items-center justify-between gap-[5px] hook-field">
                <div className="flex-grow">
                  <Controller
                    name={"CusName"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={{
                            value: "Cá nhân",
                          }}
                          spacing="3px"
                          label={"Loại Khách hàng"}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-[5px] justify-between">
                <div className="flex-grow">
                  <Controller
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={{
                            value: "Nam",
                          }}
                          label="Giới tính"
                          spacing="3px"
                          error={errors.PlateNo}
                          showClearButton={false}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-[5px] justify-between">
                <div className="flex-grow">
                  <Controller
                    name="PlateNo"
                    control={control}
                    defaultValue={null}
                    render={({ field, fieldState }) => (
                      <DateBoxField
                        field={field}
                        label="Ngày sinh"
                        spacing="3px"
                        displayFormat="dd/MM/yyyy"
                        error={fieldState?.error?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-[5px] justify-between">
                <div className="flex-grow">
                  <Controller
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={{
                            value: "0335572988",
                          }}
                          label="Di động"
                          spacing="3px"
                          error={errors.PlateNo}
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label="Điện thoại"
                          spacing="3px"
                          error={errors.PlateNo}
                          showPlaceholder={false}
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
                          label={"Họ tên"}
                          spacing="3px"
                          error={errors.CusName}
                          showClearButton
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={{
                            value: "Nhập",
                          }}
                          label="CMND"
                          spacing="3px"
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label="Tỉnh/TP"
                          error={errors.PlateNo}
                          spacing="3px"
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label="Quận/Huyện"
                          spacing="3px"
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label="Địa chỉ"
                          error={errors.PlateNo}
                          spacing="3px"
                          showClearButton={false}
                          showPlaceholder={false}
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
                            value: "Nhập",
                          }}
                          label={"Fax"}
                          error={errors.CusName}
                          spacing="3px"
                          showClearButton
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={{
                            value: "Nhập",
                          }}
                          label="MST"
                          error={errors.PlateNo}
                          spacing="3px"
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label="Website"
                          spacing="3px"
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={{
                            value: "Nhập",
                          }}
                          label="Email"
                          error={errors.PlateNo}
                          spacing="3px"
                          showClearButton
                          disabled={isNPP}
                          showPlaceholder={false}
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
  );
};
export default ThongTInKhachHangPopup;
