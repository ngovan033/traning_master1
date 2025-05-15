import { CheckBox, SelectBox } from "devextreme-react";
import "../Css/QuyetToan.css";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import SearchPrimaryIcon from "@/packages/ui/icons/svg/search-primary";

export const Form1 = () => {
  return (
    <div className="container_form">
      <div className="form-section">
        <div className="top-row flex gap-[16px] items-center">
          <div className="flex gap-[8px] flex-col justify-around">
            <SelectBox
              items={["Biển số 1", "Biển số 2", "Biển số 3"]}
              placeholder="Biển số"
              stylingMode="outlined"
              className="w-[120px]"
              onValueChanged={(e) => {}}
            />
          </div>

          <div className="flex gap-[8px] flex-col">
            <div className="flex gap-[8px] items-center">
              <input type="text" placeholder="Nhập" className="input" />
              <ButtonCommon
                icon={<SearchPrimaryIcon />}
                size="small"
              ></ButtonCommon>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="flex flex-col gap-[8px] justify-around">
          <label className="label">
            Số RO <span className="required">*</span>
          </label>
        </div>
        <div className="ro-row">
          <input
            type="text"
            value="BG-VS058.1-241003-002"
            className="inputRo"
          />
        </div>
      </div>
      <div className="form-section">
        <div className="flex flex-col gap-[8px] justify-around">
          <label className="label">Mã hội viên</label>
        </div>
        <div className="ro-row">
          <input type="text" className="inputRo" />
        </div>
      </div>
    </div>
  );
};
