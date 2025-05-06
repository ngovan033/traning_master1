import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { formatDate } from "@/packages/common/date_utils";
import { usePermissions } from "@/packages/contexts/permission";
import { useNetworkNavigate } from "@/packages/hooks";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { Search_SerApp_Param } from "@/packages/types/caradmin/SerApp";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import { LinkCell } from "@/packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useEffect, useMemo, useRef } from "react";
import { useNavigationType } from "react-router-dom";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { useSerAppLocale } from "./components/locale/useSerAppLocale";
import SearchForm from "./search-form/search-form";

export const DanhSachCuocHenPage = () => {
  const { isHQ } = usePermissions();
  const gridRef = useRef<any>(null);
  const { t } = useI18n("SerApp");
  const showError = useSetAtom(showErrorAtom);
  const navigate = useNetworkNavigate();
  const api = useClientgateApi();
  const setLoading = useSetAtom(loadPanelAtom);

  const { locale } = useSerAppLocale();
  const { commonLocale } = useCommonLocale();

  const firstDateOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const currentDate = new Date();

  const searchCondition = useRef<Partial<Search_SerApp_Param>>({
    AppDateTimeFromTo: [firstDateOfMonth, currentDate],
    AppDateTimeFrom: formatDate(firstDateOfMonth),
    AppDateTimeTo: formatDate(currentDate),
    PlateNo: "",
    DealerCode: "",
    CusName: "",
    Creator: "",
    FlagMoiTao: false,
    FlagXacNhan: true,
    FlagTiepNhan: false,
    FlagDaLienHe: false,
    FlagHuy: false,
    FlagWH: false,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const navigateType = useNavigationType();

  const { saveState, loadState } = useSavedState<Partial<Search_SerApp_Param>>({
    storeKey: "SerAppPage-search-form",
  });

  useEffect(() => {
    if (navigateType == "REPLACE") {
      const state = loadState();

      if (state) {
        searchCondition.current = state;
        const fromTime = state.AppDateTimeFrom;
        const toTime = state.AppDateTimeTo;

        searchCondition.current.AppDateTimeFromTo = [
          fromTime ? new Date(fromTime) : null,
          toTime ? new Date(toTime) : null,
        ];
      }
    }
  }, []);

  const handleSearch = (condition: Partial<Search_SerApp_Param>) => {
    if (condition.AppDateTimeFromTo) {
      condition.AppDateTimeFrom = condition.AppDateTimeFromTo[0]
        ? formatDate(condition.AppDateTimeFromTo[0])
        : undefined;
      condition.AppDateTimeTo = condition.AppDateTimeFromTo[1]
        ? formatDate(condition.AppDateTimeFromTo[1])
        : undefined;
    }

    searchCondition.current = {
      ...searchCondition.current,
      ...condition,
    };

    saveState(searchCondition.current);

    gridRef?.current?.refetchData();
  };

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        if (!searchCondition.current.DealerCode) {
          return {
            PageIndex: 0,
            PageSize: 200,
            PageCount: 0,
            ItemCount: 0,
            DataList: [],
            isSuccess: true,
          };
        }

        const param = {
          ...searchCondition.current,
          AppDateTimeFrom: searchCondition.current.AppDateTimeFrom,
          AppDateTimeTo: searchCondition.current.AppDateTimeTo,
          FlagMoiTao: searchCondition.current.FlagMoiTao ? 1 : 0,
          FlagXacNhan: searchCondition.current.FlagXacNhan ? 1 : 0,
          FlagDaLienHe: searchCondition.current.FlagDaLienHe ? 1 : 0,
          FlagTiepNhan: searchCondition.current.FlagTiepNhan ? 1 : 0,
          FlagHuy: searchCondition.current.FlagHuy ? 1 : 0,
          FlagWH: searchCondition.current.FlagWH ? 1 : 0,
          Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef.current?.getDxInstance().pageSize() ?? 100,
        };

        delete param.AppDateTimeFromTo;

        const response = await api.SerApp_SearchHQ(param);

        const pageIndex = response.PageIndex ?? 0;
        const pageSize = response.PageSize ?? 0;

        const newDataList =
          response.DataList.map((service, index) => {
            return {
              ...service,
              STT: pageIndex * pageSize + index + 1,
            };
          }).sort((a, b) => a.STT - b.STT) ?? [];

        response.DataList = newDataList;

        return response;
      })
      .otherwise(async () => {
        const param = {
          ...searchCondition.current,
          AppDateTimeFrom: searchCondition.current.AppDateTimeFrom,
          AppDateTimeTo: searchCondition.current.AppDateTimeTo,
          FlagMoiTao: searchCondition.current.FlagMoiTao ? 1 : 0,
          FlagXacNhan: searchCondition.current.FlagXacNhan ? 1 : 0,
          FlagDaLienHe: searchCondition.current.FlagDaLienHe ? 1 : 0,
          FlagTiepNhan: searchCondition.current.FlagTiepNhan ? 1 : 0,
          FlagHuy: searchCondition.current.FlagHuy ? 1 : 0,
          FlagWH: searchCondition.current.FlagWH ? 1 : 0,
          Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef.current?.getDxInstance().pageSize() ?? 100,
        };

        delete param.AppDateTimeFromTo;

        const response = await api.SerApp_SearchDL(param);

        const pageIndex = response.PageIndex ?? 0;
        const pageSize = response.PageSize ?? 0;

        const newDataList =
          response.DataList.map((service, index) => {
            return {
              ...service,
              STT: pageIndex * pageSize + index + 1,
            };
          }).sort((a, b) => a.STT - b.STT) ?? [];

        response.DataList = newDataList;

        return response;
      });
    if (resp?.isSuccess) {
      return resp;
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

  const viewDetail = (AppId: string) => {
    const link = isHQ()
      ? `/admin/ThongTinCuocHenNPP/update/${AppId}`
      : `/admin/ThongTinCuocHenDL/update/${AppId}`;

    navigate(link);
  };

  const columns = [
    {
      dataField: "AppNo",
      visible: true,
      caption: locale.AppNo,
      width: 150,

      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewDetail(data.AppId)}
            value={value}
          />
        );
      },
    },
    {
      dataField: "ReceptionFNo",
      visible: true,
      caption: locale.ReceptionFNo,
      width: 150,
    },
    {
      dataField: "PlateNo",
      visible: true,
      caption: locale.PlateNo,
      width: 200,
    },
    {
      dataField: "CusName",
      visible: true,
      caption: "Tên khách hàng",
      width: 180,
    },
    {
      dataField: "CusTel",
      visible: true,
      caption: locale.CusTel,
      width: 150,
    },
    {
      dataField: "TrademarkNameModel",
      visible: true,
      caption: "Hãng - Model",
      width: 200,
    },
    {
      dataField: "UserName",
      visible: true,
      caption: "Người tạo",
      width: 200,
    },
    {
      dataField: "Source",
      visible: true,
      caption: locale.Source,
      width: 100,
    },
    {
      dataField: "EngineerName",
      visible: true,
      caption: "CVDV tiếp nhận",
      width: 200,
    },
    {
      dataField: "CavityName",
      visible: true,
      caption: locale.CavityName,
      width: 200,
    },
    {
      dataField: "AppDateTimeFrom",
      visible: true,
      caption: "Ngày hẹn",
      width: 150,
    },
    {
      dataField: "AppTimeFrom",
      visible: true,
      caption: "Giờ hẹn",
      width: 100,
    },
    {
      dataField: "NewAppStatus",
      visible: true,
      caption: locale.NewAppStatus,
      width: 200,
    },
  ];

  const handleAdd = () => {
    navigate("/admin/ThongTinCuocHenDL/add");
  };

  const handleNavToCavity = () => {
    navigate("/admin/TinhTrangKhoangHen");
  };

  const handleExport = async () => {
    setLoading(true);
    const resp = await match(isHQ())
      .with(true, async () => {
        const param = {
          ...searchCondition.current,
          FlagMoiTao: searchCondition.current.FlagMoiTao ? 1 : 0,
          FlagXacNhan: searchCondition.current.FlagXacNhan ? 1 : 0,
          FlagDaLienHe: searchCondition.current.FlagDaLienHe ? 1 : 0,
          FlagTiepNhan: searchCondition.current.FlagTiepNhan ? 1 : 0,
          FlagHuy: searchCondition.current.FlagHuy ? 1 : 0,
          FlagWH: searchCondition.current.FlagWH ? 1 : 0,
          Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef.current?.getDxInstance().pageSize() ?? 100,
        };

        delete param.AppDateTimeFromTo;

        const response = await api.SerApp_ExportHQ(param);

        if (response.Data) {
          toast.success(commonLocale.TOAST_EXPORT_EXCEL_SUCESSFULLY);
          window.location.href = response.Data as any;
        }

        return response;
      })
      .otherwise(async () => {
        const param = {
          ...searchCondition.current,
          FlagMoiTao: searchCondition.current.FlagMoiTao ? 1 : 0,
          FlagXacNhan: searchCondition.current.FlagXacNhan ? 1 : 0,
          FlagDaLienHe: searchCondition.current.FlagDaLienHe ? 1 : 0,
          FlagTiepNhan: searchCondition.current.FlagTiepNhan ? 1 : 0,
          FlagHuy: searchCondition.current.FlagHuy ? 1 : 0,
          FlagWH: searchCondition.current.FlagWH ? 1 : 0,
          Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef.current?.getDxInstance().pageSize() ?? 100,
        };

        delete param.AppDateTimeFromTo;

        const response = await api.SerApp_ExportDL(param);

        if (response.Data) {
          toast.success(commonLocale.TOAST_EXPORT_EXCEL_SUCESSFULLY);
          window.location.href = response.Data as any;
        }

        return response;
      });
    if (resp?.isSuccess) {
      setLoading(false);
      return resp;
    } else {
      setLoading(false);
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

  const toolbarItems = [
    {
      text: "Xuất excel",
      onClick: async (e: any, ref: any) => {
        if (ref) {
          await handleExport();
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
  ];

  const renderSearchForm = useMemo(() => {
    return (
      <SearchForm data={searchCondition.current} onSearch={handleSearch} />
    );
  }, [searchCondition.current]);

  return (
    <AdminContentLayout className={""}>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title="Danh sách cuộc hẹn"
          showSearch={false}
          buttonOptions={{
            showButtonAdd: !isHQ(),
            onClickButtonAdd: handleAdd,
            listButton: [
              {
                text: "Tình trạng Khoang đặt hẹn",
                onClick: handleNavToCavity,
                visible: !isHQ(),
              },
            ],
          }}
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
              keyExpr={"AppNo"}
              storeKey={"SerApp-manager-list"}
              isHiddenCheckBox
              onRowDblClick={(e) => viewDetail(e.data.AppId)}
              customToolbarItems={toolbarItems}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
