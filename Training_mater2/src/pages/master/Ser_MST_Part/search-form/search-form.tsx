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
  const { t } = useI18n("Ser_MSTPart");
  const formData = {
    ...data,
  };
  const { showDialog } = useDialog();

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const { data: getMSTPartGroup, isLoading: isGettingListInsuranceCode } =
    useQuery({
      queryKey: ["getMSTPartGroup"],
      queryFn: async () => {
        const response = await api.Ser_MST_PartGroup_GetAllActive();
        if (response.isSuccess) {
          return [
            {
              GroupCode: "",
              GroupName: "Tất cả", // Tất cả
            },
            ...(response.DataList as any),
          ];
        } else {
          showError({
            message: t(response._strErrCode),
            _strErrCode: response._strErrCode,
            _strTId: response._strTId,
            _strAppTId: response._strAppTId,
            _objTTime: response._objTTime,
            _strType: response._strType,
            _dicDebug: response._dicDebug,
            _dicExcs: response._dicExcs,
          });
        }
      },
    });

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "PartCode",
      label: {
        text: "Mã phụ tùng", // Mã phụ tùng
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
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
        );
      },
    },
    {
      visible: true,
      dataField: "VieName",
      label: {
        text: "Tên phụ tùng", // Tên phụ tùng
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
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
        );
      },
    },
    {
      visible: true,
      dataField: "PartGroupID",
      label: {
        text: "Loại vật tư", // Loại vật tư
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={270}
            showClearButton={true}
            items={[
              { text: "Tất cả", value: "" },
              ...(getMSTPartGroup
                ?.filter((item: any) => !!item.GroupName?.trim()) // Lọc GroupName không rỗng
                .map((item: any) => ({
                  text: item.GroupName.trim(),
                  value: item.PartGroupID,
                })) ?? []),
            ]}
            displayExpr="text"
            valueExpr="value"
            dataField={dataField}
            formInstance={formComponent}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
          />
        );
      },
    },
    {
      visible: true,
      dataField: "IsActive",
      label: {
        text: "Trạng thái",
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            dataField={dataField}
            defaultValue={"1"}
            formInstance={formComponent}
            items={[
              { value: "", text: "Tất cả" },
              { value: "1", text: "Kích hoạt" },
              { value: "0", text: "Không kích hoạt" },
            ]}
            displayExpr="text"
            valueExpr="value"
            showClearButton={false}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
          />
        );
      },
    },

    {
      visible: true,
      dataField: "FreqUsed",
      label: {
        text: "Tình trạng sử dụng", // Tình trạng sử dụng
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <SelectField
            dataField={dataField}
            defaultValue={formData?.[dataField]}
            formInstance={formComponent}
            items={[
              { value: "", text: "Tất cả" },
              { value: "1", text: "Hay sử dụng" },
              { value: "0", text: "Ít sử dụng" },
            ]}
            displayExpr="text"
            valueExpr="value"
            showClearButton={false}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
          />
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
      storeKey="Ser_MST_Part-SearchForm"
      ref={searchPanelRef}
      checkValidFormData={checkValidFormData}
    />
  );
};

export default SearchForm;
