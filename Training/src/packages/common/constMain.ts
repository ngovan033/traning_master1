
import {
    useCommonConfig,
    useCommonUtils,
} from "@/packages/common/CommonUltils";
import { useCommonLocale } from "../hooks/useCommonLocale";
const commonUtils = useCommonUtils();

export const useItem_Status = () => {
    return {
        N: `N`, // item mới được thêm trên giao diện
        E: `E`, // item được thay đổi (thường áp dụng cho item được load ra từ DB) (hiện tại dùng để check dữ liệu công việc khi thực hiện update báo giá)
        D: `D`, // item bị xóa (thường áp dụng cho item được load ra từ DB) (hiện tại áp dụng cho bản ghi được load từ DB - bản ghi có trạng thái O: dùng để check dữ liệu công việc khi thực hiện update báo giá)
        O: `O`, // item được load ra từ DB
    }
};

export const useSer_RO_Status = () => {
    return {
        NEW: `NEW`, // Nút Lưu màn hình tạo mới báo giá
        CRE: `CRE`, // Lập báo giá (Báo giá mới tạo)
        PRT: `PRT`, // In báo giá
        W4P: `W4P`, // Đợi phụ tùng
        HPA: `HPA`, // Đã có phụ tùng
        HRO: `HRO`, // Lập lệnh sửa chữa (Chờ sửa)
        REJ: `REJ`, // Hủy (Lệnh hủy)
        INGA: `INGA`, // Vào sửa chữa (Đang sửa)
        RPRD: `RPRD`, // Sửa xong
        CEND: `CEND`, // Kiểm tra cuối cùng
        FNS: `FNS`, // Đã hoàn thành (Đã giao xe)
        NORE: `NORE`, // Chưa dùng (Không dùng)
        PAID: `PAID`, // Đã thanh toán (Thanh toán xong)
    }
};

export const useWarrantyStatus = () => {
    return {
        PEND: `PEND`, // Chưa gửi
        SENT: `SENT`, // Chờ xem xét
        PRT: `CONF`, // Chờ duyệt
        W4P: `ACCE`, // Đã chấp thuận
        HPA: `REJ`, // Không chấp thuận
        HRO: `REVERT`, // HTV hoàn trả
        CONF: `CONF`,
        ACCE: `ACCE`,
    }
};

export const userWarrantyStatusCaption = (strWarrantyStatus: any, commonLocale: any) => {
    if (!commonUtils.isNullOrEmpty(strWarrantyStatus)) {
        strWarrantyStatus = commonUtils.strVaule(strWarrantyStatus);
        if (commonUtils.isStringEquals(strWarrantyStatus, `PEND`)) {
            return commonLocale?.WarrantyStatus_PEND; // Chưa gửi 
        }
        else if (commonUtils.isStringEquals(strWarrantyStatus, `SENT`)) {
            return commonLocale?.WarrantyStatus_SENT; // Chờ xem xét
        }
        else if (commonUtils.isStringEquals(strWarrantyStatus, `CONF`)) {
            return commonLocale?.WarrantyStatus_CONF; // Chờ duyệt
        }
        else if (commonUtils.isStringEquals(strWarrantyStatus, `ACCE`)) {
            return commonLocale.WarrantyStatus_ACCE; // Đã chấp thuận
        }
        else if (commonUtils.isStringEquals(strWarrantyStatus, `REJ`)) {
            return commonLocale.WarrantyStatus_REJ; // Không chấp thuận
        }
        else if (commonUtils.isStringEquals(strWarrantyStatus, `REVERT`)) {
            return commonLocale.WarrantyStatus_REVERT; // HTV hoàn trả
        }
    }
};