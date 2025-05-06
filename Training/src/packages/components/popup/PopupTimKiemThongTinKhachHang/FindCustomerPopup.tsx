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
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SearchForm } from "./search-form";
import { SearchResults } from "./search-result";

interface FindCustomerPopupProps {
  dataRef?: any;
  onSelectCustomer: (customer: any) => void;
}

const initSearchCondition = {
  CusName: "",
  Ft_PageIndex: 0,
  Ft_PageSize: 100,
};

export const FindCustomerPopup = forwardRef(
  ({ onSelectCustomer }: FindCustomerPopupProps, ref) => {
    const showError = useSetAtom(showErrorAtom);
    const { commonLocale } = useCommonLocale();

    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => ({
      showPopup() {
        setOpen(true);
      },
      searchWithCusName(cusName: string) {
        setOpen(true);

        searchCondition.current.CusName = cusName;

        gridRef?.current?.refetchData();
      },
    }));
    const gridRef = useRef<any>(null);
    const api = useClientgateApi();

    const searchCondition = useRef<Partial<any>>(initSearchCondition);

    const handleSearch = async (condition: any) => {
      const currentCondition = {
        // ...searchCondition.current,
        ...condition,
      };

      searchCondition.current = currentCondition;
      gridRef?.current?.refetchData();
    };

    const onRefetchData = () => {
      gridRef?.current?.refetchData();
    };

    const fetchData = async () => {
      const resp = await api.SerCustomer_SearchForCusInforDL({
        CusName: searchCondition.current.CusName,
        Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
      });

      if (resp.isSuccess) {
        const DataList =
          resp?.DataList?.map((item: any, index: number) => {
            return {
              ...item,
              STT: index + 1,
            };
          }) ?? [];

        resp.DataList = DataList;

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
      }
    };

    const renderSearchForm = useCallback(
      (control: VisibilityControl) => {
        return (
          <SearchForm
            data={searchCondition.current}
            onClose={() => control.close()}
            onSearch={handleSearch}
          />
        );
      },
      [searchCondition.current]
    );

    const onHidding = () => {
      searchCondition.current = initSearchCondition;
      setOpen(false);
    };

    const handleSelectCustomer = (e: any) => {
      if (e && e.data) {
        onSelectCustomer(e.data);
        onHidding();
      }
    };

    return (
      <Popup
        visible={open}
        title={"Tìm kiếm thông tin khách hàng"}
        showCloseButton={true}
        onHiding={onHidding}
        wrapperAttr={{
          class: "search-car-popup PopupTimKiemChung",
        }}
        height={550}
        width={"95%"}
      >
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
              onSelectCustomer={handleSelectCustomer}
              onRefetchData={onRefetchData}
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
