import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";

export const ThongKeCongViecTheoTo = () => {
  return(
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <BreadcrumbSearch
          title={"Báo cáo công việc theo tổ"}
          showSearch={false}
          buttonOptions={{
            showButtonAdd: false,
            // onClickButtonAdd: handleAdd,
            // listButton: [
            //   {
            //     text: "Xuất excel",
            //     onClick: handleExport,
            //     // visible: !isHQ(),
            //   },
            //   {
            //     text: "In",
            //     onClick: handlePrint,
            //   },
            // ],
          }}
        ></BreadcrumbSearch>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            {/* <div className={"w-[310px] h-full"}>
              <SearchForm
                data={searchCondition.current}
                onSearch={handleSearch}
              />
            </div> */}
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            {/* <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]} // cars
              columns={columns}
              fetchData={fetchData}
              keyExpr={"RONO"}
              autoFetchData={false}
              allowSelection={false}
              customToolbarItems={[]}
              isHidenHeaderFilter
              storeKey={"ReportROByDate-columns"}
              // customHeight={windowSize.height - 120}
              editMode={false}
              defaultPageSize={9999999}
              isHiddenCheckBox
            >
              <Summary>
                <TotalItem
                  name="SummaryREVENUE"
                  // cssClass="count__summary"
                  column={"REVENUE"}
                  summaryType={"sum"}
                  customizeText={(itemInfo: {
                    value: string | number | any;
                    valueText: string;
                  }) => {
                    // const dataSource = gridRef.current.getData();
                    const dblResult = Math.round(+itemInfo.value); // SummaryCommon(dataSource);
                    // const total = dataSource?.reduce(
                    //   (prev: number, cur: any) => {
                    //     return prev + +cur.REVENUE;
                    //   },
                    //   0
                    // );
                    return `${"Tổng"}: ${convertMoneyVND(dblResult)}`;
                  }}
                ></TotalItem>
              </Summary>
            </GridViewOne>
            <GetDataWH
              onSearch={handleSearchWH}
              formRef={formRef}
              checkBoxRef={checkBoxRef}
            /> */}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  )
}