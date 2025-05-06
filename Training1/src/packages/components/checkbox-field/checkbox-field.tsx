import dxForm from "devextreme/ui/form";
import { CheckBox } from "devextreme-react";
import "./checkbox-field.scss";
import { ICheckBoxOptions } from "devextreme-react/check-box";

interface CheckboxFieldProps extends ICheckBoxOptions {
  formInstance: dxForm;
  dataField: string;
  onValueChanged: (e: any) => void;
  width?: number;
  label?: string;
  defaultValue?: boolean;
  readOnly?: boolean;
  cssClass?: string;
  checkBoxRef?: any;
}

export const CheckboxField = ({
  label,
  formInstance,
  dataField,
  width = 250,
  onValueChanged,
  defaultValue,
  readOnly,
  checkBoxRef,
  cssClass,
  ...props
}: CheckboxFieldProps) => {
  return (
    <div className={"checkbox-field flex items-start"}>
      <CheckBox
        ref={checkBoxRef}
        width={width}
        className={`ml-2 ${cssClass}`}
        onValueChanged={onValueChanged}
        text={label}
        defaultValue={defaultValue}
        readOnly={readOnly}
        {...props}
      />
    </div>
  );
};
