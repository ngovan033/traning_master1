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
  const { t } = useI18n("Ser_Cavity");
  const formData = {
    ...data,
  };
  const { showDialog } = useDialog();

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const { data: getCavityType, isLoading: isGettingListInsuranceCode } =
    useQuery({
      queryKey: ["getCavityType"],
      queryFn: async () => {
        const response = await api.Mst_Compartment_GetAllActive();
        if (response.isSuccess) {
          return [
            {
              CompartmentCode: "",
              CompartmentName: t("All"),
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
      dataField: "CavityType",
      label: {
        text: t("CavityType"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];

        return (
          <SelectField
            width={270}
            showClearButton={false}
            items={
              getCavityType?.map((item: any) => {
                return {
                  text:
                    item.CompartmentCode !== ""
                      ? `${item.CompartmentName}`
                      : `${item.CompartmentName}`,

                  value: item.CompartmentCode,
                };
              }) ?? []
            }
            displayExpr={"text"}
            searchEnabled={false}
            valueExpr={"value"}
            defaultValue={value}
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
      dataField: "CavityNo",
      label: {
        text: t("CavityNo"),
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
      dataField: "CavityName",
      label: {
        text: t("CavityName"),
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
      dataField: "StatusUse",
      label: {
        text: "Tình trạng",
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
            <SelectField
              dataField={dataField}
              defaultValue={formData?.[dataField]}
              formInstance={formComponent}
              items={[
                {
                  value: "",
                  text: "Tất cả",
                },
                {
                  value: "1",
                  text: "Đang sử dụng",
                },
                {
                  value: "2",
                  text: "Đã ngưng hoặc chưa sử dụng",
                },
              ]}
              displayExpr={"text"}
              searchEnabled={false}
              showClearButton={false}
              valueExpr={"value"}
              onValueChanged={async (e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
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
      storeKey="Ser_Cavity-SearchForm"
      ref={searchPanelRef}
      checkValidFormData={checkValidFormData}
    />
  );
};

export default SearchForm;
