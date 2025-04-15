import { SearchParam } from "../clientgate";

export interface ICrd_DealUsePromotionDtl {
    IDCardNo: string;

    CardNo: string;
    DealUsePrmNo: string;
    PrProgramCode: string; // Mã chương trình ưu đãi

    PrProgramName: string; // 

    EffDateStart: string;

    ListDealer: string;

    FlagShow: string; // 1: chương trình là chương trình ưu đãi sinh nhật có hiệu lực
    // 2: chương trình là chương trình là chương trình ưu đãi sinh nhật không có hiệu lực
    // 0: chương trình là chương trình bình thường có hiệu lực
    Remark: string; // Mã chương trình ưu đãi
    QtyPr: string; // Số lượng ưu đãi
    QtyPrUsed: string; // Số lượng ưu đã sử dụng

    QtyRemain: string; // Số lượng còn lại

    QtyPrChTotal: string; // Số lượng input
    Unit: string; // Đơn vị tính
};