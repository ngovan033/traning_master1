import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { CheckBox, DateBox, TabPanel } from "devextreme-react";
import { Item } from "devextreme-react/tab-panel";
import { Controller, useForm } from "react-hook-form";
import "../Css/BaoGia.css";
export const FooterPage = () => {
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
    <div className="Foter_container">
      <div className="left_kh">
        <div className="left_header">
          <TabPanel
            width="100%"
            animationEnabled={true}
            swipeEnabled={true}
            deferRendering={false}
            className="my-[2px] custom-tab-panel"
          >
            <Item title="Kế hoạch công việc"></Item>
            <Item title="Nhắc bảo dưỡng"></Item>
            <Item title="Điều khoản sửa chữa"></Item>
          </TabPanel>
        </div>
        <div className="flex justify-around mt-[10px] gap-5">
          <div className="form-date flex justify-around">
            <div className=" flex flex-col justify-between mt-[5px]">
              <label className="label">
                Ngày vào xưởng <span className="required"></span>
              </label>
              <label className="label">
                Ngày DKGX <span className="required"></span>
              </label>
            </div>
            <div className="w-[60%] flex flex-col justify-between">
              <DateBox
                className="inputDate "
                type="datetime"
                defaultValue={new Date()}
                displayFormat="dd/MM/yyyy HH:mm"
                showClearButton={false}
              />
              <DateBox
                className="inputDate"
                type="datetime"
                defaultValue={new Date()}
                displayFormat="dd/MM/yyyy HH:mm"
                showClearButton={false}
              />
            </div>
          </div>

          <div className="form-date flex justify-around">
            <div className="flex flex-col justify-between mt-[5px]">
              <label className="label">
                Bắt đầu SC <span className="required"></span>
              </label>
              <label className="label">
                Kết thúc SC<span className="required"></span>
              </label>
            </div>
            <div className="w-[60%] flex flex-col justify-between">
              <DateBox
                className="inputDate"
                type="datetime"
                defaultValue={new Date()}
                displayFormat="dd/MM/yyyy HH:mm"
                showClearButton={false}
              />
              <DateBox
                className="inputDate"
                type="datetime"
                defaultValue={new Date()}
                displayFormat="dd/MM/yyyy HH:mm"
                showClearButton={false}
              />
            </div>
          </div>

          <div className="form-Nhap">
            <div className="flex  gap-[8px] ">
              <div className="flex flex-col gap-[16px]">
                <label className="label">
                  Ghi chú DKGX <span className="required"></span>
                </label>
                <ButtonCommon>
                  Lưu DKGX <span className="required"></span>
                </ButtonCommon>
              </div>

              <div className="flex-grow mt-[-10px]">
                <Controller
                  name={"PlateNo"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextAreaField
                        field={field}
                        error={errors.PlateNo}
                        placeholder="Nhập"
                        height="70px"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
          <p className="text-sm font-medium text-gray-800 w-full md:w-auto">
            Thông tin khác
          </p>

          {[
            "Khách hàng chờ",
            "Yêu cầu rửa xe",
            "Khách lấy PT cũ",
            "Thanh toán bằng thẻ",
            "Phản tu",
          ].map((labelText, index) => (
            <div className="flex items-center gap-1" key={index}>
              <CheckBox className="align-middle" />
              <span className="text-sm text-gray-700 leading-none">
                {labelText}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="right_kh">
        <div className="flex gap-[5px] justify-between">
          <p className="text-sm  font-bold  text-gray-700">
            Tổng tiền trước thuế:
          </p>
          <p className="text-xs text-black-900 font-bold mr-[12px]">
            50.000.000
          </p>
        </div>
        <div className="flex gap-[5px] font-bold  justify-between">
          <p className="text-sm  text-gray-700">Tổng tiền sau thuế:</p>
          <p className="text-xs text-gray-900 mr-[12px]">50.500.000</p>
        </div>
        <div className="flex gap-[5px] font-bold  justify-between">
          <p className="text-sm  text-gray-700">Tiền sử dụng từ thẻ:</p>
          <p className="text-xs text-gray-900 mr-[12px]">0</p>
        </div>
        <div className="flex items-center  justify-between font-bold ">
          <div className="flex h-[20px]">
            <Controller
              name={"PlateNo"}
              control={control}
              render={({ field }) => {
                return (
                  <TextBoxField
                    field={{
                      value: "0",
                    }}
                    label="Miễn thường/Chế tài"
                    error={errors.PlateNo}
                    showClearButton={false}
                    showPlaceholder={false}
                    labelWidth="330px"
                    cssClassInput="input-right"
                  />
                );
              }}
            />
          </div>
        </div>

        <div className="flex gap-[5px] font-bold  justify-between">
          <p className="text-sm   text-gray-700">Tổng tiền cuối cùng:</p>
          <p className="text-xs text-gray-900 mr-[12px]">10.000.000.000</p>
        </div>
      </div>
    </div>
  );
};
