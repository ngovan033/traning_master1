import { useI18n } from "@/i18n/useI18n";
import { PageHeaderNoSearchLayout } from "@/packages/layouts/page-header-layout-2/page-header-nosearch-layout";
import { Button } from "devextreme-react";

interface IPageHeader {
  onExportExcel: () => void;
  onExportExcelDetail: () => void;
  toggleSearchPanel: () => void;
}

export const PageHeader = ({
  onExportExcel,
  toggleSearchPanel,
  onExportExcelDetail,
}: IPageHeader) => {
 

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{"Báo cáo công việc"}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          stylingMode={"text"}
          icon={"/images/icons/search.svg"}
          type="default"
          hoverStateEnabled={false}
          focusStateEnabled={false}
          activeStateEnabled={false}
          text={"Search"}
          onClick={toggleSearchPanel}
          className={"mx-1 search-pivot-btn"}
        />

        <Button
          stylingMode={"contained"}
          type="default"
          text={"ExportExcel"}
          onClick={onExportExcel}
          className={"mx-1"}
        />
        <Button
          stylingMode={"contained"}
          type="default"
          text={"Print"}
          onClick={onExportExcelDetail}
          className={"mx-1"}
        />
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
