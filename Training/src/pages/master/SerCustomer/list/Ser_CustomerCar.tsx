import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { Link } from "@/packages/components/link/link";
import { usePermissions } from "@/packages/contexts/permission";
import { useNetworkNavigate } from "@/packages/hooks";
import { useStateSearch } from "@/packages/hooks/useStateSearch";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { SearchSer_CustomerCarParam } from "@/packages/types/master/Ser_CustomerCar";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import ButtonMore from "@/packages/ui/button/button_more/ButtonMore";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import { ToolbarItemProps } from "@/types";
import { DataGrid } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { useNavigationType } from "react-router-dom";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import SearchForm from "../search-form/search-form";

export const Ser_CustomerCar = () => {
  const { t } = useI18n("Ser_CustomerCar");
  const { isHQ, DealerCode } = usePermissions();
  const api = useClientgateApi();
  const navigate = useNetworkNavigate();
  const setLoad = useSetAtom(loadPanelAtom);
  const showError = useSetAtom(showErrorAtom);
  const [isLoading, setIsLoading] = useState(false);
  let gridRef: any = useRef<DataGrid | null>(null);
  let searchCondition = useRef<Partial<SearchSer_CustomerCarParam>>({
    CusName: "",
    PlateNo: "",
    FrameNo: "",
    Phone: "",
    Address: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });
  const naviType = useNavigationType();

  const { data: loadState, saveSate: saveState } = useStateSearch({
    storeKey: "search-condition-ser-customer-car",
  });

  //======================CallAPI==========================================
  const fetchData = async () => {
    const response = await api.Ser_Customer_SearchDL({
      CusID: searchCondition.current?.CusID ?? "",
      CusName: searchCondition.current?.CusName ?? "",
      DealerCode: searchCondition.current?.DealerCode ?? "",
      Address: searchCondition.current?.Address ?? "",
      Phone: searchCondition.current?.Phone ?? "",
      PlateNo: searchCondition.current?.PlateNo ?? "",
      FrameNo: searchCondition.current?.FrameNo ?? "",
      EngineNo: searchCondition.current?.EngineNo ?? "",
      TradeMarkCode: searchCondition.current?.TradeMarkCode ?? "",
      ModelId: searchCondition.current?.ModelId ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getPageSize(), // gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (response?.isSuccess) {
      return response;
    } else {
      showError({
        message: t(response._strErrCode),
        _strErrCode: response._strErrCode,
        _strTId: response._strTId,
        _strAppTId: response._strAppTId,
        _objTTime: response._objTTime,
        _strType: response._strType,
        _dicDebug: response._dicDebug,
        _dicExcs: response._dicExcs,
      });
    }
  };
  //======================CallAPI-end==========================================

  //==========================handle================================================
  const handleAddNew = () => {
    navigate("/admin/Ser_CustomerCar/manageSer_CustomerCar/new");
  };

  const handleViewDetail = async (ev: any) => {
    setLoad(true);
    const response = await api.Ser_Customer_SearchDL({
      CarID: "",
      CusID: ev.data?.CusID,
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

    if (response?.isSuccess) {
      if (response?.DataList) {
        navigate(
          `/admin/Ser_CustomerCar/manageSer_CustomerCar/edit/${ev.data?.CusID}`
        );
      }
    } else {
      showError({
        message: t(response._strErrCode),
        _strErrCode: response._strErrCode,
        _strTId: response._strTId,
        _strAppTId: response._strAppTId,
        _objTTime: response._objTTime,
        _strType: response._strType,
        _dicDebug: response._dicDebug,
        _dicExcs: response._dicExcs,
      });
    }
  };

  const handleSearch = async (condition: any) => {
    const currentCondition = {
      ...condition,
      CusName: condition.CusName,
      PlateNo: condition.PlateNo,
      FrameNo: condition.FrameNo,
      Phone: condition.Phone,
      Address: condition.Address,

      // Ft_PageSize: condition.Ft_PageSize,
      // Ft_PageIndex: condition.Ft_PageIndex,
    };

    searchCondition.current = {
      ...searchCondition.current,
      ...currentCondition,
    };

    saveState(currentCondition);
    gridRef?.current?.refetchData();
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    await onDelete(data);
  };

  const handleDeleteRow = async (ids: any) => {};

  const handleDeleteMulti = async () => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current
          ?.getDxInstance()
          ?.getSelectedRowKeys();

        await handleDeleteRow(listChecked);
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };

  const onDelete = async (id: any) => {
    ConfirmComponent({
      asyncFunction: async () => {
        setLoad(true);
        const resp1 = await api.Ser_Customer_SearchDL({
          CarID: "",
          CusID: id?.CusID,
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

        if (resp1?.isSuccess && resp1.DataList) {
          if (resp1?.DataList?.length > 0) {
            toast.warning(t("Khách hàng này đang có xe!"));
          } else {
            const resp = await api.Ser_CustomerCar_Delete({
              CusId: id?.CusID,
            });
            if (resp.isSuccess) {
              toast.success(t("Delete successfully!"));
              gridRef?.current?.refetchData();
            } else {
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
            }
          }
        }

        setLoad(false);
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };

  const handleExportExcel = async () => {
    setLoad(true);
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Ser_CustomerCar_ExportHQ({
          CusID: searchCondition.current?.CusID ?? "",
          CusName: searchCondition.current?.CusName ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          Address: searchCondition.current?.Address ?? "",
          Phone: searchCondition.current?.Phone ?? "",
          PlateNo: searchCondition.current?.PlateNo ?? "",
          FrameNo: searchCondition.current?.FrameNo ?? "",
          EngineNo: searchCondition.current?.EngineNo ?? "",
          TradeMarkCode: searchCondition.current?.TradeMarkCode ?? "",
          ModelId: searchCondition.current?.ModelId ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getPageSize(), // gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_CustomerCar_ExportDL({
          CusID: searchCondition.current?.CusID ?? "",
          CusName: searchCondition.current?.CusName ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          Address: searchCondition.current?.Address ?? "",
          Phone: searchCondition.current?.Phone ?? "",
          PlateNo: searchCondition.current?.PlateNo ?? "",
          FrameNo: searchCondition.current?.FrameNo ?? "",
          EngineNo: searchCondition.current?.EngineNo ?? "",
          TradeMarkCode: searchCondition.current?.TradeMarkCode ?? "",
          ModelId: searchCondition.current?.ModelId ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getPageSize(), // gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      });
    if (resp?.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = resp.Data;
    }
    setLoad(false);
  };
  const handleExportTemplate = async () => {
    const response = await api.Ser_CustomerCar_ExportTemplate();
    if (response.isSuccess) {
      toast.success(t("ExportExcelSuccess"));
      window.location.href = response.Data!;
    } else {
      showError({
        message: t(response._strErrCode),
        _strErrCode: response._strErrCode,
        _strTId: response._strTId,
        _strAppTId: response._strAppTId,
        _objTTime: response._objTTime,
        _strType: response._strType,
        _dicDebug: response._dicDebug,
        _dicExcs: response._dicExcs,
      });
    }
  };
  const onDrop = async (acceptedFiles: any, onClose: Function) => {
    if (acceptedFiles.length === 0) {
      toast.warning("File excel không đúng định dạng!");
      return;
    }
    const response = await api.Ser_CustomerCar_Import(acceptedFiles[0] ?? []);
    if (response.isSuccess) {
      toast.success(t("Upload successfully!"));
      onClose();
      gridRef?.current?.refetchData();
    } else {
      showError({
        message: t(response._strErrCode),
        _strErrCode: response._strErrCode,
        _strTId: response._strTId,
        _strAppTId: response._strAppTId,
        _objTTime: response._objTTime,
        _strType: response._strType,
        _dicDebug: response._dicDebug,
        _dicExcs: response._dicExcs,
      });
    }
  };

  //==================toolbarItems==============================================
  const subGridToolbars: ToolbarItemProps[] = [
    {
      text: "",
      location: "before",
      render: () => {
        return (
          <ButtonMore
            excelOptions={{
              handleDownloadTemplate: handleExportTemplate,
              handleExportExcel: handleExportExcel,
              handleUploadFiles: onDrop,
              showExportExcelButton: true,
              permissionExportExcelCode: "BTN_QT_DL_DANHSACHKHACHHANG_EXCEL",
            }}
          />
        );
      },
    },
    // {
    //   location: "before",
    //   render: (gridRef: MutableRefObject<DataGrid>) => {
    //     return (
    //       <ImportExcel
    //         isMdSize
    //         onDrop={onDrop}
    //         options={{
    //           accept: {
    //             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    //               [],
    //             "application/vnd.ms-excel": [],
    //           },
    //           maxFiles: 1,
    //         }}
    //       />
    //     );
    //   },
    // },
    // {
    //   location: "before",
    //   render: (gridRef: MutableRefObject<DataGrid>) => {
    //     return (
    //       <BButton
    //         isMdSize
    //         label={t("ExportExcel")}
    //         onClick={handleExportExcel}
    //       />
    //     );
    //   },
    // },
    // {
    //   location: "before",
    //   render: (gridRef: MutableRefObject<DataGrid>) => {
    //     return (
    //       <BButton
    //         isMdSize
    //         label={t("ExportTemplate")}
    //         onClick={handleExportTemplate}
    //       />
    //     );
    //   },
    // },
  ];
  //==================toolbarItems-end==============================================
  //=====================Columns===========================================
  const columns: any = [
    {
      dataField: "CusID",
      visible: true,
      caption: t("CusID"),
      width: 150,
      cellRender: (e: any) => {
        return (
          <Link
            label={e.value}
            onClick={() => {
              handleViewDetail(e);
            }}
          />
        );
      },
    },
    {
      dataField: "CusName",
      visible: true,
      caption: t("CusName"),
      width: 150,
      sortingMethod: function (value1: any, value2: any) {
        if (!value1 && value2) return -1;
        if (!value1 && !value2) return 0;
        if (value1 && !value2) return 1;
        // Determines whether two strings are equivalent in the current locale
        return value1.localeCompare(value2);
      },
    },

    {
      dataField: "DOB",
      caption: t("DOB"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
      customizeText: (e: any) => {
        if (e.value) {
          var timestamp = e.value;

          var date = new Date(
            timestamp.replace(
              /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
              "$1-$2-$3T$4:$5:$6"
            )
          );

          var year = date.getFullYear();
          var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
          var day = String(date.getDate()).padStart(2, "0");

          var formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        }
      },
    },

    {
      dataField: "Sex",
      caption: t("Sex"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
      dataType: "string",
      customizeText: ({ value }: any) => {
        if (value) {
          return "Nam";
        } else if (value === null) {
          return "";
        } else {
          return "Nữ";
        }
      },
    },

    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "TradeMarkCode",
      caption: t("TradeMarkCode"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "ModelName",
      caption: t("ModelName"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "FrameNo",
      caption: t("FrameNo"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "EngineNo",
      caption: t("EngineNo"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "ProductYear",
      caption: t("ProductYear"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "ColorCode",
      caption: t("ColorCode"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "InsVieName",
      caption: t("InsVieName"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "Address",
      caption: t("Address"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "Mobile",
      caption: t("Mobile"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "Tel",
      caption: t("Tel"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "Email",
      caption: t("Email"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "ContName",
      caption: t("ContName"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "ContTel",
      caption: "Điện thoại người liên hệ",
      // caption: t("ContTel"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
    {
      dataField: "LogLUDateTime",
      caption: t("LogLUDateTime"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
      customizeText: (e: any) => {
        if (e.value) {
          var timestamp = e.value;

          var date = new Date(
            timestamp.replace(
              /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
              "$1-$2-$3T$4:$5:$6"
            )
          );

          var year = date.getFullYear();
          var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
          var day = String(date.getDate()).padStart(2, "0");

          var formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        }
      },
    },
    {
      dataField: "MemberCarID",
      caption: t("MemberCarID"),
      visible: true,
      width: 150,
      editorType: "dxTextBox",
    },
  ];
  //=====================Columns-end===========================================
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <BreadcrumbSearch
          title="Quản lý thông tin khách hàng" 
          showSearch={false}
          buttonOptions={{
            showButtonAdd: true,
            onClickButtonAdd: handleAddNew,
          }}
        ></BreadcrumbSearch> 
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchForm
              data={
                naviType !== "PUSH"
                  ? loadState ?? searchCondition.current
                  : searchCondition.current
              }
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              dataSource={[]} //
              columns={columns}
              fetchData={fetchData}
              autoFetchData={
                naviType !== "PUSH" && naviType !== "POP" ? false : true
              }
              isHiddenCheckBox={true}
              allowSelection={false}
              onRowDblClick={handleViewDetail}
              toolbarItems={subGridToolbars}
              onRowDeleteBtnClick={handleDelete}
              onDeleteMultiBtnClick={handleDeleteMulti}
              keyExpr={["CusID", "CarID"]}
              storeKey={"Ser_CustomerCar-columns"}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
