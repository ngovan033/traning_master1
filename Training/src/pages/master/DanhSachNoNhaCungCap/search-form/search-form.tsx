import { useClientgateApi } from "@/packages/api";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import SearchPanelLeft from "@/packages/ui/search-panel/search-panel-left";
import { useQuery } from "@tanstack/react-query";
import { DateRangeBox } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { useSerAppLocale } from "../components/locale/useSerAppLocale";
import "./search-form.scss";

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

  // const { data: dataSource } = useQuery({
  //   queryKey: ["DanhSachNoNhaCungCapPage-SearchForm", isDealer, DealerCode, DealerName],
  //   queryFn: async () => {
  //     setLoading(true);
  //     const respCreator = await api.SysUser_GetAllActive();
  //     const respDealer = await api.Dealer_GetAllActive();

  //     return Promise.all([respCreator, respDealer])
  //       .then((listResponse) => {
  //         const listCreator = listResponse[0].DataList ?? [];

  //         const resultListCreator = [
  //           {
  //             UserCode: "",
  //             UserName: "Tất cả",
  //           },
  //           ...listCreator,
  //         ];

  //         const listDealer = !isDealer
  //           ? listResponse[1].DataList
  //           : [
  //               {
  //                 DealerCode: DealerCode,
  //                 DealerName: DealerName,
  //               },
  //             ];

  //         setLoading(false);

  //         return {
  //           ListCreator: resultListCreator,
  //           ListDealer: listDealer,
  //         };
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //         return {
  //           ListCreator: [],
  //           ListDealer: [],
  //         };
  //       });
  //   },
  // });

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const searchFields: any[] = [
    
   
    {
      visible: true,
      dataField: "SupplierName",
      caption: "Tên nhà cung cấp",
      label: {
        text: "Tên nhà cung cấp",
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
              placeholder={commonLocale.PLACEHOLDER_INPUT}
              showClearButton={true}
              onEnterKey={onEnterKey}
            />
          </div>
        );
      },
    },

    {
      dataField: "IsDebit",
      label: {
        visible: false,
        text: "Còn nợ",
      },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label="Còn nợ"
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.["IsDebit"] }
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value ? 1 : 0);
                formComponent.updateData("IsDebit", e.value ? 1 : 0);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "FlagWH",
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
    if (!isDealer && !formData.DealerCode) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng chọn đại lý!",
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
      storeKey="Supplier-manager-SearchForm"
      checkValidFormData={checkValidFormData}
      ref={searchPanelRef}
    />
  );
};

export default SearchForm;
