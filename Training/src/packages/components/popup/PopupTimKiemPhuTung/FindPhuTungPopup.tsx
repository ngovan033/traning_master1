import { useClientgateApi } from "@packages/api";
import { VisibilityControl } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";

import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
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
import "./FindPhuTungPopup.scss";
import { SearchForm } from "./search-form";
import { SearchResults } from "./search-result";

interface FindPhuTungPopupProps {
  dataRef?: any;
  onSelectPart: (part: any) => void;
  getSelectedData?: () => any[];
  isMultiSelect?: boolean;
  isSingleSelection?: boolean;
}

const initSearchCondition = {
  KeyWord: "",
  Ft_PageIndex: 0,
  Ft_PageSize: 100,
};

export const FindPhuTungPopup = forwardRef(
  (
    {
      onSelectPart,
      getSelectedData,
      isMultiSelect = true,
      isSingleSelection = false,
    }: FindPhuTungPopupProps,
    ref
  ) => {
    const showError = useSetAtom(showErrorAtom);
    const { commonLocale } = useCommonLocale();
    const style = useStylingCommon();
    const { showDialog } = useDialog();

    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => ({
      showPopup() {
        setOpen(true);
      },
      searchByKeyWord(keyword: string) {
        setOpen(true);

        searchCondition.current.KeyWord = keyword;

        gridRef?.current?.refetchData();
      },
      searchByKeyWordOpen: async (keyword: string) => {
        searchCondition.current.KeyWord = keyword;
        const resp = await api.Ser_MST_Part_SearchForCommonDL({
          KeyWord: keyword,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });

        if (resp.isSuccess) {
          setOpen(true);
          gridRef?.current.setPageData(resp);
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

    const onRefetchData = () => {
      gridRef?.current?.refetchData();
    };

    const fetchData = async () => {
      const resp = await api.Ser_MST_Part_SearchForCommonDL({
        ...searchCondition.current,
        Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
      });

      if (resp.isSuccess) {
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

    const handleSelect = () => {
      if (isMultiSelect) {
        const listSelected = gridRef?.current?.getSelectedRowsData();

        if (!listSelected || listSelected.length == 0) {
          showDialog({
            title: "Thông báo",
            message: "Vui lòng chọn thông tin phụ tùng!",
          });
        } else {
          onSelectPart(listSelected);
          setOpen(false);
        }
      }
    };

    const handleSelectPart = ({ data }: any) => {
      if (!isMultiSelect) {
        onSelectPart(data);
        setOpen(false);
      }
    };

    const onHidding = () => {
      searchCondition.current = initSearchCondition;
      setOpen(false);
    };

    const onContentReady = () => {};

    const onCloseParentPopup = (data) => {
      onSelectPart([{ ...data, InStockQuantity: 0 }]);
      setOpen(false);
    };

    return (
      <Popup
        visible={open}
        title={"Tìm kiếm thông tin phụ tùng"}
        showCloseButton={true}
        onHiding={onHidding}
        wrapperAttr={{
          class: "search-car-popup PopupTimKiemChung",
        }}
        height={550}
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
              handleSelectPart={handleSelectPart}
              onRefetchData={onRefetchData}
              onContentReady={onContentReady}
              isMultiSelect={isMultiSelect}
              onCloseParentPopup={onCloseParentPopup}
              isSingleSelection={isSingleSelection}
            />
          )}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: commonLocale.BUTTON_SELECT,
            type: "default",
            stylingMode: "contained",
            onClick: handleSelect,
          }}
          visible={isMultiSelect}
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
