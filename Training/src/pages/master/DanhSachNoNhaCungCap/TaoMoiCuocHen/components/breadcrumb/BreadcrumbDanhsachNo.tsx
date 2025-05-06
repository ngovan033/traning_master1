import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import BreadcrumbDetail from "@/packages/ui/header/breadcrumb_detail/BreadcrumbDetail";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  handleNavigateHome: () => void;
  // handleSave: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

// Status
// 1: Mới tạo
// 2: Xác nhận
// 3: Tiếp nhận
// 4: Hủy
// 5: Đã liên hệ và chưa xác nhận

const BreadcrumbChiTietNo = forwardRef(
  (
    { handleNavigateHome, handleConfirm, handleCancel }: IProps,
    ref
  ) => {
    const { Type } = useParams();
    const { commonLocale } = useCommonLocale();
    const { isHQ } = usePermissions();

    const isNPP = isHQ();

    useImperativeHandle(ref, () => ({
      setStatus: (status) => {
        setStatus(status);
      },
    }));

    const [status, setStatus] = useState<"1" | "2" | "3" | "4" | "5">("1");

    const visible = {
      save: status != "3" && !isNPP,
      confirm: status != "2" && status != "3" && Type != "add" && !isNPP,
      cancel: status != "3" && status != "4" && !isNPP && Type != "add",
      exit: true,
    };

    return (
      <BreadcrumbDetail
        mainTitle="Danh sách công nợ nhà cung cấp"
        handleNavigateHome={handleNavigateHome}
        detailTitle="Chi tiết công nợ nhà cung cấp"
        listButton={[
          {
            text: "Trả nợ",
            onClick: handleConfirm,
            visible: visible["confirm"],
          },

          {
            text: "Hủy",
            onClick: handleCancel,
            visible: visible["cancel"],
          },
        ]}
        
      />
      
    );
  }
);

export default BreadcrumbChiTietNo;
