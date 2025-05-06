import { useClientgateApi } from "@packages/api";
import { VisibilityControl } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";

import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import CollapseLeftIcon from "@/packages/ui/icons/svg/collapse-left";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./PopupTimKiemXeChiaSe.scss";
import { SearchForm } from "./search-form";
import { SearchResults } from "./search-result";

interface PopupTimKiemXeChiaSeProps {
  onSelectedCustomer: (customer: any[]) => void;
  title?: string;
  viewAll?: boolean;
}

const initSearchCondition = {
  FrameNo: "",
  PlateNo: "",
  Ft_PageIndex: 0,
  Ft_PageSize: 100,
};

export const PopupTimKiemXeChiaSe = forwardRef(
  (
    {
      onSelectedCustomer,
      title = "Tìm kiếm thông tin xe chia sẻ",
      viewAll = false,
    }: PopupTimKiemXeChiaSeProps,
    ref
  ) => {
    const style = useStylingCommon();
    const showError = useSetAtom(showErrorAtom);
    const { commonLocale } = useCommonLocale();
    const popupRef = useRef<any>(null);
    const { DealerCode } = usePermissions();
    const searchCondition = useRef<Partial<any>>(initSearchCondition);
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      showPopup(plateNo: any, frameNo?: any) {
        setOpen(true);

        searchCondition.current.PlateNo = plateNo;
        searchCondition.current.FrameNo = frameNo;

        // refetchData();
      },
      showPopupOnly(plateNo?: string) {
        searchCondition.current.PlateNo = plateNo;

        setOpen(true);
      },
    }));
    const gridRef = useRef<any>(null);
    const api = useClientgateApi();
    const { showDialog } = useDialog();

    const handleSearch = async (condition: any) => {
      const currentCondition = {
        ...condition,
      };

      searchCondition.current = currentCondition;
      gridRef?.current?.refetchData();
    };

    const fetchData = async () => {
      const resp = await api.Ser_CustomerCar_SearchHQ({
        // ...searchCondition.current,
        PlateNo: searchCondition.current.PlateNo,
        FrameNo: searchCondition.current.FrameNo,
        Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
      });

      if (resp.isSuccess) {
        const dataList = viewAll
          ? resp?.DataList?.map((item: any, index: number) => {
              return {
                ...item,
                STT: index + 1,
              };
            })
          : resp?.DataList?.filter((item: any) => {
              return item.DealerCode != DealerCode;
            })?.map((item: any, index: number) => {
              return {
                ...item,
                STT: index + 1,
              };
            });

        return {
          ...resp,
          DataList: dataList,
          ItemCount: dataList?.length ?? 0,
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

    const handleSelectCustomer = (e: any) => {
      if (e && e.data) {
        onSelectedCustomer(e.data);
        onHidding();
      }
    };

    const onHidding = () => {
      searchCondition.current = initSearchCondition;
      gridRef.current?.setData([]);
      setOpen(false);
    };

    const onPageChanged = (number: number) => {
      gridRef?.current?.refetchData(number);
    };

    return (
      <Popup
        visible={open}
        title={title}
        showCloseButton={true}
        onHiding={onHidding}
        wrapperAttr={{
          class: "search-car-popup PopupTimKiemChung",
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
              fetchData={fetchData}
              handleSelectCustomer={handleSelectCustomer}
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
