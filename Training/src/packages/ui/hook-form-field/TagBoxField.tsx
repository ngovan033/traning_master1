import { useI18n } from "@/i18n/useI18n";
import { TagBox } from "devextreme-react";
import "./TagBox.scss";
interface SelectboxFieldProps {
  field: any;
  label: string;
  dataSource: any;
  valueExpr: string;
  displayExpr: string;
  required?: boolean;
  error?: any;
  defaultValue?: string;
  onValueChanged?: (dataType: string) => void;
  disabled?: boolean;
  showClearButton?: boolean;
  direction?: string;
  props?: any;
  showPlaceholder?: boolean;
  value: any;
  cssClass?: string;
  spacing?: string;
  labelClass?: string;
  labelWidth?: string;
}
export const TagBoxField = ({
  field,
  error,
  label,
  dataSource,
  valueExpr = "value",
  displayExpr = "text",
  required = false,
  defaultValue,
  onValueChanged,
  cssClass,
  disabled,
  showClearButton,
  direction,
  props,
  showPlaceholder = true,
  value,
  spacing = "8px",
  labelClass,
  labelWidth = "110px",
}: SelectboxFieldProps) => {
  const { onChange, ref, ...rest } = field;
  const { t } = useI18n("Placeholder");

  return (
    <div
      className={`hook-form-textbox flex ${cssClass} ${
        direction == "vertical" ? "flex-col" : `items-start`
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
          } break-words h-[24px] flex items-center ${labelClass} `}
          style={{
            minWidth: labelWidth,
            width: labelWidth,
          }}
        >
          {label}
          {required && <span className="ml-[0.5px] text-red-500">*</span>}
        </label>
      )}

      <TagBox
        // {...rest}
        {...props}
        defaultValue={rest.value}
        name={rest.name}
        readOnly={disabled}
        // deferRendering={true}
        id={rest.name}
        className={"w-full flex-grow"}
        dataSource={dataSource}
        valueExpr={valueExpr}
        displayExpr={displayExpr}
        isValid={!error}
        validationError={error}
        onValueChange={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e,
            },
          });
        }}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        searchEnabled
        searchExpr={displayExpr}
        showClearButton={showClearButton}
        placeholder={showPlaceholder ? t("Input") : ""}
      ></TagBox>
    </div>
  );
};
