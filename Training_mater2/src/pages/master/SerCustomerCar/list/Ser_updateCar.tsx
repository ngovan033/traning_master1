import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Form, LoadPanel, ScrollView, TabPanel } from "devextreme-react";
import { Item } from "devextreme-react/tab-panel";
import { useAtom, useSetAtom } from "jotai";
import { useParams } from "react-router-dom";
import { dataViewAtom } from "../components/store";
import { useEffect, useRef } from "react";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useClientgateApi } from "@/packages/api";
import { CustomerInfo } from "../popup_add/customer-info";
import { useNetworkNavigate } from "@/packages/hooks";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Icon } from "@/packages/ui/icons";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { CarInfo } from "../popup_add/car-info";

interface HeaderProps {
  rightButtons: BButtonProps[]; 
}

const Header = ({ rightButtons }: HeaderProps) => {

  const { type, code } = useParams();
  // const navigate = useNetworkNavigate();
  const navigate = useNetworkNavigate();
  const handleGoBack = () => {
    // navigate("/admin/Ser_CustomerCar");
    navigate("/admin/SerCustomerCar", { replace: true });
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
            {"Quản lý khách hàng"}
          </div>
          <Icon name={"chevronRight"} className={"mx-2"} />
          <div
            className={
              "screen screen-leaf text-[#0E223D] text-[14px] font-[600]"
            }
          >
            {type === "new" ? (
              <>{"Tạo mới khách hàng"}</>
            ) : (
              <>{"Sửa thông tin khách hàng"}</>
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
export const Ser_CustomerCarUpdate = () => {
  const { type, CusID } = useParams();
  const [dataView, setDataView] = useAtom(dataViewAtom);
  const setLoad = useSetAtom(loadPanelAtom);
  const api = useClientgateApi();
  const networkNavigate = useNetworkNavigate();

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
    setLoad(false);
    setDataView((prev: any) => {
      return {
        
        CustomerInfo: customerInfor?.DataList?.[0],
      };
    });
  };
  const windowSize = useWindowSize();
  const handleCancel = () => {
    networkNavigate("/admin/SerCustomerCar", { replace: true });
  };
  useEffect(() => {
    if (!dataView?.CustomerInfo?.CusID && type === "edit") {
    networkNavigate("/admin/SerCustomerCar", { replace: true });
    }

    if (type === "edit" && CusID) {
      fetchDataAsync(CusID);
    }

  }, []);
  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      visible: type === "new",
      label: "Lưu",
      permissionCode: "BTN_QT_DL_DANHSACHKHACHHANG_TAOMOI",
      // onClick: handleCreateNew,
      className: "px-[4px]",
    },
    {
      validationGroup: "main",
      visible: type === "edit",
      label: "Lưu",
      permissionCode: "BTN_QT_DL_DANHSACHKHACHHANG_CT_SUA",
      // onClick: handleUpdate,
      className: "px-[4px]",
    },
    {
      label: "Đóng",
      className: "p-0 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel,
    },
  ];
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
              <Item title={"Thông tin khách hàng"}>
                <CustomerInfo
                  chuXeRef={chuXeRef}
                  nguoiLienHeRef={nguoiLienHeRef}
                  handleClose={handleCancel}
                  checkBoxRef={checkBoxRef}
                />
              </Item>
              {type === "edit" && (
                <Item title={"Thông tin xe"}>
                  {/* <CarInfo /> */}
                </Item>
              )}
            </TabPanel>
          </ScrollView>
        </div>
      </div>
    </div>
  );
};
