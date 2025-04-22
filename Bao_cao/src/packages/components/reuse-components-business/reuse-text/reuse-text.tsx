import { formatNumber } from "devextreme/localization";
import "./reuse-text.scss";
import { ITextBoxOptions } from "devextreme-react/text-box";
import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";

interface IProps {
  defaultValue: string | number;
  cssClass?: string;
  format?: string;
}

const RText = ({
  defaultValue,
  cssClass,
  format,
}: IProps & ITextBoxOptions) => {
  // =============
  let className = [];

  if (cssClass) {
    className.push(cssClass);
  }

  let _defaultValue;

  if (defaultValue === null || defaultValue === undefined) {
    _defaultValue = "";
  }

  if (typeof defaultValue === "number" && format) {
    _defaultValue = formatNumber(defaultValue, format);
  }

  if (typeof defaultValue === "string") {
    _defaultValue = defaultValue;
  }

  return (
    <div className={`${className.join(" ")} config_my_text`}>
      <p>{_defaultValue}</p>
    </div>
  );
};

export default RText;
