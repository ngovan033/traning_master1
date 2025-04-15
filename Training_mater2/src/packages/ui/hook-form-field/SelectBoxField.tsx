import { useI18n } from "@/i18n/useI18n";
import { SelectBox } from "devextreme-react";
import { ISelectBoxOptions } from "devextreme-react/select-box";
interface SelectBoxFieldProps {
  field: any;
  label?: string;
  dataSource: any;
  valueExpr?: string;
  displayExpr: string | ((item: any) => string);
  required?: boolean;
  error?: any;
  showClearButton?: boolean;
  direction?: string;
  width?: number;
  props?: ISelectBoxOptions;
  acceptOnchange?: boolean;
  customSelection?: any;
  disabled?: boolean;
  labelWidth?: string;
  labelClass?: string;
  spacing?: string;
  searchExpr?: string;
  searchEnabled?: boolean;
  itemRender?: ((...params: any) => React.ReactNode) | undefined;
  fieldRender?: ((...params: any) => React.ReactNode) | undefined;
}
export const SelectBoxField = ({
  field,
  error,
  label,
  dataSource,
  valueExpr = "value",
  displayExpr = "text",
  required = false,
  showClearButton,
  direction,
  width,
  props,
  acceptOnchange = true,
  disabled = false,
  customSelection,
  labelWidth = "110px",
  labelClass,
  searchEnabled = true,
  spacing = "8px",
  itemRender,
  fieldRender,
  searchExpr,
}: SelectBoxFieldProps) => {
  const { onChange, ref, ...rest } = field;

  const { t: p } = useI18n("Placeholder");

  return (
    <div
      className={`hook-form-selectbox relative flex ${
        width ? `${width + 200}px` : "w-full"
      } ${direction == "vertical" ? "flex-col" : `items-center`}  ${
        required ? "required" : ""
      }  `}
      style={{
        marginBottom: spacing,
        marginTop: spacing,
      }}
    >
      {label && (
        <label
          className={`${
            direction == "vertical" ? "w-full" : ` mr-[12px]  `
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

      <SelectBox
        value={field.value}
        readOnly={disabled}
        deferRendering={true}
        id={rest.name}
        className={width ? `w-[${width}px]` : "w-full flex-grow"}
        dataSource={dataSource}
        valueExpr={valueExpr}
        displayExpr={displayExpr}
        // defaultValue={value}
        itemRender={itemRender}
        fieldRender={fieldRender}
        searchEnabled={searchEnabled}
        isValid={!error}
        validationError={error}
        onValueChange={async (value: any) => {
          acceptOnchange &&
            (await onChange({
              target: {
                name: rest.name,
                value: value,
              },
            }));
        }}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        searchExpr={searchExpr ?? displayExpr}
        showClearButton={showClearButton}
        onSelectionChanged={customSelection}
        placeholder={disabled ? "" : p("Select")}
        dropDownOptions={{
          resizeEnabled: true,
          ...props?.dropDownOptions,
        }}
        {...props}
      ></SelectBox>
    </div>
  );
};
