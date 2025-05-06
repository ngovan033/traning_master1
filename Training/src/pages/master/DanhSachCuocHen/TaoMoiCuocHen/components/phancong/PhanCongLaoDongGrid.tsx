import { useClientgateApi } from "@/packages/api";
import { FindPhanCongLaoDongPopup } from "@/packages/components/popup/PopupTimKiemPhanCongLaoDong/FindPhanCongLaoDongPopup";
import { useFindPhanCongLaoDongPopupLocale } from "@/packages/components/popup/PopupTimKiemPhanCongLaoDong/useFindPhanCongLaoDongPopupLocale";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import SearchPrimaryIcon from "@/packages/ui/icons/svg/search-primary";
import { ColumnOptions } from "@/types";
import { TextBox } from "devextreme-react";
import { forwardRef, useImperativeHandle, useRef } from "react";

const PhanCongLaoDongGrid = forwardRef(({}, ref) => {
  
  useImperativeHandle(ref, () => ({
    getData: () => {
      return gridRef.current?.getData();
    },
    setData: (data) => {
      gridRef.current?.setData(data);
    },
  }));

  const popupPhanCongLaoDongRef = useRef<any>(null);

  const { locale } = useFindPhanCongLaoDongPopupLocale();
  const { commonLocale } = useCommonLocale();
  const { isHQ } = usePermissions();

  const isNPP = isHQ();

  const api = useClientgateApi();

  const gridRef = useRef();
  const textBoxRef = useRef();

  const columns: ColumnOptions[] = [
    {
      dataField: "SerCode",
      caption: locale.SerCode,
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 150,
    },
    {
      dataField: "SerName",
      caption: locale.SerName,
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },

    {
      dataField: "Note",
      caption: locale.Note,
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 200,
      cellRender: ({ data }) => {
        if (isNPP) {
          return data.Note;
        }

        return (
          <TextBox
            defaultValue={data.Note}
            onValueChange={(value) => handleChangeNote(data.SerID, value)}
          />
        );
      },
    },
  ];

  const handleChangeNote = (SerID: string, value: string) => {
    const currentListData = gridRef.current?.getData();

    const newListData = currentListData.map((item) => {
      if (item.SerID == SerID) {
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

    const resp = await api.Ser_MST_Service_SearchForCommonDL({
      KeyWord: keyWord,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 2,
    });

    if (resp.isSuccess) {
      if (resp.DataList && resp.DataList.length != 1) {
        popupPhanCongLaoDongRef.current.searchByKeyWord(keyWord);
        return;
      }

      if (resp.DataList && resp.DataList.length == 1) {
        onSelectService(resp.DataList);
        return;
      }
    }
  };

  const onSelectService = (service: any[]) => {
    const currentListData = gridRef.current?.getData();

    // find duplicate, if duplicate, return newly
    const newListData =
      service
        .filter((item) => {
          return !currentListData.find((x) => x.SerID == item.SerID);
        })
        ?.map((item) => {
          return {
            ...item,
            Note: "",
          };
        }) ?? [];

    const reuslt = [...currentListData, ...newListData].map((item, index) => {
      return {
        ...item,
        Note: item.Note ?? "",
        STT: index + 1,
      };
    });

    console.log(newListData);

    gridRef.current?.setData(reuslt);
  };

  const getSelectedData = () => {
    return gridRef.current?.getData();
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
        className="small-monitor"
        title="Phần công lao động"
        render={
          <div className="mx-[16px] mt-[5px]">
            <GridViewOne
              ref={gridRef}
              dataSource={[]}
              columns={columns}
              autoFetchData={false}
              allowSelection={true}
              // editMode={false}
              keyExpr={"SerID"}
              storeKey={"PhanCongLaoDongGrid"}
              isHidenHeaderFilter
              isHiddenCheckBox
              customHeight={205}
              editingOptions={{
                allowDeleting: !isNPP,
                allowUpdating: false,
              }}
              editMode={!isNPP}
              hideHeader={true}
              loadPanel={false}
            />
          </div>
        }
        headerRender={
          <div className="flex items-center justify-between w-full">
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
          </div>
        }
        showExpand
        onExpand={onExpand}
      ></CollapseHeader>

      <FindPhanCongLaoDongPopup
        ref={popupPhanCongLaoDongRef}
        onSelectService={onSelectService}
        getSelectedData={getSelectedData}
      />
    </>
  );
});

export default PhanCongLaoDongGrid;
