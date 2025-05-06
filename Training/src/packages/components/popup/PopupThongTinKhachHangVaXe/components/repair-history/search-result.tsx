import { ColumnOptions, ToolbarItemProps } from "@/types";
import { forwardRef } from "react";

import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  dbClick: (e: any) => void;
  columns: ColumnOptions[];
  customToolbarItems: any;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const {
      toolbarItems,
      isLoading,
      fetchData,
      dbClick,
      columns,
      customToolbarItems,
    } = props;

    return (
      <div className="h-full">
        <GridViewOne
          ref={ref}
          keyExpr={"RONo"}
          dataSource={[]}
          columns={columns}
          allowSelection={false}
          storeKey={"repair-history"}
          toolbarItems={toolbarItems ?? []}
          fetchData={fetchData}
          isHiddenCheckBox
          onRowDblClick={dbClick}
          autoFetchData={false}
          customToolbarItems={customToolbarItems}
          loadPanel={false}
        />
      </div>
    );
  }
);
