import { SearchParam } from "../clientgate";

export interface Ser_ServicePackageServiceItems {
    ItemID: string;
    Factor: string; // Hệ số
    ActManHour: string; // Giờ đm
    VAT: string; // Thuế
    Note: string; // Chú thích
    LogLUDateTime: string;
    LogLUBy: string;
    ServicePackageID: string;
    SerID: string;
    Price: string; // Đơn giá
    ExpenseType: string;
    ROType: string; // Loại
    SerName: string; // Tên dịch vụ
    SerCode: string; // Mã dịch vụ
    Amount: string; // Thành tiền
};