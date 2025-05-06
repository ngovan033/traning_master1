import { useClientgateApi } from "@packages/api";
import { VisibilityControl } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";

import {
  useCommonConfig,
  useCommonUtils,
} from "@/packages/common/CommonUltils";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { ISer_ServicePackage_Search } from "@/packages/types/common/carServiceCommon";
import { Icon } from "@packages/ui/icons";
import { Button } from "devextreme-react";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SearchForm } from "../PopupTimKiemGoiDichVu/search-form";
import { SearchResults } from "../PopupTimKiemGoiDichVu/search-result";
import { useFindSer_ServicePackagePopupLocale } from "./useFindSer_ServicePackagePopupLocale";

interface IOptions {
  autoFetchData: boolean;
}

interface FindSer_ServicePackagePoupProps {
  dataRef?: any;
  onSelectedSer_ServicePackage: (customer: any[]) => void;
  options: IOptions;
}

const initSearchCondition = {
  ServicePackageID: "",
  ServicePackageNo: "",
  ServicePackageName: "",
  Ft_PageIndex: 0,
  Ft_PageSize: 123456000000,
};

export const FindSer_ServicePackagePoup = forwardRef(
  (
    { onSelectedSer_ServicePackage, options }: FindSer_ServicePackagePoupProps,
    ref
  ) => {
    const commonUtils = useCommonUtils();
    const commonConfig = useCommonConfig();
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const searchCondition = useRef<Partial<any>>(initSearchCondition);
    const gridRef = useRef<any>(null);
    const { commonLocale } = useCommonLocale();
    const { locale } = useFindSer_ServicePackagePopupLocale();
    const formRef = useRef<any>();
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
      setData: (objSer_ServicePackage_Search: ISer_ServicePackage_Search) => {
        setOpen(true);
        searchCondition.current = objSer_ServicePackage_Search;
        formRef.current.setFormData(objSer_ServicePackage_Search);
        handleSearch(objSer_ServicePackage_Search);
      },
    }));

    const handleSearch = async (condition: any) => {
      const currentCondition = {
        ...condition,
      };
      searchCondition.current = currentCondition;
      gridRef.current.refetchData();
    };
    const renderSearchForm = useCallback(
      (control: VisibilityControl) => {
        return (
          <SearchForm
            ref={formRef}
            data={searchCondition.current}
            onClose={() => control.close()}
            onSearch={handleSearch}
          />
        );
      },
      [searchCondition.current]
    );

    const handleSelectSer_ServicePackage = (e: any) => {
      if (e && e.data) {
        onSelectedSer_ServicePackage(e.data);
        onHidding();
      }
    };

    const onHidding = () => {
      searchCondition.current = initSearchCondition;
      setOpen(false);
    };
    const fetchData = async () => {
      setLoad(true);
      const currentCondition = {
        ...searchCondition.current,
      };
      const resp =
        await api.Ser_ServicePackage_Ser_ServicePackage_Get_SearchCreateRO_DL({
          ...currentCondition,
          Ft_PageIndex:
            gridRef?.current?.getDxInstance().pageIndex() ??
            commonConfig.Ft_PageIndex,
          Ft_PageSize:
            gridRef?.current?.getDxInstance().pageSize() ??
            commonConfig.Ft_PageSize_Max,
        });
      if (resp.isSuccess) {
        const result = resp.DataList ?? [];
        if (
          resp.DataList !== undefined &&
          resp.DataList !== null &&
          resp.DataList.length > 0
        ) {
          for (let i = 0; i < resp.DataList.length; i++) {
            let strIsUserBasePrice = commonUtils.strVaule(
              resp.DataList[i].IsUserBasePrice
            );
            if (commonUtils.isStringEquals(strIsUserBasePrice, "0")) {
              //Price by service package: Giá theo gói dịch vụ
              resp.DataList[i].IsUserBasePriceCaption =
                locale.PriceByServicePackage;
              resp.DataList[i].IsUserBasePriceCaption =
                resp.DataList[i].strUserBasePrice;
            } else if (commonUtils.isStringEquals(strIsUserBasePrice, "1")) {
              //Price by service package: Giá chung
              //resp.DataList[i].IsUserBasePriceCaption = locale.PriceCommon;
              resp.DataList[i].IsUserBasePriceCaption =
                resp.DataList[i].strUserBasePrice;
            } else if (commonUtils.isStringEquals(strIsUserBasePrice, "2")) {
              //Price by service package
              //resp.DataList[i].IsUserBasePriceCaption = locale.PriceByServicePackage;
              resp.DataList[i].IsUserBasePriceCaption =
                resp.DataList[i].strUserBasePrice;
            }
          }
          //Giá theo gói dịch vụ
        }
        setLoad(false);
        return resp;
      } else {
        setLoad(false);
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

    return (
      <Popup
        visible={open}
        title={locale.Ser_ServicePackage_Search}
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
              fetchData={fetchData}
              handleSelectSer_ServicePackage={handleSelectSer_ServicePackage}
              storeKey={"ser-service-package-find-list"}
              autoFetchData={options.autoFetchData}
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
