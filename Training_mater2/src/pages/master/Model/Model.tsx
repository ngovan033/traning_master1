import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import SearchForm from "./search-form/search-form";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useRef, useState } from "react";
import { DataGrid } from "devextreme-react";
import { useGridColumns } from "./components/use-columns";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useClientgateApi } from "@/packages/api";
import { Search_Ser_MST_Model } from "@/packages/types/master/Ser_MST_Model";
import PopupFromGrid, {
  IAPI,
  IGroupColumnPopup,
  ITitlePopup,
} from "@/packages/components/popup/PopupFromGrid/PopupFromGrid";
import { useMstModelDataSource } from "./datasource/useDataSource";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import { toast } from "react-toastify";
import { useDialog } from "@/packages/hooks/useDiaglog";

export const Quan_ly_Model = () => {
  let gridRef: any = useRef<DataGrid | null>(null);
  const popupRef = useRef<any>(null);
  const columns = useGridColumns({ data: [], popupRef });
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const dataMST_MstTradeMark = useMstModelDataSource();
  const { showDialog } = useDialog();
  const [isAsc, setIsAsc] = useState(true); // mặc định A-Z
  const searchCondition = useRef<Partial<Search_Ser_MST_Model>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    TradeMarkCode: "",
    ModelName: "",
  });

  const fetchData = async () => {
    const resp = await api.Ser_MST_Model_SearchDL({
      TradeMarkCode: searchCondition.current?.TradeMarkCode ?? "",
      ModelName: searchCondition.current?.ModelName ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getPageSize(), // gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (resp?.isSuccess) {
      return resp;
    } else {
      showError({
        message: resp!._strErrCode,
        _strErrCode: resp!._strErrCode,
        _strTId: resp!._strTId,
        _strAppTId: resp!._strAppTId,
        _objTTime: resp!._objTTime,
        _strType: resp!._strType,
        _dicDebug: resp!._dicDebug,
        _dicExcs: resp!._dicExcs,
      });
    }
  };
  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...searchCondition.current,
      ...data,
    };

    await onRefetchData();
  };
  const handleAdd = () => {
    popupRef.current?.showPopup({
      type: "create",
      data: null,
    });
  };
  const title_popup: ITitlePopup = {
    title_create: "Tạo mới Model",
    title_detail: "Chi tiết Model",
  };
  const api_popup: IAPI = {
    api_create: async (formData) => {
      const param = {
        TradeMarkCode: formData.TradeMarkCode,
        ModelCode: formData.ModelCode || "OTHER",
        ProductionCode: formData.ProductionCode,
        ModelName: formData.ModelName,
      };
      return api.Ser_MST_Model_Create(param);
    },
    api_update: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find((item: any) => item.ModelID === formData.ModelID);

      const param = {
        ModelID: d.ModelID,
        TradeMarkCode: formData.TradeMarkCode,
        ModelCode: formData.ModelCode,
        ProductionCode: formData.ProductionCode,
        ModelName: formData.ModelName,
      };
      return api.Ser_MST_Model_Update(param);
    },
    api_delete: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find((item: any) => item.ModelID === formData.ModelID);
      const param = {
        ModelID: formData.ModelID,
        TradeMarkCode: formData.TradeMarkCode,
        ModelCode: formData.ModelCode,
        ProductionCode: formData.ProductionCode,
        ModelName: formData.ModelName,
      };
      return api.Ser_MST_Model_Delete(param);
    },
  };
  const onMountInitial = async () => {
    const listMstTradeMart = await dataMST_MstTradeMark.getListMSTTradeMark();
    console.log("listMstTradeMart", listMstTradeMart);

    return {
      ListTradeMarkCode: listMstTradeMart,
    };
  };

  const column_popup: IGroupColumnPopup[] = [
    {
      columns: [
        {
          dataField: "TradeMarkCode",
          caption: "Mã hiệu xe",
          editorType: "dxSelectBox",
          required: true,
          rules: {
            required: "Vui lòng nhập mã hiệu xe!",
          },
          editorOptions: {
            disabled: (data: any) => {
              return data?.Type == "detail";
            },
            displayExpr: "TradeMarkName",
            valueExpr: "TradeMarkCode",

            searchEnabled: false,
          },
        },

        {
          dataField: "ModelCode",
          caption: "Mã model",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập mã model!",
          },
        },
        {
          dataField: "ProductionCode",
          caption: "Mã sản phẩm",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập mã sản phẩm!",
          },
        },
        {
          dataField: "ModelName",
          caption: "Tên mô tả xe",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập tên mô tả xe!",
          },
        },
      ],
    },
  ];
  const preSubmit = (formData: any) => {
    return true;
  };
  const handleDelete = async (listSelected: any[]) => {
    if (listSelected.length == 0) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng chọn dữ liệu để xóa!",
      });

      return;
    }

    await Promise.all(
      listSelected.map((item) => {
        return api.Ser_MST_CustomerType_Delete(item.CusTypeID);
      })
    ).then((responses) => {
      const allSuccess = responses.every((response) => response.isSuccess);

      if (allSuccess) {
        toast.success("Xóa thành công!");
      } else {
        const firstError = responses.find((response) => !response.isSuccess);
        showError({
          message: firstError!._strErrCode,
          _strErrCode: firstError!._strErrCode,
          _strTId: firstError!._strTId,
          _strAppTId: firstError!._strAppTId,
          _objTTime: firstError!._objTTime,
          _strType: firstError!._strType,
          _dicDebug: firstError!._dicDebug,
          _dicExcs: firstError!._dicExcs,
        });
      }
    });
    gridRef.current?.refetchData();
  };
  const toolbarItems: GridCustomerToolBarItem[] = [
    {
      text: "Xóa",
      onClick: async (e: any, ref: any) => {
        if (ref) {
          const selectedData =
            ref?.current?._instance?.getSelectedRowsData() ?? [];

          await handleDelete(selectedData);
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
    {
      text: "Sắp xếp",
      onClick: async (e: any, ref: any) => {
        if (ref) {
          const selectedData =
            ref?.current?._instance?.getSelectedRowsData() ?? [];
         console.log("selectedData", selectedData);
         
          await handleOrderBy(selectedData);
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
  ];
  const handleOrderBy = async (listSelected: any[]) => {
    if (listSelected.length === 0) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng chọn dữ liệu để sắp xếp!",
      });
      return;
    }
  
    const sortedList = [...listSelected].sort((a, b) => {
      const codeA = a.TradeMarkCode?.toUpperCase() ?? '';
      const codeB = b.TradeMarkCode?.toUpperCase() ?? '';
  
      return isAsc
        ? codeA.localeCompare(codeB) // A-Z
        : codeB.localeCompare(codeA); // Z-A
    });
  
    console.log("sortedList", sortedList);
  
   
    setIsAsc(!isAsc);
    await onRefetchData();
 
  };
  
  
  const handleDetail = (data: any) => {
    popupRef.current?.showPopup({
      type: "detail",
      data: data,
    });
  };
  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title="Quản lý Model"
          showSearch={false}
          buttonOptions={{
            showButtonAdd: true,
            onClickButtonAdd: handleAdd,
          }}
        ></BreadcrumbSearch>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout searchPermissionCode="">
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchForm
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              dataSource={[]}
              columns={columns}
              fetchData={fetchData}
              showSTT={true}
              autoFetchData={true}
              allowSelection={false}
              editMode={false}
              customToolbarItems={toolbarItems}
              editingOptions={{
                mode: "row",
              }}
              keyExpr={"ModelID"}
              storeKey={"Ser_MST_Model"}
              onRowDblClick={(e) => handleDetail(e.data)}
            />
            <PopupFromGrid
              ref={popupRef}
              onRefetchData={onRefetchData}
              api={api_popup}
              groupColumn={column_popup}
              title={title_popup}
              preSubmit={preSubmit}
              primaryKey={"ModelID"}
              localeKey="Ser_MST_Model"
              onMountInitial={onMountInitial}
              firstDefaultValue
              valueExpr={"ModelID"}
            ></PopupFromGrid>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
