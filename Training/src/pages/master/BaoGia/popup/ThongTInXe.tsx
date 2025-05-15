import { usePermissions } from "@/packages/contexts/permission";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Controller, useForm } from "react-hook-form";

const ThongtinxePopUp = () => {
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
          <span>Thông tin xe</span>
          <input type="checkbox" id="sameContact" className="checkbox" />
          <label htmlFor="sameContact" className="text-sm">
            Không có biển số
          </label>
          <ButtonCommon>Tìm kiếm xe chia sẻ</ButtonCommon>
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
                    spacing="3px"
                    render={({ field }) => {
                      return <TextBoxField field={field} label={"Biển số"} />;
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
                            value: "RLUA3872668719623761",
                          }}
                          spacing="3px"
                          label="Số khung"
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
                    name={""}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={{
                            value: "0",
                          }}
                          spacing="3px"
                          label="Số km"
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
                          spacing="3px"
                          label="Ngày hết hạn bảo hiểm"
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
                          spacing="3px"
                          label="Số KM GHBH"
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
                          spacing="3px"
                          label="Màu biển số"
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
                          field={{ value: "HUYNDAI" }}
                          label={"Hãng xe"}
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
                          field={field}
                          spacing="3px"
                          label="Số máy"
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
                    name="PlateNo"
                    control={control}
                    defaultValue={null}
                    render={({ field, fieldState }) => (
                      <DateBoxField
                        field={field} // truyền nguyên object field vào
                        label="Ngày sinh"
                        spacing="3px"
                        displayFormat="dd/MM/yyyy"
                        error={fieldState?.error?.message}
                        showClearButton
                        showPlaceholder={false}
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
                          field={field}
                          spacing="3px"
                          label="Ngày DKBH"
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
                          spacing="3px"
                          label="Ngày XNBH"
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
                            value: "VELOSTER 1.6 A/T",
                          }}
                          label={"Model"}
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
                          label="Màu"
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
                          label="Năm sản xuất"
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
                          label="Mã AVN"
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
                          label="Số seri ắc quy"
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
            </div>
          </div>
        </div>
      }
    ></CollapseHeader>
  );
};
export default ThongtinxePopUp;
