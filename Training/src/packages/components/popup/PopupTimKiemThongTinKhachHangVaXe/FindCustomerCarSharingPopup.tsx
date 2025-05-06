import { useClientgateApi } from "@packages/api";
import { VisibilityControl } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";

import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { useSer_RO_Locale } from "@/pages/carservice/Ser_RO/views/locale/Ser_RO_Locale";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { Icon } from "@packages/ui/icons";
import { Button } from "devextreme-react";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SearchForm } from "../PopupTimKiemThongTinKhachHangVaXe/search-form";
import { Ser_CustomerCar } from "@/packages/types/master/Ser_CustomerCar";
import { Customer_Car_Search } from "@/packages/types/common/carServiceCommon";
import { useCommonUtils } from "@/packages/common/CommonUltils";
import { da } from "date-fns/locale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useFindCustomerCarPopupLocale } from "./useFindCustomerCarPopupLocale";
import { useLogicHandle } from "./logic/useLogicHandle";
import { match } from "ts-pattern";
import { useAuth } from "@/packages/contexts/auth";
import { toast } from "react-toastify";
import { CarSharingSearchResult } from "../PopupTimKiemThongTinKhachHangVaXe/search-result-car-sharing";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useDialog } from "@/packages/hooks/useDiaglog";
interface IOptions {
  autoFetchData: boolean;
}

interface FindCustomerCarSharingPopupProps {
  dataRef?: any;
  onSelectedCustomer: (customer: any[], flagCarSharing: any) => void;
  options: IOptions;
  fetchDataInfor?: any;
  fetchDataSpecial?: any;
  isEmptyDataList?: any;
  showPopup?: any;
  objCustomer_Car_SearchCustom?: any;
  dataList?: any;
}

const initSearchCondition = {
  CusName: "",
  FrameNo: "",
  PlateNo: "",
  Ft_PageIndex: 0,
  Ft_PageSize: 100,
};

export const FindCustomerCarSharingPopup = memo(
  forwardRef(
    ({ onSelectedCustomer }: FindCustomerCarSharingPopupProps, ref) => {
      const commonUtils = useCommonUtils();
      const api = useClientgateApi();
      const { showDialog } = useDialog();
      const showError = useSetAtom(showErrorAtom);
      const searchCondition = useRef<Partial<any>>(initSearchCondition);
      const gridRef = useRef<any>(null);
      const {
        Ser_RO_Locale,
        Ser_ROPartItems_Locale,
        Ser_ROServiceItems_Locale,
        PopupSer_RO_FindCustomerCarSharing_Locale,
      } = useSer_RO_Locale();
      const { commonLocale } = useCommonLocale();
      const formRef = useRef<any>();
      const [open, setOpen] = useState(false);
      const flagCarSharing = useRef<any>();
      const windowSize = useWindowSize();
      const setLoad = useSetAtom(loadPanelAtom);
      const checkParam = (condition: any) => {
        if (!condition.PlateNo) {
          if (condition.FrameNo.length < 6) {
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
            regexNormalCar.test(condition.PlateNo) == false &&
            regexSpecialCar.test(condition.PlateNo) == false
          ) {
            showDialog({
              title: "Thông báo",
              message:
                "Phải nhập chính xác biển số hoặc 6 kí tự Vin để tìm kiếm!",
            });

            return false;
          }
        }

        return true;
      };

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
          flagCarSharing.current = "1";
          formRef.current.setFormData(objCustomer_Car_Search);
          searchCondition.current = objCustomer_Car_Search;
        },
      }));

      const handleSearch = async (condition: any) => {
        const check = checkParam(condition);

        if (!check) {
          return;
        }
        setLoad(true);
        const currentCondition = {
          ...condition,
        };
        searchCondition.current = currentCondition;
        gridRef.current.refetchData();
        // const strPlateNo = commonUtils.strVaule(currentCondition.PlateNo);
        // const strFrameNo = commonUtils.strVaule(currentCondition.FrameNo);

        // if (
        //   commonUtils.iLength(strPlateNo) < 6 &&
        //   commonUtils.iLength(strPlateNo) < 8
        // ) {
        //   setLoad(false);
        //   toast.error(
        //     PopupSer_RO_FindCustomerCarSharing_Locale.Ser_RO_PU_FindCustomerCarSharing_PlateNo_FrameNo_Invalid
        //   );
        // } else {
        //   gridRef.current.refetchData();
        //   setLoad(false);
        // }
      };
      const fetchDataSpecial = async () => {
        setLoad(true);
        const resp = await api.Ser_CustomerCar_SearchPublicDL({
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
      const renderSearchForm = useCallback(
        (control: VisibilityControl) => {
          return (
            <SearchForm
              ref={formRef}
              data={searchCondition.current}
              onClose={() => control.close()}
              onSearch={handleSearch}
              isEnabled={commonUtils.isStringEquals(
                flagCarSharing.current,
                "0"
              )}
            />
          );
        },
        [searchCondition.current]
      );

      const handleSelectCustomer = (e: any) => {
        if (e && e.data) {
          onSelectedCustomer(
            e.data,
            commonUtils.strVaule(flagCarSharing.current)
          );
          onHidding();
        }
      };

      const onHidding = useCallback(() => {
        searchCondition.current = initSearchCondition;

        gridRef?.current?.setDefaultPaging();
        setOpen(false);
      }, [open]);

      return (
        <Popup
          visible={open}
          title={Ser_RO_Locale.Ser_RO_Popup_Customer_Car_Sharing}
          showCloseButton={true}
          onHiding={onHidding}
          wrapperAttr={{
            class: "search-car-popup",
          }}
          height={600}
          width={"95%"}
          // height={windowSize.width <= 1366 ? "99%" : "auto"}
          // maxHeight={"99%"}
          // resizeEnabled
          // position={"top"}
        >
          <WithSearchPanelLayout
            searchPanelRender={renderSearchForm}
            contentPanelRender={(control: VisibilityControl) => (
              <CarSharingSearchResult
                isLoading={false}
                toolbarItems={[
                  {
                    location: "before",
                    render: () => (
                      <Button
                        visible={!control.visible}
                        stylingMode={"text"}
                        onClick={() => control.toggle()}
                      >
                        <Icon name={"search"} />
                      </Button>
                    ),
                  },
                ]}
                ref={gridRef}
                storeKey="list-cus-car-sharing"
                fetchData={fetchDataSpecial}
                handleSelectCustomer={handleSelectCustomer}
              />
            )}
          />
          {/* <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: commonLocale.BUTTON_SELECT,
            type: "default",
            stylingMode: "contained",
            onClick: handleSelect,
          }}
        /> */}
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
  )
);
