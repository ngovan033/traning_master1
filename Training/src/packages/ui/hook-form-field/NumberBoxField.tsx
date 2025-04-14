import { useI18n } from "@/i18n/useI18n";
import { NumberBox } from "devextreme-react";
import { INumberBoxOptions } from "devextreme-react/number-box";
import { KeyDownEvent } from "devextreme/ui/number_box";
import "./TextBox.scss";

interface TextBoxFieldProps {
  field: any;
  label?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  direction?: string;
  props?: INumberBoxOptions;
  showPlaceholder?: boolean;
  showSpinButtons?: boolean;
  cssClass?: string;
  format?: string;
  labelWidth?: string;
  labelClass?: string;
  spacing?: string;
  isForceNumber?: boolean;
  isNegativeNumber?: boolean;
  onKeyDown?: (e: KeyDownEvent) => void;
}

export const NumberBoxField = ({
  field,
  label,
  required = false,
  error,
  disabled,
  direction,
  props,
  showPlaceholder = true,
  cssClass,
  format = "#,##0",
  labelWidth = "110px",
  labelClass,
  spacing = "8px",
  showSpinButtons,
  isForceNumber = false,
  isNegativeNumber = false,
  onKeyDown,
}: TextBoxFieldProps) => {
  const { onChange, ref, ...rest } = field;

  const { t } = useI18n("Placeholder");

  return (
    <div
      className={`hook-form-numberbox flex ${cssClass} ${
        direction == "vertical" ? "flex-col" : `items-center`
      }  ${required ? "required" : ""}`}
      style={{
        marginBottom: spacing,
        marginTop: spacing,
      }}
    >
      {label && (
        <label
          className={`${
            direction == "vertical" ? "w-full" : `mr-[12px]`
          } break-words ${labelClass}`}
          style={{
            minWidth: labelWidth,
            width: labelWidth,
          }}
        >
          {label}
          {required && <span className="ml-[0.5px] text-red-500">*</span>}
        </label>
      )}

      <NumberBox
        readOnly={disabled}
        {...rest}
        className={"w-full flex-grow"}
        showSpinButtons={showSpinButtons}
        isValid={!error}
        mode="number"
        validationError={error}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        placeholder={showPlaceholder && !disabled ? t("Input") : ""}
        valueChangeEvent="keyup"
        value={rest.value}
        onValueChange={async (value: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: value,
            },
          });
        }}
        format={format}
        step={0}
        onKeyDown={(e: any) => {
          if (onKeyDown) {
            return onKeyDown(e);
          }

          if (isNegativeNumber == false) {
            if (e.event.key == "-") {
              e.event.preventDefault();
              e.event.stopImmediatePropagation();
            }
          }
        }}
        {...props}
      />
    </div>
  );
};
