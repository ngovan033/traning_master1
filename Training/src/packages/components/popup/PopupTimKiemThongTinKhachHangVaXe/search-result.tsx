import { ToolbarItemProps } from "@/types";
import { forwardRef } from "react";

import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useFindCustomerCarPopupLocale } from "./useFindCustomerCarPopupLocale";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  storeKey: string;
  handleSelectCustomer: (e: any) => void;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { locale } = useFindCustomerCarPopupLocale();

    const {
      toolbarItems,
      isLoading,
      fetchData,
      handleSelectCustomer,
      storeKey,
    } = props;
    const columns = [
      {
        dataField: "CusName",
        caption: locale.CusName,
        minWidth: 170,
        width: 170,
      },
      {
        dataField: "CusTel",
        caption: locale.CusTel,
        minWidth: 120,
        width: 120,
      },
      {
        dataField: "Address",
        caption: locale.Address,
        minWidth: 190,
        width: 190,
      },
      {
        dataField: "PlateNo",
        caption: locale.PlateNo,
        minWidth: 120,
        width: 120,
      },
      {
        dataField: "ModelName",
        caption: locale.ModelName,
        minWidth: 120,
        width: 120,
      },
      {
        dataField: "FrameNo",
        caption: locale.FrameNo,
        minWidth: 120,
        width: 120,
      },
      {
        dataField: "ColorCode",
        caption: locale.ColorCode,
        minWidth: 100,
        width: 100,
      },
      {
        dataField: "WarrantyRegistrationDate", // Mã nhãn hiệu
        caption: locale.WarrantyRegistrationDate,
        minWidth: 100,
        width: 100,
      },
    ];

    return (
      <div className="">
        <GridViewOne
          ref={ref}
          keyExpr={"FrameNo"}
          dataSource={[]}
          columns={columns}
          // isLoading={isLoading}
          customHeight={480}
          allowSelection={false}
          storeKey={storeKey}
          toolbarItems={toolbarItems ?? []}
          fetchData={fetchData}
          autoFetchData={false}
          isHiddenCheckBox
          onRowDblClick={handleSelectCustomer}
        />
      </div>
    );
  }
);
