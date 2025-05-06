import { ToolbarItemProps } from "@/types";
import { forwardRef, useRef } from "react";

import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { formatNumber } from "devextreme/localization";
import PopupThongTinCongViec from "./PopupThongTinCongViec";
import { useFindPhanCongLaoDongPopupLocale } from "./useFindPhanCongLaoDongPopupLocale";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  // handleSelectService: (e: any) => void;
  onRefetchData: () => void;
  onContentReady: () => void;
  onSelectionChanged: (e: any) => void;
  onCloseParentPopup: (data) => void;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { locale } = useFindPhanCongLaoDongPopupLocale();
    const { commonLocale } = useCommonLocale();

    const popupRef = useRef<any>(null);

    const {
      toolbarItems,
      fetchData,
      onRefetchData,
      onContentReady,
      onSelectionChanged,
      onCloseParentPopup,
    } = props;

    const handleEdit = (data) => {
      popupRef.current.showPopup({
        type: "update",
        data: data,
      });
    };

    const columns = [
      {
        dataField: "SerID",
        caption: "",
        width: 50,
        allowFiltering: false,
        allowSorting: false,
        visible: true,
        cellRender: ({ data }) => {
          return (
            <div className="flex items-center justify-center">
              <i
                className="dx-icon-rename cursor-pointer"
                onClick={() => handleEdit(data)}
              ></i>
            </div>
          );
        },
      },

      {
        dataField: "SerCode",
        caption: locale.SerCode,
        width: 150,
      },
      {
        dataField: "SerName",
        caption: locale.SerName,
        width: 150,
      },
      {
        dataField: "Model",
        caption: locale.Model,
        width: 150,
      },
      {
        dataField: "Price",
        caption: locale.Price,
        width: 100,
        cellRender: ({ data }) => formatNumber(data.Price, "#,##0"),
        dataType: "number",
        format: "#,##0",
      },
      {
        dataField: "VAT",
        caption: locale.VAT,
        width: 100,
        cellRender: ({ data }) => formatNumber(data.VAT, "#,##0"),
        dataType: "number",
      },
    ];

    const customToolbars = [
      {
        text: commonLocale.BUTTON_ADD,
        onClick: (e: any, ref: any) => {
          popupRef.current.showPopup({
            type: "add",
            data: null,
          });
        },
        shouldShow: (ref: any) => {
          return true;
        },
      },
    ];

    return (
      <div className="h-full">
        <GridViewOne
          ref={ref}
          keyExpr={"SerID"}
          dataSource={[]}
          columns={columns}
          allowSelection={false}
          storeKey={"popup-tim-kiem-phan-cong-lao-dong"}
          toolbarItems={toolbarItems ?? []}
          fetchData={fetchData}
          // onRowDblClick={handleSelectService}
          customToolbarItems={customToolbars}
          allowSelectAll={false}
          onContentReady={onContentReady}
          onSelectionChanged={onSelectionChanged}
        />

        <PopupThongTinCongViec
          ref={popupRef}
          onRefetchData={onRefetchData}
          onCloseParentPopup={onCloseParentPopup}
        />
      </div>
    );
  }
);
