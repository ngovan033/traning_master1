import { TextField } from "@/packages/components/text-field";

import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@packages/hooks";
import { useSavedState } from "@packages/ui/base-gridview/components";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { Header } from "@packages/ui/search-panel";
import { Button } from "devextreme-react";
import Form, { SimpleItem } from "devextreme-react/form";
import { useCallback, useEffect, useReducer, useRef } from "react";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  onClose: () => void;
  data: any;
  onSearch: (data: any) => void;
}

export const SearchForm = ({ onClose, data, onSearch }: SearchFormProps) => {
  const { commonLocale } = useCommonLocale();

  const formRef = useRef<Form>(null);
  const formData = {
    ...data,
  };

  const handleSearch = () => {
    onSearch(formData);
  };

  const searchFields = [
    {
      dataField: "CusName",
      label: {
        text: "Tên khách hàng",
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];

        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              // onInput={(e: any) => {
              //   formComponent.updateData(dataField, e.event.target.value);
              // }}
              onEnterKey={(e: any) => {
                formComponent.updateData(dataField, e.event.target.value);
                handleSearch();
              }}
              showClearButton
            />
          </div>
        );
      },
      visible: true,
    },
  ];
  const columns: ColumnVisible[] = searchFields.map(
    (field) =>
      ({
        dataField: field.dataField,
        caption: field.label.text,
        visible: true,
      } as ColumnVisible)
  );

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "PopupTimKiemThongTinKhachHang-search-form",
  });
  const [visibleColumns, setVisibleColumns] = useReducer(
    (state: ColumnOptions[], changes: ColumnOptions[]) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      const columnOrders = savedState.map(
        (column: ColumnOptions) => column.dataField
      );
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        column.visible = filterResult ? filterResult.visible : false;
        return column;
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setVisibleColumns(outputColumns);
    }
  }, []);

  const onHiding = () => {
    chooserVisible.close();
  };

  const onApply = useCallback(
    (changes: any) => {
      // we need check the order of column from changes set
      const latest = [...changes];
      visibleColumns.forEach((column: ColumnOptions) => {
        const found = changes.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        if (!found) {
          column.visible = false;
          latest.push(column);
        }
      });
      setVisibleColumns(latest);
      chooserVisible.close();
    },
    [setVisibleColumns]
  );

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  return (
    <div className="h-full">
      <div id={"search-panel-left"} className={"w-[300px]"}>
        <Header
          enableColumnToggler={true}
          onToggleSettings={() => {
            chooserVisible.toggle();
          }}
          onCollapse={onClose}
        />
        <form
          className={"search-panel-form min-w-[300px]"}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          {visibleColumns.filter((c) => c.visible == true).length > 0 ? (
            <Form
              ref={formRef}
              formData={formData}
              labelLocation={"top"}
              colCount={1}
              className={"h-full w-[300px]"}
              scrollingEnabled={true}
              validationGroup={"form"}
            >
              {visibleColumns
                .filter((f) => f.visible == true)
                .map((field, index) => {
                  const found = searchFields.find(
                    (f) => f.dataField == field.dataField
                  );

                  if (!found) return <></>;
                  return (
                    <SimpleItem key={index} {...found} render={found.render} />
                  );
                })}
            </Form>
          ) : (
            <div></div>
          )}
        </form>
        <FieldToggler
          title={commonLocale.BUTTON_TOGGLE_COLUMN}
          applyText={commonLocale.BUTTON_APPLY}
          cancelText={commonLocale.BUTTON_CANCEL}
          selectAllText={commonLocale.BUTTON_SELECT_ALL}
          container={"#root"}
          button={"#toggle-search-settings"}
          visible={chooserVisible.visible}
          columns={columns}
          onHiding={onHiding}
          onApply={onApply}
          actualColumns={visibleColumns}
        />
        <div className={"w-full search-area"}>
          <Button
            text={commonLocale.BUTTON_SEARCH}
            onClick={handleSearch}
            type={"default"}
            stylingMode={"contained"}
            width={270}
            // useSubmitBehavior={true}
            validationGroup={"form"}
          ></Button>
        </div>
      </div>
    </div>
  );
};
