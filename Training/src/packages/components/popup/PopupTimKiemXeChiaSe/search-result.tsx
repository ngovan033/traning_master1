import { ToolbarItemProps } from "@/types";
import { forwardRef } from "react";

import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { format } from "date-fns";
import { formatNumber } from "devextreme/localization";
import { useFindCustomerPopupLocale } from "./useFindCustomerPopupLocale";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  handleSelectCustomer: (e: any) => void;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { locale } = useFindCustomerPopupLocale();

    const { toolbarItems, fetchData, handleSelectCustomer, onPageChanged } =
      props;
    const columns = [
      {
        dataField: "PlateNo",
        caption: "Biển số",
        width: 150,
      },
      {
        dataField: "TradeMarkCode",
        caption: "Hiệu xe",
        width: 150,
      },
      {
        dataField: "ModelName",
        caption: "Model",
        width: 150,
      },
      {
        dataField: "FrameNo",
        caption: "Số khung",
        width: 200,
      },
      {
        dataField: "ColorCode",
        caption: "Mã màu",
        width: 100,
      },
      {
        dataField: "WarrantyRegistrationDate",
        caption: "Ngày đăng ký bảo hành",
        width: 140,
      },
      {
        dataField: "WarrantyExpiresDate",
        caption: "Ngày hết hạn bảo hành",
        width: 140,
      },
      {
        dataField: "CusConfirmedWarrantyDate",
        caption: "Ngày xác nhận bảo hành",
        width: 140,
        cellRender: ({ data }) => {
          if (!data.CusConfirmedWarrantyDate) return "";

          return format(new Date(data.CusConfirmedWarrantyDate), "yyyy-MM-dd");
        },
      },
      {
        dataField: "WarrantyKM",
        caption: "Số km bảo hành",
        width: 140,
        cellRender: ({ data }) => formatNumber(data.WarrantyKM, "#,##0"),
      },
    ];

    return (
      <div className="h-full">
        <GridViewOne
          ref={ref}
          keyExpr={"CarID"}
          dataSource={[]}
          columns={columns}
          allowSelection={false}
          storeKey={"popup-xe-chia-se"}
          toolbarItems={toolbarItems ?? []}
          fetchData={fetchData}
          isHiddenCheckBox
          onRowDblClick={handleSelectCustomer}
          autoFetchData={false}
          onPageChanged={onPageChanged}
          loadPanel={false}
        />
      </div>
    );
  }
);
