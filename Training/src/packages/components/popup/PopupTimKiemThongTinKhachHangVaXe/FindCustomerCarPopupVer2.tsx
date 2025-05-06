import { useCommonUtils } from "@/packages/common/CommonUltils";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { Customer_Car_Search } from "@/packages/types/common/carServiceCommon";
import { useDataSource_Ser_RO } from "@/pages/carservice/Ser_RO/components/datasource/useDataSource_Ser_RO";
import { useSer_RO_Locale } from "@/pages/carservice/Ser_RO/views/locale/Ser_RO_Locale";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SearchResults } from "../PopupTimKiemThongTinKhachHangVaXe/search-result";
interface IOptions {
  autoFetchData: boolean;
}

interface FindCustomerCarPopupProps {
  onSelectedCustomer: (customer: any, flagCarSharing: any) => void;
  options: IOptions;
}

const initSearchCondition = {
  CusName: "",
  FrameNo: "",
  PlateNo: "",
  Ft_PageIndex: 0,
  Ft_PageSize: 100,
};

export const FindCustomerCarPopupVer2 = memo(
  forwardRef(({ onSelectedCustomer }: FindCustomerCarPopupProps, ref) => {
    const commonUtils = useCommonUtils();
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const searchCondition = useRef<Partial<any>>(initSearchCondition);
    const gridRef = useRef<any>(null);
    const popupWarningCarExistCardRef = useRef<any>(null);
    const { Ser_RO_Locale, Ser_ROPartItems_Locale, Ser_ROServiceItems_Locale } =
      useSer_RO_Locale();
    const { commonLocale } = useCommonLocale();
    const flagCarSharing = useRef<any>();
    const dataSourceSer_RO = useDataSource_Ser_RO();
    const { showDialog } = useDialog();
    const [open, setOpen] = useState(false);

    const setLoad = useSetAtom(loadPanelAtom);
    useImperativeHandle(ref, () => ({
      showPopup() {
        setOpen(true);
      },
      getGridRef() {
        return gridRef.current;
      },

      // Truyen data
      setData: (objCustomer_Car_Search: Customer_Car_Search) => {
        setOpen(true);
        flagCarSharing.current = "0";
        searchCondition.current = objCustomer_Car_Search;
      },
      search: (param, listCustomer) => {
        setOpen(true);

        searchCondition.current = param;
        gridRef.current?.setPageData(listCustomer);
        // gridRef?.current?.refetchData();
      },
    }));
    const fetchData = async () => {
      setLoad(true);
      const resp = await api.Ser_CustomerCar_SearchDL({
        ...searchCondition.current,
        Ft_PageIndex:
          gridRef.current?.getDxInstance().pageIndex() > 0
            ? gridRef.current?.getDxInstance().pageIndex()
            : 0,
        Ft_PageSize:
          gridRef.current?.getDxInstance().pageSize() > 0
            ? gridRef.current?.getDxInstance().pageSize()
            : 100,
      });

      if (resp?.isSuccess) {
        setLoad(false);
        return resp;
      } else {
        setLoad(false);
        showError({
          message: resp!._strErrCode,
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

    const handleSelectCustomer = async (e: any) => {
      if (e && e.data) {
        setLoad(true);

        const customer = e.data;

        if (customer.PlateNo && customer.FrameNo) {
          await dataSourceSer_RO
            .Ser_RO_CheckCarExistCard({
              PlateNo: customer.PlateNo,
              FrameNo: customer.FrameNo,
            })
            .then((data: any) => {
              setLoad(false);

              const result = {
                ...customer,
                ...data,
              };

              if (data.FlagCardExist == "0" && data.CardNo) {
                showDialog({
                  title: "Thông báo",
                  message: `Bạn vui lòng kiểm tra thông tin xe '${customer.PlateNo}' và VIN '${customer.FrameNo}' chưa đúng thông tin trên hệ thống thẻ!`,
                  buttons: [
                    {
                      text: "OK",
                      onClick: () => {
                        onSelectedCustomerAndCar(result);
                      },
                    },
                  ],
                });
              } else {
                onSelectedCustomerAndCar(result);
              }
            })
            .catch((err: any) => {
              setLoad(false);
            });
        } else {
          onSelectedCustomerAndCar(customer);
        }
        setLoad(false);
        //
      }
    };

    const onSelectedCustomerAndCar = (data: any) => {
      onSelectedCustomer(data, commonUtils.strVaule(flagCarSharing.current));
      onHidding();
    };

    const onHidding = useCallback(() => {
      searchCondition.current = initSearchCondition;
      setOpen(false);
    }, [open]);

    return (
      <Popup
        visible={open}
        title={"Tìm kiếm thông tin khách hàng"}
        showCloseButton={true}
        onHiding={onHidding}
        wrapperAttr={{
          class: "search-car-popup popup-KH",
        }}
        width={1250}
        height={580}
      >
        <div className="h-full">
          <SearchResults
            storeKey="list-cus-car"
            isLoading={false}
            toolbarItems={[]}
            ref={gridRef}
            fetchData={fetchData}
            handleSelectCustomer={handleSelectCustomer}
          />
        </div>

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
  })
);
