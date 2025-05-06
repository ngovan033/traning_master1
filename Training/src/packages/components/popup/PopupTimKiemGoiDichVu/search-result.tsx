import { ToolbarItemProps } from "@/types";
import { forwardRef } from "react";

import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useFindSer_ServicePackagePopupLocale } from "./useFindSer_ServicePackagePopupLocale";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  handleSelectSer_ServicePackage: (e: any) => void;
  autoFetchData: boolean;
  storeKey: string;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { locale } = useFindSer_ServicePackagePopupLocale();

    const {
      toolbarItems,
      isLoading,
      fetchData,
      handleSelectSer_ServicePackage,
      autoFetchData,
    } = props;
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

    const windowSize = useWindowSize();

    return (
      <div className="h-full">
        <GridViewOne
          ref={ref}
          keyExpr={"CusID"}
          dataSource={[]}
          enablePaging={"yes"}
          columns={columns}
          customHeight={500}
          allowSelection={false}
          storeKey={props.storeKey}
          toolbarItems={toolbarItems ?? []}
          fetchData={fetchData}
          isHiddenCheckBox
          onRowDblClick={handleSelectSer_ServicePackage}
        />
      </div>
    );
  }
);
