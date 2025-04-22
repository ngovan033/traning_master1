import { useI18n } from "@/i18n/useI18n";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { Icon } from "@/packages/ui/icons";
import { Form, LoadPanel, ScrollView } from "devextreme-react";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useAtom, useSetAtom } from "jotai";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useClientgateApi } from "@/packages/api";
import { dataViewAtom } from "../components/store";
import { useNetworkNavigate } from "@/packages/hooks";
import { CustomerInfo } from "../popup_add/customer-info";
import { CarInfo } from "../popup_add/car-info";
import { format } from "date-fns";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("Ser_CustomerCar_CreateNew");
  const { type, code } = useParams();
  // const navigate = useNetworkNavigate();
  const navigate = useNetworkNavigate();
  const handleGoBack = () => {
    // navigate("/admin/Ser_CustomerCar");
    navigate("/admin/Ser_CustomerCar", { replace: true });
  };
  return (
    <div className="flex items-center ">
      <div>
        <ToggleSidebarButton />
      </div>

      <div className="w-full flex items-center justify-between h-[44px] px-[14px]  page-header">
        <div className={"flex items-center justify-center"}>
          <div
            className={
              "screen text-[#5F7D95] font-[400] text-[14px] hover:cursor-pointer"
            }
            onClick={handleGoBack}
          >
            {t("Ser_CustomerCar")}
          </div>
          <Icon name={"chevronRight"} className={"mx-2"} />
          <div
            className={
              "screen screen-leaf text-[#0E223D] text-[14px] font-[600]"
            }
          >
            {type === "new" ? (
              <>{t("Ser_CustomerCar_Create")}</>
            ) : (
              <>{t("Ser_CustomerCar_Edit")}</>
            )}
          </div>
        </div>
        <div>
          {rightButtons.map((button, idx) => (
            <BButton isMdSize key={idx} {...button} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Ser_CustomerCar_CreateNew = () => {
  const { t } = useI18n("Ser_CustomerCar_CreateNew");
  // const navigate = useNetworkNavigate();
  const navigate = useNavigate();
  const networkNavigate = useNetworkNavigate();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const { type, CusID } = useParams();

  const [dataView, setDataView] = useAtom(dataViewAtom);
  const setLoad = useSetAtom(loadPanelAtom);

  const chuXeRef = useRef<Form>(null);
  const nguoiLienHeRef = useRef<Form>(null);
  const checkBoxRef = useRef<any>(null);

  const fetchDataAsync = async (CusID: string) => {
    setLoad(true);
    const customerInfor = await api.Ser_CustomerCar_SearchDL({
      CusID: CusID,
      CusName: "",
      DealerCode: "",
      Address: "",
      Phone: "",
      PlateNo: "",
      FrameNo: "",
      EngineNo: "",
      TradeMarkCode: "",
      ModelId: "",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    const carInfor = await api.Ser_CustomerCar_SerCarSearchDL({
      CarID: "",
      CusID: CusID, //  respone?.Data?.CusID,
      PlateNo: "",
      FrameNo: "",
      EngineNo: "",
      ModelId: "",
      TradeMarkCode: "",
      DealerCode: "",
      SalesCarID: "",
      InsNo: "",
      IsActive: "1",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });
    setLoad(false);
    setDataView((prev: any) => {
      return {
        CarInfo: carInfor?.DataList,
        CustomerInfo: customerInfor?.DataList?.[0],
      };
    });
  };

  useEffect(() => {
    // if (!dataView?.CustomerInfo?.CusID && type === "edit") {
    // networkNavigate("/admin/Ser_CustomerCar", { replace: true });
    // }

    if (type === "edit" && CusID) {
      fetchDataAsync(CusID);
    }

    // Nếu màn hình tạo mới thì clear cache atom
    if (type === "new") {
      setDataView({
        CustomerInfo: {},
        CarInfo: {
          ContName: "",
          ContTel: "",
          ContMobile: "",

          ContAddress: "",
          ContSex: "",

          ContFax: "",
          ContEmail: "",
        },
      });
    }
  }, []);

  // ==================Handle==============================================
  const handleCancel = () => {
    networkNavigate("/admin/Ser_CustomerCar", { replace: true });
  };

  const handleSave = async () => {
    const validate = chuXeRef.current?.instance?.validate();
    const validateNguoiLienHe = nguoiLienHeRef.current?.instance?.validate();

    if (!checkBoxRef?.current?.props?.value) {
      if (!validate?.isValid || !validateNguoiLienHe?.isValid) {
        return;
      }
    } else {
      if (!validate?.isValid) {
        return;
      }
    }

    ConfirmComponent({
      asyncFunction: async () => {
        const chuXeInfo = chuXeRef?.current?.props?.formData;
        const nguoiLienHeInfo = nguoiLienHeRef?.current?.props?.formData;
        let CusTypeID;
        if (chuXeInfo.KhachHang === "1") {
          CusTypeID = "";
        } else {
          CusTypeID = chuXeInfo.CusTypeID ?? "";
        }
        if (type === "edit") {
          const requestData = {
            CusID: dataView?.CustomerInfo?.CusID ?? "",
            CusName: chuXeInfo?.CusName ?? "",
            Sex: chuXeInfo?.Sex === "1" ? true : false,
            Mobile: chuXeInfo?.Mobile?.trim() ?? "",
            Tel: chuXeInfo?.Tel?.trim() ?? "",

            ProvinceCode: chuXeInfo?.ProvinceCode ?? "",
            DistrictCode: chuXeInfo?.DistrictCode ?? "",
            Address: chuXeInfo?.Address?.trim() ?? "",
            DOB: chuXeInfo?.DOB
              ? format(new Date(chuXeInfo?.DOB), "yyyy-MM-dd")
              : "",
            IDCardNo: chuXeInfo?.IDCardNo ?? "",

            Email: chuXeInfo?.Email?.trim() ?? "",
            TaxCode: chuXeInfo?.TaxCode ?? "",
            Fax: chuXeInfo?.Fax ?? "",
            Website: chuXeInfo?.Website ?? "",

            ContName: nguoiLienHeInfo?.ContName ?? "",
            ContTel: nguoiLienHeInfo?.ContTel ?? "",
            ContMobile: nguoiLienHeInfo?.ContMobile ?? "",

            ContAddress: nguoiLienHeInfo?.ContAddress ?? "",
            ContSex: nguoiLienHeInfo?.ContSex === "1" ? true : false,

            ContFax: nguoiLienHeInfo?.ContFax ?? "",
            ContEmail: nguoiLienHeInfo?.ContEmail ?? "",

            Bank: "",
            BankAccountNo: "",
            IsContact: checkBoxRef?.current?.props?.value, // lưu là  lưu giá trị của ô checkbox "Khách hàng cũng là người liên hệ", còn ô Cá Nhân, Tổ chức chỉ view thôi
            Note: "",
            CusTypeID: CusTypeID,
            OrgTypeID: "",
            IsActive: true,
          };
          setLoad(true);
          const respone = await api.Ser_CustomerCar_Update(requestData);
          setLoad(false);
          if (respone.isSuccess) {
            fetchDataAsync(dataView.CustomerInfo.CusID);
            toast.success(t("Update successfully!"));

            return true;
          } else {
            showError({
              message: t(respone._strErrCode),
              _strErrCode: respone._strErrCode,
              _strTId: respone._strTId,
              _strAppTId: respone._strAppTId,
              _objTTime: respone._objTTime,
              _strType: respone._strType,
              _dicDebug: respone._dicDebug,
              _dicExcs: respone._dicExcs,
            });
          }
        } else {
          const requestData = {
            Sex: chuXeInfo?.Sex === "1" ? true : false,
            CusName: chuXeInfo?.CusName ?? "",
            Mobile: chuXeInfo?.Mobile?.trim() ?? "", // loại ỏ khonarg trắng đầu cuối
            Tel: chuXeInfo?.Tel?.trim() ?? "", // loại bỏ khoảng trắng đầu cuối
            ProvinceCode: chuXeInfo?.ProvinceCode ?? "",
            DistrictCode: chuXeInfo?.DistrictCode ?? "",
            Address: chuXeInfo?.Address?.trim() ?? "", // loại bỏ khoảng trắng đầu cuối
            DOB: chuXeInfo?.DOB
              ? format(new Date(chuXeInfo?.DOB), "yyyy-MM-dd")
              : "",
            IDCardNo: chuXeInfo?.IDCardNo ?? "",
            Email: chuXeInfo?.Email?.trim() ?? "", // loại bỏ khonarg trắng đầu cuối
            TaxCode: chuXeInfo?.TaxCode ?? "",
            Fax: chuXeInfo?.Fax ?? "",
            Website: chuXeInfo?.Website ?? "",

            ContName: nguoiLienHeInfo?.ContName ?? "",
            ContTel: nguoiLienHeInfo?.ContTel ?? "",
            ContMobile: nguoiLienHeInfo?.ContMobile ?? "",
            ContAddress: nguoiLienHeInfo?.ContAddress ?? "",
            ContSex: nguoiLienHeInfo?.ContSex === "1" ? true : false,
            ContFax: nguoiLienHeInfo?.ContFax ?? "",
            ContEmail: nguoiLienHeInfo?.ContEmail ?? "",

            CusTypeID: CusTypeID,
            OrgTypeID: "",
            BankAccountNo: "",
            Note: "",
            IsContact: checkBoxRef?.current?.props?.value,
            Bank: "",
          };
          setLoad(true);
          const respone = await api.Ser_CustomerCar_Create(requestData);
          setLoad(false);
          if (respone.isSuccess) {
            // const carInfor = await api.Ser_CustomerCar_SerCarSearchDL({
            //   CarID: "",
            //   CusID: respone?.Data?.CusID,
            //   PlateNo: "",
            //   FrameNo: "",
            //   EngineNo: "",
            //   ModelId: "",
            //   TradeMarkCode: "",
            //   DealerCode: "",
            //   SalesCarID: "",
            //   InsNo: "",
            //   IsActive: "1",
            //   Ft_PageIndex: 0,
            //   Ft_PageSize: 100,
            // });
            if (
              respone?.Data?.CusID === null ||
              respone?.Data?.CusID === undefined ||
              respone?.Data?.CusID === ""
            ) {
              toast.info("Có lỗi xảy ra khi tạo");
              return;
            }
            fetchDataAsync(respone?.Data?.CusID);
            // setDataView((prev: any) => {
            //   return {
            //     CarInfo: carInfor?.DataList,
            //     CustomerInfo: respone?.Data,
            //   };
            // });
            toast.success(t("Create successfully!"));
            networkNavigate(
              `/admin/Ser_CustomerCar/manageSer_CustomerCar/edit/${respone?.Data?.CusID}`
            );
            return true;
          } else {
            showError({
              message: t(respone._strErrCode),
              _strErrCode: respone._strErrCode,
              _strTId: respone._strTId,
              _strAppTId: respone._strAppTId,
              _objTTime: respone._objTTime,
              _strType: respone._strType,
              _dicDebug: respone._dicDebug,
              _dicExcs: respone._dicExcs,
            });
          }
        }
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to save ?"),
    });
  };

  const handleCreateNew = async () => {
    handleSave();
  };
  const handleUpdate = async () => {
    handleSave();
  };

  //==================rightButtons==============================================
  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      visible: type === "new",
      label: t("Save"),
      permissionCode: "BTN_QT_DL_DANHSACHKHACHHANG_TAOMOI",
      onClick: handleCreateNew,
      className: "px-[4px]",
    },
    {
      validationGroup: "main",
      visible: type === "edit",
      label: t("Update"),
      permissionCode: "BTN_QT_DL_DANHSACHKHACHHANG_CT_SUA",
      onClick: handleUpdate,
      className: "px-[4px]",
    },
    {
      label: t("Cancel"),
      className: "p-0 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel,
    },
  ];
  //==================rightButtons-end==============================================
  return (
    <div>
      <div>
        <div className="">
          <Header rightButtons={rightButtons} />
        </div>
        <div className="separator"></div>
        <div className="mt-[10px] px-2 ">
          {type === "edit" && !dataView.CustomerInfo.CusID && (
            <LoadPanel
              wrapperAttr={{
                class: "load-panel-custom",
              }}
              visible={true}
              shading={true}
              shadingColor="5px 5px 10px 2px rgba(229, 229, 229, 0.8)"
            />
          )}
          <ScrollView
            className={" h-full"}
            showScrollbar={"always"}
            height={windowSize.height - 120}
          >
            <TabPanel>
              <Item title={t("CUSTOMER INFORMATION")}>
                <CustomerInfo
                  chuXeRef={chuXeRef}
                  nguoiLienHeRef={nguoiLienHeRef}
                  handleClose={handleCancel}
                  checkBoxRef={checkBoxRef}
                />
              </Item>
              {type === "edit" && (
                <Item title={t("CAR INFORMATION")}>
                  <CarInfo />
                </Item>
              )}
            </TabPanel>
          </ScrollView>
        </div>
      </div>
    </div>
    // <div className="mx-2">
    //   <AdminContentLayout>
    //     <AdminContentLayout.Slot name={"Header"}>
    //       <Header rightButtons={rightButtons} />
    //     </AdminContentLayout.Slot>
    //     <AdminContentLayout.Slot name={"Content"}>
    //       <ScrollView
    //         className={" h-full"}
    //         showScrollbar={"always"}
    //         height={windowSize.height - 120}
    //       >
    //         {/* <TabPanel className="tabPanelCustome"> */}
    //         <TabPanel selectedIndex={1}>
    //           <Item title={t("CUSTOMER INFORMATION")}>
    //             <CustomerInfo
    //               chuXeRef={chuXeRef}
    //               nguoiLienHeRef={nguoiLienHeRef}
    //               handleClose={handleCancel}
    //               checkBoxRef={checkBoxRef}
    //             />
    //           </Item>
    //           {type === "edit" && (
    //             <Item title={t("CAR INFORMATION")}>
    //               <CarInfo
    //               // formChuXeInfo={formChuXeInfo}
    //               />
    //             </Item>
    //           )}
    //         </TabPanel>
    //       </ScrollView>
    //     </AdminContentLayout.Slot>
    //   </AdminContentLayout>
    // </div>
  );
};
