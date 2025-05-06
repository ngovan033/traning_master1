import { useVisibilityControl } from "@/packages/hooks";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { Header } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { Button, Form } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useSavedState } from "../base-gridview/components";
import { openPopupAtom } from "../base-gridview/store/popup-grid-store";
import FieldToggler from "../field-toggler/field-toggler";
import GetDataWH from "../getDataWH/getDataWH";

interface ISearchPanelLeft {
  searchFields: any[];
  storeKey: string;
  formData: any;
  onSearch: (formData: any) => void;
  checkValidFormData?: (formData) => boolean;
  customHeight?: number;
  customOnClose?: () => void;
}

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}

const SearchPanelLeft = forwardRef(
  (
    {
      searchFields,
      storeKey,
      formData,
      onSearch,
      checkValidFormData,
      customHeight,
      customOnClose,
    }: ISearchPanelLeft,
    ref
  ) => {
    const formRef = useRef<Form>(null);
    useImperativeHandle(ref, () => ({
      search: handleSearch,
      getFormRef: () => {
        return formRef.current;
      },
    }));

    const checkBoxRef = useRef<Form>(null);

    const chooserVisible = useVisibilityControl({ defaultVisible: false });
    const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
    const setOpenPopupWH = useSetAtom(openPopupAtom);

    const { commonLocale } = useCommonLocale();

    const { saveState, loadState } = useSavedState<ColumnOptions[]>({
      storeKey: storeKey,
    });

    const onClose = () => {
      if (customOnClose) {
        customOnClose();
      } else {
        setSearchPanelVisible(false);
      }
    };

    const columns: ColumnVisible[] = searchFields.map(
      (field) =>
        ({
          dataField: field.dataField,
          caption: field.label.text,
          label: {
            ...field.label,
            text: field.label.text,
          },
          visible: field.visible,
        } as ColumnVisible)
    );

    const [visibleColumns, setVisibleColumns] = useState(columns);

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
          const columnSettings = searchFields.find(
            (c) => c.dataField === column.dataField
          );

          column.visible = filterResult ? filterResult.visible : false;
          return {
            ...columnSettings,
            ...column,
          };
        });
        outputColumns.sort(
          (a, b) =>
            columnOrders.indexOf(a.dataField) -
            columnOrders.indexOf(b.dataField)
        );
        setVisibleColumns(outputColumns);
      }
    }, []);

    const onHiding = () => {
      chooserVisible.close();
    };

    const onApply = (changes) => {
      setVisibleColumns(changes);

      saveState(changes);

      chooserVisible.close();
    };

    const handleSearchWH = () => {
      if (formData.FlagWH || formData.FlagDataWH) {
        onSearch(formData);
      }
    };

    const handleSearch = () => {
      if (checkValidFormData) {
        if (checkValidFormData(formData)) {
          if (formData.FlagWH || formData.FlagDataWH) {
            setOpenPopupWH(true);
          } else {
            onSearch(formData);
          }
          return;
        } else {
          return;
        }
      }

      if (formData.FlagWH || formData.FlagDataWH) {
        setOpenPopupWH(true);
      } else {
        onSearch(formData);
      }
    };

    return (
      <div className="h-full">
        <div id={"search-panel-left"} className="w-[300px]">
          {/* Header form search : toogle columns & hidden form  */}
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
                      <SimpleItem
                        key={index}
                        {...found}
                        label={{ ...field.label, text: field.caption }}
                      />
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
              activeStateEnabled={false}
              focusStateEnabled={false}
            ></Button>
          </div>
        </div>
        <GetDataWH
          onSearch={handleSearchWH}
          formRef={formRef}
          checkBoxRef={checkBoxRef}
        />
      </div>
    );
  }
);

export default SearchPanelLeft;
