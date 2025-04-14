import { Validator } from "devextreme-react";
import { ValidationRule } from "devextreme-react/common";
import TextBox, { ITextBoxOptions } from "devextreme-react/text-box";
import dxForm from "devextreme/ui/form";
import "./phone-field.scss";
import { useState } from "react";

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
}

export const PhoneField = ({
  formInstance,
  dataField,
  width = 270,
  placeholder,
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
  const [value, setValue] = useState();
  const handleInput = (e: any) => {
    console.log(58, e);
    if (!onValueChanged) {
      if (/^[0-9]+$/.test(e.value)) {
        setValue(e.value);
      }
    }

    // formInstance.updateData(dataField, e.event.target.value);
  };
  return (
    <div className={"text-field flex flex-row"}>
      <TextBox
        mode="tel"
        width={width}
        className={`${className} `}
        inputAttr={{
          class: "rounded border-[0.5]",
        }}
        placeholder={placeholder}
        value={value}
        showClearButton={showClearButton}
        readOnly={readOnly}
        defaultValue={defaultValue}
        // onInput={handleInput}
        onValueChanged={handleInput}
        // onChange={handleInput}

        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        {...props}
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
