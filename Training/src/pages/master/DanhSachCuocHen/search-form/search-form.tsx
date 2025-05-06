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
  const { locale } = useSerAppLocale();
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

  const { data: dataSource } = useQuery({
    queryKey: ["SerApp-SearchForm", isDealer, DealerCode, DealerName],
    queryFn: async () => {
      setLoading(true);
      const respCreator = await api.SysUser_GetAllActive();
      const respDealer = await api.Dealer_GetAllActive();

      return Promise.all([respCreator, respDealer])
        .then((listResponse) => {
          const listCreator = listResponse[0].DataList ?? [];

          const resultListCreator = [
            {
              UserCode: "",
              UserName: "Tất cả",
            },
            ...listCreator,
          ];

          const listDealer = !isDealer
            ? listResponse[1].DataList
            : [
                {
                  DealerCode: DealerCode,
                  DealerName: DealerName,
                },
              ];

          setLoading(false);

          return {
            ListCreator: resultListCreator,
            ListDealer: listDealer,
          };
        })
        .catch(() => {
          setLoading(false);
          return {
            ListCreator: [],
            ListDealer: [],
          };
        });
    },
  });

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "DealerCode",
      label: {
        text: locale.DealerCode,
      },
      render: (param: any) => {
        const { dataField, component: formInstance } = param;

        const formData = formInstance.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={"100%"}
            formInstance={formInstance}
            dataField={dataField}
            items={dataSource?.ListDealer ?? []}
            valueExpr={"DealerCode"}
            displayExpr={"DealerName"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            showClearButton={true}
            placeholder={commonLocale.PLACEHOLDER_SELECT}
            readOnly={isDealer}
            onEnterKey={onEnterKey}
          />
        );
      },
    },
    {
      dataField: "AppDateTimeFromTo",
      caption: "Ngày hẹn từ - đến",
      visible: true,
      label: {
        text: "Ngày hẹn từ - đến",
      },

      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");

        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              width={"100%"}
              // className="dateRange"
              displayFormat="yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={formData[dataField][0]}
              defaultEndDate={formData[dataField][1]}
              // defaultStartDate={searchCondition?.current?.TDate_FromTo[0]}
              // defaultEndDate={searchCondition?.current?.TDate_FromTo[1]}
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
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
        text: locale.PlateNo,
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
      visible: true,
      dataField: "CusName",
      caption: "Tên khách hàng",
      label: {
        text: "Tên khách hàng",
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
      visible: true,
      dataField: "Creator",
      label: {
        text: "Người tạo",
      },
      render: (param: any) => {
        const { dataField, component: formInstance } = param;

        const formData = formInstance.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={"100%"}
            formInstance={formInstance}
            dataField={dataField}
            items={dataSource?.ListCreator ?? []}
            valueExpr={"UserCode"}
            displayExpr={"UserName"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            placeholder={commonLocale.PLACEHOLDER_SELECT}
            showClearButton={false}
            onEnterKey={onEnterKey}
          />
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
              label={locale.FlagMoiTao}
              dataField={"FlagMoiTao"}
              formInstance={formComponent}
              defaultValue={formData?.["FlagMoiTao"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("FlagMoiTao", e.value);
              }}
            />
            <CheckboxField
              label={locale.FlagXacNhan}
              dataField={"FlagXacNhan"}
              formInstance={formComponent}
              defaultValue={formData?.["FlagXacNhan"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("FlagXacNhan", e.value);
              }}
            />
            <CheckboxField
              label={locale.FlagDaLienHe}
              dataField={"FlagDaLienHe"}
              formInstance={formComponent}
              defaultValue={formData?.["FlagDaLienHe"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("FlagDaLienHe", e.value);
              }}
            />
            <CheckboxField
              label={locale.FlagTiepNhan}
              dataField={"FlagTiepNhan"}
              formInstance={formComponent}
              defaultValue={formData?.["FlagTiepNhan"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("FlagTiepNhan", e.value);
              }}
            />
            <CheckboxField
              label={locale.FlagHuy}
              dataField={"FlagHuy"}
              formInstance={formComponent}
              defaultValue={formData?.["FlagHuy"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("FlagHuy", e.value);
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
      storeKey="SerApp-SearchForm"
      checkValidFormData={checkValidFormData}
      ref={searchPanelRef}
    />
  );
};

export default SearchForm;
