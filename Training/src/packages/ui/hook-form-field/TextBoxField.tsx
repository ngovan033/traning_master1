import { useI18n } from "@/i18n/useI18n";
import TextBox, { ITextBoxOptions } from "devextreme-react/text-box";
import { NativeEventInfo } from "devextreme/events";
import { KeyDownEvent } from "devextreme/ui/data_grid";
import "./TextBox.scss";

interface TextBoxFieldProps {
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
  onKeyDown?: ((e: KeyDownEvent) => void) | undefined;
  showClearButton?: boolean;
  labelClass?: string;
  labelWidth?: string;
  mask?: string;
  maskInvalidMessage?: string;
  maskChar?: string;
  maskRules?: any;
  spacing?: string;
  isTrim?: boolean;
  inputAttr?: any;
}

export const TextBoxField = ({
  field,
  label,
  required = false,
  error,
  disabled = false,
  direction,
  props,
  mask,
  maskInvalidMessage,
  maskChar = "_",
  maskRules,
  showPlaceholder = true,
  cssClass,
  cssClassInput = "",
  onEnterKey,
  showClearButton = false,
  labelClass,
  labelWidth = "110px",
  spacing = "8px",
  onInput,
  onKeyDown,
  isTrim = true,
}: TextBoxFieldProps) => {
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
      }  ${required ? "required" : ""} `}
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

      <TextBox
        mask={mask}
        maskChar={maskChar}
        maskInvalidMessage={maskInvalidMessage}
        maskRules={maskRules}
        readOnly={disabled}
        inputAttr={ { style: { textAlign: "right" } }}
        {...rest}
        className={`w-full flex-grow ${cssClassInput}`}
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
              value: isTrim && e ? String(e).trim() : e,
            },
          });
        }}
        onEnterKey={handleEnterKey}
        showClearButton={showClearButton}
        onInput={onInput}
        onKeyDown={onKeyDown}
        {...props}
      />
    </div>
  );
};
