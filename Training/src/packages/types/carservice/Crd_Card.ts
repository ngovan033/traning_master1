import { SearchParam } from "../clientgate";
import { ICrd_DealUsePromotionDtl } from "./Crd_DealUsePromotionDtl";

export interface ICrd_Card {
    CardNo: string; // Mã thẻ hội viên
    NetworkID: string; // NetworkID
    MemberNo: string; // Mã hội viên
    DLCodeExceptionally: string; // Đại lý đặc cách
    CardSourceCode: string; // Mã loại thẻ: Xuống hạng/Duy trì/Làm mới/Làm lại/Tăng hạng
    RankPolicyCode: string; //  mã chính sách xếp hạng
    PointBonus: string; // Điểm thưởng
    PointPurchaseAddCar: string; // Điểm thưởng
    EffDateStart: string;
    EffDateEnd: string; // Ngày hết hạn kỳ xét hạngF
    PointTotal: string;  // Điểm tiêu dùng trong kỳ
    PointBlock: string;
    PointAvail: string; // Điểm tiêu dùng còn lại
    AmountTotal: string; // Giá trị tích lũy trong kỳ
    AmountBlock: string;
    AmountAvail: string;  // Doanh thu xét hạng trong kỳ
    QtyVisitTotal: string; // Số lượt dịch vụ
    QtyVisitBlock: string;
    QtyVisitAvail: string;
    PointCardRank: string;
    TotalAmountPeriod: string;
    CardNoPrev: string; // Mã thẻ kỳ trước
    CardTypeUse: string; // Hạn sử dụng
    CardTypeInit: string; // Hạng thực
    CardTypeUsePrev: string; // Hạng sử dụng kỳ trước 
    CardTypeInitPrev: string; // Hạng thực kỳ trước
    CardActiveDate: string; // Ngày kích hoạt thẻ
    FlagExceptionally: string; // Cờ đặc cách
    CreateDTimeUTC: string; // Thời điểm tạo thẻ
    CreateBy: string;
    ConvertValue: string; // Giá trị đổi 
    ConvertPoint: string; // Điểm tương ứng
    LUDTimeUTC: string;
    LUBy: string;
    CardStatus: string; // Trạng thái thẻ
    // N - None: Trạng thái khi tạo mới đăng ký hội viên, để tránh trường hợp nhầm lẫn với trạng thái Inactive của thẻ khi chuyển từ Active -> Inactive
    // A - Active
    // I - Inactive
    Remark: string;
    LogLUDTimeUTC: string;
    LogLUBy: string;


    RankActionType: string;
    CardTypeUseExpect: string;
    CardTypeInitExpect: string;

    MemberName: string;
    IDCardNo: string;
    MemberGender: string;
    MemAddress: string;
    DateOfBirth: string;
    PhoneNo: string;
    CarNo: string;
    VIN: string;

    ProvinceName: string;
    ModelName: string;
    BrandName: string;

    DistrictName: string;

    MemberActiveDate: string; // Ngày kích hoạt hội viên

    InactiveDTimeUTC: string; // thời điểm Inactive hội viên

    PointBegin: string; // Điểm đầu kỳ
    PointEnd: string; // Điểm cuối kỳ - Điểm tích lũy tiêu dùng
    ////
    RevenueMiss: string; // Doanh thu còn thiếu tăng hạng
    QtyVisitMiss: string; // Lượt dịch vụ còn thiếu tăng hạng
    cc_FlagShow: string; // Trạng thái thẻ hội viên
    // -1 - None: Trạng thái khi tạo mới đăng ký hội viên, để tránh trường hợp nhầm lẫn với trạng thái Inactive của thẻ khi chuyển từ Active -> Inactive
    // 1 - Active
    // 0 - Inactive
    cm_FlagShow: string; // Trạng thái hội viên
    // -1 - None: Trạng thái khi tạo mới đăng ký hội viên, để tránh trường hợp nhầm lẫn với trạng thái Inactive của hội viên khi chuyển từ Active -> Inactive
    // 1 - Active
    // 0 - Inactive

    AmountEnd: string; // Giá trị sử dụng còn lại(ở bảng hội viên)

    PolicyAmountUnit: string; // Giá trị đổi 
    PolicyPointUnit: string; // Điểm tương ứng
    ParamPointUnit: string; // Giá trị đổi 
    ParamAmountUnit: string; // Điểm tương ứng	
    PolicyCode: string; // mã chính sách
    ParamCode: string; // mã chính sách
};

export interface IRT_Crd_Card {
    Lst_Crd_Card: ICrd_Card[],
    Lst_Crd_DealUsePromotionDtl: ICrd_DealUsePromotionDtl[],
};