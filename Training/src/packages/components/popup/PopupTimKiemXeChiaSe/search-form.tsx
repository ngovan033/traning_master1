import { TextField } from "@/packages/components/text-field";

import { useDialog } from "@/packages/hooks/useDiaglog";
import { useRegex } from "@/packages/hooks/useRegex";
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
  const { showDialog } = useDialog();
  const { checkVIN } = useRegex();

  const formData = {
    ...data,
  };

  const onEnterKey = () => {
    searchPanelRef.current?.search();
    // console.log(e.event.target.value);
  };

  const checkValidData = (data) => {
    if (!data.PlateNo) {
      if (data.FrameNo.length < 6) {
        showDialog({
          title: "Thông báo",
          message: "Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!",
        });
        return false;
      }

      if (
        data.FrameNo.replace(/\s+/g, " ") == " " ||
        data.FrameNo.replace(/\s+/g, " ").length < 6
      ) {
        showDialog({
          title: "Thông báo",
          message: "Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!",
        });
        return false;
      }

      // bỏ khoảng trắng đầu và cuối chuỗi, nếu có khoảng trắng ở giữa chuỗi thì sai, nếu trim khoảng trắng đầu cuối mà độ dài sau khi trim < 6 thì sai
      const trimmedFrameNo = data.FrameNo.trim();
      if (trimmedFrameNo.includes(" ") || trimmedFrameNo.length < 6) {
        showDialog({
          title: "Thông báo",
          message: "Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!",
        });
        return false;
      }

      // if (data.FrameNo.includes(" ")) {
      //   alert();
      //   showDialog({
      //     title: "Thông báo",
      //     message: "Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!",
      //   });
      //   return false;
      // }

      return true;
    } else {
      // if (data.PlateNo.trim().length > 8) {
      //   return true;
      // }

      const regexNormalCar = /^[0-9]{2}[A-Za-z]{1,2}-[0-9]{4,5}$/;
      const regexSpecialCar = /^[A-Za-z]{2}-[0-9]{5}$/;
      const regexSpecialCar2 =
        /^[A-Za-z]{2}[0-9]{3}[A-Za-z]{4}[0-9]{3}[A-Za-z]{4}[0-9]{6}$/;

      if (checkVIN(data.FrameNo)) {
        return true;
      }

      if (
        regexNormalCar.test(data.PlateNo) == false &&
        regexSpecialCar.test(data.PlateNo) == false &&
        regexSpecialCar2.test(data.PlateNo) == false
      ) {
        showDialog({
          title: "Thông báo",
          message: "Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!",
        });

        return false;
      }
    }

    // Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!

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
            // onInput={(e: any) => {
            //   formComponent.updateData(dataField, e.event.target.value);
            // }}
            showClearButton
            width={"100%"}
            onEnterKey={(e: any) => {
              formComponent.updateData(dataField, e.event.target.value);
              onEnterKey();
            }}
            placeholder="Nhập"
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
            onEnterKey={(e: any) => {
              formComponent.updateData(dataField, e.event.target.value);
              onEnterKey();
            }}
            showClearButton
            // onEnterKey={onEnterKey}
            placeholder="Nhập"
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
      storeKey="PopupTimKiemXeChiaSe-SearchForm"
      ref={searchPanelRef}
      customHeight={400}
      customOnClose={onClose}
      checkValidFormData={checkValidData}
    />
  );
};
