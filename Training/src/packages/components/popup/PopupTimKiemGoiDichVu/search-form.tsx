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
import { useFindSer_ServicePackagePopupLocale } from "./useFindSer_ServicePackagePopupLocale";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { ValidationCallbackData } from "devextreme/common";
import { useCommonUtils } from "@/packages/common/CommonUltils";

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

export const SearchForm = forwardRef(
    ({ onClose, data, onSearch }: SearchFormProps, ref: any) => {
        const commonUtils = useCommonUtils();
        const { locale } = useFindSer_ServicePackagePopupLocale();
        const { commonLocale } = useCommonLocale();

        const formRef = useRef<Form>(null);
        const [formData, setFormData] = useState({
            ...data,
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
            if (formRef.current?.instance.validate().isValid) {
                onSearch(formData);
            } else {
                return;
            }

        };

        const searchFields = [
            // {
            //     dataField: "ServicePackageID",
            //     label: {
            //         text: locale.ServicePackageID,
            //     },
            //     isRequired: false,
            //     render: (param: any) => {
            //         const { dataField, component: formComponent } = param;
            //         const formData = formComponent.option("formData");
            //         return (
            //             <TextField
            //                 dataField={dataField}
            //                 formInstance={formComponent}
            //                 defaultValue={formData?.[dataField]}
            //                 onInput={(e: any) => {
            //                     formComponent.updateData(dataField, e.event.target.value);
            //                 }}
            //                 onValueChanged={(e: any) => {
            //                     formComponent.updateData(dataField, e.value);
            //                 }}
            //                 showClearButton
            //                 readOnly={false}
            //                 width={"100%"}
            //             />
            //         );
            //     },
            // },
            {
                dataField: "ServicePackageNo",
                label: {
                    text: locale.ServicePackageNo,
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
                            showClearButton
                            readOnly={false}
                        />
                    );
                },
            },
            {
                dataField: "ServicePackageName",
                label: {
                    text: locale.ServicePackageName,
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
                            showClearButton
                            readOnly={false}
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
            storeKey: "SearchSer_ServicePackage-search-form",
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
                id={"searchFormSer_ServicePackage"}
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
                        text={commonLocale.BUTTON_SEARCH_SER_PACKAGE}
                        onClick={handleSearch}
                        type={"default"}
                        stylingMode={"contained"}
                        visible={true}
                    ></Button>
                </div>
            </div>
        );
    }
);
