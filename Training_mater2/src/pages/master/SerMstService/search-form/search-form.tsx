import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { showErrorAtom } from "@/packages/store";
import SearchPanelLeft from "@/packages/ui/search-panel/search-panel-left";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useRef } from "react";

interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}

const SearchForm = ({ data, onSearch }: SearchFormProps) => {
  const searchPanelRef = useRef<any>(null);

  const formData = { ...data };
  const { showDialog } = useDialog();
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "SerCode",
      label: {
        text:"Mã công việc",
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className="flex flex-row">
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
      dataField: "SerName",
      label: {
        text: "Tên công việc",
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className="flex flex-row">
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={ "Nhập"}
              showClearButton={true}
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },
  ];

  const checkValidFormData = (formData: any) => {
    return true;
  };

  return (
    <SearchPanelLeft
      formData={formData}
      onSearch={onSearch}
      searchFields={searchFields}
      storeKey="Ser_MST_Service-SearchForm"
      ref={searchPanelRef}
      checkValidFormData={checkValidFormData}
    />
  );
};

export default SearchForm;
