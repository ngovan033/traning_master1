import { useI18n } from "@/i18n/useI18n";
import { requiredType } from "@packages/common/Validation_Rules";

import { Ser_CustomerCar } from "@/packages/types/master/Ser_CustomerCar";
import { LinkCell } from "@packages/ui/link-cell";
import { nanoid } from "nanoid";

interface UseGridColumnsProps {
  data: Ser_CustomerCar[];
  popupRef: any;
}

export const useGridColumns = ({ data, popupRef }: UseGridColumnsProps) => {


  const columns: any[] = [
    {
      dataField: "CusID", // Mã khách hàng
      caption: "Mã khách hàng", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "CusName", // Tên khách hàng
      caption: "Tên khách hàng", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "PlateNo", // Biển số xe
      caption: "Biển số xe", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "FrameNo", // Số khung
      caption: "Số khung", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
   
    {
      dataField: "Address", // Địa chỉ
      caption: "Địa chỉ", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },


    {
      dataField: "DOB", // Ngày sinh
      caption: "Ngày sinh", // Tiêu đề cột
      editorType: "dxDateBox", // Loại editor là DateBox
      editorOptions: {
        placeholder: "Select Date", // Placeholder cho chọn ngày
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "Sex",
      caption: "Giới tính",
      cellRender: ({ value }: any) => {
        return <span>{value === true ? "Nam" : "Nữ"}</span>;
      },
      columnIndex: 1,
      groupKey: "CUSTOMER_INFORMATION",
      visible: true,
      allowEditing: false, // Không cho chỉnh sửa nếu muốn
    },
    {
      dataField: "TradeMarkCode", // Mã hiệu xe
      caption: "Mã hiệu xe", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "EngineNo", // Số máy
      caption: "Số máy", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "ProductYear", // Năm sản xuất
      caption: "Năm sản xuất", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "ColorCode", // Mã màu
      caption: "Mã màu", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "InsVieName", // Tên công ty bảo hiểm
      caption: "Tên công ty bảo hiểm", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "INSURANCE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "Mobile", // Di động
      caption: "Di động", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "Tel", // Điện thoại
      caption: "Điện thoại", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "Email", // Email
      caption: "Email", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "ContName", // Tên người liên hệ
      caption: "Tên người liên hệ", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CONTACT_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "ContTel", // Số di động người liên hệ
      caption: "Số di động người liên hệ", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CONTACT_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "MemberNo", // Mã hội viên
      caption: "Mã hội viên", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "MEMBERSHIP_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
  ];


  return columns;
};
