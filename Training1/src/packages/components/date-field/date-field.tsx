import DateBox from "devextreme-react/date-box";
import { Validator } from "devextreme-react";
import { ValidationRule } from "devextreme-react/common";
import dxForm from "devextreme/ui/form";

import "src/packages/components/date-field/date-field.scss";

interface DateFieldProps {
  formInstance: dxForm;
  dataField: string;
  onValueChanged?: (e: any) => void;
  placeholder?: string;
  width?: number | string;
  readOnly?: boolean;
  defaultValue?: Date;
  showClearButton?: boolean;
  displayFormat?: any;
  calendarOptions?: any;
  validationRules?: ValidationRule[];
  validationGroup?: string;
  type?: "date" | "time" | "datetime";
  disabled?: boolean;
  useMaskBehavior?: boolean;
  className?: string;
  mask?: string;
}

export const DateField = ({
  formInstance,
  dataField,
  width = 250,
  disabled = false,
  placeholder = "yyyy-MM-dd",
  onValueChanged,
  readOnly = false,
  defaultValue,
  useMaskBehavior = true,
  showClearButton,
  displayFormat = "yyyy-MM-dd",
  validationRules,
  validationGroup,
  mask,
  type = "date",
  className = "ml-2",
  calendarOptions,
}: DateFieldProps) => {
  const handleChanged = (e: any) => {
    if (!onValueChanged) {
      formInstance.updateData(dataField, e.value);
    } else {
      onValueChanged(e);
    }
  };
  return (
    <div className={"date-field flex flex-row"}>
      <DateBox
        displayFormat={displayFormat}
        showClearButton={showClearButton}
        openOnFieldClick={true}
        width={width}
        className={className}
        inputAttr={{
          class: "rounded border-[0.5px]",
        }}
        disabled={disabled}
        placeholder={readOnly ? "" : placeholder}
        // valueChangeEvent="keyup"

        onValueChanged={handleChanged}
        readOnly={readOnly}
        // applyValueMode="instantly"
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        defaultValue={defaultValue}
        calendarOptions={calendarOptions}
        useMaskBehavior={useMaskBehavior}
        type={type}
        mask={mask}
      >
        <Validator
          validationGroup={validationGroup}
          validationRules={validationRules}
        ></Validator>
      </DateBox>
    </div>
  );
};
