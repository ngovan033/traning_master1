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
      <div className="left grid grid-cols-1 px-2 py-2 rounded mt-2">
        <div className="space-y-2 w-full">
          <p className="font-semibold text-[15px] text-gray-800">
            TG giao xe thực tế
          </p>

          {/* Nhóm ngày + thời gian */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
            {/* Ngày */}
            <div className="flex items-center gap-1 shrink-0">
              <label className="text-sm text-gray-700 w-[35px]">Ngày</label>
              <input
                className="h-[26px] px-2 py-1 border border-gray-300 rounded text-sm 
                     w-[80px] md:w-[110px]"
              />
            </div>

            {/* Thời gian */}
            <div className="flex items-center gap-1 shrink-0">
              <label className="text-sm text-gray-700 w-[65px]">
                Thời gian
              </label>
              <input
                type="text"
                className="h-[26px] px-2 py-1 border border-gray-300 rounded text-sm 
                     w-[70px] md:w-[100px]"
              />
              <label className="text-sm text-gray-700">Giờ</label>
              <input
                type="text"
                className="h-[26px] px-2 py-1 border border-gray-300 rounded text-sm 
                     w-[55px] md:w-[70px]"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" id="check-paid" />
            <label htmlFor="check-paid" className="text-sm text-gray-700">
              Khách hàng thanh toán toàn bộ chi phí S/C
            </label>
          </div>
        </div>
      </div>

      <div className="flex w-[60%] mt-2   gap-x-6 justify-between">
        <div className="flex flex-col justify-around w-[45%] ">
          <div className="flex items-center justify-between">
            <p className="text-[14px]  text-gray-800 font-medium">
              Tổng tiền trước thuế
            </p>
            <span className="font-bold text-[15px] mr-2">0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px]  text-gray-800 font-medium">
              Giảm trừ khác
            </span>
            <input
              defaultValue="0"
              className="w-[150px]  h-[25px] text-right px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-gray-800 font-medium">
              Tiền sử dụng từ thẻ
            </span>
            <input
              type="number"
              className="w-[150px]  h-[25px] text-right px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        <div className="w-[45%]  flex flex-col justify-around">
          <div className="flex gap-[5px] font-bold  justify-between">
            <p className="text-sm  text-gray-700">Tổng tiền sau thuế:</p>
            <p className="text-[14px] text-gray-900 mr-[12px]">50.500.000</p>
          </div>

          <div className="flex gap-[5px] font-bold  justify-between">
            <p className="text-sm  text-gray-700">Miễn thưởng/Chế tài:</p>
            <p className="text-[14px] text-gray-900 mr-[12px]">0</p>
          </div>

          <div className="flex gap-[5px] font-bold  justify-between">
            <p className="text-sm   text-gray-700">Tổng tiền cuối cùng:</p>
            <p className="text-[14px] text-gray-900 mr-[12px]">
              10.000.000.000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
