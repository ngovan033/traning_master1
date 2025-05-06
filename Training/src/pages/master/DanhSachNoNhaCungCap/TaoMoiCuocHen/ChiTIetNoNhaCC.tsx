import { useNetworkNavigate } from "@/packages/hooks";
import { ScrollView, TabPanel } from "devextreme-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { usePermissions } from "@/packages/contexts/permission";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { format } from "date-fns";
import { toast } from "react-toastify";

import FormCuocHen from "./components/form/FormChiTIetNo";
import PhanCongLaoDongGrid from "./components/phancong/PhanCongLaoDongGrid";
import PhuTungGrid from "./components/phutung/PhuTungGrid";
import BreadcrumbChiTietNo from "./components/breadcrumb/BreadcrumbDanhsachNo";
import FormChiTIetNo from "./components/form/FormChiTIetNo";
import { useDataSourceDanhSachNo } from "./components/datasource/useDataSourceDanhSachNo";
import GhiNoGrid from "./components/GhiNo";
import TraNoGrid from "./components/TraNo";
import { Item } from "devextreme-react/tab-panel";
import PopupTraNo from "../popup/PopupTraNo";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";

// import "./components/style/TaoMoiCuocHen.scss";

const ChitietnoPage = () => {
  // #region [Navigate handler]
  const navigate = useNetworkNavigate();
  const { DealerCode, isHQ } = usePermissions();
  const [tabIndex, setTabIndex] = useState(0);
  const popupRef = useRef();

  const gridRef: any = useRef(null);

  const handleNavigateHome = () => {
    const link = "/admin/DanhSachNoNhaCungCap";

    navigate(link, {
      replace: true,
    });
  };

  const { SupplierID, FromId } = useParams();
  const dataSource = useDataSourceDanhSachNo();
  const { showDialog } = useDialog();

  // #region [Declare Ref]

  const formChiTietNoRef = useRef();
  const breadcrumbRef = useRef();
  const ghiNoRef = useRef();
  const traNoRef: any = useRef();
  const GhiNoListRef = useRef<any>([]);
  const TraNoListRef = useRef<any>([]);

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };
  useEffect(() => {
    if (SupplierID && SupplierID != "null") {
      dataSource.getSupplierDetail(SupplierID).then((resp) => {
        const { SupplierList, GhiNoList, TraNoList } = resp;

        formChiTietNoRef.current?.setValues({
          SupplierList: SupplierList,
        });

        ghiNoRef.current?.setData(GhiNoList);
        GhiNoListRef.current = GhiNoList;
        TraNoListRef.current = TraNoList;
      });
    }
  }, [SupplierID]);

  const handleConfirm = async () => {
    popupRef.current?.showPopup({
      data: {
        PayDate: format(new Date(), "yyyy-MM-dd HH:mm"),
        PayPersonName: "",
        PayPersonIDCardNo: "",
        PaymentAmount: "",
        Note: "",
        CusID: "",
        InsNo: "",
        SupplierID: SupplierID,
      },
    });
  };

  const handleCancel = async () => {};
  const handleTabChange = (e: any) => {
    const selectedIndex = e.component.option("selectedIndex");
    setTabIndex(selectedIndex);

    if (selectedIndex === 1) {
      if (traNoRef.current) {
        traNoRef.current.setData(TraNoListRef.current); // dùng 1 biến lưu sẵn dữ liệu
      }
    }
  };

  return (
    <>
      <BreadcrumbChiTietNo
        handleNavigateHome={handleNavigateHome}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        ref={breadcrumbRef}
      />

      <div className="flex flex-col">
        <FormChiTIetNo ref={formChiTietNoRef} />

        <TabPanel
          width="100%"
          animationEnabled={true}
          swipeEnabled={true}
          deferRendering={false}
          onSelectionChanged={handleTabChange}
          className="my-[2px] custom-tab-panel"
        >
          <Item title="Ghi Nợ">
            <GhiNoGrid ref={ghiNoRef} />
          </Item>
          <Item title="Trả nợ">
            <TraNoGrid ref={traNoRef} />
          </Item>
        </TabPanel>

        {/* <GhiNoGrid ref={ghiNoRef} />
         <TraNoGrid ref={traNoRef} /> */}
      </div>
      <PopupTraNo
        ref={popupRef}
        onRefetchData={onRefetchData}
        traNoRef={traNoRef}
      />
    </>
  );
};

export default ChitietnoPage;
