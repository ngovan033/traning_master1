import { useClientgateApi } from "@/packages/api";
import { FindPhuTungPopup } from "@/packages/components/popup/PopupTimKiemPhuTung/FindPhuTungPopup";
import { useFindPhuTungLocale } from "@/packages/components/popup/PopupTimKiemPhuTung/useFindPhuTungLocale";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import SearchPrimaryIcon from "@/packages/ui/icons/svg/search-primary";
import { ColumnOptions } from "@/types";
import { NumberBox, TextBox } from "devextreme-react";
import { formatNumber } from "devextreme/localization";
import { forwardRef, useImperativeHandle, useRef } from "react";

const PhuTungGrid = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    getData: () => {
      return gridRef.current?.getData();
    },
    setData: (data) => {
      gridRef.current?.setData(data);
    },
  }));

  const popupPhuTungRef = useRef<any>(null);
  const { commonLocale } = useCommonLocale();
  const { isHQ } = usePermissions();

  const isNPP = isHQ();

  const gridRef = useRef();
  const textBoxRef = useRef();

  const { locale } = useFindPhuTungLocale();
  const api = useClientgateApi();

  const columns: ColumnOptions[] = [
    {
      dataField: "PartCode",
      caption: locale.PartCode,
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      width: 200,
    },
    {
      dataField: "VieName",
      caption: locale.VieName,
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      width: 200,
    },
    {
      dataField: "Unit",
      caption: locale.Unit,
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      width: 100,
    },
    {
      dataField: "InStockQuantity",
      caption: locale.InStockQuantity,
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      width: 150,
      dataType: "number",
      format: "#,##0.00",
    },
    {
      dataField: "Quantity",
      caption: locale.Quantity,
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      dataType: "number",
      cellRender: ({ data }) => {
        if (isNPP) {
          return formatNumber(data.Quantity, "#,##0.00");
        }

        return (
          <NumberBox
            defaultValue={data.Quantity}
            onValueChange={(value) => handleChangeQuantity(data.PartID, value)}
            format="#,##0.00"
            min={0}
          />
        );
      },
      width: 150,
    },
    {
      dataField: "Note",
      caption: locale.Note,
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      cellRender: ({ data }) => {
        if (isNPP) {
          return data.Note;
        }

        return (
          <TextBox
            defaultValue={data.Note}
            onValueChange={(value) => handleChangeNote(data.PartID, value)}
          />
        );
      },
      width: 200,
    },
  ];

  const handleChangeQuantity = (PartID: string, value: number) => {
    const currentListData = gridRef.current?.getData();

    const newListData = currentListData.map((item) => {
      if (item.PartID == PartID) {
        return {
          ...item,
          Quantity: value,
        };
      }

      return item;
    });

    gridRef.current?.setData(newListData);
  };

  const handleChangeNote = (PartID: string, value: string) => {
    const currentListData = gridRef.current?.getData();

    const newListData = currentListData.map((item) => {
      if (item.PartID == PartID) {
        return {
          ...item,
          Note: value,
        };
      }

      return item;
    });

    gridRef.current?.setData(newListData);
  };

  const handleOpenPopup = async () => {
    const keyWord = textBoxRef.current?.instance.option("value");

    const resp = await api.Ser_MST_Part_SearchForCommonDL({
      KeyWord: keyWord,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 2,
    });

    if (resp.isSuccess) {
      if (resp.DataList && resp.DataList.length != 1) {
        popupPhuTungRef.current.searchByKeyWord(keyWord);
        return;
      }

      if (resp.DataList && resp.DataList.length == 1) {
        onSelectPart(resp.DataList);
        return;
      }
    }

    popupPhuTungRef.current.searchByKeyWord(keyword);
  };

  const onSelectPart = (part: any[]) => {
    const currentListData = gridRef.current?.getData();

    // find duplicate, if duplicate, return newly
    const newListData =
      part
        .filter((item) => {
          return !currentListData.find((x) => x.PartID == item.PartID);
        })
        ?.map((item) => {
          return {
            ...item,
            Quantity: 1,
            Note: "",
          };
        }) ?? [];

    const reuslt = [...currentListData, ...newListData].map((item, index) => {
      return {
        ...item,
        STT: index + 1,
      };
    });

    gridRef.current?.setData(reuslt);
  };

  const getSelectedData = () => {
    return gridRef.current?.getData();
  };

  const handleDelete = (e) => {
    const currentList = gridRef.current?.getData();

    const currentVinNo = e.row.data;

    const newList = currentList
      ?.filter((item) => currentVinNo.PartID != item.PartID)
      ?.map((item, index) => {
        return {
          ...item,
          STT: index + 1,
        };
      });

    gridRef.current?.setData(newList);
  };

  const onExpand = (expanded) => {
    if (expanded) {
      gridRef.current?.setHeight(380);
    } else {
      gridRef.current?.setHeight(205);
    }
  };

  return (
    <>
      <CollapseHeader
        showCollapse={false}
        title="Phụ tùng/dầu mỡ vật tư"
        render={
          <div className="mx-[16px] mt-[5px]">
            <GridViewOne
              ref={gridRef}
              dataSource={[]}
              columns={columns}
              autoFetchData={false}
              allowSelection={true}
              // editMode={false}
              keyExpr={"PartID"}
              storeKey={"PhuTungGrid"}
              isHidenHeaderFilter
              isHiddenCheckBox
              customHeight={205}
              editingOptions={{
                allowDeleting: !isNPP,
                allowUpdating: false,
              }}
              editMode={!isNPP}
              onRowDeleteBtnClick={handleDelete}
              hideHeader={true}
              loadPanel={false}
            />
          </div>
        }
        headerRender={
          <div className="flex items-center">
            <TextBox
              width={200}
              ref={textBoxRef}
              showClearButton
              onEnterKey={handleOpenPopup}
              visible={!isNPP}
              style={{
                height: "24px",
              }}
            />

            <div className="ml-[5px]">
              <ButtonCommon
                icon={<SearchPrimaryIcon />}
                onClick={handleOpenPopup}
                visible={!isNPP}
                size="small"
              ></ButtonCommon>
            </div>
          </div>
        }
        // showExpand
        // onExpand={onExpand}
      ></CollapseHeader>
      <FindPhuTungPopup
        ref={popupPhuTungRef}
        onSelectPart={onSelectPart}
        getSelectedData={getSelectedData}
      />
    </>
  );
});

export default PhuTungGrid;
