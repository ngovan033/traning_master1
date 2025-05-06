import { useNetworkNavigate } from "@/packages/hooks";
import { ScrollView } from "devextreme-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { usePermissions } from "@/packages/contexts/permission";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { format } from "date-fns";
import { toast } from "react-toastify";
import BreadcrumbCuocHen from "./components/breadcrumb/BreadcrumbCuocHen";
import { useDataSourceCuocHen } from "./components/datasource/useDataSourceCuocHen";
import FormCuocHen from "./components/form/FormCuocHen";
import PhanCongLaoDongGrid from "./components/phancong/PhanCongLaoDongGrid";
import PhuTungGrid from "./components/phutung/PhuTungGrid";
// import "./components/style/TaoMoiCuocHen.scss";

const TaoMoiCuocHenPage = () => {
  // #region [Navigate handler]
  const navigate = useNetworkNavigate();
  const { DealerCode, isHQ } = usePermissions();

  const handleNavigateHome = () => {
    const link = isHQ()
      ? "/admin/DanhSachCuocHenNPP"
      : "/admin/DanhSachCuocHenDL";

    navigate(link, {
      replace: true,
    });
  };

  const { Type, AppId, From, FromId } = useParams();
  const dataSource = useDataSourceCuocHen();
  const { showDialog } = useDialog();

  // #region [Declare Ref]
  const PhanCongLaoDongRef = useRef();
  const PhanCongPhuTungRef = useRef();
  const formCuocHenRef = useRef();
  const breadcrumbRef = useRef();


  const handleSave = async () => {
    formCuocHenRef.current?.submit();
  };

  useEffect(() => {
    if (Type == "add") {
      document.title = "Tạo mới cuộc hẹn";
    }

    if (Type == "update") {
      document.title = "Chi tiết cuộc hẹn";
    }

    if (AppId && AppId != "null") {
      dataSource.getDetailSerApp(AppId).then((resp) => {
     
        const { SerApp, Ser_AppServiceItems, Ser_AppPartItems } = resp;

        formCuocHenRef.current?.setValues({
          SerApp: SerApp,
        });

        breadcrumbRef.current?.setStatus(SerApp.AppStatus);

        PhanCongLaoDongRef.current?.setData(Ser_AppServiceItems);
        PhanCongPhuTungRef.current?.setData(Ser_AppPartItems);
      });
    }

    if (From == "SerCustomerCare72h" && FromId) {
      dataSource.getDetailSerAppFromCusCareID(FromId).then((resp) => {
        const { SerApp, Ser_AppServiceItems, Ser_AppPartItems } = resp;

        formCuocHenRef.current?.setValues({
          SerApp: SerApp,
        });

        breadcrumbRef.current?.setStatus("1");

        PhanCongLaoDongRef.current?.setData(Ser_AppServiceItems);
        PhanCongPhuTungRef.current?.setData(Ser_AppPartItems);
      });
    }

    if (From == "RO" && FromId) {
      dataSource.getDetailSerAppFromRO(FromId).then((resp) => {
        const { SerApp, Ser_AppServiceItems, Ser_AppPartItems } = resp;

        formCuocHenRef.current?.setValues({
          SerApp: SerApp,
        });

        breadcrumbRef.current?.setStatus("1");

        PhanCongLaoDongRef.current?.setData(Ser_AppServiceItems);
        PhanCongPhuTungRef.current?.setData(Ser_AppPartItems);
      });
    }
  }, [AppId, FromId]);

  const onSaving = async (formData) => {
    const appTimeFrom = format(formData.AppDateTimeFromTime, "HH:mm:ss");
    const appTime = format(formData.AppTimeFromTime, "HH:mm:ss");

    if (!formData?.CusID) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng nhập đủ thông tin KH",
      });

      return;
    }

    if (!formData?.CarID) {
      showDialog({
        title: "Thông báo",
        message: "Không có thông tin xe",
      });

      return;
    }

    const Ser_App = {
      AppId: formData.AppId,
      AppNo: formData.AppNo,
      DealerCode: DealerCode,
      CusID: formData?.CusID,
      CusRequest: formData?.CusRequest,
      CarID: formData?.CarID,
      AppDateTime: format(
        new Date(formData?.AppDateTimeFromDate),
        "yyyy-MM-dd"
      ),
      CVDVCode: formData?.CVDVCode,
      AppTime: appTime,
      AppDateTimeFrom: format(
        new Date(formData?.AppDateTimeFromDate),
        "yyyy-MM-dd"
      ),
      AppTimeFrom: appTimeFrom,
      CavityID: formData?.CavityID,
      AppTypeCode: formData?.AppTypeCode,
    };

    if (!formData.PlateNo && formData.FlagRO != "1") {
      showDialog({
        title: "Thông báo",
        message: "Không có thông tin xe",
      });

      return;
    }

    const Lst_Ser_AppServiceItems = PhanCongLaoDongRef.current?.getData();
    const Lst_Ser_AppPartItems = PhanCongPhuTungRef.current?.getData();

    // check xem Quantity của Lst_Ser_AppPartItems có < 0 không
    const checkQuantity = Lst_Ser_AppPartItems.some(
      (item) => item.Quantity <= 0
    );

    if (checkQuantity) {
      showDialog({
        title: "Thông báo",
        message: "Số lượng phụ tùng phải lớn hơn 0!",
      });

      return;
    }

    const param = {
      Ser_App: Ser_App,
      Lst_Ser_AppServiceItems: Lst_Ser_AppServiceItems,
      Lst_Ser_AppPartItems: Lst_Ser_AppPartItems,
    };

    if (!Ser_App.CusID) {
      showDialog({
        title: "Thông báo",
        message: "Không có thông tin xe!",
      });

      return;
    }

    if (AppId && AppId != "null") {
      await dataSource.updateSerApp(param).then((isSuccess) => {
        if (isSuccess) {
          toast.success("Cập nhật cuộc hẹn thành công!");
        }
      });
    } else {
      await dataSource.createSerApp(param).then((resp) => {
        if (resp.success) {
          toast.success("Tạo mới cuộc hẹn thành công!");
          navigate(`/service/ThongTinCuocHenDL/update/${resp.AppId}`);
        }
      });
    }
  };

  const handleConfirm = async () => {
    if (AppId) {
      await dataSource.confirmSerApp(AppId).then((isSuccess) => {
        if (isSuccess) {
          toast.success("Xác nhận cuộc hẹn thành công!");

          dataSource.getDetailSerApp(AppId).then((resp) => {
            const { SerApp, Ser_AppServiceItems, Ser_AppPartItems } = resp;

            formCuocHenRef.current?.setValues({
              SerApp: SerApp,
            });

            breadcrumbRef.current?.setStatus(SerApp.AppStatus);

            PhanCongLaoDongRef?.current?.setData(Ser_AppServiceItems);
            PhanCongPhuTungRef?.current?.setData(Ser_AppPartItems);
          });
        }
      });
    }
  };

  const handleCancel = async () => {
    if (AppId) {
      await dataSource.cancelSerApp(AppId).then((isSuccess) => {
        if (isSuccess) {
          toast.success("Hủy cuộc hẹn thành công!");

          dataSource.getDetailSerApp(AppId).then((resp) => {
            const { SerApp, Ser_AppServiceItems, Ser_AppPartItems } = resp;

            formCuocHenRef.current?.setValues({
              SerApp: SerApp,
            });

            breadcrumbRef.current?.setStatus(SerApp.AppStatus);

            PhanCongLaoDongRef.current?.setData(Ser_AppServiceItems);
            PhanCongPhuTungRef.current?.setData(Ser_AppPartItems);
          });
        }
      });
    }
  };

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      useNative
    >
      <BreadcrumbCuocHen
        handleNavigateHome={handleNavigateHome}
        handleSave={handleSave}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        ref={breadcrumbRef}
      />
      <div className="flex flex-col">
        <FormCuocHen ref={formCuocHenRef} onSaving={onSaving} />
  
        <PhanCongLaoDongGrid ref={PhanCongLaoDongRef} />

        <PhuTungGrid ref={PhanCongPhuTungRef} />
      </div>
    </ScrollView>
  );
};

export default TaoMoiCuocHenPage;
