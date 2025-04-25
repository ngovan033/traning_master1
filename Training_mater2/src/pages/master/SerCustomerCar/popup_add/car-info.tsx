 import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { forwardRef, useEffect, useRef, useState } from "react";
import { PopupAddCar } from "./use-popup-add-car";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useClientgateApi } from "@/packages/api";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { dataViewAtom } from "../components/store";
import { toast } from "react-toastify";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { showErrorAtom } from "@/packages/store";
// import { PopupViewHistory } from "../popup_view_history/popup_view_history";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useDialog } from "@/packages/hooks/useDiaglog";

interface ICarInfoProps {}

export const CarInfo = forwardRef(({}: ICarInfoProps, ref: any) => {
  const { t } = useI18n("Ser_CustomerCar");
  const windowSize = useWindowSize();
  const configuration = useConfiguration();
  const showAddCarPopup = useVisibilityControl({ defaultVisible: false });
  const showViewHistoryPopup = useVisibilityControl({
    defaultVisible: false,
  });
  const config = useConfiguration();
  const api = useClientgateApi();
  const dataView = useAtomValue(dataViewAtom);
  const setDataView = useSetAtom(dataViewAtom);
  const setLoad = useSetAtom(loadPanelAtom);
  const showError = useSetAtom(showErrorAtom);
  const { showDialog } = useDialog();
  const dataGridCarRef = useRef<any>(null);
  const carInfoRef = useRef<any>(null);

  const addCarPopupRef = useRef<any>(null);
  const viewHistoryPopupRef = useRef<any>(null);

  const [listModelName, setListModelName] = useState<any>([]);
  const [checkBox, setCheckBox] = useState(false);
  const [formCarData, setFormCarData] = useState({
    FlagPlateNo: "1", // mặc định tạo mới cho là "1" để xử lý cho cả update và view, chú ý đi kèm với cả checkBox
    PlateNo: "",
    CarID: "",
    TradeMarkCode: "",
    ModelName: "",
    CurrentKm: "",
    ModelCode: "",
    FrameNo: "",
    EngineNo: "",
    ColorCode: "",
    ProductYear: "",
    DateBuyCar: null,
    WarrantyRegistrationDate: null,
    WarrantyExpiresDate: null,
    CusConfirmedWarrantyDate: null,
    InsNo: "",
    InsContractNo: "",
    InsStartDate: null,
    InsFinishedDate: null,
  });

  useEffect(() => {
    dataGridCarRef?.current?.setData(dataView?.CarInfo);
  }, [dataView]);

  const { data: listInsNo } = useQuery(
    ["listInsNo-Ser_CustomerCar_AddNew"],
    () =>
      api.Ser_CustomerCar_listInsNo_SearchDL({
        InsNo: "",
        InsVieName: "",
        Address: "",
        DealerCode: "",
        FlagActive: "1",
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as any),
    {}
  );

  //==========================handle======================================
  const handleConvertPlateNo = (key: any) => {
    let letters = key.match(/[a-zA-Z]/g);
    if (key.match(/[a-zA-Z]/g).length == 1) {
      return key.replace("-", " -");
    }
    return key;
  };

  // preparing init state to create new
  const handleAddNew = () => {
    addCarPopupRef.current.show();
    setFormCarData({
      FlagPlateNo: "1", // mặc định tạo mới cho là "1" để xử lý cho cả update và view, chú ý đi kèm với cả checkBox
      PlateNo: "",
      CarID: "",
      TradeMarkCode: "",
      ModelName: "",
      CurrentKm: "",
      ModelCode: "",
      FrameNo: "",
      EngineNo: "",
      ColorCode: "",
      ProductYear: "",
      DateBuyCar: null,
      WarrantyRegistrationDate: null,
      WarrantyExpiresDate: null,
      CusConfirmedWarrantyDate: null,
      InsNo: "",
      InsContractNo: "",
      InsStartDate: null,
      InsFinishedDate: null,
    });
    setCheckBox(false);
    setListModelName([]);
  };

  // Xóa khách hàng
  const handleDelete = async () => {
    const lst = dataGridCarRef?.current?.getSelectedRowsData();
    if (lst.length === 0) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng chọn dữ liệu để xóa!",
      });

      return;
    }
    ConfirmComponent({
      asyncFunction: async () => {
        setLoad(true);
        let flagCheckDel = false;
        for (let item of lst) {
          if (item?.IsActive === "1") {
            const resp = await api.Ser_CustomerCar_SerCarDelete({
              CusID: item?.CusID,
              CarID: item?.CarID,
            });
            if (resp?.isSuccess) {
              flagCheckDel = true;
            } else {
              flagCheckDel = false;

              showError({
                message: t(resp._strErrCode),
                _strErrCode: resp._strErrCode,
                _strTId: resp._strTId,
                _strAppTId: resp._strAppTId,
                _objTTime: resp._objTTime,
                _strType: resp._strType,
                _dicDebug: resp._dicDebug,
                _dicExcs: resp._dicExcs,
              });
              break;
            }
          }
        }

        const response = await api.Ser_CustomerCar_SerCarSearchDL({
          CarID: "",
          CusID: dataView?.CustomerInfo?.CusID,
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

        if (response?.isSuccess) {
          if (response?.DataList) {
            // xóa xe xong đồng thời cập nhật lại atom cho toàn bộ dữ liệu chi tiết update
            setDataView((prev: any) => {
              return {
                CustomerInfo: prev.CustomerInfo,
                CarInfo: response?.DataList,
              };
            });
            dataGridCarRef?.current?.setData(response?.DataList);
          }
        }
        setLoad(false);
        if (flagCheckDel == true) {
          toast.success(t("Delete successfully!"));
        }
      },
      title: t("Confirm"),
      contentConfirm: "Bạn có chắc muốn xóa?",
    });
  };

  // double click to view update
  const handleDoubleClickUpdate = async (ev: any) => {
    setLoad(true);
    const resp = await api.Ser_MST_Model_SearchDL({
      TradeMarkCode: ev.data?.TradeMarkCode,
      ModelName: "",
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    });
    if (resp.isSuccess) {
      setListModelName(resp?.DataList);
    }
    setLoad(false);
    if (ev.data?.FlagPlateNo === "0") {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }

    /// //////
    const findDetail = dataGridCarRef?.current
      ?.getVisibleData()
      ?.find((item: any) => {
        return item?.CarID === ev.data?.CarID;
      });

    // FlagPlateNo: 0 => Không biển số | 1 => Có biển số

    let plateNo = findDetail?.PlateNo;

    if (findDetail) {
      setFormCarData({
        FlagPlateNo: ev.data?.FlagPlateNo,
        PlateNo: plateNo,
        CarID: findDetail?.CarID ?? "",
        TradeMarkCode: findDetail?.TradeMarkCode ?? "",
        ModelName: findDetail?.smm_ModelID ?? "",
        CurrentKm: findDetail?.CurrentKm ?? "",
        ModelCode: findDetail?.smm_ModelID ?? "",
        FrameNo: findDetail?.FrameNo ?? "",
        EngineNo: findDetail?.EngineNo ?? "",
        ColorCode: findDetail?.ColorCode ?? "",
        ProductYear: findDetail?.ProductYear ?? "",
        DateBuyCar: findDetail?.DateBuyCar || null,
        WarrantyRegistrationDate: findDetail?.WarrantyRegistrationDate || null,
        WarrantyExpiresDate: findDetail?.WarrantyExpiresDate || null,
        CusConfirmedWarrantyDate: findDetail?.CusConfirmedWarrantyDate || null,
        InsNo: findDetail?.InsNo ?? "",
        InsContractNo: findDetail?.InsContractNo ?? "",
        InsStartDate: findDetail?.InsStartDate || null,
        InsFinishedDate: findDetail?.InsFinishedDate || null,
      });
      addCarPopupRef.current.show();
    } else {
      toast.warning("Không tìm thấy xe!");
      return;
    }
  };

  // mở popup tra cứu lịch sử
  const handleViewHistory = async (formCarData: any) => {
    const gridRef = viewHistoryPopupRef?.current.getGridViewOneRef();
    viewHistoryPopupRef?.current.setSearchCondition({
      PlateNo: formCarData.PlateNo,
      FrameNo: formCarData.FrameNo,
      Ft_PageIndex: 0,
      Ft_PageSize: gridRef.current.getDxInstance().pageSize() ?? 100, //configuration.MAX_PAGE_ITEMS,
      FlagDataWH: false, // convert "1", "0" ở hàm gọi API
    });
    setLoad(true);
    const response = await api.DealerHistoryShareMng_SearchDL({
      PlateNo: formCarData.PlateNo,
      FrameNo: formCarData.FrameNo,
      FlagDataWH: false, // convert "1", "0" ở hàm gọi API
      Ft_PageIndex: 0, // gridRef.current.getDxInstance().pageIndex() ??
      Ft_PageSize: gridRef.current.getDxInstance().pageSize() ?? 100, // configuration.MAX_PAGE_ITEMS, // gridRef.current.getDxInstance().pageSize() ?? ,
    });
    setLoad(false);
    gridRef?.current.setPageData(response);
    viewHistoryPopupRef?.current.show();
  };

  // =============================Toolbar====================================
  const gridToolbars: ToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return (
          <BButton
            isMdSize
            label={t("AddNew")}
            onClick={() => handleAddNew()}
          />
        );
      },
    },
    {
      location: "before",
      render: () => {
        return (
          <BButton
            isMdSize
            label={t("Delete")}
            onClick={() => handleDelete()}
          />
        );
      },
    },
  ];

  //========================collumns========================
  const columns: ColumnOptions[] = [
    {
      dataField: "IdxGrid",
      visible: true,
      caption: t("STT"),
      cssClass: "table-data-center table-data-stt",
      width: 80,
      alignment: "center",
      allowEditing: false,
      allowSorting: false,
      allowFiltering: false,
      allowSearch: false,
      allowResizing: false,
      editorOptions: { readOnly: true },
      cellRender: ({ rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
      },
    },
    {
      dataField: "PlateNo",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("PlateNo"),
      // cellRender: (e: any) => {
      //   return (
      //     <Link
      //       label={e.value}
      //       onClick={() => {
      //         handleViewDetail(e);
      //       }}
      //     />
      //   );
      // },
    },
    {
      dataField: "TradeMarkCode",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("TradeMarkCode"),
    },
    {
      dataField: "FrameNo",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("FrameNo"),
    },
    {
      dataField: "EngineNo",
      caption: t("EngineNo"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "smm_ModelName",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("smm_ModelName"),
    },
    {
      dataField: "ColorCode",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("ColorCode"),
    },
    {
      dataField: "ProductYear",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("ProductYear"),
    },

    {
      dataField: "CurrentKm",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      dataType: "number",
      caption: t("CurrentKm"),
    },
  ];

  return (
    <>
      <GridViewOne
        ref={dataGridCarRef}
        toolbarItems={gridToolbars}
        dataSource={[]}
        columns={columns}
        allowSelection={true}
        allowInlineEdit={true}
        isHidenHeaderFilter={true}
        allowMultiRowEdit={false}
        editMode={false}
        showSTT={false}
        onRowDblClick={(ev) => {
          handleDoubleClickUpdate(ev);
        }}
        editingOptions={{
          mode: "batch",
        }}
        customHeight={windowSize.height - 160}
        keyExpr={"PlateNo"}
        storeKey={"Ser_CustomerCar_AddNew_CarInfo"}
      />

      <PopupAddCar
        ref={addCarPopupRef}
        visible={showAddCarPopup.visible}
        container={".dx-viewport"}
        position={"left"}
        onHidding={() => {
          showAddCarPopup.close();
        }}
        formCarData={formCarData}
        carInfoRef={carInfoRef}
        dataGridCarRef={dataGridCarRef}
        checkBox={checkBox}
        setCheckBox={setCheckBox}
        listInsNo={listInsNo}
        listModelName={listModelName}
        setListModelName={setListModelName}
        handleViewHistory={handleViewHistory}
      />

      <PopupViewHistory
        ref={viewHistoryPopupRef}
        visible={showViewHistoryPopup.visible}
        container={".dx-viewport"}
      />
    </>
  );
});
