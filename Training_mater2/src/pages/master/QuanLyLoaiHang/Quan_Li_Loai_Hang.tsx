import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import SearchForm from "../SerCavity/search-form/search-form";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useRef } from "react";
import { DataGrid } from "devextreme-react";

import { useDialog } from "@/packages/hooks/useDiaglog";
import { useClientgateApi } from "@/packages/api";
import { Search_Ser_MST_PartType } from "@/packages/types/master/Ser_MST_PartType";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useGridColumns } from "./components/use-columns";

export const Quan_ly_loai_hang = () => {
  let gridRef: any = useRef<DataGrid | null>(null);
  const popupRef = useRef<any>(null);
  const columns = useGridColumns({ data: [], popupRef });
  const { showDialog } = useDialog();
    const showError = useSetAtom(showErrorAtom);
  
  const api = useClientgateApi();
    const searchCondition = useRef<Partial<Search_Ser_MST_PartType>>({
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
      TypeName: "",
   
    });
  const fetchData = async () => {
    const resp = await api.Ser_MST_PartType_SearchDL({
      TypeName: searchCondition.current?.TypeName ?? "",
     
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
  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title="Quản lý loại hàng"
          showSearch={false}
     
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
              isHiddenCheckBox
              editingOptions={{
                mode: "row",
              }}
              keyExpr={"PartID"}
              storeKey={"Ser_MST_Part"}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
