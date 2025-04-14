import { CheckBox } from "devextreme-react";
import { ICheckBoxOptions } from "devextreme-react/check-box";
import "./TextBox.scss";
interface CheckBoxFieldProps {
  field: any;
  label: string;
  readonly?: boolean;
  className?: string;
  labelPosion?: "left" | "right";
  parentClassName?: string;
  props?: ICheckBoxOptions;
  spacing?: string;
  labelWidth?: string;
  classNameLabelLeft?: string;
}
export const CheckBoxField = ({
  label,
  field,
  readonly,
  className,
  labelPosion = "right",
  parentClassName = "",
  props,
  spacing = "8px",
  labelWidth = "110px",
  classNameLabelLeft = "mr-[12px]",
}: CheckBoxFieldProps) => {
  const { onChange, ref, ...rest } = field;

  return (
    <div
      className={` flex items-center ${parentClassName} hook-form-checkbox h-[24px]`}
      style={{
        marginBottom: spacing,
        marginTop: spacing,
      }}
    >
      {labelPosion == "left" && (
        <label
          className={`${classNameLabelLeft}`}
          style={{
            minWidth: labelWidth,
            width: labelWidth,
          }}
        >
          {label}
        </label>
      )}
      <CheckBox
        {...rest}
        value={rest.value == "1"}
        className={className}
        readOnly={readonly}
        onValueChange={async (value: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: value,
            },
          });
        }}
        {...props}
      />
      {labelPosion == "right" && <label className={"ml-2"}>{label}</label>}
    </div>
  );
};
