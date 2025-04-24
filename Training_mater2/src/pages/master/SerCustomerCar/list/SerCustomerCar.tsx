import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import SearchForm from "../search-form/search-form";
import { useRef } from "react";
import { DataGrid } from "devextreme-react";
import { useGridColumns } from "../components/use-columns";
import {
  SearchSer_CustomerCarParam,
  Ser_CustomerCar,
} from "@/packages/types/master/Ser_CustomerCar";
import { ApiResponse } from "@/packages/types";
import { boolean } from "ts-pattern/dist/patterns";
import { useClientgateApi } from "@/packages/api";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useNetworkNavigate } from "@/packages/hooks";
import { Link } from "@/packages/components/link/link";

export const Ser_CustomerCarPage = () => {
  let gridRef: any = useRef<DataGrid | null>(null);
  const popupRef = useRef<any>(null);
  // const columns = useGridColumns({ data: [], popupRef });
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const setLoad = useSetAtom(loadPanelAtom);
  const navigate = useNetworkNavigate();

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
  const handleDetail =async (ev: any) => {
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
  const columns: any[] = [
    {
      dataField: "CusID", // Mã khách hàng
      caption: "Mã khách hàng", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true,
      cellRender: (e: any) => {
        return (
          <Link
            label={e.value}
            onClick={() => {
              handleDetail(e);
            }}
          />
        );
      },
    },
    {
      dataField: "CusName", // Tên khách hàng
      caption: "Tên khách hàng", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "PlateNo", // Biển số xe
      caption: "Biển số xe", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "FrameNo", // Số khung
      caption: "Số khung", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
   
    {
      dataField: "Address", // Địa chỉ
      caption: "Địa chỉ", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },


    {
      dataField: "DOB", // Ngày sinh
      caption: "Ngày sinh", // Tiêu đề cột
      editorType: "dxDateBox", // Loại editor là DateBox
      editorOptions: {
        placeholder: "Select Date", // Placeholder cho chọn ngày
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "Sex",
      caption: "Giới tính",
      cellRender: ({ value }: any) => {
        return <span>{value === true ? "Nam" : "Nữ"}</span>;
      },
      columnIndex: 1,
      groupKey: "CUSTOMER_INFORMATION",
      visible: true,
      allowEditing: false, // Không cho chỉnh sửa nếu muốn
    },
    {
      dataField: "TradeMarkCode", // Mã hiệu xe
      caption: "Mã hiệu xe", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "EngineNo", // Số máy
      caption: "Số máy", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "ProductYear", // Năm sản xuất
      caption: "Năm sản xuất", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "ColorCode", // Mã màu
      caption: "Mã màu", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "VEHICLE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "InsVieName", // Tên công ty bảo hiểm
      caption: "Tên công ty bảo hiểm", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "INSURANCE_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "Mobile", // Di động
      caption: "Di động", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "Tel", // Điện thoại
      caption: "Điện thoại", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "Email", // Email
      caption: "Email", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CUSTOMER_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "ContName", // Tên người liên hệ
      caption: "Tên người liên hệ", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CONTACT_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "ContTel", // Số di động người liên hệ
      caption: "Số di động người liên hệ", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "CONTACT_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
    {
      dataField: "MemberNo", // Mã hội viên
      caption: "Mã hội viên", // Tiêu đề cột
      editorOptions: {
        placeholder: "Input", // Placeholder cho input
      },
      columnIndex: 1, // Vị trí cột
      groupKey: "MEMBERSHIP_INFORMATION", // Nhóm cột
      visible: true, // Cột có hiển thị hay không
    },
  ];
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
              onRowDblClick={handleDetail}

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
  );
};
