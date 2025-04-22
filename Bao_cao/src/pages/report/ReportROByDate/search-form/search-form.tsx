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
}

const SearchForm = ({ data, onSearch }: SearchFormProps) => {
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
        text: t("FromDateFromTo"),
      },
      caption: t("FromDateFromTo"),
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
      dataField: "NewAppStatus",
      label: {
        visible: true,
        text: locale.NewAppStatus,
      },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        // formData?.[dataField] ? true : false
        return (
          <div className={"flex flex-col list-checkbox"}>
            <CheckboxField
              label={t("IsChoSua")}
              dataField={"IsChoSua"}
              formInstance={formComponent}
              defaultValue={formData?.["IsChoSua"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("IsChoSua", e.value);
              }}
            />
            <CheckboxField
              label={t("IsDangSua")}
              dataField={"IsDangSua"}
              formInstance={formComponent}
              defaultValue={formData?.["IsDangSua"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("IsDangSua", e.value);
              }}
            />
            <CheckboxField
              label={t("IsSuaXong")}
              dataField={"IsSuaXong"}
              formInstance={formComponent}
              defaultValue={formData?.["IsSuaXong"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("IsSuaXong", e.value);
              }}
            />
            <CheckboxField
              label={t("IsEnd")}
              dataField={"IsEnd"}
              formInstance={formComponent}
              defaultValue={formData?.["IsEnd"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("IsEnd", e.value);
              }}
            />
            <CheckboxField
              label={t("IsThanhToanXong")}
              dataField={"IsThanhToanXong"}
              formInstance={formComponent}
              defaultValue={formData?.["IsThanhToanXong"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("IsThanhToanXong", e.value);
              }}
            />
            <CheckboxField
              label={t("IsDaGiaoXe")}
              dataField={"IsDaGiaoXe"}
              formInstance={formComponent}
              defaultValue={formData?.["IsDaGiaoXe"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("IsDaGiaoXe", e.value);
              }}
            />
            <CheckboxField
              label={t("IsROReject")}
              dataField={"IsROReject"}
              formInstance={formComponent}
              defaultValue={formData?.["IsROReject"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("IsROReject", e.value);
              }}
            />
            <CheckboxField
              label={t("IsKhongDung")}
              dataField={"IsKhongDung"}
              formInstance={formComponent}
              defaultValue={formData?.["IsKhongDung"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("IsKhongDung", e.value);
              }}
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
