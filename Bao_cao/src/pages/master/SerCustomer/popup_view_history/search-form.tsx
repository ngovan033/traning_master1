import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@/packages/components/text-field";
import Form, { SimpleItem } from "devextreme-react/form";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@packages/hooks";
import ScrollView from "devextreme-react/scroll-view";
import { Header } from "@packages/ui/search-panel";
import { useSavedState } from "@packages/ui/base-gridview/components";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { Button, DateRangeBox } from "devextreme-react";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { useSetAtom } from "jotai";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  onClose: () => void;
  data: any;
  formRef?: any;
  onSearch: (data: any) => void;
}

export const SearchForm = ({
  onClose,
  data,
  formRef,
  onSearch,
}: SearchFormProps) => {
  const { t } = useI18n("DealerHistoryShareMng");
  const formData = data;
  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const handleSearch = (e: any) => {
    if (formRef.current?.instance.validate().isValid) {
      if (data.FlagDataWH) {
        setOpenPopupWH(true);
      } else {
        onSearch(formData);
      }
    } else {
      return;
    }
  };
  const handleSearchWH = () => {
    onSearch(formData);
  };

  const searchFields = [
    {
      visible: true,
      dataField: "PlateNo", // Biển số
      label: {
        text: t("PlateNo"),
      },
      cssClass: "dms-form-field",
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              onEnterKey={handleSearch}
              placeholder={t("Input")}
            />
          </div>
        );
      },
    },
    {
      visible: true,
      dataField: "FrameNo", // Số VIN
      label: {
        text: t("FrameNo"),
      },
      cssClass: "dms-form-field",
      // validationRules: [RequiredField(t("FrameNoIsRequired"))],
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              onEnterKey={handleSearch}
              placeholder={t("Input")}
              // validationRules={[RequiredField(t("FrameNoIsRequired"))]}
              // validationGroup={formComponent.option("validationGroup")}
            />
          </div>
        );
      },
    },
    {
      dataField: "FlagDataWH",
      label: {
        visible: false,
        text: t("FlagDataWH"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              checkBoxRef={checkBoxRef}
              label={t("FlagDataWH")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
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
    storeKey: "Ser_CustomerCar_ViewHistoryService-search-form",
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
      const hasVisibleTrue = outputColumns.some((item) => item.visible);
      if (hasVisibleTrue) {
        formRef.current?.instance.option("visible", true);
      } else {
        formRef.current?.instance.option("visible", false);
      }
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
      const hasVisibleTrue = latest.some((item) => item.visible);
      if (hasVisibleTrue) {
        formRef.current?.instance.option("visible", true);
      } else {
        formRef.current?.instance.option("visible", false);
      }
      setVisibleColumns(latest);
      chooserVisible.close();
    },
    [setVisibleColumns]
  );

  return (
    <div
      id={"searchForm"}
      className={"w-[300px] h-full border-r-[1px] border-[#cdcccc]"}
    >
      <Header
        className="headerSearch fixed z-[999999]"
        enableColumnToggler={true}
        onToggleSettings={() => {
          chooserVisible.toggle();
        }}
        onCollapse={onClose}
      />
      <ScrollView height={"100%"} showScrollbar="onScroll">
        <form
          className={"formSearch min-w-[300px] mt-6"}
          onSubmit={handleSearch}
        >
          <Form
            ref={formRef}
            formData={formData}
            labelLocation={"top"}
            colCount={1}
            validationGroup={"form"}
            className={" mb-[65px]"}
            scrollingEnabled={true}
            height={"100%"}
          >
            {visibleColumns
              .filter((f) => f.visible)
              .map((field, index) => {
                const found = searchFields.find(
                  (f) => f.dataField == field.dataField
                );
                return <SimpleItem key={index} {...found} />;
              })}
          </Form>
        </form>
      </ScrollView>
      <FieldToggler
        title={t("ToggleColum")}
        applyText={t("Apply")}
        cancelText={t("Cancel")}
        selectAllText={t("SelectAll")}
        container={"#root"}
        button={"#toggle-search-settings"}
        visible={chooserVisible.visible}
        columns={columns}
        onHiding={onHiding}
        onApply={onApply}
        actualColumns={visibleColumns}
        position={"left"}
      />
      <div className={"w-[300px] flex btn-search-car p-2 "}>
        <Button
          width={"100%"}
          text={"Tìm kiếm"}
          onClick={handleSearch}
          type={"default"}
          stylingMode={"contained"}
        ></Button>
      </div>
      <GetDataWH
        onSearch={handleSearchWH}
        formRef={formRef}
        checkBoxRef={checkBoxRef}
      />
    </div>
  );
};
