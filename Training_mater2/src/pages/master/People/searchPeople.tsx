import { useI18n } from "@/i18n/useI18n";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useDialog } from "@/packages/hooks/useDiaglog";
import SearchPanelLeft from "@/packages/ui/search-panel/search-panel-left";
import { useRef } from "react";
import thongtinJson from "src/pages/master/People/thongtinJson.json";

interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}

const SearchFormPeople = ({ data, onSearch }: SearchFormProps) => {
  const searchPanelRef = useRef<any>(null);
  
  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const formData = {
    ...data,
  };

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "name",
      label: { text: "Tên" },
      render: (param: { dataField: string; component: any }) => {
        const { dataField, component } = param;
        const value = component.option("formData")[dataField];

        return (
          <SelectField
            width={270}
            showClearButton={true}
            items={[
              { value: "", text: "Tất cả" },
              ...thongtinJson.DataList.map((item) => ({
                value: item.name,
                text: item.name,
              })),
            ]}
            displayExpr="text"
            valueExpr="value"
            defaultValue={value}
            dataField={dataField}
            formInstance={component}
            onValueChanged={(e) => {
              component.updateData(dataField, e.value);
            }}
          />
        );
      },
    },
    {
      visible: true,
      dataField: "age",
      label: { text: "Tuổi" },
      render: (param: { dataField: string; component: any }) => {
        const { dataField, component } = param;
        const value = component.option("formData")[dataField];

        return (
          <TextField
            dataField={dataField}
            defaultValue={value}
            formInstance={component}
            placeholder="Nhập tuổi"
            showClearButton={true}
            onValueChanged={(e) => {
              component.updateData(dataField, e.value);
            }}
            onEnterKey={onEnterKey}
          />
        );
      },
    },
    {
      visible: true,
      dataField: "dateOfBirth",
      label: { text: "Ngày sinh" },
      render: (param: { dataField: string; component: any }) => {
        const { dataField, component } = param;
        const value = component.option("formData")[dataField];

        return (
          <TextField
            dataField={dataField}
            defaultValue={value}
            formInstance={component}
            placeholder="YYYY-MM-DD"
            showClearButton={true}
            onValueChanged={(e) => {
              component.updateData(dataField, e.value);
            }}
            onEnterKey={onEnterKey}
          />
        );
      },
    },
  ];

  const checkValidFormData = (formData: any) => {
    // Add validation if needed
    return true;
  };

  return (
    <SearchPanelLeft
      formData={formData}
      onSearch={onSearch}
      searchFields={searchFields}
      storeKey="SearchFormPeople-thongtin"
      ref={searchPanelRef}
      checkValidFormData={checkValidFormData}
    />
  );
};

export default SearchFormPeople;
