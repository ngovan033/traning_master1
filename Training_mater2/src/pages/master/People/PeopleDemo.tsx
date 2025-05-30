import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import BreadcrumbSearch from "@/packages/ui/header_search/BreadcrumbSearch";
import SearchForm from "../SerCavity/search-form/search-form";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import thongtinJson from "src/pages/master/People/thongtinJson.json";
import { useEffect, useRef, useState } from "react";
import { useGridColumnsThongTin } from "./use-columnsThongtin";
import SearchFormPeople from "./searchPeople";
import { DataGrid } from "devextreme-react";
import PopupFromGrid, {
  IAPI,
  IGroupColumnPopup,
  ITitlePopup,
} from "@/packages/components/popup/PopupFromGrid/PopupFromGrid";
import { showDialog, simpleConfirm } from "@/packages/ui/dialogs/dialog-utils";

import { format } from "date-fns";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import { useDialog } from "@/packages/hooks/useDiaglog";

export const PeopleDemo = () => {
  const [isAsc, setIsAsc] = useState(true); // mặc định A-Z
  const isAscendingRef = useRef(true);
  const [dataSource, setDataSource] = useState<any[]>([]); // nếu bạn chưa có
  const [hasSorted, setHasSorted] = useState(false);
  let gridRef: any = useRef<DataGrid | null>(null);
  const popupRef = useRef<any>(null);
  const { showDialog } = useDialog();

  interface DataItem {
    name: string;
    age: number;
    dateOfBirth: string;
  }

  interface Thongtin {
    DataList: DataItem[];
    PageCount: number;
    PageIndex: number;
    ItemCount: number;
    PageSize: number;
    isSuccess: boolean;
  }

  const [thongtin, setThongtin] = useState<Thongtin | undefined>(undefined);
  useEffect(() => {
    setThongtin(thongtinJson); // gán dữ liệu từ file json
  }, []);
  console.log(thongtin);

  interface SearchPeopleParam {
    name?: string;
    age?: number;
    dateOfBirth?: string;
    Ft_PageIndex?: number;
    Ft_PageSize?: number;
  }

  const searchCondition = useRef<Partial<SearchPeopleParam>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    name: "",
    age: undefined,
    dateOfBirth: "",
  });

  const fetchData = (): Promise<Thongtin> => {
    return new Promise((resolve, reject) => {
      if (!thongtin) {
        return reject(new Error("Dữ liệu thongtin không tồn tại"));
      }

      const { name, age, dateOfBirth } = searchCondition.current;

      const dataList = thongtin.DataList || [];

      const filtered = dataList.filter((item) => {
        return (
          (name
            ? item.name.toLowerCase().includes(name.toLowerCase())
            : true) &&
          (age ? item.age === Number(age) : true) &&
          (dateOfBirth ? item.dateOfBirth === dateOfBirth : true)
        );
      });

      resolve({
        ...thongtin,
        DataList: filtered,
        ItemCount: filtered.length,
      });
    });
  };

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };

  const handleSearch = async (data: any) => {
    console.log("Search data:", data);
    searchCondition.current = {
      ...searchCondition.current,
      ...data,
    };
    await onRefetchData();
  };
  const handleAdd = () => {
    popupRef.current?.showPopup({
      type: "create",
      data: null,
    });
  };
  const columns = useGridColumnsThongTin({ data: [], popupRef });
  const title_popup: ITitlePopup = {
    title_create: "Tạo mới thông tin",
    title_detail: "Chi tiết thông tin",
  };
  const handleDetail = (data: any) => {
    popupRef.current?.showPopup({
      type: "detail",
      data: data,
    });
  };
  const api_popup: IAPI = {
    api_create: async (formData) => {
      const newItem = {
        name: formData.name,
        age: formData.age,
        dateOfBirth: format(new Date(formData.dateOfBirth), "yyyy-MM-dd"),
      };

      setThongtin((prev) => {
        if (!prev) {
          return {
            DataList: [newItem],
            PageCount: 1,
            PageIndex: 0,
            ItemCount: 1,
            PageSize: 100,
            isSuccess: true,
          };
        }

        const updatedList = [...prev.DataList, newItem];

        return {
          ...prev,
          DataList: updatedList,
          ItemCount: updatedList.length,
          PageCount: Math.ceil(updatedList.length / prev.PageSize),
          isSuccess: true,
        };
      });

      const result = { ...newItem, isSuccess: true };
      console.log(result);

      return Promise.resolve(result);
    },

    api_update: async (formData) => {
      setThongtin((prev) => {
        if (!prev) return prev;

        const updatedList = prev.DataList.map((item) => {
          if (item.name === formData.name) {
            return {
              ...item,
              name: formData.name ?? item.name,
              age: formData.age ?? item.age,
              dateOfBirth: formData.dateOfBirth ?? item.dateOfBirth,
            };
          }
          return item;
        });

        return {
          ...prev,
          DataList: updatedList,
          isSuccess: true,
        };
      });

      const updatedItem = {
        ...formData,
        isSuccess: true,
      };
      console.log(updatedItem);

      return Promise.resolve(updatedItem);
    },

    api_delete: async (formData) => {
      setThongtin((prev) => {
        if (!prev) return prev;

        const filteredList = prev.DataList.filter(
          (item) => item.name !== formData.name
        );

        return {
          ...prev,
          DataList: filteredList,
          ItemCount: filteredList.length,
          PageCount: Math.ceil(filteredList.length / prev.PageSize),
          isSuccess: true,
        };
      });

      // Trả về thông điệp xóa thành công cùng với isSuccess
      return Promise.resolve({
        message: "Deleted successfully",
        isSuccess: true,
      });
    },
  };
  const column_popup: IGroupColumnPopup[] = [
    {
      columns: [
        {
          dataField: "name",
          caption: "Tên",
          editorType: "dxTextBox",
          required: true,
          rules: {
            required: "Vui lòng nhập tên!",
          },
          editorOptions: {
            disabled: (data: any) => {
              return data?.Type == "detail";
            },
          },
        },
        {
          dataField: "age",
          caption: "Tuổi",
          editorType: "dxNumberBox",
          required: true,
          rules: {
            required: "Vui lòng nhập tuổi!",
          },
        },
        {
          dataField: "dateOfBirth",
          caption: "Ngày sinh",
          editorType: "dxDateBox",
          required: true,
          rules: {
            required: "Vui lòng chọn ngày sinh!",
          },
          editorOptions: {
            type: "date",
            displayFormat: "yyyy-MM-dd",
          },
        },
      ],
    },
  ];
  const preSubmit = (formData: any) => {
    if (formData.age > 100) {
      simpleConfirm("Tuổi không được lớn hơn 100!", () => {});
      return false;
    }

    return true;
  };
  const handleOrderBy = async (selectedData: any[]) => {
    if (selectedData.length === 0) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng chọn dữ liệu để sắp xếp!",
      });
      return;
    }

    // Lưu lại các GroupCode đang được chọn
    const selectedKeys = selectedData.map((item) => item.GroupCode);

    // Sắp xếp theo A-Z hoặc Z-A
    const sortedData = [...selectedData].sort((a, b) => {
      const codeA = a.GroupCode?.toUpperCase() ?? "";
      const codeB = b.GroupCode?.toUpperCase() ?? "";
      return isAsc
        ? codeA.localeCompare(codeB) // A-Z
        : codeB.localeCompare(codeA); // Z-A
    });

    // Đẩy các dòng được chọn (đã sắp xếp) lên đầu bảng
    setDataSource((prev: any[]) => {
      const remaining = prev.filter(
        (item) => !selectedKeys.includes(item.GroupCode)
      );
      return [...sortedData, ...remaining];
    });

    // Re-select lại các dòng đã chọn sau khi setDataSource
    setTimeout(() => {
      gridRef.current?._instance?.selectRows?.(selectedKeys, false);
    }, 0);

    setIsAsc(!isAsc);
  };
  const toolbarItems: GridCustomerToolBarItem[] = [
    {
      text: "Sắp xếp",
      onClick: async (e: any, ref: any) => {
        if (ref) {
          const selectedData =
            ref?.current?._instance?.getSelectedRowsData() ?? [];
          const selectedKeys =
            ref?.current?._instance?.getSelectedRowKeys() ?? [];

          // Gọi hàm sắp xếp với dữ liệu đã chọn
          await handleOrderBy(selectedData);
        }
      },
      shouldShow: (ref: any) => true,
    },
  ];
  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name="Header">
        <BreadcrumbSearch
          title="Quản lý thông tin"
          showSearch={false}
          buttonOptions={{
            showButtonAdd: true,
            onClickButtonAdd: handleAdd,
          }}
        ></BreadcrumbSearch>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <ContentSearchPanelLayout searchPermissionCode="">
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchFormPeople
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>

          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              dataSource={[]} // cars
              columns={columns}
              allowSelection={false}
              fetchData={fetchData}
              showSTT={true}
              autoFetchData={true}
              storeKey={"people"}
              customToolbarItems={toolbarItems}
              onRowDblClick={(e) => handleDetail(e.data)}
            />
            <PopupFromGrid
              ref={popupRef}
              onRefetchData={onRefetchData}
              groupColumn={column_popup}
              api={api_popup}
              preSubmit={preSubmit}
              title={title_popup}
              firstDefaultValue
            ></PopupFromGrid>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
