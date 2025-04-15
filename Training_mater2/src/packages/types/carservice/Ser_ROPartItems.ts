import { SearchParam } from "../clientgate";

export interface Ser_ROPartItems {
    //STT?: string;
    PartID: string;  // ID phụ tùng
    PartCode: string;  // Mã phụ tùng
    EngName: string;  // Tên tiếng anh
    VieName: string;  // Tên phụ tùng
    Unit: string;  // Đơn giá
    Quantity: number;  // Số lượng
    Need: number;  // = Quantity
    Price: number;  // Đơn giá trước VAT
    TotalAmount: number; // Thành tiền trước VAT
    Factor: number;  // Hệ số giá
    VAT: number;  // VAT
    ValVAT: number; // Tiền thuế
    Note: string;  // Ghi chú(ngược với service)
    ROType: string;  //
    ExpenseType: string;  // Đối tượng thanh toán(
    WarrantyStatus: string; // Trạng thái bảo hành
    WarrantyStatusName?: string; // Trạng thái bảo hành
    InsurancePrice: number;  // Giá bảo hiểm
    CamMarketingNo: string;  // Mã Chiến dịch HTC
    InventoryQuantity: number;  // Số lượng tồn 
    CamID: string;  // Id chiến dịch đại lý
    PartPriceID: string;  // ID giá phụ tùng
    SIPPPrice: number;  // Giá phụ tùng theo bảng (Trường hợp phụ tùng TST sẽ check giá người dùng nhập không được lớn hơn giá này)
    FlagAccrual: string;  // Cờ phát sinh
    Remark: string;  // 
    FlagInTST: string;  // Cờ phụ tùng TST
    FlagAccessory: string;  // Cờ phụ kiện
    TypeName: string;  // 
    ROID: string; //

};