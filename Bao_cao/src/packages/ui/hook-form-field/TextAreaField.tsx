import { useI18n } from "@/i18n/useI18n";
import { useCommonUtils } from "@/packages/common/CommonUltils";
import { TextArea } from "devextreme-react";

interface TextAreaFieldProps {
  field: any;
  label?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  direction?: "vertical" | "horizontal";
  props?: any;
  showPlaceholder?: boolean;
  placeholder?: string;
  cssClass?: string;
  labelWidth?: string;
  height?: string;
  labelClass?: string;
  lblClass?: string;
  spacing?: string;
}

export const TextAreaField = ({
  field,
  label,
  required = false,
  error,
  disabled,
  direction = "horizontal",
  props,
  showPlaceholder = true,
  placeholder,
  cssClass,
  labelWidth = "110px",
  height = "48px",
  labelClass,
  lblClass,
  spacing = "8px",
}: TextAreaFieldProps) => {
  const { onChange, ref, ...rest } = field;

  const { t } = useI18n("Placeholder");
  const commonUtils = useCommonUtils();

  return (
    <div
      className={`hook-form-textarea flex ${cssClass} ${
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
            direction == "vertical" ? "w-full vertical" : `horizontal mr-[12px]`
          } break-words flex self-start ${lblClass} `}
          style={{
            minWidth: direction == "horizontal" ? labelWidth : "100%",
            width: direction == "horizontal" ? labelWidth : "100%",
          }}
        >
          <div
            className={`h-[24px] w-full flex items-center break-words  ${labelClass}`}
          >
            {label}
            {required && <span className="ml-[0.5px] text-red-500">*</span>}
          </div>
        </label>
      )}
      <TextArea
        readOnly={disabled}
        {...rest}
        className={"w-full h-full"}
        defaultValue={rest.value}
        isValid={!error}
        validationError={error}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        placeholder={
          showPlaceholder
            ? !commonUtils.isNullOrEmpty(placeholder)
              ? commonUtils.strVaule(placeholder)
              : ""
            : ""
        }
        onValueChanged={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e.value,
            },
          });
        }}
        height={height}
        bindingOptions={{
          resize: true,
        }}
        {...props}
      />
    </div>
  );
};
