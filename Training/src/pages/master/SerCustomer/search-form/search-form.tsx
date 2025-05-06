import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@/packages/components/text-field";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import SearchPanelLeft from "@/packages/ui/search-panel/search-panel-left";
import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}

const SearchForm = ({ data, onSearch }: SearchFormProps) => {
  const searchPanelRef = useRef<any>(null);
  const { t } = useI18n("Ser_CustomerCar");
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "CusName",
      label: {
        text: t("CusName"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={"Nhập"}
              showClearButton={true}
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },
    {
      visible: true,
      dataField: "PlateNo",
      label: {
        text: t("PlateNo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={"Nhập"}
              showClearButton={true}
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },
    {
      visible: true,
      dataField: "FrameNo",
      label: {
        text: t("FrameNo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={"Nhập"}
              showClearButton={true}
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },
    {
      visible: true,
      dataField: "Phone",
      label: {
        text: t("Phone"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={"Nhập"}
              showClearButton={true}
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },
    {
      visible: true,
      dataField: "Address",
      label: {
        text: t("Address"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={"Nhập"}
              showClearButton={true}
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },
  ];

  const onClose = () => {
    setSearchPanelVisible(false);
  };

  return (
    <SearchPanelLeft
      formData={{ ...data }}
      onSearch={onSearch}
      searchFields={searchFields}
      storeKey="Ser_CustomerCar-SearchFormm"
      ref={searchPanelRef}
      customOnClose={onClose}
    />
  );
};

export default SearchForm;
