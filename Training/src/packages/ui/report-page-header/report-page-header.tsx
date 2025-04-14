import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import { Button } from "devextreme-react";
import { useSetAtom } from "jotai";

interface HeaderPartProps {
  title: string;
  onExportExcel: () => void
}

export const ReportPageHeader = (
  {
    onExportExcel,
    title,
  }: HeaderPartProps) => {
  const { t } = useI18n("Common");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };
  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{title}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>

        <Button
          // visible={checkPermision("BTN_BAOCAOXETHIEUBBBG_SEARCH")}
          stylingMode={"text"}
          icon={"/images/icons/search.svg"}
          type="default"
          hoverStateEnabled={false}
          focusStateEnabled={false}
          activeStateEnabled={false}
          text={t("Search")}
          onClick={handleToggleSearchPanel}
          className={"mx-1 search-pivot-btn"}
        />
        <BButton
          // visible={checkPermision("BTN_TT_DL_THEODOIDENGHIGT_TAOMOI")}
          label={t("ExportExcel")}
          // location={"before"}
          onClick={() => {
            onExportExcel()
          }}
        />
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
