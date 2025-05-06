import { TextField } from "@/packages/components/text-field";
import { useDialog } from "@/packages/hooks/useDiaglog";
import SearchPanelLeft from "@/packages/ui/search-panel/search-panel-left";
import { useRef } from "react";

interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}

const SearchForm = ({ data, onSearch }: SearchFormProps) => {
  const searchPanelRef = useRef<any>(null);

  const formData = {
    ...data,
  };
  const { showDialog } = useDialog();

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "CusTypeName",
      label: {
        text: "Loại khách hàng",
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

  return (
    <SearchPanelLeft
      formData={formData}
      onSearch={onSearch}
      searchFields={searchFields}
      storeKey="Ser_MST_CustomerTypePageMST3-SearchForm"
      ref={searchPanelRef}
    />
  );
};

export default SearchForm;
