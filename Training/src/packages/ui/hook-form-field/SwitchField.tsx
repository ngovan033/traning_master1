import { useI18n } from "@/i18n/useI18n";
import { Switch } from "devextreme-react";
import { ITextBoxOptions } from "devextreme-react/text-box";
import { NativeEventInfo } from "devextreme/events";
import "./TextBox.scss";

interface SwitchFieldProps {
  field: any;
  label?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  direction?: "vertical" | "horizontal";
  props?: ITextBoxOptions;
  showPlaceholder?: boolean;
  cssClass?: string;
  cssClassInput?: string;
  onEnterKey?: (currentText: string) => void;
  onInput?: ((e: InputEvent) => void) | undefined;
  showClearButton?: boolean;
  labelClass?: string;
  labelWidth?: string;
  spacing?: string;
}

export const SwitchField = ({
  field,
  label,
  required = false,
  error,
  disabled,
  direction,
  props,
  showPlaceholder = true,
  cssClass,
  cssClassInput = "",
  onEnterKey,
  showClearButton = false,
  labelClass,
  labelWidth = "110px",
  spacing = "4px",
  onInput,
}: SwitchFieldProps) => {
  const { onChange, ref, ...rest } = field;

  const { t } = useI18n("Placeholder");

  const handleEnterKey = (e: NativeEventInfo<any>) => {
    const currentText = e.component.option("text");

    if (onEnterKey) {
      onEnterKey(currentText);
    }
  };

  return (
    <div
      className={`hook-form-textbox flex ${cssClass} ${
        direction == "vertical" ? "flex-col" : `items-center`
      }  ${required ? "required" : ""} h-[24px]`}
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

      <Switch
        readOnly={disabled}
        {...rest}
        className={` ${cssClassInput}`}
        defaultValue={rest.value}
        isValid={!error}
        validationError={error}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        placeholder={showPlaceholder && !disabled ? t("Input") : ""}
        onValueChange={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e,
            },
          });
        }}
        onEnterKey={handleEnterKey}
        showClearButton={showClearButton}
        onInput={onInput}
        width={40}
        {...props}
      />
    </div>
  );
};
