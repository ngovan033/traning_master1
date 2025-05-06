import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import { usePermissions } from "@/packages/contexts/permission";
import { useConfiguration } from "@/packages/hooks";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { showErrorAtom } from "@/packages/store";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import { LinkCell } from "@/packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import PopupCustomerType from "./components/popup/PopupCustomerType";

export const CustomerTypePage = () => {
  const popupRef = useRef();

  const { t } = useI18n("Ser_MST_CustomerType");
  const config = useConfiguration();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { isHQ } = usePermissions();
  const gridRef: any = useRef(null);
  const { showDialog } = useDialog();

  const searchCondition = useRef<any>({
    CusTypeID: "",
    DealerCode: "",
    CusTypeName: "",
    IsActive: "1",
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS,
  });

  const columns: ColumnOptions[] = [
    {
      dataField: "CusTypeName",
      caption: t("LoaiKhachHang"),
      editorType: "dxTextBox",
      visible: true,

      cellRender: ({ data }) => {
        return (
          <LinkCell
            value={data.CusTypeName}
            key={data.CusTypeID}
            onClick={() => handleDetail(data)}
          ></LinkCell>
        );
      },
    },
    {
      dataField: "CusFactor",
      caption: t("HeSoGia"),
      columnIndex: 1,
      visible: true,
      editorType: "dxNumberBox",
      dataType: "number",
      format: FORMAT_NUMBER.FLOAT_NUMBER_R2,
    },
    {
      dataField: "CusPersonType",
      caption: t("KhachHang"),
      editorType: "dxSelectBox",
      customizeText: ({ value }: any) => {
        let name;
        switch (value) {
          case "1":
            name = "Cá nhân";
            break;
          case "2":
            name = "Tổ chức";
            break;
          default:
            name = "0"; // để giống trên winform
            break;
        }
        return name;
      },
    },
  ];

  const handleDetail = (data) => {
    popupRef.current?.showPopup({
      type: "detail",
      data: data,
    });
  };

  const fetchData = async () => {
    const resp = await api.Ser_MST_CustomerType_SearchDL({
      CusTypeID: searchCondition.current?.CusTypeID ?? "",
      DealerCode: searchCondition.current?.DealerCode ?? "",
      CusTypeName: searchCondition.current?.CusTypeName ?? "",
      IsActive: searchCondition.current?.IsActive ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getPageSize(), // gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
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

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };

  const onPageChanged = async (number: number) => {
    await onRefetchData(number);
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

  const handleAdd = () => {
    popupRef.current?.showPopup({
      type: "create",
      data: {
        CusPersonType: "1",
        CusTypeName: "",
        CusFactor: "",
        CusTypeID: "",
      },
    });
  };

  const handleSearch = (keyword: string) => {
    searchCondition.current.CusTypeName = keyword;
    gridRef?.current?.refetchData();
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <BreadcrumbSearch
          title="Quản lý loại khách hàng"
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
          dataSource={[]} // cars
          columns={columns}
          fetchData={fetchData}
          keyExpr={"CusTypeID"}
          autoFetchData={true}
          allowSelection={false}
          onRowDeleteBtnClick={handleDelete}
          storeKey={"ser-mst-customertype-management-columns"}
          customToolbarItems={toolbarItems}
          // onPageChanged={onPageChanged} // đang call 2 lần load api
          editMode={false}
          onRowDblClick={(e) => handleDetail(e.data)}
          // hidePagination
        />

        <PopupCustomerType
          ref={popupRef}
          onRefetchData={onRefetchData}
        ></PopupCustomerType>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
