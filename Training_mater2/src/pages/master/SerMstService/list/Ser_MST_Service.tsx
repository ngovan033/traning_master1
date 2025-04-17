import { AdminContentLayout } from "@/packages/layouts/admin-content-layout"
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout"
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch"
import SearchForm from "../search-form/search-form"
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one"
import { useRef } from "react"
import { DataGrid } from "devextreme-react"
import { Search_Ser_MST_Service } from "@/packages/types/master/Ser_MST_Service"
import { useClientgateApi } from "@/packages/api"
import { useGridColumns } from "../components/use-columns"
import { useSetAtom } from "jotai"
import { showErrorAtom } from "@/packages/store"
import PopupFromGrid, { IAPI, IGroupColumnPopup, ITitlePopup } from "@/packages/components/popup/PopupFromGrid/PopupFromGrid"
import { format } from "date-fns"
import ConfirmComponent from "@/packages/components/ConfirmComponent"

export const Ser_MST_ServicePage = () => {
  let gridRef: any = useRef<DataGrid | null>(null);
  const popupRef = useRef<any>(null);

  const showError = useSetAtom(showErrorAtom);

  const api = useClientgateApi();
  const columns = useGridColumns({ data: [], popupRef });
  const searchCondition = useRef<Partial<Search_Ser_MST_Service>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    SerCode: "",
    SerName: "",
    StdManHour: "", //Giờ định mức
    Model: "",
    Cost: "",
    Price: "",
    VAT: "",
    Note: "",
    FlagWarranty: "", //Cờ công việc bảo hành

    IsActive: "1",

  });


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
  const fetchData = async () => {
    const resp = await api.Ser_MST_Service_SearchDL({
      SerCode: searchCondition.current?.SerCode ?? "",
      SerName: searchCondition.current?.SerName ?? "",
      StdManHour: searchCondition.current?.StdManHour ?? "",
      Model: searchCondition.current?.Model ?? "",
      Cost: searchCondition.current?.Cost ?? "",
      Price: searchCondition.current?.Price ?? "",
      VAT: searchCondition.current?.VAT ?? "",
      Note: searchCondition.current?.Note ?? "",
      FlagWarranty: searchCondition.current?.FlagWarranty ?? "",

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
  const handleAdd = () => {

    popupRef.current?.showPopup({
      type: "create",
      data: null,
    });
  };

  const api_popup: IAPI = {
    api_create: async (formData) => {
      const param = {
        SerCode: formData.SerCode,
        SerName: formData.SerName,
        StdManHour: formData.StdManHour , 
        Cost: formData.Cost ,
        Price: formData.Price ,
        VAT: formData.VAT ,
        Note: formData.Note ,
        Model: formData.Model ,
        SerID: formData.SerID , 
        SerTypeID: 1, 
      };
      return api.Ser_MST_Service_Create(param);
    },

    api_update: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find(
        (item: any) => item.SerID === formData.SerID
      );
    console.log(d);
    
      const param = {
        SerCode: formData.SerCode,
        SerName: formData.SerName,
        StdManHour: formData.StdManHour || 0, // Mặc định 0 nếu không nhập
        Cost: formData.Cost || 0,
        Price: formData.Price || 0,
        VAT: formData.VAT || 0,
        Note: formData.Note || "",
        Model: formData.Model || "",
        SerID: d.SerID , // Truyền nếu có, tránh lỗi undefined
        SerTypeID: 1, // Mặc định là 1
      };
      return api.Ser_MST_Service_Update(param);
    },
    api_delete: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find(
        (item: any) => item.SerID === formData.SerID
      );
      const param = {
        SerCode: formData.SerCode,
        SerName: formData.SerName,
        StdManHour: formData.StdManHour || 0, 
        Cost: formData.Cost || 0,
        Price: formData.Price || 0,
        VAT: formData.VAT || 0,
        Note: formData.Note || "",
        Model: formData.Model || "",
        SerID: d.SerID , 
        SerTypeID: 1,
      };
      return api.Ser_MST_Service_Delete(param);
    },
  };
  const title_popup: ITitlePopup = {
    title_create: "Tạo mới công việc",
    title_detail: "Chi tiết công việc",
  };

  const column_popup: IGroupColumnPopup[] = [
    {
      columns: [
        {
          dataField: "SerCode",
          caption: "Mã công việc",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập mã công việc!",
          },
          editorOptions: {
            disabled: (data: any) => data?.Type === "detail",
          },
        },
        {
          dataField: "SerName",
          caption: "Tên công việc",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập tên công việc!",
          },
        },
        {
          dataField: "StdManHour",
          caption: "Giờ định mức",
          editorType: "dxNumberBox",
          required: true,
          rules: {
            required: "Vui lòng nhập giờ định mức!",
          },
        
        },
        {
          dataField: "Cost",
          caption: "Giá định mức",
          editorType: "dxNumberBox",
          required: true,
          rules: {
            required: "Vui lòng nhập giá định mức!",
          },
          
        },
      ],
    },
    {
      columns: [
        {
          dataField: "Price",
          caption: "Giá bán",
          editorType: "dxNumberBox",
          required: true,
          rules: {
            required: "Vui lòng nhập giá bán!",
          },
          
        },
        {
          dataField: "VAT",
          caption: "VAT",
          editorType: "dxNumberBox",
          required: false,
          rules: {
            required: "Vui lòng nhập VAT!",
          },
          editorOptions: {
           
            format: "#0.## '%'", // hiển thị phần trăm
          },
        },
        {
          dataField: "Model",
          caption: "Model",
        
          editorType: "dxTextBox",
          required: false,
        },
        {
          dataField: "Note",
          caption: "Ghi chú",
          editorType: "dxTextBox",
          required: false,
        },
      ],
    },
    // {
    //   columns: [
    //     {
    //       dataField: "SerID",
    //       caption: "SerID",
    //       visible: false,
    //       editorType: "dxTextBox",
    //       editorOptions: {
    //         disabled: true,
    //       },
    //     },
    //     {
    //       dataField: "SerTypeID",
    //       caption: "SerTypeID",
    //       visible: false,
    //       editorType: "dxTextBox",
    //       editorOptions: {
    //         value: 1,
    //         disabled: true,
    //       },
    //     },
    //   ],
    // },
  ];


  const preSubmit = (formData: any) => {

    return true;
  };

  const onMountInitial = async () => {

  };
  const handleDeleteRow = async (ids: string[]) => { };
  const handleDeleteMulti = async () => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current
          ?.getDxInstance()
          ?.getSelectedRowKeys();

        await handleDeleteRow(listChecked);
      },
      title:"Confirm",
      contentConfirm: "Do you want to delete?",
    });
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
          title="Quản lý danh sách công việc"
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
              onPageChanged={(number) => onRefetchData(number ?? 0)}
             
              onDeleteMultiBtnClick={handleDeleteMulti}
              keyExpr={"CavityNo"}
              storeKey={"Ser_MST_Service"}
            onRowDblClick={(e) => handleDetail(e.data)}
            />
            <PopupFromGrid
              ref={popupRef}
              onRefetchData={onRefetchData}
              api={api_popup}
              groupColumn={column_popup}
              title={title_popup}
              preSubmit={preSubmit}
              primaryKey={"SerID"}
              localeKey="Ser_MST_Service"
              // onMountInitial={onMountInitial}
              firstDefaultValue
              valueExpr={"CompartmentCode"}
            ></PopupFromGrid>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  )
}