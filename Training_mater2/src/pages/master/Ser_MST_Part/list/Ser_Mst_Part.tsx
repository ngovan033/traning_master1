import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import SearchForm from "../search-form/search-form";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import PopupFromGrid, {
  IAPI,
  IGroupColumnPopup,
  ITitlePopup,
} from "@/packages/components/popup/PopupFromGrid/PopupFromGrid";
import { DataGrid } from "devextreme-react";
import { useRef } from "react";
import { useGridColumns } from "../components/use-columns";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { Search_Ser_MST_Part } from "@/packages/types/master/Ser_MST_Part";
import { useClientgateApi } from "@/packages/api";
import { number } from "ts-pattern/dist/patterns";
import { useMstLocationDataSource } from "../datasource/useDataSource";
import { useQuery } from "@tanstack/react-query";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import { toast } from "react-toastify";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { SelectField } from "@/packages/components/select-field";
import form from "devextreme-react/form";

export const Ser_Mst_PartPage = () => {
  let gridRef: any = useRef<DataGrid | null>(null);
  const popupRef = useRef<any>(null);
  const columns = useGridColumns({ data: [], popupRef });
  const dataMST_PartType = useMstLocationDataSource();
  const dataMST_PartGroup = useMstLocationDataSource();
  const { showDialog } = useDialog();

  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const searchCondition = useRef<Partial<Search_Ser_MST_Part>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    PartCode: "",
    VieName: "",
    FreqUsed: "",
    PartGroupID: "",
    IsActive: "1",
  });
  const { data: getMSTPartGroup, isLoading: isGettingListInsuranceCode } =
    useQuery({
      queryKey: ["getMSTPartGroup"],
      queryFn: async () => {
        const response = await api.Ser_MST_PartGroup_GetAllActive();
        if (response.isSuccess) {
          return [...(response.DataList as any)];
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
      },
    });
  const { data: getMSTPartType } = useQuery({
    queryKey: ["getMSTPartType"],
    queryFn: async () => {
      const response = await api.Ser_MST_PartType_GetAllActive();
      if (response.isSuccess) {
        return [
          // {
          //   CompartmentCode: "",
          //   CompartmentName: "Tất cả",
          // },
          ...(response.DataList as any),
        ];
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
    },
  });
  const fetchData = async () => {
    const resp = await api.Ser_MST_Part_SearchDL({
      PartCode: searchCondition.current?.PartCode ?? "",
      VieName: searchCondition.current?.VieName ?? "",
      PartGroupID: searchCondition.current?.PartGroupID ?? "",
      IsActive: searchCondition.current?.IsActive ?? "",
      FreqUsed: searchCondition.current?.FreqUsed ?? "",
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
    title_create: "Tạo mới phụ tùng",
    title_detail: "Chi tiết phụ tùng",
  };
  const preSubmit = (formData: any) => {
    return true;
  };
  const onMountInitial = async () => {
    const listSerMSTPartGroup = await dataMST_PartGroup.getListMSTPartGroup();
    const listSerMSTPartType = await dataMST_PartType.getListMSTPartType();
    return {
      ListPartGroupID: listSerMSTPartGroup,
      ListPartTypeID: listSerMSTPartType,
    };
  };

  const column_popup: IGroupColumnPopup[] = [
    // tại sao lại phải tách thành mảng 2 item?
    {
      columns: [
        {
          dataField: "PartGroupID",
          caption: "Loại vật tư",
          editorType: "dxSelectBox",
          required: true,
          rules: {
            required: "Vui lòng chọn loại vật tư!",
          },
          editorOptions: {
            displayExpr: "GroupName",
            valueExpr: "PartGroupID",
            searchEnabled: false,
          },
        },

        {
          dataField: "PartTypeID",
          caption: "Loại hàng",
          editorType: "dxSelectBox",
          required: true,
          rules: {
            required: "Vui lòng chọn loại hàng!",
          },
          editorOptions: {
            displayExpr: "TypeName",
            valueExpr: "PartTypeID",
            searchEnabled: false,
          },
        },

        {
          dataField: "PartCode",
          caption: "Mã phụ tùng",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập mã phụ tùng!",
          },
          editorOptions: {
            disabled: (data: any) => {
              return data?.Type == "detail";
            },
          },
        },
        {
          dataField: "VieName",
          caption: "Tên phụ tùng",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập tên phụ tùng!",
          },
        },
        {
          dataField: "EngName",
          caption: "Tên tiếng anh",
          editorType: "dxTextBox",
          required: false,
          rules: {
            // required: "Vui lòng nhập tên tiếng anh!",
          },
        },
      ],
    },
    {
      columns: [
        {
          dataField: "Cost",
          caption: "Giá nhập",
          editorType: "dxNumberBox",
          required: true,
          rules: {
            required: "Vui lòng nhập giá nhập!",
            min: {
              value: 0,
              message: "Giá nhập phải >= 0",
            },
          },
          editorOptions: {
            type: "number",
          },
        },
        {
          dataField: "PriceEffect",
          caption: "Giá bán",
          editorType: "dxNumberBox",
          required: true,
          rules: {
            required: "Vui lòng nhập giá bán!",
            min: {
              value: 0,
              message: "Giá bán phải >= 0",
            },
          },
          editorOptions: {
            disabled: (data: any) => {
              return data?.Type == "detail";
            },
            type: "number",
          },
        },
        {
          dataField: "VAT",
          caption: "VAT",
          editorType: "dxNumberBox",
          required: true,
          rules: {
            required: "Vui lòng nhập VAT!",
            min: {
              value: 0,
              message: "VAT phải >= 0",
            },
            max: {
              value: 100,
              message: "VAT phải <= 100",
            },
          },
          editorOptions: {
            disabled: (data: any) => {
              return data?.Type == "detail";
            },
            type: "number",
          },
        },
        {
          dataField: "Unit",
          caption: "Đơn vị",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập đơn vị!",
          },
        },
        {
          dataField: "Location",
          caption: "Vị trí",
          editorType: "dxTextBox",
          required: false,
          rules: {
            // required: "Vui lòng nhập vị trí!",
          },
        },
      ],
    },
    {
      columns: [
        {
          dataField: "MinQuantity",
          caption: "Số lượng tối thiểu",
          editorType: "dxNumberBox",
          required: false,
          rules: {
            required: "Vui lòng nhập số lượng tối thiểu!",
            min: {
              value: 0,
              message: "Số lượng tối thiểu phải >= 0",
            },
          },
          editorOptions: {
            type: "number",
          },
          defaultValue: 0,
        },
        {
          dataField: "Model",
          caption: "Model",
          editorType: "dxTextBox",
          required: false,
          rules: {
            // required: "Vui lòng nhập Model!",
          },
        },
        {
          dataField: "Note",
          caption: "Ghi chú",
          editorType: "dxTextBox",
          required: false,
          rules: {
            // required: "Vui lòng nhập ghi chú!",
          },
        },

        {
          dataField: "FreqUsed",
          caption: "Tình trạng sử dụng",
          editorType: "dxCheckBox",
          required: false,
          rules: {},
          editorOptions: {
            labelPosion: "left",
          },
        },
      ],
    },
  ];
  const handleAdd = () => {
    // localStorage.setItem("test", "12345");

    popupRef.current?.showPopup({
      type: "create",
      data: null,
    });
  };
  const api_popup: IAPI = {
    api_create: async (formData) => {
      const param = {
        PartGroupID: formData.PartGroupID,
        PartTypeID: formData.PartTypeID,
        PartCode: formData.PartCode,
        VieName: formData.VieName,
        EngName: formData.EngName? formData.EngName: "",
        Cost: formData.Cost,
        Price: formData.PriceEffect,
        VAT: formData.VAT,
        Unit: formData.Unit,
        Location: formData.Location? formData.Location: "",
        Quantity: 0,
        MinQuantity: formData.MinQuantity,
        Model: formData.Model? formData.Model: "",
        Note: formData.Note? formData.Note: "",
        FreqUsed: formData.FreqUsed? "1" : 0,
      };
      return api.Ser_MST_Part_Create(param);
    },
    api_update: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find(
        (item: any) => item.PartCode === formData.PartCode
      );

      const param = {
        PartID: d.PartID,
        PartGroupID: formData.PartGroupID,
        PartTypeID: formData.PartTypeID,
        PartCode: formData.PartCode,
        VieName: formData.VieName,
        EngName: formData.EngName? formData.EngName : "",
        Cost: formData.Cost,
        Price: formData.PriceEffect,
        VAT: formData.VAT,
        Unit: formData.Unit,
        Location: formData.Location? formData.Location: "",
        Quantity: 0,
        MinQuantity: formData.MinQuantity,
        Model: formData.Model? formData.Model: "",
        Note: formData.Note? formData.Note: "",
        FreqUsed: formData.FreqUsed? "1" : 0,
      };
      return api.Ser_MST_Part_Update(param);
    },
    api_delete: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find(
        (item: any) => item.PartCode === formData.PartCode
      );
      const param = {
        PartID: d.PartID,
      };
      return api.Ser_MST_Part_Delete(param);
    },
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
        return api.Ser_MST_Part_Delete(item.PartID);
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
  ];
  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title="Quản lý danh sách phụ tùng"
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
              customToolbarItems={toolbarItems}
              fetchData={fetchData}
              showSTT={true}
              autoFetchData={true}
              allowSelection={false}
              editMode={false}
              editingOptions={{
                mode: "row",
              }}
              toolbarItems={[]}
              // onPageChanged={(number) => onRefetchData(number ?? 0)}
              onRowDeleteBtnClick={handleDelete}
              // onDeleteMultiBtnClick={handleDeleteMulti}
              keyExpr={"PartID"}
              storeKey={"Ser_MST_Part"}
              onRowDblClick={(e) => handleDetail(e.data)}
            />
            <PopupFromGrid
              ref={popupRef}
              onRefetchData={onRefetchData}
              api={api_popup}
              groupColumn={column_popup}
              title={title_popup}
              preSubmit={preSubmit}
              primaryKey={"PartCode"}
              localeKey="Ser_MST_Part"
              onMountInitial={onMountInitial}
              firstDefaultValue
              valueExpr={"PartCode"}
            ></PopupFromGrid>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
