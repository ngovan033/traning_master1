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
import { DateRangeBoxFieldTwo } from "@/packages/ui/hook-form-field/DateRangeBoxFieldTwo/DateRangeBoxFieldTwo";
import { useSerAppLocale } from "../locale/useSerAppLocale";
import "./search-form.scss";


interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;

  itemLength: number;
}

const SearchForm = ({ data, onSearch, itemLength }: SearchFormProps) => {
  const { locale } = useSerAppLocale();
  const { commonLocale } = useCommonLocale();

  const { isDealer, DealerCode, DealerName } = usePermissions();
  const searchPanelRef = useRef<any>(null);
  const { t } = useI18n("ReportROByDate");
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
      dataField: "FromDateFromTo",
      label: {
        text: "Ngày xuất từ",
      },
      caption: "Ngày xuất từ",
      validationRules: [RequiredField(t("FromDateFromToIsRequired"))],
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");

        return (
          <div className={"flex flex-row"}>
            <DateRangeBoxFieldTwo
              // cssClass="ml-2"
              defaultStartDate={formData[dataField][0]}
              defaultEndDate={formData[dataField][1]}
              dataField={dataField}
              formComponent={formComponent}
              isRequiredAll={true}
            ></DateRangeBoxFieldTwo>
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
    if (!formData.FromDateFromTo[0]) {
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
      checkValidFormData={checkValidFormData}
      ref={searchPanelRef}
    />
  );
};

export default SearchForm;
