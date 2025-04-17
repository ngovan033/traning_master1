import { AdminContentLayout } from "@/packages/layouts/admin-content-layout"
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout"
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch"
import SearchForm from "../search-form/search-form"
import { useRef } from "react"
import { DataGrid } from "devextreme-react"
import { useGridColumns } from "../components/use-columns"
import { SearchSer_CustomerCarParam, Ser_CustomerCar } from "@/packages/types/master/Ser_CustomerCar"
import { ApiResponse } from "@/packages/types"
import { boolean } from "ts-pattern/dist/patterns"
import { useClientgateApi } from "@/packages/api"
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one"

export const Ser_CustomerCarPage = () => {
  let gridRef: any = useRef<DataGrid | null>(null);
  const popupRef = useRef<any>(null);
  const columns = useGridColumns({ data: [], popupRef });
  const api = useClientgateApi();
  const searchCondition = useRef<Partial<SearchSer_CustomerCarParam>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    CusName: "",
    PlateNo: "",
    FrameNo: "",
    Tel: "",
    Address: "",
    IsActive: "1",
    

  });
  // const dataCondition = useRef<ApiResponse<Ser_CustomerCar>>({
  //   CusID: "",
  //   DOB: "",
  //   Sex: true,
  //   TradeMarkCode: "",
  //   EngineNo: "",
  //   ProductYear: "",
  //   ColorCode: "",
  //   InsVieName: "",
  //   Mobile: "",
  //   Tel: "",
  //   Email: "",
  //   ContName: "",
  //   ContMobile: "",
  //   MemberNo: "",
  // });
  const fetchData = async () => {
    const resp = await api.Ser_CustomerCar_SearchDL({
      CusName: searchCondition.current?.CusName ?? "",
      PlateNo: searchCondition.current?.PlateNo ?? "",
      FrameNo: searchCondition.current?.FrameNo ?? "",
      Tel: searchCondition.current?.Tel ?? "",
      Address: searchCondition.current?.Address ?? "",
      IsActive: searchCondition.current?.IsActive ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getPageSize(), // gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    console.log(resp);


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
          title="Quản lý thông tin khách hàng "
          showSearch={false}
          buttonOptions={{
            showButtonAdd: true,
            // onClickButtonAdd: handleAdd,
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
              isHiddenCheckBox
              fetchData={fetchData}
              showSTT={true}
              autoFetchData={true}
              allowSelection={false}
              customToolbarItems={[]}
              editMode={false}
              editingOptions={{
                mode: "row",
              }}
            // onPageChanged={(number) => onRefetchData(number ?? 0)}
            // onRowDeleteBtnClick={handleDelete}
            // onDeleteMultiBtnClick={handleDeleteMulti}
            keyExpr={"CavityNo"}
            storeKey={"Ser_Cavity"}
            // onRowDblClick={(e) => handleDetail(e.data)}
            />
            {/* <PopupFromGrid
              ref={popupRef}
              onRefetchData={onRefetchData}
              api={api_popup}
              groupColumn={column_popup}
              title={title_popup}
              preSubmit={preSubmit}
              primaryKey={"CavityNo"}
              localeKey="Ser_Cavity"
              onMountInitial={onMountInitial}
              firstDefaultValue
              valueExpr={"CompartmentCode"}
            ></PopupFromGrid> */}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  )
}