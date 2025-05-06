import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import BreadcrumbDetail from "@/packages/ui/header/breadcrumb_detail/BreadcrumbDetail";
import { format } from "date-fns";
import { ScrollView } from "devextreme-react";
import { useEffect, useRef } from "react";
import { useCavityStatusDataSource } from "./components/datasource/useCavityStatusDataSource";
import CavitySearchForm from "./components/form-search/CavitySearchForm";
import CavityTable from "./components/table/CavityTable";
import "./TinhTrangKhoangHen.scss";

interface ISearch {
  PlateNo: string;
  DateTimeLine: string;
  FlagBDDK: string;
  FlagSCC: string;
  FlagSCDS: string;
  FlagSCK: string;
}

const TinhTrangKhoangHenPage = () => {
  const { t } = useI18n("SerApp");
  const tableRef = useRef<any>(null);

  const dataSource = useCavityStatusDataSource();
  const navigate = useNetworkNavigate();

  const handleNavigateHome = () => {
    navigate("/admin/DanhSachCuocHenDL", {
      replace: true,
    });
  };

  const onSearch = async ({
    PlateNo,
    DateTimeLine,
    FlagBDDK,
    FlagSCC,
    FlagSCDS,
    FlagSCK,
  }: ISearch) => {
    const resp = await dataSource.getForCavityDL({
      PlateNo,
      DateTimeLine,
      FlagBDDK,
      FlagSCC,
      FlagSCDS,
      FlagSCK,
    });

    tableRef.current?.setListData(resp);
  };

  useEffect(() => {
    onSearch({
      PlateNo: "",
      DateTimeLine: format(new Date(), "yyyy-MM-dd"),
      FlagBDDK: "",
      FlagSCC: "",
      FlagSCDS: "",
      FlagSCK: "",
    });
  }, []);

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      showScrollbar="never"
      // className="TinhTrangKhoangHen"
      useNative
    >
      <BreadcrumbDetail
        mainTitle="Danh sách cuộc hẹn"
        handleNavigateHome={handleNavigateHome}
        detailTitle={"Tình trạng khoang hẹn"}
      />

      <CavitySearchForm onSearch={onSearch} />
      <CavityTable ref={tableRef} />
    </ScrollView>
  );
};

export default TinhTrangKhoangHenPage;
