import { usePermissions } from "@/packages/contexts/permission";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Controller, useForm } from "react-hook-form";

const ThongtinNguoiLienLacPage = () => {
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
      title={"Thông tin người liên lạc"}
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
                            value: "Nhập",
                          }}
                          spacing="3px"
                          label={"Họ tên"}
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
                            value: "Nhập",
                          }}
                          spacing="3px"
                          label="Điện thoại"
                          error={errors.PlateNo}
                          showClearButton={false}
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
                          field={{ value: "Nhập" }}
                          label={"Địa chỉ"}
                          spacing="3px"
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
                            value: "Nhập",
                          }}
                          label="Di động"
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
                            value: "Nam",
                          }}
                          spacing="3px"
                          label={"Giới tính"}
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
                            value: "Nhập",
                          }}
                          label="Email"
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
            </div>
          </div>
        </div>
      }
    ></CollapseHeader>
  );
};
export default ThongtinNguoiLienLacPage;
