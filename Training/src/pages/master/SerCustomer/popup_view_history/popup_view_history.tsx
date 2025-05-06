import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { BButton } from "@/packages/components/buttons";
import { DialogMessage } from "@/packages/components/dialog-message/dialog-message";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { Link } from "@/packages/components/link/link";
import {
  VisibilityControl,
  useConfiguration,
  useVisibilityControl,
} from "@/packages/hooks";
import { useNewTabNavigate } from "@/packages/hooks/useNewTabNavigate";
import { useStateSearch } from "@/packages/hooks/useStateSearch";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Alignment, ColumnOptions, ToolbarItemProps } from "@/types";
import { Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { toast } from "react-toastify";
import { SearchForm } from "./search-form";
import { format } from "date-fns";
import CollapseLeftIcon from "@/packages/ui/icons/svg/collapse-left";
import { useStylingCommon } from "@/packages/hooks/useStylingCommon";

interface IPopupViewHistoryProps {
  visible: boolean;
  container: string;
}

const WIDTH_COLUMN_GRID = 100;

export const PopupViewHistory = forwardRef(
  ({ visible, container }: IPopupViewHistoryProps, popupRef: any) => {
    const { t } = useI18n("DealerHistoryShareMng_DL"); // để nguyên đây, không được thay vì đang dùng chung key dịch với màn khác (ThangPV)
    const windowSize = useWindowSize();
    const style = useStylingCommon();
    const api = useClientgateApi();
    const navigateNewTab = useNewTabNavigate();
    const configuration = useConfiguration();
    const showError = useSetAtom(showErrorAtom);
    const setLoad = useSetAtom(loadPanelAtom);
    const showPopup = useVisibilityControl({ defaultVisible: visible });
    const gridRef = useRef<any>(null);
    const formRef = useRef<any>(null);
    const { data, saveSate } = useStateSearch({
      storeKey: "search-condition-ser-customer-view-history-share-mng-dl",
    });
    const searchCondition = useRef<Partial<any>>({
      PlateNo: "",
      FrameNo: "",
      Ft_PageIndex: 0,
      Ft_PageSize: configuration.MAX_PAGE_ITEMS,
      FlagDataWH: false, // convert "1", "0" ở hàm gọi API
    });

    useImperativeHandle(popupRef, () => ({
      getGridViewOneRef() {
        return gridRef;
      },
      setSearchCondition(data: any) {
        searchCondition.current = data;
      },
      show() {
        showPopup.open();
      },
    }));

    //=======================handle=========================================
    const handleClose = () => {
      showPopup.close();
    };

    const handleExportExcel = async () => {
      const dataSource = gridRef.current.getDxInstance().option("dataSource");
      if (!dataSource || dataSource.length === 0) {
        toast.info("Không có dữ liệu để xuất!");
        return;
      }

      // nâng cấp export excel theo điều kiện tìm kiếm (không dùng tick chọn)
      setLoad(true);
      const response = await api.DealerHistoryShareMng_ExportSearchDL({
        PlateNo: searchCondition.current.PlateNo!,
        FrameNo: searchCondition.current.FrameNo!,
        FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
      });
      setLoad(false);
      if (response.isSuccess) {
        toast.success(t("ExportExcelSuccess"));
        window.location.href = response.Data!;
      } else {
        showError({
          message: t(response._strErrCode),
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

    const onViewDetail = (ev: any) => {
      navigateNewTab(
        `/service/DealerHistoryShareMngDL/manageDealerHistoryShareMngDL/${ev.data.ROID}?${searchCondition.current.FlagDataWH}`
      );
    };

    const handleSearch = async (condition: any) => {
      //
      const formDataSource = condition; // formRef.current?.instance.option("formData");
      var regexAllEmptySpace = /^\s*$/;
      var regexEmptySpace = /\s+/;
      let PlateNo = formDataSource.PlateNo?.replace(/ /g, "") ?? ""; // remove all whitespace
      let FrameNo = formDataSource.FrameNo?.trim() ?? ""; // ?.replace(/ /g, "") ?? "";

      const isWhiteSpacePlateNo = PlateNo && regexAllEmptySpace.test(PlateNo);
      const isWhiteSpaceFrameNo = FrameNo && regexAllEmptySpace.test(FrameNo);
      //
      const isContainSpacePlateNo = PlateNo && regexEmptySpace.test(PlateNo);
      const isContainSpaceFrameNo = FrameNo && regexEmptySpace.test(FrameNo);

      if (isWhiteSpacePlateNo || isWhiteSpaceFrameNo) {
        DialogMessage({
          strHtml: "Biển số hoặc Số khung phải nhập tối thiểu 4 kí tự!",
          title: t("Warning"),
        });
        gridRef.current.setData([]);
        return;
      }

      if (isContainSpaceFrameNo) {
        DialogMessage({
          strHtml: "Số khung không được bao gồm khoảng trắng!",
          title: t("Warning"),
        });
        gridRef.current.setData([]);
        return;
      }

      if (PlateNo.length < 4 && FrameNo.length < 4) {
        DialogMessage({
          strHtml: "Biển số hoặc Số khung phải nhập tối thiểu 4 kí tự!",
          title: t("Warning"),
        });
        gridRef.current.setData([]);
        return;
      }
      //
      const currentCondition = {
        ...condition,
        PlateNo,
        FrameNo,
      };
      searchCondition.current = currentCondition;

      gridRef?.current?.refetchData();
      saveSate(currentCondition);
    };

    const renderSearchForm = useCallback(
      (control: VisibilityControl) => {
        return (
          <SearchForm
            formRef={formRef}
            data={searchCondition.current}
            onClose={() => control.close()}
            onSearch={handleSearch}
          />
        );
      },
      [searchCondition.current]
    );

    const fetchData = async () => {
      const resp = await api.DealerHistoryShareMng_SearchDL({
        ...searchCondition.current,
        Ft_PageIndex: gridRef.current.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef.current.getDxInstance().pageSize() ?? 100, // configuration.MAX_PAGE_ITEMS, //
      });

      if (resp?.isSuccess) {
        const trasformData =
          resp?.DataList?.map((item) => {
            const CheckInDate = item.CheckInDate
              ? format(new Date(item.CheckInDate), "yyyy-MM-dd HH:mm")
              : "";
            const ActualDeliveryDate = item.ActualDeliveryDate
              ? format(new Date(item.ActualDeliveryDate), "yyyy-MM-dd HH:mm")
              : "";

            return {
              ...item,
              CheckInDate,
              ActualDeliveryDate,
            };
          }) ?? [];
        return {
          ...resp,
          DataList: trasformData,
        };
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

    //=============================columns===================================
    const columns: ColumnOptions[] = [
      {
        dataField: "DealerName",
        visible: true,
        caption: t("DealerName"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
        cellRender: (e: any) => {
          return (
            <Link
              label={e.value}
              onClick={() => {
                onViewDetail(e);
              }}
            />
          );
        },
      },
      {
        dataField: "PlateNo", //	Biển số xe
        visible: true,
        caption: t("PlateNo"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "FrameNo", //	Số VIN
        visible: true,
        caption: t("FrameNo"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "NormalizedRONo", // Số RO
        visible: true,
        caption: t("NormalizedRONo"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
        cellRender: (e: any) => {
          return (
            <Link
              label={e.value}
              onClick={() => {
                onViewDetail(e);
              }}
            />
          );
        },
      },
      {
        dataField: "NormalizedCreator", // CVDV
        visible: true,
        caption: t("NormalizedCreator"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "TradeMarkName", // Hiệu xe
        visible: true,
        caption: t("TradeMarkName"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "ModelName", // Model
        visible: true,
        caption: t("ModelName"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "ColorCode", // Màu
        visible: true,
        caption: t("ColorCode"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "CheckInDate", // Ngày vào xưởng
        visible: true,
        caption: t("CheckInDate"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
      },

      {
        dataField: "ActualDeliveryDate", // Ngày giao xe
        visible: true,
        caption: t("ActualDeliveryDate"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
      },
      {
        dataField: "CusRequest", // Nội dung công việc
        visible: true,
        caption: t("CusRequest"),
        width: WIDTH_COLUMN_GRID,
        alignment: "left" as Alignment,
        editorOptions: { readOnly: true },
        multiRowEditorOptions: {},
      },
    ];

    const toolbarItems: ToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return (
            <BButton label={t("ExportExcel")} onClick={handleExportExcel} />
          );
        },
      },
    ];

    return (
      <Popup
        visible={showPopup.visible}
        title={"Chi tiết lịch sử sửa chữa"}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "search-car-popup PopupTimKiemChung",
        }}
        onHiding={handleClose}
        height={"90%"}
        width={"90%"}
      >
        <WithSearchPanelLayout
          searchPanelRender={renderSearchForm}
          contentPanelRender={(control: VisibilityControl) => (
            <div className={"flex h-full justify-center"}>
              <div className="search-results h-full">
                <ScrollView className={"h-full"} showScrollbar={"always"}>
                  <GridViewOne
                    ref={gridRef}
                    fetchData={fetchData}
                    toolbarItems={[
                      {
                        location: "before",
                        render: () => (
                          <div
                            className={style.ICON.ICON_CONTAINER}
                            onClick={() => control.toggle()}
                            style={{
                              marginRight: 10,
                              display: !control.visible ? "flex" : "none",
                            }}
                          >
                            <CollapseLeftIcon reverse />
                          </div>
                        ),
                      },
                      ...toolbarItems,
                    ]}
                    keyExpr={[
                      "DealerName",
                      "PlateNo",
                      "FrameNo",
                      "NormalizedRONo",
                      "CheckInDate",
                    ]}
                    customHeight={windowSize.height - 200}
                    // isLoading={false}
                    allowMultiRowDelete={false}
                    dataSource={[]}
                    onRowDblClick={onViewDetail}
                    editMode={false}
                    // defaultPageSize={configuration.MAX_PAGE_ITEMS}
                    columns={columns}
                    // isHidenHeaderFilter
                    isHiddenCheckBox
                    storeKey={"Ser_CustomerCar_ViewHistoryService"}
                    allowSelection={false}
                  />
                </ScrollView>
              </div>
            </div>
          )}
        ></WithSearchPanelLayout>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: handleClose,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
