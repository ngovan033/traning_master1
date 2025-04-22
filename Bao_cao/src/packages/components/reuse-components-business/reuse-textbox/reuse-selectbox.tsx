import { TextBox } from "devextreme-react";
import "./reuse-textbox.scss";
import { ValueChangedEvent } from "devextreme/ui/text_box";
import { ITextBoxOptions } from "devextreme-react/text-box";

interface IProps {
  defaultValue: string | null;
  onValueChanged: (e: ValueChangedEvent) => void;
  cssClass?: string;
}

const RTextBox = ({
  defaultValue,
  onValueChanged,
  cssClass,
  ...props
}: IProps & ITextBoxOptions) => {
  // =============
  let className = [];

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
    <TextBox
      className={`${className.join(" ")} config_my_textbox`}
      defaultValue={defaultValue}
      onValueChanged={handleValueChanged}
      placeholder="Nhập"
      {...props}
    />
  );
};

export default RTextBox;
