import { ICommonLabel } from "../interface/hook-field-interface";

const CommonLabel = ({
  children,
  childrenClassName,
  ...props
}: ICommonLabel) => {
  const {
    styling = {
      cssClass: "",
      spacing: "6px",
    },
    direction = "horizontal",
    required = false,
    error = null,
    label = {
      visible: true,
      labelWidth: "30%",
      labelClass: "",
    },
  } = props;

  return (
    <div
      className={`hook-form-field ${childrenClassName} flex ${
        styling.cssClass
      } ${
        direction == "vertical"
          ? "flex-col"
          : `items-center my-[${styling.spacing}]`
      }  ${required ? "required" : ""} ${!!error ? "mb-2" : ""}`}
    >
      {label.visible == true && (
        <label
          className={`${
            direction == "vertical"
              ? "w-full"
              : `min-w-[${label.labelWidth}] w-[${label.labelWidth}] mr-[12px]`
          } break-words ${label.labelClass}`}
        >
          {label.labelContent}
          {required && <span className="ml-[0.5px] text-red-500">*</span>}
        </label>
      )}

      {children}
    </div>
  );
};

export default CommonLabel;
