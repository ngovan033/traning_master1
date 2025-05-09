import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";

import { ScrollView } from "devextreme-react";

import { useRef } from "react";
import { Form1 } from "./Form/Form1";
import { ThongTinKhachHangPage } from "./Form/ThongTInKhachHang";
import { PhanCongLaoDongPage } from "./Form/PhanCongLaoDong";
import { PhuTungPage } from "./Form/PhuTng";
import { FooterPage } from "./Form/KeHoach";

export const QuyetToanPage = () => {
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
            title="Quyết toán"
            showSearch={false}
            buttonOptions={{
              listButton: [
                {
                  text: "In quyết toán",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "Công nợ",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "In phiếu thu",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "Kết thúc",
                  onClick: handlePrint,
                  visible: true,
                },
                {
                  text: "In phiếu giao xe",
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
