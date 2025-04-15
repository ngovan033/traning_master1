import { AdminContentLayout } from "@/packages/layouts/admin-content-layout"
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout"
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch"
import SearchForm from "../SerCavity/search-form/search-form"
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one"
import thongtin from "src/pages/master/People/thongtin.json"
export const PeopleDemo = () => {
  const data = thongtin

    const handleSearch = async (data: any) => {
    thongtin = {
      ...thongtin,
      ...data,
    };

  };
  return(
  <AdminContentLayout className={"dealer-management"}>
    <AdminContentLayout.Slot name="Header">
      <BreadcrumbSearch
        title="Quản lý thông tin"
        showSearch={false}
        buttonOptions={{
          showButtonAdd: true,
         
        }}
      ></BreadcrumbSearch>
    </AdminContentLayout.Slot>
    <AdminContentLayout.Slot name="Content">
      <ContentSearchPanelLayout searchPermissionCode="">
        <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
          <SearchForm
             data = {data}
              onSearch={handleSearch} 

          />
        </ContentSearchPanelLayout.Slot>

        <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
          {/* <GridViewOne
            ref={gridRef}
            dataSource={[]} // cars
            columns={columns}
            allowSelection={false}

          /> */}
         
        </ContentSearchPanelLayout.Slot>
      </ContentSearchPanelLayout>
    </AdminContentLayout.Slot>
  </AdminContentLayout>
  )
}