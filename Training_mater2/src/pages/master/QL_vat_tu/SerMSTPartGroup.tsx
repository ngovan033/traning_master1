import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout"
import { showErrorAtom } from "@/packages/store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch"
import { LinkCell } from "@/packages/ui/link-cell";
import { ColumnOptions } from "@/types";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import PopupCustomerType from "../CustomerType/components/popup/PopupCustomerType";
import PopupPartGroup from "./popup/PopupPartGroup";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import { toast } from "react-toastify";
import { useDialog } from "@/packages/hooks/useDiaglog";



export const SerMSTPartGroup = () => {
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { t } = useI18n("Ser_MST_PartGroup");
  const popupRef = useRef();
  const config = useConfiguration();
  const gridRef: any = useRef(null);
  const { showDialog } = useDialog();
  const searchCondition = useRef<any>({
      
    
    ParentID: "",
    GroupCode: "",
    GroupName: "",
    IsActive: "1",
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS,
  });
  const fetchData = async () => {
    const resp = await api.SerMSTPartGroup_SearchDL({
      ParentID: searchCondition.current?.ParentID ?? "",
      GroupCode: searchCondition.current?.GroupCode ?? "",
      GroupName: searchCondition.current?.GroupName ?? "",
      // IsActive: searchCondition.current?.IsActive ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getPageSize(), // gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    console.log(resp);

    if (resp?.isSuccess) {
      return resp;
    } else {
      showError({
        message: t(resp!._strErrCode),
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

  const columns: ColumnOptions[] = [
    {
      dataField: "GroupCode",
      caption: "Mã loại vật tư",
      editorType: "dxTextBox",
      visible: true,

      cellRender: ({ data }) => {
        return (
          <LinkCell
            value={data.GroupCode}
            key={data.PartGroupID}
            onClick={() => handleDetail(data)}
          ></LinkCell>
        );
      },
    },
    {
      dataField: "GroupName",
      caption: "Tên loại vật tư",
      columnIndex: 1,
      visible: true,
      editorType: "dxNumberBox",
      dataType: "number",
      format: FORMAT_NUMBER.FLOAT_NUMBER_R2,
    },

  ];
  const handleSearch = (keyword: string) => {
    searchCondition.current.GroupName = keyword;
    gridRef?.current?.refetchData();
  };
  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };
  const handleDetail = (data) => {
    popupRef.current?.showPopup({
      type: "detail",
      data: data,
    });
    console.log(data);

  };
  const handleAdd = () => {
    popupRef.current?.showPopup({
      type: "create",
      data: {
        ParentID: "0",
        GroupName: "",
        GroupCode: "",
        // PartGroupID: "",
      },
    });
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
          return api.SerMSTPartGroup_Delete(item.PartGroupID);
        })
      ).then((responses) => {
        const allSuccess = responses.every((response) => response.isSuccess);
  
        if (allSuccess) {
          toast.success("Xóa thành công!");
        } else {
          const firstError = responses.find((response) => !response.isSuccess);
          showError({
            message: t(firstError!._strErrCode),
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
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <BreadcrumbSearch
          title="Quản lý vật tư"
          handleSearch={handleSearch}
          showSearch={true}
          buttonOptions={{
            showButtonAdd: true,
            onClickButtonAdd: handleAdd,
          }}
        ></BreadcrumbSearch>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <GridViewOne
          ref={gridRef}
          toolbarItems={[]}
          defaultPageSize={100}
          dataSource={[]}
          columns={columns}
          fetchData={fetchData}
          keyExpr={"PartGroupID"}
          autoFetchData={true}
          allowSelection={false}
          onRowDeleteBtnClick={handleDelete}
          storeKey={"ser-mst-partgroup-management-columns"}
          customToolbarItems={toolbarItems}
          editMode={false}
          onRowDblClick={(e) => handleDetail(e.data)}
          // hidePagination
        />
        <PopupPartGroup
          ref={popupRef}
          onRefetchData={onRefetchData}
        ></PopupPartGroup>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  )
}