import dxForm from "devextreme/ui/form";

import "src/packages/components/number-range-field/number-range-field.scss";
import { NumberBox } from "devextreme-react";
import { useRef, useState } from "react";
import { anonymousSelectKey } from "ts-pattern/dist/internals/symbols";
import { match } from "ts-pattern";
import { useI18n } from "@/i18n/useI18n";

interface NumberRangeFieldProps {
  formInstance?: dxForm;
  dataField?: string;
  onValueChanged?: (e: any) => void;
  placeholder?: string;
  width?: any;
  readOnly?: boolean;
  isDecimal?: boolean;
  defaultValue?: string;
  className?: string;
  min?: number;
  defaultValueFrom?: number;
  defaultValueTo?: number;
  max?: number;
  widthFrom?: any;
  widthTo?: any;
  onEnterKeyFrom?: any;
  onEnterKeyTo?: any;
}

export const NumberRangeField = ({
  formInstance,
  dataField,
  placeholder,
  width = 270,
  onValueChanged,
  widthFrom = 130,
  widthTo = 130,
  readOnly = false,
  onEnterKeyFrom,
  onEnterKeyTo,
  defaultValue,
  defaultValueFrom,
  defaultValueTo,
  className = "",
  isDecimal = true,
  min,
  max,
}: NumberRangeFieldProps) => {
  const fromRef = useRef<NumberBox>(null);
  const toRef = useRef<NumberBox>(null);
  const { t } = useI18n("NumberRangeField");
  const handleValueFromChanged = (e: any) => {
    const { value } = e;
    const toValue = toRef.current?.instance.option("value");
    if (toValue && value > toValue) {
      e.cancel = true;
      setError(t("Giá trị từ không hợp lệ!"));
      const val = { from: null, to: null, isValid: true };
      onValueChanged?.({ value: val });
    } else {
      setError("");
      const val = { from: value, to: toValue, isValid: false };
      onValueChanged?.({ value: val });
    }
  };
  const [error, setError] = useState("");
  const handleValueToChanged = (e: any) => {
    const { value } = e;
    const fromValue = fromRef.current?.instance.option("value");
    if (fromValue && value < fromValue) {
      e.cancel = true;
      setError(t("Giá trị đến không hợp lệ!"));
      const val = { from: null, to: null, isValid: true };
      onValueChanged?.({ value: val });
    } else {
      setError("");
      const val = { from: fromValue, to: value, isValid: false };
      onValueChanged?.({ value: val });
    }
  };

  const handleInputTo = (e: any) => {
    const inputValue = e.event.target.value;
    let newValue = inputValue;
    let error = "";

    // Trường hợp 1: Không cho nhập số âm với điều kiện min = 0
    if (min === 0 && inputValue.includes("-")) {
      error = "Không được nhập số âm";
      newValue = inputValue.replace("-", "");
    } // done

    // Trường hợp 2: Không cho nhập số thập phân với điều kiện isDecimal = false
    if (!isDecimal && inputValue.includes(".")) {
      error = "Không được nhập số thập phân";
      newValue = inputValue.replace(".", "");
    } // done

    // Trường hợp 3: Không cho nhập cả số âm và số thập phân với min = 0 và isDecimal = false
    if (
      min === 0 &&
      !isDecimal &&
      (inputValue.includes("-") ||
        inputValue.includes(".") ||
        inputValue.includes(","))
    ) {
      error = "Không được nhập số âm và số thập phân";
      newValue = inputValue.replace(/[,.-]/g, "");
    }

    // Trường hợp 4: Cho nhập tất cả
    // Không cần xử lý gì thêm vì không có hạn chế nào

    e.event.target.value = newValue;
    setError(error);
    // 1 không cho nhập số âm với điều kiện min = 0
    // 2 không cho nhập số thập phân với điều kiện isDecimal = fasle
    // 3 không cho nhập cả 2 // min = 0 và isDecimal = fasle
    // 4 cho nhập tất cả
  };

  return (
    <div className={`number-range-field ${className} `} style={{ width }}>
      <div className={"flex items-center w-full"}>
        <div className={"flex items-center justify-between w-full"}>
          <div className={""}>
            <NumberBox
              width={widthFrom}
              ref={fromRef}
              isValid={!error}
              defaultValue={defaultValueFrom}
              min={min}
              onEnterKey={onEnterKeyFrom}
              max={max}
              onInput={handleInputTo}
              onValueChanged={handleValueFromChanged}
            />
          </div>
          <div className={"mx-[1px]"}>-</div>
          <div className={""}>
            <NumberBox
              ref={toRef}
              width={widthTo}
              isValid={!error}
              defaultValue={defaultValueTo}
              min={min}
              onEnterKey={onEnterKeyTo}
              onInput={handleInputTo}
              max={max}
              onValueChanged={handleValueToChanged}
            />
          </div>
        </div>
      </div>
      {!!error && (
        <div className={"mt-1"}>
          <span className={"text-red-600 text-[12px]"}>{error}</span>
        </div>
      )}
    </div>
  );
};
