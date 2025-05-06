import { useClientgateApi } from "@/packages/api";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { usePermissions } from "@/packages/contexts/permission";
import { VisibilityControl } from "@/packages/hooks";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { useNewTabNavigate } from "@/packages/hooks/useNewTabNavigate";
import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import CollapseLeftIcon from "@/packages/ui/icons/svg/collapse-left";
import { format } from "date-fns";
import { Button } from "devextreme-react";
import { useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { SearchForm } from "./search-form";
import { SearchResults } from "./search-result";

const RepairHistory = forwardRef(
  ({ control, locale, errors, commonLocale, getValues }, ref) => {
    const gridRef = useRef<any>(null);
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const openTab = useNewTabNavigate();
    const setLoading = useSetAtom(loadPanelAtom);
    const { showDialog } = useDialog();
    const { DealerCode } = usePermissions();
    const style = useStylingCommon();

    useImperativeHandle(ref, () => ({
      reset: () => {
        // gridRef.current?.setData([]);
        searchCondition.current = {
          PlateNo: "",
          FrameNo: "",
          FlagWH: false,
        };

        gridRef.current?.setData([]);
      },
      setData: (data: any) => {
        searchCondition.current.PlateNo = data.PlateNo;
        searchCondition.current.FrameNo = data.FrameNo;
        searchCondition.current.FlagWH = data.FlagWH;
      },
    }));

    const searchCondition = useRef<any>({
      PlateNo: null,
      FrameNo: null,
      FlagWH: false,
    });

    const columns = [
      {
        dataField: "DealerName",
        caption: locale.DealerName,
        width: 150,
      },
      {
        dataField: "PlateNo",
        caption: locale.PlateNo,
        width: 150,
      },
      {
        dataField: "FrameNo",
        caption: locale.FrameNo,
        width: 150,
      },
      {
        dataField: "NormalizedRONo",
        caption: locale.NormalizedRONo,
        width: 150,
      },
      {
        dataField: "NormalizedCreator",
        caption: locale.NormalizedCreator,
        width: 150,
      },
      {
        dataField: "TradeMarkCode",
        caption: locale.TradeMarkCode,
        width: 150,
      },
      {
        dataField: "ModelName",
        caption: locale.ModelName,
        width: 150,
      },
      {
        dataField: "ColorCode",
        caption: locale.ColorCode,
        width: 150,
      },
      {
        dataField: "CheckInDate",
        caption: locale.CheckInDate,
        width: 150,
        // cellRender: ({ data }) => {
        //   if (!data.CheckInDate) return "";

        //   return format(new Date(data.CheckInDate), "yyyy-MM-dd HH:mm");
        // },
      },
      {
        dataField: "ActualDeliveryDate",
        caption: locale.ActualDeliveryDate,
        width: 150,
        // cellRender: ({ data }) => {
        //   if (!data.ActualDeliveryDate) return "";

        //   return format(new Date(data.ActualDeliveryDate), "yyyy-MM-dd HH:mm");
        // },
      },
      {
        dataField: "CusRequest",
        caption: locale.CusRequest,
        width: 150,
      },
    ];

    const fetchData = async () => {
      setLoading(true);

      const resp = await api.SerCustomerCar_GetRepairHistoryDL({
        PlateNo: searchCondition.current.PlateNo ?? "",
        FrameNo: searchCondition.current.FrameNo ?? "",
        FlagWH: searchCondition.current.FlagWH ? "1" : "0",
        Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
      });

      if (resp.isSuccess) {
        const dataList = resp.DataList.map((item) => {
          return {
            ...item,
            CheckInDate: !item.CheckInDate
              ? ""
              : format(new Date(item.CheckInDate), "yyyy-MM-dd HH:mm"),
            ActualDeliveryDate: !item.ActualDeliveryDate
              ? ""
              : format(new Date(item.ActualDeliveryDate), "yyyy-MM-dd HH:mm"),
          };
        }).sort((a, b) => {
          return new Date(a.CheckInDate) - new Date(b.CheckInDate);
        });

        resp.DataList = dataList;

        setLoading(false);

        return resp;
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

        setLoading(false);
      }
    };

    const handleSearch = (condition) => {
      searchCondition.current = {
        PlateNo: condition.PlateNo,
        FrameNo: condition.FrameNo,
        FlagWH: condition.FlagWH,
      };

      gridRef.current?.refetchData();
    };

    const handleExportExcel = async () => {
      setLoading(true);

      const resp: any = await api.SerCustomerCar_ExportExcelRepairHistoryDL({
        PlateNo: searchCondition.current.PlateNo ?? "",
        FrameNo: searchCondition.current.FrameNo ?? "",
        FlagWH: searchCondition.current.FlagWH ? "1" : "0",
      });

      if (resp.isSuccess) {
        setLoading(false);
        toast.success("Xuất excel thành công");

        window.location.href = resp.Data;
      } else {
        setLoading(false);

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
    };

    const customToolbar: GridCustomToolBarItem[] = [
      {
        widget: "customize",
        visible: true,
        text: commonLocale.BUTTON_EXPORT_EXCEL,
        onClick: (e: any, ref: any) => {
          if (ref) {
            handleExportExcel();
          }
        },
        shouldShow: () => true,
        customize: (ref: any) => {
          return (
            <Button
              text={commonLocale.BUTTON_EXPORT_EXCEL}
              onClick={handleExportExcel}
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
                width: "100%",
              }}
              className="btn-small w-full"
            />
          );
        },
      },
    ];

    const handleViewRO = (e) => {
      // if (e.data.DealerCode != DealerCode) {
      //   showDialog({
      //     title: "Thông báo",
      //     message: "Không tìm thấy báo giá!",
      //   });

      //   return;
      // }

      openTab(
        `/service/DealerHistoryShareMngDL/manageDealerHistoryShareMngDL/${e.data.ROID}`
      );
    };

    const searchByPlateNo = (plateNo: string) => {
      const param = {
        PlateNo: plateNo,
        FrameNo: (getValues("FrameNoSearch") as string) ?? "",
        FlagWH: getValues("FlagWH") ? "1" : "0",
      };

      const frameNo = param.FrameNo;

      if (!plateNo) {
        if (frameNo.length < 4) {
          showDialog({
            title: "Thông báo",
            message: "Vui lòng nhập biển số hoặc VIN trên 4 ký tự!",
          });
          return;
        } else {
          if (frameNo.trim().length < 4) {
            showDialog({
              title: "Thông báo",
              message: "Vui lòng nhập biển số hoặc VIN trên 4 ký tự!",
            });
            return;
          }
        }
      } else {
        const regexNormalCar = /^[0-9]{2}[A-Z]{1,2}-[0-9]{4,5}$/;
        const regexSpecialCar = /^[A-Z]{2}-[0-9]{4,5}$/;
        if (
          regexNormalCar.test(plateNo) == false &&
          regexSpecialCar.test(plateNo) == false
        ) {
          showDialog({
            title: "Thông báo",
            message: "Vui lòng nhập biển số hoặc VIN trên 4 ký tự!",
          });

          return;
        }
      }

      gridRef.current?.refetchData();
    };

    const searchByFrameNo = (frameNo: string) => {
      const param = {
        PlateNo: (null as string) ?? "",
        FrameNo: fnull,
        FlagWH: getValues("FlagWH") ? "1" : "0",
      };

      const plateNo = param.PlateNo;

      if (!plateNo) {
        if (frameNo.length < 4) {
          showDialog({
            title: "Thông báo",
            message: "Vui lòng nhập biển số hoặc VIN trên 4 ký tự!",
          });
          return;
        } else {
          if (frameNo.trim().length < 4) {
            showDialog({
              title: "Thông báo",
              message: "Vui lòng nhập biển số hoặc VIN trên 4 ký tự!",
            });
            return;
          }
        }
      } else {
        const regexNormalCar = /^[0-9]{2}[A-Z]{1,2}-[0-9]{4,5}$/;
        const regexSpecialCar = /^[A-Z]{2}-[0-9]{4,5}$/;
        if (
          regexNormalCar.test(plateNo) == false &&
          regexSpecialCar.test(plateNo) == false
        ) {
          showDialog({
            title: "Thông báo",
            message: "Vui lòng nhập biển số hoặc VIN trên 4 ký tự!",
          });

          return;
        }
      }

      gridRef.current?.refetchData();
    };

    return (
      <WithSearchPanelLayout
        searchPanelRender={(control) => (
          <SearchForm
            data={searchCondition.current}
            onClose={() => control.close()}
            onSearch={handleSearch}
          />
        )}
        contentPanelRender={(control: VisibilityControl) => (
          <SearchResults
            isLoading={false}
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
            ]}
            ref={gridRef}
            fetchData={fetchData}
            dbClick={handleViewRO}
            columns={columns}
            customToolbarItems={customToolbar}
          />
        )}
      />
    );

    return (
      <div className="flex flex-col w-[99%] tab-lich-su  h-full">
        <div className="flex w-full mb-[5px] pb-[10px] h-full">
          <div className="flex flex-col min-w-[250px] mr-[5px] gap-[5px] relative ">
            <div className="">
              <Controller
                name={"PlateNoSearch"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={"Biển số"}
                      error={errors.PlateNoSearch}
                      direction="vertical"
                      onEnterKey={searchByPlateNo}
                      spacing="2.5px"
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"FrameNoSearch"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={"Số khung"}
                      error={errors.FrameNoSearch}
                      direction="vertical"
                      onEnterKey={searchByFrameNo}
                      spacing="2.5px"
                    />
                  );
                }}
              />
            </div>
            <div className="h-[20px] flex items-center ">
              <Controller
                name={"FlagWH"}
                control={control}
                render={({ field }) => {
                  return (
                    <CheckBoxField
                      field={field}
                      label={commonLocale.CHECKBOX_FLAG_WH}
                      className=""
                    />
                  );
                }}
              />
            </div>
            <div className="w-full absolute bottom-[0px] left-[0px]">
              <Button
                style={{
                  background: "#00703c",
                  color: "#fff",
                  margin: 0,
                  width: "100%",
                }}
                text={commonLocale.BUTTON_SEARCH}
                className="btn-small w-full"
                onClick={handleSearch}
              ></Button>
            </div>
          </div>
          <div
            style={{
              width: "calc(100% - 250px)",
            }}
          >
            <GridViewOne
              ref={gridRef}
              keyExpr={"RONo"}
              dataSource={[]}
              columns={columns}
              allowSelection={false}
              storeKey={"repair-history"}
              fetchData={fetchData}
              isHiddenCheckBox={true}
              onRowDblClick={handleViewRO}
              defaultPageSize={100}
              showSetting={false}
              customToolbarItems={customToolbar}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default RepairHistory;
