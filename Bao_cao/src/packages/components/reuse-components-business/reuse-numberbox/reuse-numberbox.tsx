import { NumberBox } from "devextreme-react";
import { INumberBoxOptions } from "devextreme-react/number-box";
import { ValueChangedEvent } from "devextreme/ui/number_box";
import "./reuse-numberbox.scss";

interface IProps {
  defaultValue: number | null;
  format: string;
  onValueChanged: (e: ValueChangedEvent) => void;
  cssClass?: string;
  max?: number;
  min?: number;
  bgWarning?: boolean;
}

const RNumberBox = ({
  defaultValue,
  format,
  onValueChanged,
  bgWarning,
  max = 999999999999,
  min = 0,
  cssClass,
  ...props
}: IProps & INumberBoxOptions) => {
  // =============
  let className = [];

  if (bgWarning) {
    className.push("bgWarning");
  }

  if (cssClass) {
    className.push(cssClass);
  }

  // =============
  const handleValueChanged = (event: ValueChangedEvent) => {
    if (onValueChanged) {
      onValueChanged(event);
    }
  };

  return (
    <NumberBox
      className={`${className.join(" ")} config_my_numberbox`}
      defaultValue={defaultValue ?? 0}
      format={format}
      min={min}
      max={max}
      step={0}
      onValueChanged={handleValueChanged}
      placeholder="Nhập"
      {...props}
    />
  );
};

export default RNumberBox;
