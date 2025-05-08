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
      height={"99%"}
      title={"Thông tin khách hàng và xe"}
      onHiding={() => setOpen(false)}
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
      <div className="flex gap-2 float-right">
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
