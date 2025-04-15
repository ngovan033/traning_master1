import { Validator } from "devextreme-react";
import { ValidationRule } from "devextreme-react/common";
import TextBox, { ITextBoxOptions } from "devextreme-react/text-box";
import dxForm from "devextreme/ui/form";
import "./text-field.scss";

interface TextFieldProps extends ITextBoxOptions {
  formInstance: dxForm;
  className?: any;
  dataField: string;
  onValueChanged?: (e: any) => void;
  placeholder?: string;
  width?: any;
  rules?: any;
  mask?: any;
  child?: any;
  readOnly?: boolean;
  validationRules?: ValidationRule[];
  validationGroup?: string;
  defaultValue?: string;
  showClearButton?: boolean;
  isMdSize?: boolean;
  mode?: "email" | "password" | "search" | "tel" | "text" | "url";
}

export const TextField = ({
  formInstance,
  dataField,
  width = 270,
  placeholder = "Nhập",
  validationRules,
  validationGroup,
  rules,
  mask,
  onValueChanged,
  readOnly = false,
  defaultValue,
  showClearButton = false,
  className = "ml-2",
  child,
  mode,
  onInput,
  isMdSize = false,
  ...props
}: TextFieldProps) => {
  const maskRules = {
    S: /[0-9,a-z,A-Z]/,

    G: /[0-9]/,

    // a regular expression
    H: /[a-z,A-Z," ",""]/,

    I: /[a-z,A-Z]/,

    F: (char: any) => {
      return char == char.toUpperCase();
    },
  };
  const handleChanged = (e: any) => {
    if (!onValueChanged) {
      formInstance.updateData(dataField, e.value);
    } else {
      onValueChanged(e);
    }
  };
  return (
    <div
      className={`${
        isMdSize ? "config_md_textbox" : ""
      } text-field flex flex-row`}
    >
      <TextBox
        width={width}
        className={`${className} `}
        inputAttr={{
          class: "rounded border-[0.5]",
        }}
        mode={mode}
        placeholder={readOnly ? "" : placeholder}
        onValueChanged={handleChanged}
        showClearButton={showClearButton}
        readOnly={readOnly}
        defaultValue={defaultValue}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        {...props}
        // onInput={onInput}
        mask={mask}
        maskRules={maskRules}
      >
        <Validator
          validationGroup={validationGroup}
          validationRules={validationRules}
        ></Validator>
        {child}
      </TextBox>
    </div>
  );
};
