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
    networkNavigate("/admin/Ser_CustomerCar", { replace: true });
  };
  useEffect(() => {
    // if (!dataView?.CustomerInfo?.CusID && type === "edit") {
    // networkNavigate("/admin/Ser_CustomerCar", { replace: true });
    // }

    if (type === "edit" && CusID) {
      fetchDataAsync(CusID);
    }

  }, []);
  return (
    <div>
      <div>
        {/* <div className="">
          <Header rightButtons={rightButtons} />
        </div> */}
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
