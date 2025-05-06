import { ToolbarItemProps } from "@/types";
import { forwardRef } from "react";

import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useFindCustomerLocale } from "./useFindCustomerLocale";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  onRefetchData: () => void;
  onSelectCustomer: (customer: any) => void;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { locale } = useFindCustomerLocale();
    const { commonLocale } = useCommonLocale();

    const {
      toolbarItems,
      isLoading,
      fetchData,
      onRefetchData,
      onSelectCustomer,
    } = props;

    const defaultColumns = [
      {
        dataField: "CusName",
        caption: "Tên khách hàng",

        width: 200,
      },
      {
        dataField: "Address",
        caption: "Địa chỉ",

        width: 150,
      },
      {
        dataField: "Tel",
        caption: "Điện thoại",

        width: 150,
      },
      {
        dataField: "Mobile",
        caption: "Di động",

        width: 150,
      },
      {
        dataField: "Email",
        caption: locale.Email,

        width: 80,
      },
    ];

    return (
      <div className="h-full">
        <GridViewOne
          ref={ref}
          keyExpr={"CusID"}
          dataSource={[]}
          columns={defaultColumns}
          allowSelection={false}
          storeKey={"customer-find-list"}
          toolbarItems={toolbarItems ?? []}
          fetchData={fetchData}
          onRowDblClick={onSelectCustomer}
          allowSelectAll={false}
          isHiddenCheckBox
        />
      </div>
    );
  }
);
