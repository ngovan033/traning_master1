
import { SearchParam } from "../clientgate";

export interface Ser_ServicePackagePartItems {
    ItemID: string;
    ServicePackageID: string;
    PartID: string;
    PartCode: string;// Mã phụ tùng
    EngName: string;
    VieName: string;// Tên phụ tùng
    Factor: string;// Hệ số
    VAT: string;// Thuế
    Quantity: string;// Số lượng
    Note: string;// Chú thích
    LogLUDateTime: string;
    LogLUBy: string;
    Price: string;// Đơn giá
    Amount: string;// Thành tiền
    Unit: string;// Đơn vị tính
    ExpenseType: string;// Đối tượng thanh toán
};