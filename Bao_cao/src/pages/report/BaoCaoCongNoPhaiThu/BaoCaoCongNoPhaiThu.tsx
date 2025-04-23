import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import SearchForm from "./search-form/search-form";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import { useCallback, useRef } from "react";
import { useClientgateApi } from "@/packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { Form } from "devextreme-react";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useConvertNumber } from "@/packages/common";
import usePrint from "@/components/print/usePrint";
import { format, set } from "date-fns";
import { useColumns } from "./components/columns";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { Search_SerReportReceivableDebitRpt_Params } from "@/packages/types/report/SerReportReceivableDebitRpt";

export const BaoCaoCongNoPhaiThu = () => {
  const gridRef: any = useRef();
  const api = useClientgateApi();
  // const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();
  const setLoad = useSetAtom(loadPanelAtom);
  const { quickPrint, previewPrint } = usePrint();
  const columns = useColumns();

  const { convertMoneyVND, convertPercent } = useConvertNumber();
  type NewType = Partial<Search_SerReportReceivableDebitRpt_Params>;

  const searchCondition = useRef<NewType>({
    ToDate: new Date(),
    DealerCode: "",
    FlagDataWH: false,
  });

  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.BaoCaoCongNoThu_SearchDL({
      DealerCode: "",

      ToDate: searchCondition.current.ToDate
        ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
        : "",

      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.Lst_Ser_ReportReceivableDebitRpt?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.Lst_Ser_ReportReceivableDebitRpt,
        PageCount: length / pageSize,
        ItemCount: length,
        PageSize: 99999,
      };
    } else {
      showError({
        message: resp._strErrCode,
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
  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...data,
      ToDate: data.ToDate ,
    };
    gridRef?.current?.refetchData();
  };
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const handlePrint = async () => {
    setLoad(true);
    const resp = await api.BaoCaoCongNoThu_PrintDL({
      DealerCode: "",
      ToDate: searchCondition.current.ToDate
      ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
      : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    if (resp?.isSuccess) {
      quickPrint({
        url: resp.Data! as any,
      });
    } else {
      showError({
        message: resp._strErrCode,
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
    const resp = await api.BaoCaoCongNoThu_ExportDL({
      DealerCode: "",
      ToDate: searchCondition.current.ToDate
        ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
        : "",

      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    if (resp?.isSuccess) {
      window.location.href = resp.Data! as any;
    } else {
      showError({
        message: resp._strErrCode,
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
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title={"Báo cáo công nợ phải thu"}
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
              keyExpr={"ItemName"}
              autoFetchData={false}
              allowSelection={false}
              customToolbarItems={[]}
              isHidenHeaderFilter
              storeKey={"SerReportReceivableDebitRpt-columns"}
              // customHeight={windowSize.height - 120}
              editMode={false}
              defaultPageSize={9999999}
              isHiddenCheckBox
            >
              <Summary>
                <TotalItem
                  name="SummaryDebitAmount"
                  // cssClass="count__summary"
                  column={"DebitAmount"}
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
