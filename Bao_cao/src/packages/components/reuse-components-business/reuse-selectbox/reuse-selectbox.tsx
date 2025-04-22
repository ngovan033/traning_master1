import { SelectBox } from "devextreme-react";
import "./reuse-selectbox.scss";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import { ISelectBoxOptions } from "devextreme-react/select-box";

interface IProps {
  defaultValue: string | number | null;
  onValueChanged: (e: ValueChangedEvent) => void;
  cssClass?: string;
  dataSource: any;
  valueExpr: string;
  displayExpr: string;
}

const RSelectBox = ({
  defaultValue,
  onValueChanged,
  cssClass,
  dataSource,
  valueExpr,
  displayExpr,
  ...props
}: IProps & ISelectBoxOptions) => {
  // =============
  let className = [];

  if (cssClass) {
    className.push(cssClass);
  }

  // =============
  const handleValueChanged = (event: ValueChangedEvent) => {
    if (onValueChanged) {
      onValueChanged(event);
    }
  };

  return (
    <SelectBox
      className={`${className.join(" ")} config_my_selectbox`}
      dataSource={dataSource}
      valueExpr={valueExpr}
      displayExpr={displayExpr}
      searchEnabled={true}
      dropDownOptions={{
        resizeEnabled: true,
      }}
      defaultValue={defaultValue}
      onValueChanged={handleValueChanged}
      placeholder="Chọn"
      {...props}
    />
  );
};

export default RSelectBox;
