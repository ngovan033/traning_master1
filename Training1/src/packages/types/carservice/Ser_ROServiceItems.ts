import { SearchParam } from "../clientgate";

export interface Ser_ROServiceItems {
    //STT?: string;
    SerID: string;  // ID công việc
    SerCode: string;  // Mã công việc
    SerName: string;  // Tên công việc
    StdManHour: number;  // Giờ định mức theo MSt của công việc
    ActManHour: number;  // Giờ định mức theo BG của công việc // mặc định là 1
    Factor: number;  // Hệ số giá
    Price: number;  // Đơn giá trước VAT
    VAT: number;  // VAT
    ValVAT: number; // Tiền thuế
    Note: string;  //
    ROType: string;  // Loại công việc (SCC: Sửa chữa chung, BDD: Bảo dưỡng định kỳ, SCD:Sửa chữa đồng, SCS: Sửa chữa sơn, PDI: PDI, SPK: Phụ kiện)
    ExpenseType: string;  // Đối tượng thanh toán(ROREPAIR: Khách hàng, ROWARRANTY: Bảo hành, ROINSURANCE: Bảo hiểm, LOCAL:Nội bộ)
    WarrantyStatus: string;  // Trạng thái bảo hành(Tình trạng)
    WarrantyStatusName?: string; // Trạng thái bảo hành
    InsurancePrice: number;  // Giá bảo hiểm
    CamID: string;  // Id chiến dịch đại lý
    ItemID: string;  // ID bản ghi
    CamMarketingNo: string;  // Mã Chiến dịch HTC
    EngineerID: string;
    GroupRID: string;
    GroupRName: string;
    FlagAccrual: string;  // Cờ phát sinh
    Remark: string;  // Ghi chú
    Status: string;  // 
    FlagWarranty: string;   // Cờ công việc bảo hành

    TotalAmount: number; // Thành tiền trước thuế
    RowStatus: string; // Trạng thái bản ghi: N - tạo mới, E - Sửa, O - load từ DB, D - xóa
};