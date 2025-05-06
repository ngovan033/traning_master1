import { useClientgateApi } from "@packages/api";
import { VisibilityControl } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";

import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { Icon } from "@packages/ui/icons";
import { Button } from "devextreme-react";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
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
import { SearchResults } from "../PopupTimKiemThongTinKhachHangVaXe/search-result";
import { Ser_CustomerCar } from "@/packages/types/master/Ser_CustomerCar";
import { Customer_Car_Search } from "@/packages/types/common/carServiceCommon";
import { useCommonUtils } from "@/packages/common/CommonUltils";
import { da } from "date-fns/locale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useFindCustomerCarPopupLocale } from "./useFindCustomerCarPopupLocale";
import { useLogicHandle } from "./logic/useLogicHandle";
import { match } from "ts-pattern";
import { useAuth } from "@/packages/contexts/auth";

interface IOptions {
  autoFetchData: boolean;
}

interface FindCustomerCarPopupProps {
  dataRef?: any;
  onSelectedCustomer: (customer: any[]) => void;
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

export const FindCustomerCarPopup = memo(
  forwardRef(
    (
      {
        onSelectedCustomer,
        options,
        isEmptyDataList,
        dataList,
        showPopup,
        objCustomer_Car_SearchCustom,
      }: FindCustomerCarPopupProps,
      ref
    ) => {
      const { locale } = useFindCustomerCarPopupLocale();
      const api = useClientgateApi();
      const showError = useSetAtom(showErrorAtom);
      const searchCondition = useRef<Partial<any>>(initSearchCondition);
      const gridRef = useRef<any>(null);
      const { commonLocale } = useCommonLocale();
      const formRef = useRef<any>();
      const [open, setOpen] = useState(false);
      const isEmty = useRef<any>();

      useImperativeHandle(ref, () => ({
        showPopup() {
          setOpen(true);
        },
        getGridRef() {
          return gridRef.current;
        },

        // Truyen data
        setData: (
          objCustomer_Car_Search: Customer_Car_Search,
          isFlagCallAPI: boolean
        ) => {
          setOpen(true);
          formRef.current.setFormData(objCustomer_Car_Search);

          isEmty.current = isFlagCallAPI;
          searchCondition.current = objCustomer_Car_Search;
        },
      }));

      const handleSearch = async (condition: any) => {
        const currentCondition = {
          ...condition,
        };
        searchCondition.current = currentCondition;

        gridRef.current.refetchData();
      };

      // console.log(117, isEmptyDataList);

      const fetchDataSpecial = async () => {
        const resp = await match(isEmty.current)
          .with(true, async () => {
            const response = await api.Ser_CustomerCar_SearchDL({
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
            return response;
          })
          .with(false, async () => {
            const response = await api.Ser_CustomerCar_SearchPublicDL({
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
            return response;
          })

          .otherwise(async () => {});

        if (resp?.isSuccess) {
          // gridRef?.current?.setPageData(resp);
          return resp;
        } else {
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
              isEmptyDataList={isEmty.current}
            />
          );
        },
        [searchCondition.current, isEmty.current]
      );

      const handleSelectCustomer = (e: any) => {
        if (e && e.data) {
          onSelectedCustomer(e.data);
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
          title={"Tìm kiếm thông tin khách hàng"}
          showCloseButton={true}
          onHiding={onHidding}
          wrapperAttr={{
            class: "search-car-popup",
          }}
          height={600}
          width={"95%"}
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
