import { useClientgateApi } from "@/packages/api";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import SearchPanelLeft from "@/packages/ui/search-panel/search-panel-left";
import { useSetAtom } from "jotai";
import { useRef } from "react";

import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";

import { useSerAppLocale } from "../locale/useSerAppLocale";
import "./search-form.scss";
import DateBox from "devextreme-react/date-box";


interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}

const SearchForm = ({ data, onSearch }: SearchFormProps) => {

  const { commonLocale } = useCommonLocale();

  const { isDealer, DealerCode, DealerName } = usePermissions();
  const searchPanelRef = useRef<any>(null);

  const setLoading = useSetAtom(loadPanelAtom);
  const api = useClientgateApi();
  const formData = {
    ...data,
    DealerCode: isDealer ? DealerCode : data.DealerCode,
  };
  const { showDialog } = useDialog();

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const searchFields: any[] = [
    {
      dataField: "ToDate",
      label: {
        text: "Tính đến ngày",
      },
      caption: "Tính đến ngày",
      validationRules: [RequiredField("Tính đến ngày bắt buộc nhập")],
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <DateBox
              // className="ml-[12px]"
              width={"100%"}
              displayFormat={"yyyy-MM-dd"}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              defaultValue={value}
              showClearButton={true}
            />
          </div>
        );
      },
    },

    {
      dataField: "FlagDataWH",
      label: {
        visible: false,
        text: commonLocale.CHECKBOX_FLAG_WH,
      },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={commonLocale.CHECKBOX_FLAG_WH}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
  ];

  const checkValidFormData = (formData: any) => {
    if (!formData.ToDate) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng chọn ngày vào xưởng!",
      });
      return false;
    }

    return true;
  };

  return (
    <SearchPanelLeft
      formData={formData}
      onSearch={onSearch}
      searchFields={searchFields}
      storeKey="SerApp-SearchForm"
      // checkValidFormData={checkValidFormData}
      ref={searchPanelRef}
    />
  );
};

export default SearchForm;
