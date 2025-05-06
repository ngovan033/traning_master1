import { TextField } from "@/packages/components/text-field";

import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@packages/hooks";
import { useSavedState } from "@packages/ui/base-gridview/components";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { Header } from "@packages/ui/search-panel";
import { Button } from "devextreme-react";
import Form, { SimpleItem } from "devextreme-react/form";
import ScrollView from "devextreme-react/scroll-view";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from "react";
import { useFindCustomerCarPopupLocale } from "./useFindCustomerCarPopupLocale";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { ValidationCallbackData } from "devextreme/common";
import { useCommonUtils } from "@/packages/common/CommonUltils";
import { useSer_RO_Locale } from "@/pages/carservice/Ser_RO/views/locale/Ser_RO_Locale";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  onClose: () => void;
  data: any;
  onSearch: (data: any) => void;
  isEnabled: boolean;
}

export const SearchForm = forwardRef(
  ({ onClose, data, onSearch, isEnabled }: SearchFormProps, ref: any) => {
    const commonUtils = useCommonUtils();
    const {
      Ser_RO_Locale,
      Ser_ROPartItems_Locale,
      Ser_ROServiceItems_Locale,
      PopupSer_RO_FindCustomerCarSharing_Locale,
    } = useSer_RO_Locale();
    const { locale } = useFindCustomerCarPopupLocale();
    const { commonLocale } = useCommonLocale();

    const formRef = useRef<Form>(null);
    const [formData, setFormData] = useState({
      ...data,
      CusName: "",
    });

    useImperativeHandle(ref, () => ({
      setFormData(data: any) {
        setFormData({
          ...formData,
          ...data,
        });
      },
    }));
    const handleSearch = (e: any) => {
      // if (formRef.current?.instance.validate().isValid) {
      // } else {
      //   return;
      // }
      onSearch(formData);
    };

    const searchFields = [
      {
        dataField: "PlateNo",
        label: {
          text: locale.PlateNo,
        },
        isRequired: false,
        render: (param: any) => {
          const { dataField, component: formComponent } = param;
          const formData = formComponent.option("formData");
          return (
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onInput={(e: any) => {
                formComponent.updateData(dataField, e.event.target.value);
              }}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              onEnterKey={handleSearch}
              showClearButton
              readOnly={isEnabled}
              width={"100%"}
              // validationRules={
              //   [
              //     {
              //       type: "custom",
              //       ignoreEmptyValue: true,
              //       message:
              //         PopupSer_RO_FindCustomerCarSharing_Locale.Ser_RO_PU_FindCustomerCarSharing_PlateNo_FrameNo_Invalid,
              //       validationCallback: (e: ValidationCallbackData) => {
              //         let check = false;
              //         if (commonUtils.isNullOrEmpty(e.value)) {
              //           if (commonUtils.isNullOrEmpty(formData.FrameNo)) {
              //             check = false;
              //           }
              //         } else {
              //           check = true;
              //         }
              //         const isValid = check;
              //         e.rule.isValid = isValid;
              //         return isValid;
              //       },
              //     },
              //     {
              //       type: "custom",
              //       ignoreEmptyValue: true,
              //       message:
              //         PopupSer_RO_FindCustomerCarSharing_Locale.Ser_RO_PU_FindCustomerCarSharing_FrameNo_Minimum_Of_6_Characters_Invalid,
              //       validationCallback: (e: ValidationCallbackData) => {
              //         let check = false;
              //         let iLength = 0;
              //         if (commonUtils.isNullOrEmpty(e.value)) {
              //           iLength = commonUtils.iLength(formData.FrameNo);
              //           if (iLength < 6) {
              //             check = false;
              //           } else {
              //             check = true;
              //           }
              //         } else {
              //           check = true;
              //         }
              //         const isValid = check;
              //         e.rule.isValid = isValid;
              //         return isValid;
              //       },
              //     },
              //     {
              //       type: "custom",
              //       ignoreEmptyValue: true,
              //       message:
              //         PopupSer_RO_FindCustomerCarSharing_Locale.Ser_RO_PU_FindCustomerCarSharing_PlateNo_Minimum_Of_8_Characters_Invalid,
              //       validationCallback: (e: ValidationCallbackData) => {
              //         let check = false;
              //         if (!commonUtils.isNullOrEmpty(e.value)) {
              //           let iLength = commonUtils.iLength(e.value);
              //           if (iLength < 8) {
              //             let iLength_FrameNo = commonUtils.iLength(
              //               formData.FrameNo
              //             );
              //             if (iLength_FrameNo < 6) {
              //               check = false;
              //             } else {
              //               check = true;
              //             }
              //           } else {
              //             check = true;
              //           }
              //         } else {
              //           check = true;
              //         }
              //         const isValid = check;
              //         e.rule.isValid = isValid;
              //         return isValid;
              //       },
              //     },
              //   ] as any
              // }
              // validationGroup={formComponent.option("validationGroup")}
            />
          );
        },
      },
      {
        dataField: "FrameNo",
        label: {
          text: locale.FrameNo,
        },
        isRequired: false,

        render: (param: any) => {
          const { dataField, component: formComponent } = param;
          const formData = formComponent.option("formData");
          return (
            <TextField
              className={"mb-1 ml-2"}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onInput={(e: any) => {
                formComponent.updateData(dataField, e.event.target.value);
              }}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              onEnterKey={handleSearch}
              showClearButton
              readOnly={isEnabled}
              // validationRules={
              //   [
              //     {
              //       type: "custom",
              //       ignoreEmptyValue: true,
              //       message:
              //         PopupSer_RO_FindCustomerCarSharing_Locale.Ser_RO_PU_FindCustomerCarSharing_PlateNo_FrameNo_Invalid,
              //       validationCallback: (e: ValidationCallbackData) => {
              //         let check = false;
              //         if (commonUtils.isNullOrEmpty(e.value)) {
              //           if (commonUtils.isNullOrEmpty(formData.PlateNo)) {
              //             check = false;
              //           }
              //         } else {
              //           check = true;
              //         }
              //         const isValid = check;
              //         e.rule.isValid = isValid;
              //         return isValid;
              //       },
              //     },
              //     {
              //       type: "custom",
              //       ignoreEmptyValue: true,
              //       message:
              //         PopupSer_RO_FindCustomerCarSharing_Locale.Ser_RO_PU_FindCustomerCarSharing_PlateNo_Minimum_Of_8_Characters_Invalid,
              //       validationCallback: (e: ValidationCallbackData) => {
              //         let check = false;
              //         let iLength = 0;
              //         if (commonUtils.isNullOrEmpty(e.value)) {
              //           iLength = commonUtils.iLength(formData.PlateNo);
              //           if (iLength < 8) {
              //             check = false;
              //           } else {
              //             check = true;
              //           }
              //         } else {
              //           check = true;
              //         }
              //         const isValid = check;
              //         e.rule.isValid = isValid;
              //         return isValid;
              //       },
              //     },
              //     {
              //       type: "custom",
              //       ignoreEmptyValue: true,
              //       message:
              //         PopupSer_RO_FindCustomerCarSharing_Locale.Ser_RO_PU_FindCustomerCarSharing_FrameNo_Minimum_Of_6_Characters_Invalid,
              //       validationCallback: (e: ValidationCallbackData) => {
              //         let check = false;
              //         if (!commonUtils.isNullOrEmpty(e.value)) {
              //           let iLength = commonUtils.iLength(e.value);
              //           if (iLength < 6) {
              //             let iLength_PlateNo = commonUtils.iLength(
              //               formData.PlateNo
              //             );
              //             if (iLength_PlateNo < 8) {
              //               check = false;
              //             } else {
              //               check = true;
              //             }
              //           } else {
              //             check = true;
              //           }
              //         } else {
              //           check = true;
              //         }
              //         const isValid = check;
              //         e.rule.isValid = isValid;
              //         return isValid;
              //       },
              //     },
              //   ] as any
              // }
              // validationGroup={formComponent.option("validationGroup")}
            />
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
      storeKey: "SearchProduct-search-form",
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
            columnOrders.indexOf(a.dataField) -
            columnOrders.indexOf(b.dataField)
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
      <div
        id={"searchForm"}
        className={"w-[300px] h-full border-r-[1px] border-[#cdcccc]"}
      >
        <Header
          className="headerSearch w-[300px] bg-[#ffff] fixed z-[999999] "
          enableColumnToggler={true}
          onToggleSettings={() => {
            chooserVisible.toggle();
          }}
          onCollapse={onClose}
        />
        <ScrollView height={"100%"} showScrollbar="onScroll">
          <form
            className={"formSearch min-w-[300px] ml-[5px] mt-6"}
            onSubmit={handleSearch}
          >
            <Form
              height={"100%"}
              ref={formRef}
              formData={formData}
              labelLocation={"top"}
              colCount={1}
              className={"mb-[50px] w-[100%]"}
              scrollingEnabled={true}
              validationGroup={"form"}
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
          position={"left"}
        />
        <div
          className={
            "w-[300px] flex btn-search-car p-2 translate-y-[-70px] translate-x-[-2px] bg-[#ffff]"
          }
        >
          <Button
            width={"100%"}
            text={commonLocale.BUTTON_SEARCH_SHARED_CAR}
            onClick={handleSearch}
            type={"default"}
            stylingMode={"contained"}
            visible={!isEnabled}
          ></Button>
        </div>
      </div>
    );
  }
);
