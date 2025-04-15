import { SearchParam } from "../clientgate";
import { Ser_ROPartItems } from "./Ser_ROPartItems";
import { Ser_ROServiceItems } from "./Ser_ROServiceItems";

export interface Ser_RO {

    ROID?: string; // ID BG
    DealerCode: string; // mã đại lý
    RONo: string; // Số BG
    RONoView: string; // Số BG dùng để view trên giao diện
    FlagPause: string; // Cờ tạm dừng
    Remark: string;
    Creator: string; // CDVD
    CreatedDate: string; // Thời gian tạo
    Assistant: string; // 
    Engineer: string; // 
    QA: string; //
    Operator: string;
    QuanDoc: string;
    CusID: string; // ID KH
    CusName: string; // Tên KH
    CusContactName: string; // Người liên lạc (2024-08-14: hiện tại hiển thị là chủ sở hữu và gán bằng giá trị CusName)
    CusAddress: string; // Địa chỉ KH
    CusTel: string; // SĐT KH
    CusMobile: string; // Di động KH
    CusTelMobile: string;
    CusTaxCode: string; // MST KH
    TaxCode?: string; // MST KH(Nếu CusTaxCode không có thì lấy TaxCode theo DS kh) Dùng trên MH quyết toán
    ScheduleDate: string;
    CheckInDate: string; // Ngày vào xưởng(KH tới)
    StartDate: string; //
    FinishedDate: string; // Ngày kết thúc
    CheckEndDate: string; // Ngày kiểm tra cuối cùng ?
    PlanedDeliveryDate?: string; // Ngày giao xe dự kiến(D.Kiến GX)
    ActualDeliveryDate: string; // Ngày giao xe thực tế // Client tự lấy giờ và phút
    SRPDDHRemark: string; // Ghi chú dự kiến giao xe
    PlanedDuration: string; // Bỏ qua
    CusRequest: string; // YC khách hàng
    CarStatus: string; // Tình trạng xe
    CusWaiting: string; // Cờ Khách hàng chờ
    CarWashRequested: string; // Cờ yêu cầu rửa xe
    UseSHPart: string; // Cờ Khách lấy phụ tùng cũ
    PayByCard: string; // Cờ thanh toán bằng thẻ
    IsReRepair: string; // Cờ phản tu
    Km?: number | null; // Số KM
    Status: string; // Trạng thái báo giá
    ReminderMaintanceDate?: string; // Ngày nhắc bảo dưỡng(Ngày hẹn)
    ReminderMaintanceKm?: number; // Số KM nhắc bảo dưỡng(Số KM)
    WorkDoneSoon: string; // Công việc cần làm sớm
    ROType: string; // Loại BG (Loại BG PDI)
    TermsOfRepair: string; // Điều khoản sử dụng
    CarID: string; // ID xe
    ModelID: string; // ID model
    ModelName: string; // Tên model
    PlateNo: string;  // Biển số xe
    FrameNo: string; // SỐ khung
    EngineNo: string; // Số máy
    ColorCode: string; // Mã màu
    TradeMarkCode: string; // Hiệu xe
    BatteryNo: string; // Mã bình acquy
    SerialNo: string; // Số Serian
    WarrantyRegistrationDate: string; // Ngày đăng ký bảo hành
    WarrantyExpiresDate: string; // Ngày hết hạn bảo hành
    WarrantyKM?: number; // Số KM giới hạn bảo hành
    InsNo: string; // Hãng bảo hiểm (Hãng BH đã gán cho xe)
    InsName: string; // Tên Hãng bảo hiểm (Hãng BH đã gán cho xe)
    InsAddress: string; // Địa chỉ Hãng bảo hiểm (Hãng BH đã gán cho xe)
    InsPhone: string; // SĐT Hãng bảo hiểm (Hãng BH đã gán cho xe)
    InsTaxCode: string; // MST Hãng bảo hiểm (Hãng BH đã gán cho xe)
    InvoiceBy: string; // null
    AdvisoryCode: string; //
    AdvisoryPhone: string;
    StockOutOrderID: string;
    ROWID: string; // ID báo cáo bảo hành
    TotalActHours?: number;
    ModifyDate: string;
    ModifyBy: string;
    ROCreateBY: string;
    ROCreateDate: string;
    AppId: string; // ID cuộc hẹn
    IsCusPaymentAll: string; // Khách hàng thanh toán toàn bộ chi phí S/C
    AmountFromMC?: number | null; // Tiền sử dụng từ thẻ
    AmountFromMCOld?: number; // Tiền sử dụng từ thẻ // Dùng để thông báo số tiền thay đổi ở nghiệp vụ quyết toán
    AmountEndInv: number | null; // Giá trị TD còn lại
    PointTotal: number | null;
    InsuranceDeductible?: number | null; // Miễn Thường/Chế Tài
    AmountDiscountOther?: number; // Giảm trừ khác
    CardNo: string;
    MemberNo: string; // Mã hội viên MBS
    ReceptionFNo: string; // Phiếu tiếp nhận
    DlrPDIReqNo: string; // Số yêu cầu PDI
    FullNamePhoneNoCreator: string;
    SUUserPhone: string;
    SUUserName: string;
    FlagOnlyPoint: string;
    LevelOfInspection: string; // Phân cấp kiểm tra
    FlagBackLSC: string;
    CardNoInv: string; // Số thẻ member
    CardTypeInv: string; // Hạng thẻ member
    CardTypeExpectInv: string; // Hạng thẻ sau tích
    PointEndInv: number | null;
    PointRankTotalInv: number | null;
    ROPDIcheckBox: string; // Tích chọn khi tạo báo giá PDI
    VIN: string; // VIN
    PlateNoMember: string; // Biển số trên Membership
    FrameNoMember: string; // Số khung trên Membership
    // Phục vụ tìm kiếm báo giá theo loại người dùng chọn
    ROTypeSearch?: string;
    Keyword?: string;
    // Phục vụ tìm kiếm thông tin khách hàng và xe
    CusNameSearch: string; // Chủ xe
    PlateNoSearch: string; // Biển số xe
    FrameNoSearch: string;
    // Phục vụ tìm kiếm Phân công công việc
    SerCodeSearch: string; // Tìm kiếm theo mã và tên công việc
    // Phục vụ tìm kiếm Phụ tùng
    PartCodeSearch: string; // Tìm kiếm theo mã và tên phụ tùng
    // Kiểm tra xe có thẻ không
    FlagCardExist: string,
    // Tổng tiền bảo hiểm ( công việc - phụ tùng): dùng để check khi lưu báo giá
    SumTotalInsurancePrice?: number;
    // Thông tin tính tổng tiền
    SumTotalAmountBeforeVAT?: 0, // Tổng tiền trước thuế
    SumTotalAmountAfterVAT?: 0, // Tổng tiền sau thuế
    SumTotalAmount?: 0,
    DateTimeNow?: string, // Phục vụ check hiệu lực bảo hiểm của khách hàng
    // Check tiền bảo hiểm
    IsOverPaymentLimit: string | null, // Check bảo hiểm quá hạn mức (2024-10-15 ToanNH: cung cấp API mới)
    PaymentLimit?: number,
    TGC?: number,
    IsEdit?: boolean, // Cờ check báo giá có được sửa hay không
};

export interface IRQ_Ser_RO {
    Ser_RO: Ser_RO;
    Lst_Ser_ROServiceItems: Ser_ROServiceItems[];
    Lst_Ser_ROPartItems: Ser_ROPartItems[];
    //
    Lst_Ser_ROServiceItems_Delete?: Ser_ROServiceItems[];
}

export interface RT_Ser_RO {
    //Ser_RO: Ser_RO;
    Lst_Ser_RO: Ser_RO[];
    Lst_Ser_ROServiceItems: Ser_ROServiceItems[];
    Lst_Ser_ROPartItems: Ser_ROPartItems[];
}


export interface Ser_ROMore {
    ROID: string; // ID BG
    DealerCode: string; // mã đại lý
    JDPTermName: string; // Tên khảo sát
    JPDCD: string; // Có chiến dịch HTV(CD-NPP)
    ReceptionFNo: string; // Phiếu tiếp nhận
    KM?: number; // Số KM trên phiếu tiếp nhận
    CusRequest: string; // YC KH trên phiếu tiếp nhận
    Flag_MapQueryDealer: string; // Cờ truy vấn(0: Chưa truy vấn, 1: đã truy vấn). Nếu cờ = 1 thì hiển thị nút truy vấn hội viên
    PlateNoMember: string;  // Biển số trên Membership 
    FrameNoMember: string;  // Số khung trên Membership
}

export interface RT_Ser_ROMore {
    Ser_ROMore: Ser_ROMore;
    Lst_Ser_CampaignMarketing: any;
    Lst_Ser_CampaignMarketingPart: any;
}

export interface Search_Ser_RO_Param extends Partial<SearchParam> {
    CusID: string;
    CarID: string;
    ROID?: string;
    MemberNo?: string;

}
export interface ISearch_Ser_RO_Param extends Partial<SearchParam> {
    ROID?: string;
    // Kiểm tra xe có thẻ không
    PlateNo?: string;
    FrameNo?: string;
}
export interface ISearch_Ser_RO_ByKeyNo_Param extends Partial<SearchParam> {
    SearchType: string;
    KeyNo: string;
}
export interface ISearch_Ser_RO_MemberNo_Param extends Partial<SearchParam> {
    MemberNo: string;
    PhoneNo: string;
}

export interface ISer_RO_Crd_Card {
    CardNo: string;
    MemberNo: string;
    ROID: string;
    FrameNo: string;
    PlateNo: string;

    AmountEndInv: number;
    CardTypeInv: string;
    CardTypeExpect: string;
    PointRankTotal: number;
    PointTotal: number;
    AmountFromMC: number;
}