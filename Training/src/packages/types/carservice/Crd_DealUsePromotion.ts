import { ICrd_DealUsePromotionDtl } from "./Crd_DealUsePromotionDtl";

export interface ICrd_DealUsePromotion {
    DealUsePrmNo: string; // Mã lần giao dịch ưu đãi
    DLCPCode: string; // Mã đại lý 
    UsePrmDTime: string; // Thời gian sử dụng dịch vụ
    CardNo: string; // Số thẻ(mã kỳ xét hạng)
    CardType: string; // Mã hạng
};

export interface IRQ_Crd_DealUsePromotion_Save {
    Crd_DealUsePromotion: ICrd_DealUsePromotion,
    Lst_Crd_DealUsePromotionDtl: ICrd_DealUsePromotionDtl[],
}

export interface IRT_Crd_DealUsePromotion_Save {
    Crd_DealUsePromotion: ICrd_DealUsePromotion,
    Lst_Crd_DealUsePromotion: ICrd_DealUsePromotion[],
    Lst_Crd_DealUsePromotionDtl: ICrd_DealUsePromotionDtl[],
}