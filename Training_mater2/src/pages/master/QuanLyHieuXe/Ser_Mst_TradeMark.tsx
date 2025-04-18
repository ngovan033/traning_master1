import { useClientgateApi } from "@/packages/api";
import { useGridColumns } from "./components/use-columns";
import { useRef } from "react";
import { DataGrid } from "devextreme-react";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";

import { Search_Ser_Mst_TradeMark } from "@/packages/types/master/Ser_Mst_TradeMark";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import SearchForm from "./search-form/search-form";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import PopupFromGrid, {
  IAPI,
  IGroupColumnPopup,
  ITitlePopup,
} from "@/packages/components/popup/PopupFromGrid/PopupFromGrid";
import { LinkCell } from "@/packages/ui/link-cell";

export const Ser_Mst_TradeMarkPage = () => {
  const popupRef = useRef<any>(null);
  const api = useClientgateApi();
  const columns = useGridColumns({ data: [], popupRef });
  let gridRef: any = useRef<DataGrid | null>(null);
  const showError = useSetAtom(showErrorAtom);
  const searchCondition = useRef<Partial<Search_Ser_Mst_TradeMark>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    TradeMarkCode: "",
    TradeMarkName: "",
    IsActive: "1",
    KeyWork: "",
  });
  const fetchData = async () => {
    const resp = await api.Ser_Mst_TradeMark_SearchDL({
      KeyWork: searchCondition.current?.KeyWork ?? "",
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
  const handleDetail = (data: any) => {
    popupRef.current?.showPopup({
      type: "detail",
      data: data,
    });
  };
  const title_popup: ITitlePopup = {
    title_create: "Tạo mới hiệu xe",
    title_detail: "Chi tiết hiệu xe",
  };
  const api_popup: IAPI = {
    api_create: async (formData) => {
      const param = {
        TradeMarkCode: formData.TradeMarkCode,
        TradeMarkName: formData.TradeMarkName,
      };
      return api.Ser_Mst_TradeMark_Create(param);
    },
    api_update: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find(
        (item: any) => item.TradeMarkCode === formData.TradeMarkCode
      );

      const param = {
        TradeMarkCode: formData.TradeMarkCode,
        TradeMarkName: formData.TradeMarkName,
      };
      return api.Ser_Mst_TradeMark_Update(param);
    },
    api_delete: async (formData) => {},
  };
  const handleAdd = () => {
    // localStorage.setItem("test", "12345");

    popupRef.current?.showPopup({
      type: "create",
      data: null,
    });
  };
  const column_popup: IGroupColumnPopup[] = [
    {
      columns: [
        {
          dataField: "TradeMarkCode",
          caption: "Mã hiệu xe",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập mã hiệu xe!",
          },
          editorOptions: {
            disabled: (data: any) => {
              return data?.Type == "detail";
            },
          },
        },
        {
          dataField: "TradeMarkName",
          caption: "Tên hiệu xe",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập tên hiệu xe!",
          },
        },
      ],
    },
  ];
  const preSubmit = (formData: any) => {
    return true;
  };

  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title="Quản lý hiệu xe"
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
              dataSource={[]} // cars
              columns={columns}
              fetchData={fetchData}
              showSTT={true}
              autoFetchData={true}
              allowSelection={false}
              editMode={false}
              editingOptions={{
                mode: "row",
              }}
              keyExpr={"TradeMarkCode"}
              storeKey={"Ser_Mst_TradeMark"}
              onRowDblClick={(e) => handleDetail(e.data)}
            />
            <PopupFromGrid
              ref={popupRef}
              onRefetchData={onRefetchData}
              api={api_popup}
              groupColumn={column_popup}
              title={title_popup}
              preSubmit={preSubmit}
              primaryKey={"TradeMarkCode"}
              firstDefaultValue
            ></PopupFromGrid>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
