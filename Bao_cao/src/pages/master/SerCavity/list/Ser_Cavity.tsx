import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import PopupFromGrid, {
  IAPI,
  IGroupColumnPopup,
  ITitlePopup,
} from "@/packages/components/popup/PopupFromGrid/PopupFromGrid";
import { usePermissions } from "@/packages/contexts/permission";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import {
  Search_Ser_Cavity_Param,
  Ser_Cavity,
} from "@/packages/types/master/Ser_Cavity";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@layouts/content-searchpanel-layout";
import { useClientgateApi } from "@packages/api";
import { useConfiguration } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";
import { format } from "date-fns";
import { DataGrid } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { useGridColumns } from "../components/use-columns";
import { useMstLocationDataSource } from "../datasource/useDataSource";
import { useGetTime } from "./../../../../packages/hooks/useGetTime";

import { useDialog } from "@/packages/hooks/useDiaglog";
import SearchForm from "../search-form/search-form";

export const Ser_CavityPage = () => {
  const { t } = useI18n("Ser_Cavity");
  const { t: common } = useI18n("Common");
  const setLoad = useSetAtom(loadPanelAtom);
  const popupRef = useRef<any>(null);
  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const { showDialog } = useDialog();
  const { isHTV } = usePermissions();

  const showError = useSetAtom(showErrorAtom);
  const dataSourcePopup = useMstLocationDataSource();

  const searchCondition = useRef<Partial<Search_Ser_Cavity_Param>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    CavityNo: "",
    CavityName: "",
    CavityType: "",
    IsActive: "1",
    StatusUse: "",
  });

  const api = useClientgateApi();

  const columns = useGridColumns({ data: [], popupRef });

  const handleAddNew = () => {
    // usePopupRef.current.showPopup({}, "Add");
  };

  const onModify = async (data: Ser_Cavity) => {
    const {
      CavityName,
      CavityNo,
      FinishUseDate,
      CavityType,
      Note,
      StartUseDate,
      Status,
      DealerCode,
    } = data;
    const finishUseDate: any = FinishUseDate ? new Date(FinishUseDate) : null;
    const startUseDate: any = data.StartUseDate
      ? new Date(data.StartUseDate)
      : null;

    if (finishUseDate && finishUseDate < startUseDate) {
      toast.error(
        "Ngày bắt đầu sử dụng không được lớn hơn Ngày ngưng sử dụng!"
      );
      return;
    }
    setLoad(true);
    const updData = {
      CavityID: data.CavityID,
      CavityName: CavityName,
      CavityNo: CavityNo,
      CavityType: CavityType,
      Note: Note,
      StartUseDate: format(new Date(StartUseDate), "yyyy-MM-dd"),
      FinishUseDate: FinishUseDate
        ? format(new Date(FinishUseDate), "yyyy-MM-dd")
        : null,
      IsActive: 1,
      Status: Status,
      DealerCode: DealerCode,
    };

    const response = await api.Ser_Cavity_Update(updData);
    if (response?.isSuccess) {
      toast.success(t("Update successfully!"));

      setLoad(false);
    } else {
      setLoad(false);
      showError({
        message: t(response!._strErrCode),
        _strErrCode: response!._strErrCode,
        _strTId: response!._strTId,
        _strAppTId: response!._strAppTId,
        _objTTime: response!._objTTime,
        _strType: response!._strType,
        _dicDebug: response!._dicDebug,
        _dicExcs: response!._dicExcs,
      });
    }
  };

  // Section: CRUD operations
  const onCreate = async (data: Ser_Cavity) => {
    const {
      CavityName,
      CavityNo,
      FinishUseDate,
      CavityType,
      Note,
      StartUseDate,
      Status,
      DealerCode,
    } = data;

    const finishUseDate: any = FinishUseDate ? new Date(FinishUseDate) : null;
    const startUseDate: any = data.StartUseDate
      ? new Date(data.StartUseDate)
      : null;

    if (finishUseDate && finishUseDate < startUseDate) {
      toast.error(
        "Ngày bắt đầu sử dụng không được lớn hơn Ngày ngưng sử dụng!"
      );
      return;
    }
    setLoad(true);
    const createData = {
      CavityID: "",
      CavityName: CavityName,
      CavityNo: CavityNo,
      CavityType: CavityType,
      Note: Note,
      StartUseDate: format(new Date(StartUseDate), "yyyy-MM-dd"),
      FinishUseDate: FinishUseDate
        ? format(new Date(FinishUseDate), "yyyy-MM-dd")
        : null,
      IsActive: 1,
      Status: Status,
      DealerCode: DealerCode,
    };

    const response = await api.Ser_Cavity_Create(createData);
    if (response?.isSuccess) {
      setLoad(false);
      toast.success(t("Create successfully!"));
      gridRef.current?.refetchData();
    } else {
      setLoad(false);
      showError({
        message: t(response!._strErrCode),
        _strErrCode: response!._strErrCode,
        _strTId: response!._strTId,
        _strAppTId: response!._strAppTId,
        _objTTime: response!._objTTime,
        _strType: response!._strType,
        _dicDebug: response!._dicDebug,
        _dicExcs: response!._dicExcs,
      });
    }
  };

  // End Section: CRUD operations
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

  const handleDeleteRow = async (ids: string[]) => {};

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

  const handleDelete = async (e: any) => {};

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
  const { convertISO8601 } = useGetTime();

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
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title="Quản lý khoang sửa chữa"
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
              // onPageChanged={(number) => onRefetchData(number ?? 0)}
              onRowDeleteBtnClick={handleDelete}
              onDeleteMultiBtnClick={handleDeleteMulti}
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
              primaryKey={"CavityNo"}
              localeKey="Ser_Cavity"
              onMountInitial={onMountInitial}
              firstDefaultValue
              valueExpr={"CompartmentCode"}
            ></PopupFromGrid>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
