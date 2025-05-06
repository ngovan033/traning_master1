import { CheckboxField } from "@/packages/components/checkbox-field";
import { TextField } from "@/packages/components/text-field";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";

import SearchPanelLeft from "@/packages/ui/search-panel/search-panel-left";
import { useRef } from "react";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  onClose: () => void;
  data: any;
  onSearch: (data: any) => void;
}

export const SearchForm = ({ onClose, data, onSearch }: SearchFormProps) => {
  const searchPanelRef = useRef<any>(null);
  const { commonLocale } = useCommonLocale();

  const formData = {
    ...data,
  };

  const { showDialog } = useDialog();

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const searchFields = [
    {
      dataField: "PlateNo",
      label: {
        text: "Biển số",
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <TextField
            dataField={dataField}
            formInstance={formComponent}
            defaultValue={formData?.[dataField]}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
            onInput={(e: any) => {
              formComponent.updateData(dataField, e.event.target.value);
            }}
            showClearButton
            width={"100%"}
            onEnterKey={onEnterKey}
          />
        );
      },
      visible: true,
    },
    {
      dataField: "FrameNo",
      label: {
        text: "Số khung",
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <TextField
            dataField={dataField}
            formInstance={formComponent}
            defaultValue={formData?.[dataField]}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
            onInput={(e: any) => {
              formComponent.updateData(dataField, e.event.target.value);
            }}
            showClearButton
            onEnterKey={onEnterKey}
          />
        );
      },
      visible: true,
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

  const checkValidFormData = (formData) => {
    const param = {
      PlateNo: formData.PlateNo ?? "",
      FrameNo: formData.FrameNo ?? "",
      FlagWH: formData.FlagWH ? "1" : "0",
    };

    const frameNo = param.FrameNo;
    const plateNo = param.PlateNo;

    if (!plateNo) {
      if (frameNo.length < 4) {
        showDialog({
          title: "Thông báo",
          message: "Biển số hoặc Số khung cần nhập tối thiểu 4 kí tự",
        });
        return false;
      } else {
        if (frameNo.trim().length < 4) {
          showDialog({
            title: "Thông báo",
            message: "Biển số hoặc Số khung cần nhập tối thiểu 4 kí tự",
          });
          return false;
        }
      }
    } else {
      const trimmedPlateNo = plateNo.trim();

      const regexNormalCar = /^[0-9]{2}[A-Z]{1,2}-[0-9]{4,5}$/;
      const regexSpecialCar = /^[A-Z]{2}-[0-9]{4,5}$/;
      if (
        regexNormalCar.test(trimmedPlateNo) == false &&
        regexSpecialCar.test(trimmedPlateNo) == false
      ) {
        showDialog({
          title: "Thông báo",
          message: "Biển số hoặc Số khung cần nhập tối thiểu 4 kí tự",
        });

        return false;
      }
    }

    return true;
  };

  return (
    <SearchPanelLeft
      formData={formData}
      onSearch={onSearch}
      searchFields={searchFields}
      storeKey="RepairHistory-SearchForm"
      ref={searchPanelRef}
      customHeight={400}
      customOnClose={onClose}
      checkValidFormData={checkValidFormData}
    />
  );
};
