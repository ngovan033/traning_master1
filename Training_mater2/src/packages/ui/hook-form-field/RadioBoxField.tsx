import { RadioGroup } from "devextreme-react";
interface RadioBoxFieldProps {
  field: any;
  label: string;
  dataSource: any;
  valueExpr?: string;
  displayExpr: string;
  required?: boolean;
  error?: any;
  defaultValue?: string;
  onValueChanged?: any;
  readonly?: boolean;
  showClearButton?: boolean;
  direction?: string;
  width?: number;
  customFunction?: any;
  props?: any;
  acceptOnchange?: boolean;
  customSelection?: any;
  layout?: "horizontal" | "vertical";
  labelClass?: string;
  labelWidth?: string;

  /**
   * Margin top and bottom of the field
   */
  spacing?: string;
}
export const RadioBoxField = ({
  field,
  error,
  label,
  dataSource,
  valueExpr = "value",
  displayExpr = "text",
  required = false,
  direction,
  width,
  props,
  layout = "horizontal",
  labelClass,
  labelWidth = "110px",
  spacing = "8px",
}: RadioBoxFieldProps) => {
  const { onChange, ref, ...rest } = field;

  const handleChanged = async (e: any) => {
    await onChange({
      target: {
        name: rest.name,
        value: e.value,
      },
    });
  };

  return (
    <div
      className={`hook-form-radiobox relative flex ${
        width ? `${width + 200}px` : "w-full"
      } ${direction == "vertical" ? "flex-col" : `items-center`}  ${
        required ? "required" : ""
      }`}
      style={{
        marginBottom: spacing,
        marginTop: spacing,
      }}
    >
      {label && (
        <label
          className={`${
            direction == "vertical"
              ? "w-full"
              : `min-w-[${labelWidth}] w-[${labelWidth}] mr-[12px]`
          } break-words ${labelClass}`}
        >
          {label}
          {required && <span className="ml-[0.5px] text-red-500">*</span>}
        </label>
      )}

      <RadioGroup
        {...props}
        // {...rest}
        dataSource={dataSource}
        valueExpr={valueExpr}
        displayExpr={displayExpr}
        value={rest.value}
        isValid={!error}
        validationError={error}
        onValueChanged={handleChanged}
        layout={layout}
      />
    </div>
  );
};
