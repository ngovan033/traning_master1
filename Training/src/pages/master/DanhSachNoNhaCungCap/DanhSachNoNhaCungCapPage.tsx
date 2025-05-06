import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import { useMemo, useRef } from "react";
import SearchForm from "./search-form/search-form";
import { Search_SerSupplierDebitPayment } from "@/packages/types/master/DanhSachNoNhaCungCap";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { useClientgateApi } from "@/packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { LinkCell } from "@/packages/ui/link-cell";
import { nanoid } from "nanoid";
import { useNetworkNavigate } from "@/packages/hooks";
import { usePermissions } from "@/packages/contexts/permission";

export const DanhSachNoNhaCungCapPage = () => {
  const api = useClientgateApi();
  const { isHQ } = usePermissions();

  const { saveState, loadState } = useSavedState<
    Partial<Search_SerSupplierDebitPayment>
  >({
    storeKey: "SupplierPage-search-form",
  });
  const navigate = useNetworkNavigate();

  const showError = useSetAtom(showErrorAtom);
  const gridRef = useRef<any>(null);
  const searchCondition = useRef<Partial<Search_SerSupplierDebitPayment>>({
    Deb: true,
    FlagDataWH: false,
    IsDebit: 0,
  });

  const fetchData = async () => {
    const response = await api.QLDanhSachNoNCC_SearchDL({
      Deb: searchCondition.current?.Deb ?? "",
      FlagDataWH: searchCondition.current?.FlagDataWH ?? "",
      IsDebit: searchCondition.current?.IsDebit ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getPageSize(), // gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (response?.isSuccess) {
      return response;
    } else {
      showError({
        message: response._strErrCode,
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
  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };
  const handleSearch = async (condition: Partial<Search_SerSupplierDebitPayment>) => {
    searchCondition.current = {
      ...searchCondition.current,
      ...condition,
    };
    saveState(searchCondition.current);
    
    
    await onRefetchData();
  };

  const renderSearchForm = useMemo(() => {
    return (
      <SearchForm data={searchCondition.current} onSearch={handleSearch} />
    );
  }, [searchCondition.current]);
  const viewDetail = (SupplierID: string) => {
    const link = `/admin/Danhsachnonhacc/update/${SupplierID}`;
    navigate(link);
  };
  

  const columns = [
    {
      dataField: "SupplierCode",
      visible: true,
      caption: "Mã nhà cung cấp",
      width: 150,

      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewDetail(data.SupplierID)}
            value={value}
          />
        );
      },
    },
    {
      dataField: "SupplierName",
      visible: true,
      caption: "Tên nhà cung cấp",
      width: 150,
    },
    {
      dataField: "Address",
      visible: true,
      caption: "Địa chỉ",
      width: 200,
    },
    {
      dataField: "Deb",
      visible: true,
      caption: "Còn nợ",
      width: 180,
    },
  ];
  return (
    <AdminContentLayout className={""}>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title="Danh sách nợ nhà cùng cấp"
          showSearch={false}
        ></BreadcrumbSearch>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            {renderSearchForm}
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              autoFetchData={true}
              allowSelection={true}
              dataSource={[]}
              fetchData={fetchData}
              columns={columns}
              keyExpr={"SupplierID"}
              storeKey={"Supplier-managr-list"}
              isHiddenCheckBox
              // onRowDblClick={(e) => viewDetail(e.data.SupplierID)}
              // customToolbarItems={toolbarItems}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
