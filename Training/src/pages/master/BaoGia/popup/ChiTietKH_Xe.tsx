import { Popup, TabPanel } from "devextreme-react";
import { Item } from "devextreme-react/tab-panel";
import { forwardRef, useImperativeHandle, useState } from "react";
import ThongTInKhachHangPopup from "./ThongTinKhachHangPopup";
import ThongtinNguoiLienLacPage from "./ThongTinNguoiLienLac";
import ThongtinxePopUp from "./ThongTInXe";
import ThongTinBaoHiemPage from "./ThongTinBaoHiem";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";

const ChiTietPage = forwardRef((_, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    showPopup() {
      setOpen(true);
    },
  }));

  return (
    <Popup
      visible={open}
      showCloseButton={true}
      height={"100%"}
      title={"Thông tin khách hàng và xe"}
      onHiding={() => setOpen(false)}
      
      // className="position-relative"
    >
      <TabPanel
        width="100%"
        animationEnabled={true}
        swipeEnabled={true}
        deferRendering={false}
      >
        <Item title="Khách hàng và xe"></Item>
        <Item title="Lịch sử sửa chữa"></Item>
      </TabPanel>
      <ThongTInKhachHangPopup />
      <ThongtinNguoiLienLacPage />
      <ThongtinxePopUp />
      <ThongTinBaoHiemPage />
      <div className="fixed bottom-1 right-4 z-50 flex gap-2  p-2 rounded-xl">
        <ButtonCommon>Lưu</ButtonCommon>
        <ButtonCommon>Xóa</ButtonCommon>
        <ButtonCommon
          style={{
            background: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        >
          Đóng
        </ButtonCommon>
      </div>
    </Popup>
  );
});
export default ChiTietPage;
