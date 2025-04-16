import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import SearchForm from "../SerCavity/search-form/search-form";
import { useRef } from "react";
import { Search_Ser_Cavity_Param } from "@/packages/types/master/Ser_Cavity";
import { DataGrid } from "devextreme-react";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { useI18n } from "@/i18n/useI18n";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useGridColumns } from "../SerCavity/components/use-columns";
import { useClientgateApi } from "@/packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import PopupFromGrid, { IAPI, IGroupColumnPopup, ITitlePopup } from "@/packages/components/popup/PopupFromGrid/PopupFromGrid";
import { useGetTime } from "@/packages/hooks/useGetTime";
import { useMstLocationDataSource } from "../SerCavity/datasource/useDataSource";
import { showDialog } from "@/packages/ui/dialogs/dialog-utils";
import { format } from "date-fns";
import ConfirmComponent from "@/packages/components/ConfirmComponent";


export const SerCavityPageDemo = () => {
  const popupRef = useRef<any>(null);
  const { isHTV } = usePermissions();
  const { t } = useI18n("Ser_Cavity");
  const { t: common } = useI18n("Common");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const { convertISO8601 } = useGetTime();
  const dataSourcePopup = useMstLocationDataSource();

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<Search_Ser_Cavity_Param>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    CavityNo: "",
    CavityName: "",
    CavityType: "",
    IsActive: "1",
    StatusUse: "",
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
    const resp = await match(isHTV)
      .with(true, async () => {
        const response = await api.Ser_Cavity_SearchHQ({
          // IsActive: FlagActiveEnum.Active,
          IsActive: searchCondition.current.IsActive,
          CavityName: searchCondition.current.CavityName,
          CavityNo: searchCondition.current.CavityNo,
          CavityType: searchCondition.current.CavityType,
          StatusUse: searchCondition.current.StatusUse,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
      
        
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_Cavity_SearchDL({
          // IsActive: FlagActiveEnum.Active,
          IsActive: searchCondition.current.IsActive,
          CavityName: searchCondition.current.CavityName,
          CavityNo: searchCondition.current.CavityNo,
          CavityType: searchCondition.current.CavityType,
          StatusUse: searchCondition.current.StatusUse,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });

        return response;
      });
    if (resp?.isSuccess) {
      // resp.DataList = resp.DataList?.sort((a, b) => {
      //   const dateA = new Date(a.CreatedDate);
      //   const dateB = new Date(b.CreatedDate);

      //   return dateB - dateA;
      // });

      return {
        ...resp,
        DataList: resp?.DataList?.map((item: any, index: any) => {
          return {
            ...item,
            _idx: index + 1,
          };
        }),
      };
    } else {
      showError({
        message: t(resp._strErrCode),
        _strErrCode: resp._strErrCode,
        _strTId: resp._strTId,
        _strAppTId: resp._strAppTId,
        _objTTime: resp._objTTime,
        _strType: resp._strType,
        _dicDebug: resp._dicDebug,
        _dicExcs: resp._dicExcs,
      });
    }
  };
  const columns = useGridColumns({ data: [], popupRef });
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
        CavityNo: formData.CavityNo,
        DealerCode: formData.DealerCode,
        CavityName: formData.CavityName,
        CavityType: formData.CavityType,
        Status: "1",
        Note: formData.Note,
        StartUseDate: formData.StartUseDate
          ? format(new Date(formData.StartUseDate), "yyyy-MM-dd")
          : "",
        FinishUseDate: formData.FinishUseDate
          ? format(new Date(formData.FinishUseDate), "yyyy-MM-dd")
          : "",
      };
      return api.Ser_Cavity_Create(param);
    },
    api_update: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find(
        (item: any) => item.CavityNo === formData.CavityNo
      );

      const param = {
        CavityID: d.CavityID,
        CavityNo: formData.CavityNo,
        DealerCode: formData.DealerCode,
        CavityName: formData.CavityName,
        CavityType: formData.CavityType,
        Status: "1",
        Note: formData.Note,
        StartUseDate: formData.StartUseDate
          ? format(new Date(formData.StartUseDate), "yyyy-MM-dd")
          : "",
        FinishUseDate: formData.FinishUseDate
          ? format(new Date(formData.FinishUseDate), "yyyy-MM-dd")
          : "",
      };
      return api.Ser_Cavity_Update(param);
    },
    api_delete: async (formData) => {
      const dataList = gridRef.current.getVisibleData();
      const d = dataList.find(
        (item: any) => item.CavityNo === formData.CavityNo
      );
      const param = {
        CavityID: d.CavityID,
        CavityNo: formData.CavityNo,
        DealerCode: formData.DealerCode,
        CavityName: formData.CavityName,
        CavityType: formData.CavityType,
        Status: formData.Status,
        Note: formData.Note,
        StartUseDate: formData.StartUseDate,
        FinishUseDate: formData.FinishUseDate,
      };
      return api.Ser_Cavity_Delete(param);
    },
  };
  const column_popup: IGroupColumnPopup[] = [
    {
      columns: [
        {
          dataField: "CavityNo",
          caption: t("CavityNo"),
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập mã khoang!",
          },
          editorOptions: {
            disabled: (data: any) => {
              return data?.Type == "detail";
            },
          },
        },
        {
          dataField: "CavityName",
          caption: t("CavityName"),
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập tên khoang!",
          },
        },
        {
          dataField: "CavityType",
          caption: t("CavityType"),
          editorType: "dxSelectBox",
          required: true,
          rules: {
            required: "Vui lòng chọn loại khoang!",
          },
          editorOptions: {
            displayExpr: (e: any) =>
              e?.CompartmentCode ? `${e?.CompartmentName}` : "",
            valueExpr: "CompartmentCode",
            searchEnabled: false,
          },
        },
      ],
    },
    {
      columns: [
        {
          dataField: "Note",
          caption: t("Note"),
          editorType: "dxTextBox",
          required: false,
          // rules: {
          //   required: "Vui lòng nhập mã khoang!",
          // },
        },
        {
          dataField: "StartUseDate",
          caption: t("StartUseDate"),
          editorType: "dxDateBox",
          required: true,
          rules: {
            required: "Vui lòng chọn ngày BĐ sử dụng!",
          },
          editorOptions: {
            type: "date",
            displayFormat: "yyyy-MM-dd",
          },
        },
        {
          dataField: "FinishUseDate",
          caption: t("FinishUseDate"),
          editorType: "dxDateBox",
          // required: true,
          // rules: {
          //   required: t("Vui lòng chọn ngày ngưng sử dụng!"),
          // },
          editorOptions: {
            type: "date",
            displayFormat: "yyyy-MM-dd",
          },
        },
      ],
    },
  ];
  const title_popup: ITitlePopup = {
    title_create: t("Tạo mới khoang sửa chữa"),
    title_detail: t("Chi tiết khoang sửa chữa"),
  };
  const handleDeleteRow = async (ids: string[]) => { };
  const handleDelete = async (e: any) => { };
  const handleDeleteMulti = async () => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current
          ?.getDxInstance()
          ?.getSelectedRowKeys();

        await handleDeleteRow(listChecked);
      },
      title: common("Confirm"),
      contentConfirm: common("Do you want to delete?"),
    });
  };
  const preSubmit = (formData: any) => {
    const {
      CavityName,
      CavityNo,
      FinishUseDate,
      CavityType,
      Note,
      StartUseDate,
      Status,
      DealerCode,
    } = formData;

    const finishUseDate: any = FinishUseDate ? new Date(FinishUseDate) : null;
    const startUseDate: any = formData.StartUseDate
      ? new Date(formData.StartUseDate)
      : null;

    if (
      finishUseDate &&
      convertISO8601(finishUseDate) < convertISO8601(startUseDate)
    ) {
      showDialog({
        title: "Thông báo",
        message: t(
          "Ngày bắt đầu sử dụng không được lớn hơn Ngày ngưng sử dụng!"
        ),
      });
      return false;
    }

    return true;
  };
  const onMountInitial = async () => {
    const listCavityType = await dataSourcePopup.getListCavityType();
    return { ListCavityType: listCavityType };
  };
  const handleDetail = (data: any) => {
    popupRef.current?.showPopup({
      type: "detail",
      data: data,
    });
  };
  
  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name="Header">
        <BreadcrumbSearch
          title="Quản lý khoang sửa chữa"
          showSearch={false}
          buttonOptions={{
            showButtonAdd: true,
            onClickButtonAdd: handleAdd,
          }}
        ></BreadcrumbSearch>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
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
              allowSelection={false}
              isHiddenCheckBox
              fetchData={fetchData}
              showSTT={true}
              autoFetchData={true}
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
              onRowDblClick={(e) => handleDetail(e.data)}
            />
            <PopupFromGrid
              ref={popupRef}
              onRefetchData={onRefetchData}
              api={api_popup}
              groupColumn={column_popup}
              title={title_popup}
              preSubmit={preSubmit}
              onMountInitial={onMountInitial}
              primaryKey={"CavityNo"}
              localeKey="Ser_Cavity"
              firstDefaultValue
              valueExpr={"CompartmentCode"}
            ></PopupFromGrid>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
}