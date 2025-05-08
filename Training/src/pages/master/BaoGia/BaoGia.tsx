import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import { Form1 } from "./Form/form1";
import { ThongTinKhachHangPage } from "./Form/ThongTInKhachHang";
import { ScrollView } from "devextreme-react";
import { PhanCongLaoDongPage } from "./Form/PhanCongLaoDong";
import { PhuTungPage } from "./Form/PhuTng";
import { FooterPage } from "./Form/KeHoach";

import { useRef } from "react";
import ChiTietPage from "./popup/ChiTietKH_Xe";

export const BaoGiaPage = () => {
  const handlePrint = () => {};
  const handleExportPDF = () => {};
  const popupRef = useRef();


  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      useNative
    >
      <AdminContentLayout>
        <AdminContentLayout.Slot name="Header">
          <BreadcrumbSearch
            title="Báo giá"
            showSearch={false}
            buttonOptions={{
              listButton: [
                {
                  text: "Lưu",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "Xóa báo giá",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "In báo giá",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "Không sử  dụng",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "Chờ phụ tùng",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "Hủy bỏ",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "...",
                  onClick: handlePrint,
                  visible: true,
                },
              ],
            }}
          ></BreadcrumbSearch>
        </AdminContentLayout.Slot>
        <AdminContentLayout.Slot name="Content">
          <div className="flex flex-col">
            <Form1 />
            <ThongTinKhachHangPage />
            <PhanCongLaoDongPage />
            <PhuTungPage />
            <FooterPage />
          </div>
     
        </AdminContentLayout.Slot>
      </AdminContentLayout>
    </ScrollView>
  );
};
