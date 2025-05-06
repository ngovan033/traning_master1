import { ToolbarItemProps } from "@/types";
import { forwardRef, useRef } from "react";

import { FORMAT_NUMBER } from "@/packages/common/Validation_Rules";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { formatNumber } from "devextreme/localization";
import PopupThongTinPhuTung from "./PopupPhuTung";
import { useFindPhuTungLocale } from "./useFindPhuTungLocale";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  onRefetchData: () => void;
  onContentReady: () => void;
  isMultiSelect: boolean;
  handleSelectPart: (data: any) => void;
  onCloseParentPopup: (data) => void;
  isSingleSelection: boolean;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { locale } = useFindPhuTungLocale();
    const { commonLocale } = useCommonLocale();

    const popupRef = useRef<any>(null);

    const {
      toolbarItems,
      fetchData,
      onRefetchData,
      onContentReady,
      isMultiSelect,
      handleSelectPart,
      onCloseParentPopup,
      isSingleSelection,
    } = props;

    const handleEdit = (data) => {
      popupRef.current.showPopup({
        type: "update",
        data: data,
      });
    };

    const columns = [
      {
        dataField: "PartID",
        caption: "",
        width: 50,
        allowFiltering: false,
        allowSorting: false,
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
        dataField: "PartCode",
        caption: locale.PartCode,
        // minWidth: 250,
        width: 100,
      },
      {
        dataField: "VieName",
        caption: locale.VieName,
        // minWidth: 250,
        width: 100,
      },
      {
        dataField: "EngName",
        caption: locale.EngName,
        // minWidth: 150,
        width: 80,
      },
      {
        dataField: "Unit",
        caption: locale.Unit,
        // minWidth: 80,
        width: 80,
      },
      {
        dataField: "PriceEffect",
        caption: locale.Price,
        format: FORMAT_NUMBER.INT_NUMBER,
        // minWidth: 150,
        width: 100,
        cellRender: ({ data }) => (
          <div className="text-right">
            {formatNumber(data.PriceEffect, "#,##0")}
          </div>
        ),
      },
      {
        dataField: "VAT",
        caption: locale.VAT,
        // minWidth: 80,
        width: 80,
        dataType: "number",
      },
      {
        dataField: "Model",
        caption: locale.Model,
        // minWidth: 100,
        width: 100,
      },
      {
        dataField: "InStockQuantity",
        caption: locale.InStockQuantity,
        // minWidth: 200,
        width: 100,
        cellRender: ({ data }) => (
          <div className="text-right">
            {formatNumber(data.InStockQuantity, "#,##0.00")}
          </div>
        ),
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
          keyExpr={"PartID"}
          dataSource={[]}
          columns={columns}
          allowSelection={false}
          storeKey={"popup-danh-sach-phu-tung"}
          toolbarItems={toolbarItems ?? []}
          fetchData={fetchData}
          isHiddenCheckBox={!isMultiSelect}
          onRowDblClick={
            !isMultiSelect
              ? handleSelectPart
              : isSingleSelection
              ? handleSelectPart
              : () => {}
          }
          customToolbarItems={customToolbars}
          allowSelectAll={false}
          onContentReady={onContentReady}
          isSingleSelection={isSingleSelection}
        />

        <PopupThongTinPhuTung
          ref={popupRef}
          onRefetchData={onRefetchData}
          onCloseParentPopup={onCloseParentPopup}
        />
      </div>
    );
  }
);
