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

  const formData = {
    ...data,
  };
  const { showDialog } = useDialog();

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "CusName",
      label: {
        text: "Tên khách hàng",
      },
      render: ({ dataField, component: formComponent }: any) => {
        const value = formComponent.option("formData")[dataField];
        return (
          <div className="flex flex-row">
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder="Nhập"
              showClearButton
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
        text: "Biển số",
      },
      render: ({ dataField, component: formComponent }: any) => {
        const value = formComponent.option("formData")[dataField];
        return (
          <div className="flex flex-row">
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder="Nhập"
              showClearButton
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
        text: "Số khung",
      },
      render: ({ dataField, component: formComponent }: any) => {
        const value = formComponent.option("formData")[dataField];
        return (
          <div className="flex flex-row">
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder="Nhập"
              showClearButton
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },
    {
      visible: true,
      dataField: "Tel",
      label: {
        text: "Điện thoại",
      },
      render: ({ dataField, component: formComponent }: any) => {
        const value = formComponent.option("formData")[dataField];
        return (
          <div className="flex flex-row">
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder="Nhập"
              showClearButton
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
        text: "Địa chỉ",
      },
      render: ({ dataField, component: formComponent }: any) => {
        const value = formComponent.option("formData")[dataField];
        return (
          <div className="flex flex-row">
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder="Nhập"
              showClearButton
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },
  ];


  const checkValidFormData = (formData: any) => {
    // if (!formData.FromDateFromTo[0]) {
    //   showDialog({
    //     title: "Thông báo",
    //     message: "Vui lòng chọn ngày vào xưởng!",
    //   });
    //   return false;
    // }

    return true;
  };
  return (
    <SearchPanelLeft
      formData={formData}
      onSearch={onSearch}
      searchFields={searchFields}
      storeKey="Ser_CustomerCar-SearchForm"
      ref={searchPanelRef}
      checkValidFormData={checkValidFormData}
    />
  );
};

export default SearchForm;
