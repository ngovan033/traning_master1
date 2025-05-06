import { TextField } from "@/packages/components/text-field";

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
  isPopupShareCar: boolean;
}

export const SearchForm = ({
  onClose,
  data,
  onSearch,
  isPopupShareCar = true,
}: SearchFormProps) => {
  const searchPanelRef = useRef<any>(null);

  const { showDialog } = useDialog();

  const formData = {
    ...data,
    CusName: "",
  };

  const onEnterKey = () => {
    searchPanelRef.current?.search();
  };

  const checkValidData = (data) => {
    console.log(data);

    if (isPopupShareCar) {
      if (!data.PlateNo) {
        if (data.FrameNo.length < 6) {
          showDialog({
            title: "Thông báo",
            message:
              "Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!",
          });
          return false;
        }
      } else {
        const regexNormalCar = /^[0-9]{2}[A-Z]{1,2}-[0-9]{4,5}$/;
        const regexSpecialCar = /^[A-Z]{2}-[0-9]{4,5}$/;
        if (
          regexNormalCar.test(data.PlateNo) == false &&
          regexSpecialCar.test(data.PlateNo) == false
        ) {
          showDialog({
            title: "Thông báo",
            message: "Biển só xe không hợp lệ!",
          });

          return false;
        }
      }
    }

    return true;
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
  ];

  return (
    <SearchPanelLeft
      formData={formData}
      onSearch={onSearch}
      searchFields={searchFields}
      storeKey="TimKiemKhachHangVaXe-SearchForm"
      ref={searchPanelRef}
      customHeight={400}
      customOnClose={onClose}
      checkValidFormData={checkValidData}
    />
  );
};
