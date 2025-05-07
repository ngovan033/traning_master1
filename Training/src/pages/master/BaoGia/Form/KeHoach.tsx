import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { CheckBox, DateBox, TabPanel } from "devextreme-react";
import { Item } from "devextreme-react/tab-panel";
import { Controller, useForm } from "react-hook-form";

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
      <div className="left">
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <div className="form-date">
            <div className="ro-row">
              <label className="label">
                Ngày vào xưởng <span className="required"></span>
              </label>
              <DateBox
                className="inputDate"
                type="datetime"
                defaultValue={new Date()}
                displayFormat="dd/MM/yyyy HH:mm"
                showClearButton={false}
              />
            </div>
            <div className="ro-row">
              <label className="label">
                Ngày DKGX <span className="required"></span>
              </label>
              <DateBox
                className="inputDate"
                type="datetime"
                defaultValue={new Date()}
                displayFormat="dd/MM/yyyy HH:mm"
                showClearButton={false}
              />
            </div>
          </div>

          <div className="form-date">
            <div className="ro-row">
              <label className="label">
                Ngày vào xưởng <span className="required"></span>
              </label>
              <DateBox
                className="inputDate"
                type="datetime"
                defaultValue={new Date()}
                displayFormat="dd/MM/yyyy HH:mm"
                showClearButton={false}
              />
            </div>
            <div className="ro-row">
              <label className="label">
                Ngày DKGX <span className="required"></span>
              </label>
              <DateBox
                className="inputDate"
                type="datetime"
                defaultValue={new Date()}
                displayFormat="dd/MM/yyyy HH:mm"
                showClearButton={false}
              />
            </div>
          </div>

          <div className="form-date">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label className="label">
                  Ghi chú DKGX <span className="required"></span>
                </label>
                <ButtonCommon>
                  Lưu DKGX <span className="required"></span>
                </ButtonCommon>
              </div>

              <div className="flex-grow">
                <Controller
                  name={"PlateNo"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextAreaField
                        field={field}
                        error={errors.PlateNo}
                        placeholder="Nhập"
                        height="60px"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 justify-start ml-3 ">
          <p className="text-sm font-medium text-gray-800 mr-4 ">
            Thông tin khác
          </p>

          {[
            "Khách hàng chờ",
            "Yêu cầu rửa xe",
            "Khách lấy PT cũ",
            "Thanh toán bằng thẻ",
            "Phản tu",
          ].map((labelText, index) => (
            <div className="flex items-center gap-2" key={index}>
              <CheckBox className="align-middle" />
              <span className="text-sm text-gray-700 leading-none">
                {labelText}
                <span className="required"></span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <div className="flex gap-[5px] justify-between">
          <p className="text-sm  font-bold  text-gray-700">
            Tổng tiền trước thuế:
          </p>
          <p className="text-xs text-black-900 font-bold   ">50.000.000</p>
        </div>
        <div className="flex gap-[5px] font-bold  justify-between">
          <p className="text-sm  text-gray-700">Tổng tiền sau thuế:</p>
          <p className="text-xs text-gray-900">50.500.000</p>
        </div>
        <div className="flex gap-[5px] font-bold  justify-between">
          <p className="text-sm  text-gray-700">Tiền sử dụng từ thẻ:</p>
          <p className="text-xs text-gray-900">0</p>
        </div>
        <div className="flex items-center  justify-between font-bold ">
          <div className="flex-grow ">
            <Controller
              name={"PlateNo"}
              control={control}
              render={({ field }) => {
                return (
                  <TextBoxField
                    field={{
                      value: "",
                    }}
                    label="Miễn thường/Chế tài"
                    error={errors.PlateNo}
                    showClearButton={false}
                    showPlaceholder={false}
                    labelWidth="280px"
                  />
                );
              }}
            />
          </div>
        </div>

        <div className="flex gap-[5px] font-bold  justify-between">
          <p className="text-sm   text-gray-700">Tổng tiền cuối cùng:</p>
          <p className="text-xs text-gray-900">10.000.000.000</p>
        </div>
      </div>
    </div>
  );
};
