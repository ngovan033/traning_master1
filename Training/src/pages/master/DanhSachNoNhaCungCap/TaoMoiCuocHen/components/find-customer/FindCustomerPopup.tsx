import { useClientgateApi } from "@packages/api";
import { VisibilityControl } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";

import { useI18n } from "@/i18n/useI18n";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { useFindCustomerPopupLocale } from "@/packages/components/popup/PopupTimKiemXeChiaSe/useFindCustomerPopupLocale";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import CollapseLeftIcon from "@/packages/ui/icons/svg/collapse-left";
import { format } from "date-fns";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { formatNumber } from "devextreme/localization";
import { useSetAtom } from "jotai";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import "./FindCustomerPopup.scss";
import { SearchForm } from "./search-form";
import { SearchResults } from "./search-result";

interface FindCustomerPopupProps {
  dataRef?: any;
  onSelectedCustomer: (customer: any[]) => void;
}

const initSearchCondition = {
  CusName: "",
  FrameNo: "",
  PlateNo: "",
  Ft_PageIndex: 0,
  Ft_PageSize: 100,
};

export const FindCustomerPopup = forwardRef(
  ({ onSelectedCustomer }: FindCustomerPopupProps, ref) => {
    const style = useStylingCommon();
    const showError = useSetAtom(showErrorAtom);
    const { commonLocale } = useCommonLocale();
    const { t } = useI18n("SerApp");
    const popupRef = useRef<any>(null);
    const { locale } = useFindCustomerPopupLocale();

    const [open, setOpen] = useState(false);
    const [isPopupShareCar, setIsPopupShareCar] = useState(false);

    const { showDialog } = useDialog();

    useImperativeHandle(ref, () => ({
      showPopup() {
        setOpen(true);
      },
      searchWithCustomerName(customerName: string) {
        setOpen(true);

        searchCondition.current.CusName = customerName;
        searchCondition.current.PlateNo = "";

        gridRef?.current?.refetchData();
      },
      searchWithPlateNo(plateNo: string) {
        setOpen(true);

        searchCondition.current.PlateNo = plateNo;
        searchCondition.current.CusName = "";

        gridRef?.current?.refetchData();
      },
    }));
    const gridRef = useRef<any>(null);
    const api = useClientgateApi();

    const searchCondition = useRef<Partial<any>>(initSearchCondition);

    const handleSearch = async (condition: any) => {
      const currentCondition = {
        ...condition,
      };

      searchCondition.current = currentCondition;
      gridRef?.current?.refetchData();
    };

    const checkParam = () => {
      if (!searchCondition.current.PlateNo) {
        if (searchCondition.current.FrameNo.length < 6) {
          showDialog({
            title: "Thông báo",
            message:
              "Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!",
          });
          return false;
        }
      } else {
        const regexNormalCar = /^[0-9]{2}[A-Z]{1,2}-[0-9]{4,5}$/;
        const regexSpecialCar = /^[A-Z]{2}-[0-9]{4,5}$/;
        if (
          regexNormalCar.test(searchCondition.current.PlateNo) == false &&
          regexSpecialCar.test(searchCondition.current.PlateNo) == false
        ) {
          showDialog({
            title: "Thông báo",
            message: "Biển só xe không hợp lệ!",
          });

          return false;
        }
      }

      return true;
    };

    const fetchData_Normal = async () => {
      if (isPopupShareCar && checkParam() == false) {
        return;
      }

      const resp = await api.Ser_CustomerCar_SearchDL({
        // ...searchCondition.current,
        FrameNo: searchCondition.current.FrameNo,
        CusName: searchCondition.current.CusName,
        PlateNo: searchCondition.current.PlateNo,
        Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
      });

      if (resp.isSuccess) {
        if (resp.DataList.length == 0 && isPopupShareCar == false) {
          setIsPopupShareCar(true);
        }

        const dataList =
          resp?.DataList?.map((item: any, index: number) => {
            return {
              ...item,
              STT: index + 1,
            };
          }) ?? [];

        return {
          ...resp,
          DataList: dataList,
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

    const fetchData_ShareCar = async () => {
      if (isPopupShareCar && checkParam() == false) {
        return;
      }

      const resp = await api.Ser_CustomerCar_SearchHQ({
        // ...searchCondition.current,
        FrameNo: searchCondition.current.FrameNo,
        PlateNo: searchCondition.current.PlateNo,
        Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
      });

      if (resp.isSuccess) {
        const dataList =
          resp?.DataList?.map((item: any, index: number) => {
            return {
              ...item,
              STT: index + 1,
            };
          }) ?? [];

        return {
          ...resp,
          DataList: dataList,
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

    const renderSearchForm = useCallback(
      (control: VisibilityControl) => {
        return (
          <SearchForm
            data={searchCondition.current}
            onClose={() => control.close()}
            onSearch={handleSearch}
            isPopupShareCar={isPopupShareCar}
          />
        );
      },
      [searchCondition.current, isPopupShareCar]
    );

    const handleSelectCustomer = (e: any) => {
      if (e && e.data) {
        if (isPopupShareCar) {
          onSelectedCustomer({ PlateNo: e.data.PlateNo });
        } else {
          onSelectedCustomer(e.data);
        }
        onHidding();
      }
    };

    const onHidding = () => {
      searchCondition.current = initSearchCondition;
      setOpen(false);
      setIsPopupShareCar(false);
    };

    const columns = useMemo(() => {
      const normalColumns = [
        {
          dataField: "CusName",
          caption: "Tên khách hàng",
          minWidth: 150,
          width: 150,
        },
        {
          dataField: "CusTel",
          caption: "Điện thoại",
          minWidth: 150,
          width: 150,
        },
        {
          dataField: "Address",
          caption: "Địa chỉ",
          minWidth: 150,
          width: 150,
        },
        {
          dataField: "PlateNo",
          caption: "Biển số",
          minWidth: 150,
          width: 150,
        },
        {
          dataField: "ModelName",
          caption: "Model",
          minWidth: 120,
          width: 120,
        },
        {
          dataField: "FrameNo",
          caption: "Số khung",
          minWidth: 180,
          width: 180,
        },
        {
          dataField: "ColorCode",
          caption: "Mã màu",
          minWidth: 100,
          width: 100,
        },
        {
          dataField: "WarrantyRegistrationDate", // Mã nhãn hiệu
          caption: "Ngày đăng ký bảo hành",
          minWidth: 140,
          width: 140,
        },
      ];

      const shareCarColumns = [
        {
          dataField: "PlateNo",
          caption: locale.PlateNo,
          minWidth: 150,
          width: 150,
        },
        {
          dataField: "TradeMarkCode",
          caption: locale.TradeMarkCode,
          minWidth: 150,
          width: 150,
        },
        {
          dataField: "ModelName",
          caption: locale.ModelName,
          minWidth: 150,
          width: 150,
        },
        {
          dataField: "FrameNo",
          caption: locale.FrameNo,
          minWidth: 200,
          width: 200,
        },
        {
          dataField: "ColorCode",
          caption: locale.ColorCode,
          minWidth: 100,
          width: 100,
        },
        {
          dataField: "WarrantyRegistrationDate",
          caption: locale.WarrantyRegistrationDate,
          minWidth: 140,
          width: 140,
        },
        {
          dataField: "WarrantyExpiresDate",
          caption: locale.WarrantyExpiresDate,
          minWidth: 140,
          width: 140,
        },
        {
          dataField: "CusConfirmedWarrantyDate",
          caption: locale.CusConfirmedWarrantyDate,
          minWidth: 140,
          width: 140,
          cellRender: ({ data }) => {
            if (!data.CusConfirmedWarrantyDate) return "";

            return format(
              new Date(data.CusConfirmedWarrantyDate),
              "yyyy-MM-dd"
            );
          },
        },
        {
          dataField: "WarrantyKM",
          caption: locale.WarrantyKM,
          minWidth: 140,
          width: 140,
          cellRender: ({ data }) => formatNumber(data.WarrantyKM, "#,##0"),
        },
      ];

      return isPopupShareCar ? shareCarColumns : normalColumns;
    }, [isPopupShareCar]);

    const onPageChanged = (number: number) => {
      // gridRef?.current?.refetchData(number);
    };

    return (
      <Popup
        visible={open}
        title={
          isPopupShareCar
            ? "Tìm kiếm thông tin xe chia sẻ"
            : "Tìm kiếm thông tin khách hàng"
        }
        showCloseButton={true}
        onHiding={onHidding}
        wrapperAttr={{
          class: " PopupTimKiemChung",
        }}
        height={550}
        width={"95%"}
        ref={popupRef}
      >
        <WithSearchPanelLayout
          searchPanelRender={renderSearchForm}
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
              fetchData={
                isPopupShareCar ? fetchData_ShareCar : fetchData_Normal
              }
              handleSelectCustomer={handleSelectCustomer}
              columns={columns}
              onPageChanged={onPageChanged}
            />
          )}
        />

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: commonLocale.BUTTON_CANCEL,
            onClick: onHidding,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
