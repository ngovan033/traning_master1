import { IColumnPopup } from "../components/popup/PopupFromGrid/PopupFromGrid";
import { CheckBoxField } from "../ui/hook-form-field/CheckBoxField";
import { DateBoxField } from "../ui/hook-form-field/DateBoxField";
import { NumberBoxField } from "../ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "../ui/hook-form-field/SelectBoxField";
import { SwitchField } from "../ui/hook-form-field/SwitchField";
import { TagBoxField } from "../ui/hook-form-field/TagBoxField";
import { TextAreaField } from "../ui/hook-form-field/TextAreaField";
import { TextBoxField } from "../ui/hook-form-field/TextBoxField";

interface IGetFieldComponent {
  field: any;
  columnInfo: IColumnPopup;
}

export const useGetFieldComponent = () => {
  const getFieldComponent = ({ field, columnInfo }: IGetFieldComponent) => {
    if (columnInfo.editorType == "dxTextBox") {
      return (
        <TextBoxField
          field={field}
          label={columnInfo.caption}
          required={columnInfo.required}
          onKeyDown={columnInfo.editorOptions.onKeyDown}
          {...columnInfo.editorOptions}
        />
      );
    }

    if (columnInfo.editorType == "dxNumberBox") {
      return (
        <NumberBoxField
          field={field}
          label={columnInfo.caption}
          required={columnInfo.required}
          {...columnInfo.editorOptions}
        />
      );
    }

    if (columnInfo.editorType == "dxSelectBox") {
      return (
        <SelectBoxField
          field={field}
          label={columnInfo.caption}
          required={columnInfo.required}
          displayExpr={columnInfo.editorOptions.displayExpr}
          valueExpr={columnInfo.editorOptions.valueExpr}
          {...columnInfo.editorOptions}
        />
      );
    }

    if (columnInfo.editorType == "dxDateBox") {
      return (
        <DateBoxField
          field={field}
          label={columnInfo.caption}
          required={columnInfo.required}
          displayFormat={columnInfo.editorOptions.displayFormat}
          {...columnInfo.editorOptions}
        ></DateBoxField>
      );
    }

    if (columnInfo.editorType == "dxSwitch") {
      return (
        <SwitchField
          field={field}
          label={columnInfo.caption}
          required={columnInfo.required}
          {...columnInfo.editorOptions}
        />
      );
    }

    if (columnInfo.editorType == "dxTagBox") {
      return (
        <TagBoxField
          field={field}
          label={columnInfo.caption}
          required={columnInfo.required}
          displayExpr={columnInfo.editorOptions.displayExpr}
          valueExpr={columnInfo.editorOptions.valueExpr}
          {...columnInfo.editorOptions}
        />
      );
    }

    if (columnInfo.editorType == "dxTextArea") {
      return (
        <TextAreaField
          field={field}
          label={columnInfo.caption}
          required={columnInfo.required}
          {...columnInfo.editorOptions}
        />
      );
    }

    if (columnInfo.editorType == "dxCheckBox") {
      return (
        <CheckBoxField
          field={field}
          label={columnInfo.caption}
          required={columnInfo.required}
          {...columnInfo.editorOptions}
        />
      );
    }

    return <></>;
  };

  return {
    getFieldComponent,
  };
};
