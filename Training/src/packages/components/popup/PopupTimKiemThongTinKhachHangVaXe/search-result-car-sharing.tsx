import { ToolbarItemProps } from "@/types";
import { forwardRef } from "react";

import {
  useCommonConfig,
  useCommonUtils,
} from "@/packages/common/CommonUltils";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { formatNumber } from "devextreme/localization";
import { useFindCustomerCarPopupLocale } from "./useFindCustomerCarPopupLocale";

interface CarSharingSearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  fetchData?: any;
  storeKey: string;
  handleSelectCustomer: (e: any) => void;
}

export const CarSharingSearchResult = forwardRef(
  (props: CarSharingSearchResultProps, ref: any) => {
    const commonUtils = useCommonUtils();
    const commonConfig = useCommonConfig();
    const formatDate = commonConfig.FormatDate;
    const formatInt = commonConfig.FormatInt;
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
        dataField: "PlateNo",
        caption: locale.PlateNo,
        minWidth: 150,
        width: 150,
      },
      {
        dataField: "TradeMarkCode",
        caption: locale.TradeMarkCode,
        minWidth: 150,
        width: 150,
      },
      {
        dataField: "ModelName",
        caption: locale.ModelName,
        minWidth: 150,
        width: 150,
      },
      {
        dataField: "FrameNo",
        caption: locale.FrameNo,
        minWidth: 200,
        width: 200,
      },
      {
        dataField: "ColorCode",
        caption: locale.ColorCode,
        minWidth: 100,
        width: 100,
      },
      {
        dataField: "WarrantyRegistrationDate",
        caption: locale.WarrantyRegistrationDate,
        minWidth: 140,
        width: 140,
      },
      {
        dataField: "WarrantyExpiresDate",
        caption: locale.WarrantyExpiresDate,
        minWidth: 140,
        width: 140,
      },
      {
        dataField: "CusConfirmedWarrantyDate",
        caption: locale.CusConfirmedWarrantyDate,
        minWidth: 140,
        width: 140,
        cellRender: ({ data }: any) => {
          return commonUtils.formatDate(
            data.CusConfirmedWarrantyDate,
            formatDate
          );
        },
      },
      {
        dataField: "WarrantyKM",
        caption: locale.WarrantyKM,
        minWidth: 140,
        width: 140,
        cellRender: ({ data }: any) => {
          //return commonUtils.formatNumber(data.WarrantyKM, formatInt);
          return formatNumber(data.WarrantyKM, "#,##0");
        },
      },
    ];

    const windowSize = useWindowSize();
    // console.log(
    //   86,
    //   fetchData().then((res) => console.log(res))
    // );

    return (
      <div className="h-full">
        <GridViewOne
          ref={ref}
          keyExpr={"FrameNo"}
          dataSource={[]}
          columns={columns}
          // isLoading={isLoading}

          customHeight={"500px"}
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
