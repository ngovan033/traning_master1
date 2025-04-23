import usePrint from "@/components/print/usePrint";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConvertNumber } from "@/packages/common";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { Search_ReportROByDate_Params } from "@/packages/types/report/ReportROByDate";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import { format, set } from "date-fns";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import Form from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { useCallback, useRef } from "react";
import { useColumns } from "./components/columns";
import SearchForm from "./search-form/search-form";

export const ReportROByDatePage = () => {
  const { t } = useI18n("ReportROByDate");
  const api = useClientgateApi();
  // const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();
  const setLoad = useSetAtom(loadPanelAtom);
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const { quickPrint, previewPrint } = usePrint();
  const { convertMoneyVND, convertPercent } = useConvertNumber();
  const gridRef: any = useRef();
  const searchCondition = useRef<Partial<Search_ReportROByDate_Params>>({
    FromDateFromTo: [set(Date.now(), { date: 1 }), new Date()],
    IsChoSua: true,
    IsDangSua: true,
    IsSuaXong: true,
    IsEnd: true,
    IsThanhToanXong: false,
    IsDaGiaoXe: false,
    IsROReject: false,
    IsKhongDung: false,
    FlagDataWH: false,
  });

  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.ReportROByDate_SearchDL({
      DealerCode: "",
      FromDate: searchCondition.current.FromDateFromTo[0]
        ? format(
            searchCondition.current.FromDateFromTo[0] as Date,
            "yyyy-MM-dd"
          )
        : "",
      ToDate: searchCondition.current.FromDateFromTo[1]
        ? format(
            searchCondition.current.FromDateFromTo[1] as Date,
            "yyyy-MM-dd"
          )
        : "",
      IsChoSua: searchCondition.current.IsChoSua ? "1" : "0",
      IsDangSua: searchCondition.current.IsDangSua ? "1" : "0",
      IsSuaXong: searchCondition.current.IsSuaXong ? "1" : "0",
      IsEnd: searchCondition.current.IsEnd ? "1" : "0",
      IsThanhToanXong: searchCondition.current.IsThanhToanXong ? "1" : "0",
      IsDaGiaoXe: searchCondition.current.IsDaGiaoXe ? "1" : "0",
      IsROReject: searchCondition.current.IsROReject ? "1" : "0",
      IsKhongDung: searchCondition.current.IsKhongDung ? "1" : "0",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.lst_ReportROByDate?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_ReportROByDate,
        PageCount: length / pageSize,
        ItemCount: length,
        PageSize: 99999,
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

      return {
        DataList: [],
        PageCount: 0,
        ItemCount: 0,
        PageSize: 99999,
      };
    }
  };
  //====================================CallAPI-end========================================

  //====================================handle========================================

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...data,
      FromDate: data.FromDateFromTo[0] ? data.FromDateFromTo[0] : "",
      ToDate: data.FromDateFromTo[1] ? data.FromDateFromTo[1] : "",
    };
    gridRef?.current?.refetchData();
  };
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };
  const handlePrint = async () => {
    setLoad(true);
    const resp = await api.ReportROByDate_PrintDL({
      DealerCode: "",
      FromDate: searchCondition.current.FromDateFromTo[0]
        ? format(
            searchCondition.current.FromDateFromTo[0] as Date,
            "yyyy-MM-dd"
          )
        : "",
      ToDate: searchCondition.current.FromDateFromTo[1]
        ? format(
            searchCondition.current.FromDateFromTo[1] as Date,
            "yyyy-MM-dd"
          )
        : "",
      IsChoSua: searchCondition.current.IsChoSua ? "1" : "0",
      IsDangSua: searchCondition.current.IsDangSua ? "1" : "0",
      IsSuaXong: searchCondition.current.IsSuaXong ? "1" : "0",
      IsEnd: searchCondition.current.IsEnd ? "1" : "0",
      IsThanhToanXong: searchCondition.current.IsThanhToanXong ? "1" : "0",
      IsDaGiaoXe: searchCondition.current.IsDaGiaoXe ? "1" : "0",
      IsROReject: searchCondition.current.IsROReject ? "1" : "0",
      IsKhongDung: searchCondition.current.IsKhongDung ? "1" : "0",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    if (resp?.isSuccess) {
      quickPrint({
        url: resp.Data! as any,
      });
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
    setLoad(false);
  };
  const handleExport = useCallback(async () => {
    setLoad(true);
    const resp = await api.ReportROByDate_ExportDL({
      DealerCode: "",
      FromDate: searchCondition.current.FromDateFromTo[0]
        ? format(
            searchCondition.current.FromDateFromTo[0] as Date,
            "yyyy-MM-dd"
          )
        : "",
      ToDate: searchCondition.current.FromDateFromTo[1]
        ? format(
            searchCondition.current.FromDateFromTo[1] as Date,
            "yyyy-MM-dd"
          )
        : "",
      IsChoSua: searchCondition.current.IsChoSua ? "1" : "0",
      IsDangSua: searchCondition.current.IsDangSua ? "1" : "0",
      IsSuaXong: searchCondition.current.IsSuaXong ? "1" : "0",
      IsEnd: searchCondition.current.IsEnd ? "1" : "0",
      IsThanhToanXong: searchCondition.current.IsThanhToanXong ? "1" : "0",
      IsDaGiaoXe: searchCondition.current.IsDaGiaoXe ? "1" : "0",
      IsROReject: searchCondition.current.IsROReject ? "1" : "0",
      IsKhongDung: searchCondition.current.IsKhongDung ? "1" : "0",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    if (resp?.isSuccess) {
      window.location.href = resp.Data! as any;
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
    setLoad(false);
  }, []);

  const columns = useColumns();

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title={t("ReportROByDate")}
          showSearch={false}
          buttonOptions={{
            showButtonAdd: false,
            // onClickButtonAdd: handleAdd,
            listButton: [
              {
                text: "Xuất excel",
                onClick: handleExport,
                // visible: !isHQ(),
              },
              {
                text: "In",
                onClick: handlePrint,
              },
            ],
          }}
        ></BreadcrumbSearch>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[310px] h-full"}>
              <SearchForm
                data={searchCondition.current}
                onSearch={handleSearch}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]} // cars
              columns={columns}
              fetchData={fetchData}
              keyExpr={"RONO"}
              autoFetchData={false}
              allowSelection={false}
              customToolbarItems={[]}
              isHidenHeaderFilter
              storeKey={"ReportROByDate-columns"}
              // customHeight={windowSize.height - 120}
              editMode={false}
              defaultPageSize={9999999}
              isHiddenCheckBox
            >
              <Summary>
                <TotalItem
                  name="SummaryREVENUE"
                  // cssClass="count__summary"
                  column={"REVENUE"}
                  summaryType={"sum"}
                  customizeText={(itemInfo: {
                    value: string | number | any;
                    valueText: string;
                  }) => {  
                    // const dataSource = gridRef.current.getData();
                    const dblResult = Math.round(+itemInfo.value); // SummaryCommon(dataSource);
                    // const total = dataSource?.reduce(
                    //   (prev: number, cur: any) => {
                    //     return prev + +cur.REVENUE;
                    //   },
                    //   0
                    // );
                    return `${"Tổng"}: ${convertMoneyVND(dblResult)}`;
                  }}
                ></TotalItem>
              </Summary>
            </GridViewOne>
            <GetDataWH
              onSearch={handleSearchWH}
              formRef={formRef}
              checkBoxRef={checkBoxRef}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
