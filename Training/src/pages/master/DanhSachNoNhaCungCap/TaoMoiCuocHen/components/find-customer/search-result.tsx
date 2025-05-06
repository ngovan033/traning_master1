import { ColumnOptions, ToolbarItemProps } from "@/types";
import { forwardRef } from "react";

import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { nanoid } from "nanoid";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  handleSelectCustomer: (e: any) => void;
  columns: ColumnOptions[];
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const {
      toolbarItems,
      isLoading,
      fetchData,
      handleSelectCustomer,
      columns,
    } = props;

    return (
      <div className="h-full">
        <GridViewOne
          ref={ref}
          keyExpr={"CusID"}
          dataSource={[]}
          columns={columns}
          allowSelection={false}
          storeKey={nanoid()}
          toolbarItems={toolbarItems ?? []}
          fetchData={fetchData}
          isHiddenCheckBox
          onRowDblClick={handleSelectCustomer}
          autoFetchData={false}
        />
      </div>
    );
  }
);
