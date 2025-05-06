import { ToolbarItemProps } from "@/types";
import { forwardRef, useRef } from "react";

import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useFindDichVuPopupLocale } from "./useFindDichVuPopupLocale";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  handleSelectService: (e: any) => void;
  onRefetchData: () => void;
  onContentReady: () => void;
  onSelectionChanged: (e: any) => void;
  onCloseParentPopup: (data) => void;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { locale } = useFindDichVuPopupLocale();
    const { commonLocale } = useCommonLocale();

    const popupRef = useRef<any>(null);

    const {
      toolbarItems,
      fetchData,
      onRefetchData,
      onContentReady,
      onSelectionChanged,
      onCloseParentPopup,
      handleSelectService,
    } = props;

    const handleEdit = (data) => {
      popupRef.current.showPopup({
        type: "update",
        data: data,
      });
    };

    const columns = [
      {
        dataField: "ServicePackageID",
        caption: locale.ServicePackageID,
        visible: false,
        minWidth: 150,
        width: 150,
      },
      {
        dataField: "ServicePackageNo",
        caption: locale.ServicePackageNo,
        minWidth: 150,
        width: 150,
      },
      {
        dataField: "ServicePackageName",
        caption: locale.ServicePackageName,
        minWidth: 150,
        width: 150,
      },
      {
        dataField: "Creator",
        caption: locale.Creator,
        minWidth: 150,
        width: 150,
      },
      {
        dataField: "CreatedDate",
        caption: locale.CreatedDate,
        minWidth: 100,
        width: 100,
      },
      {
        dataField: "Description",
        caption: locale.Description,
        minWidth: 250,
        width: 250,
      },
      {
        dataField: "IsUserBasePriceCaption",
        caption: locale.IsUserBasePriceCaption,
        minWidth: 150,
        width: 150,
      },
    ];

    const customToolbars = [];

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
          onRowDblClick={handleSelectService}
          customToolbarItems={customToolbars}
          allowSelectAll={false}
          onContentReady={onContentReady}
          onSelectionChanged={onSelectionChanged}
          autoFetchData={true}
          isHiddenCheckBox
        />
      </div>
    );
  }
);
