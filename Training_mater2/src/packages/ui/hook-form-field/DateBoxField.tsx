import { useI18n } from "@/i18n/useI18n";
import { DateBox } from "devextreme-react";
import { ApplyValueMode } from "devextreme/common";

interface DateBoxFieldProps {
  field: any;
  label?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  displayFormat: string;
  direction?: string;
  showClearButton?: boolean;
  type?: "date" | "datetime" | "time";
  readOnly?: boolean;
  pickerType?: "calendar" | "list" | "native" | "rollers";
  showAnalogClock?: boolean;
  labelWidth?: string;
  labelClass?: string;
  cssClass?: string;
  spacing?: string;
  refHandle?: any;
  applyValueMode?: ApplyValueMode;
  props?: any;
}

export const DateBoxField = ({
  field,
  label,
  required = false,
  error,
  disabled = false,
  displayFormat,
  direction,
  showClearButton = false,
  type = "datetime",
  pickerType = "calendar",
  showAnalogClock = true,
  labelWidth = "110px",
  labelClass,
  cssClass = "",
  spacing = "8px",
  applyValueMode = "instantly",
  props,
}: DateBoxFieldProps) => {
  const { t } = useI18n("Placeholder");

  const { onChange, ref, ...rest } = field;

  const placeholder = disabled
    ? ""
    : type == "date"
    ? "yyyy-MM-dd"
    : type == "datetime"
    ? "yyyy-MM-dd HH:mm:ss"
    : "HH:mm:ss";

  return (
    <div
      className={`hook-form-datebox relative flex ${
        direction == "vertical" ? "flex-col" : `items-center`
      }  ${required ? "required" : ""} `}
      style={{
        marginBottom: spacing,
        marginTop: spacing,
      }}
    >
      {label && (
        <label
          className={`${
            direction == "vertical" ? "w-full" : ` mr-[12px] ${labelClass}`
          } break-words`}
          style={{
            minWidth: labelWidth,
            width: labelWidth,
          }}
        >
          {label}
          {required && <span className="ml-[0.5px] text-red-500">*</span>}
        </label>
      )}
      <DateBox
        // {...rest}
        readOnly={disabled}
        className={`w-full flex-grow ${cssClass}`}
        value={rest.value}
        type={type}
        onValueChange={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e,
            },
          });
        }}
        isValid={!error}
        validationError={error}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        displayFormat={displayFormat}
        placeholder={placeholder}
        openOnFieldClick
        pickerType={pickerType}
        showClearButton={showClearButton}
        showAnalogClock={showAnalogClock}
        applyValueMode={applyValueMode}
        useMaskBehavior
        dropDownOptions={{
          wrapperAttr: {
            class: `${field.name}-wrapper`,
          },
        }}
        {...props}
      />
    </div>
  );
};
