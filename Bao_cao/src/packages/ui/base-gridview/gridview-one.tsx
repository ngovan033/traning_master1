import { Button, CheckBox, DataGrid } from "devextreme-react";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Button as DxButton,
  Editing,
  HeaderFilter,
  IEditingProps,
  IStateStoringProps,
  Pager,
  Paging,
  Scrolling,
  Search,
  Selection,
  StateStoring,
  Toolbar,
  Item as ToolbarItem,
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import {
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import "./base-gridview.scss";

import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@packages/hooks";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import {
  CellClickEvent,
  CellPreparedEvent,
  ContentReadyEvent,
  DataErrorOccurredEvent,
  DataGridScrollMode,
  EditCanceledEvent,
  EditingStartEvent,
  EditorPreparingEvent,
  FocusedCellChangingEvent,
  InitNewRowEvent,
  OptionChangedEvent,
  RowClickEvent,
  RowDblClickEvent,
  RowRemovedEvent,
  RowRemovingEvent,
  RowValidatingEvent,
  SavedEvent,
  SavingEvent,
} from "devextreme/ui/data_grid";
import { differenceBy, range, uniqBy } from "lodash-es";

import { useSavedState } from "@packages/ui/base-gridview/components/use-saved-state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
// import {
//   GridCustomerToolBarItem,
//   GridCustomToolbar,
// } from "";
import { dataGridAtom } from "../../components/gridview-standard/store/normal-grid-store";

import { customLoad, customSave } from "@/packages/common/custom-state-store";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { permissionAtom } from "@/packages/store/permission-store";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { nanoid } from "nanoid";
import { showDialog } from "../dialogs/dialog-utils";
import { Icon } from "../icons";
import SettingIcon from "../icons/svg/settings";
import {
  GridCustomToolbar,
  GridCustomToolBarItem,
} from "./components/grid-custom-toolbar";
import { GridviewOnePager } from "./components/gridview-one-pager";
import { GridViewMultiEditPopup } from "./gridview-multiedit-popup";

const SelectionCheckBox = ({
  key,
  gridRef,
  rowIndex,
  isSelected,
}: {
  key: string;
  gridRef: RefObject<DataGrid>;
  rowIndex: number;
  isSelected: boolean;
}) => {
  return (
    <CheckBox
      defaultValue={isSelected}
      data-key={key}
      onValueChanged={(e: any) => {
        const { component, value, previousValue } = e;
        if (value) {
          gridRef.current?.instance?.selectRowsByIndexes([rowIndex]);
        } else {
          gridRef.current?.instance?.selectRowsByIndexes([]);
        }

        setTimeout(() => {
          gridRef.current?.instance.refresh();
        }, 0);
      }}
    />
  );
};

interface GridViewProps {
  id?: string;
  isHiddenCheckBox?: boolean;
  isHidenHeaderFilter?: boolean;
  enablePaging?: "auto" | "no" | "yes";
  defaultPageSize?: number;
  dataSource: CustomStore | Array<any> | any;
  onSetItemValue?: (item: any) => void;
  columns: ColumnOptions[];
  allowSelection: boolean;
  onReady?: (ref: any) => void;
  allowInlineEdit?: boolean;
  allowMultiRowEdit?: boolean;
  allowMultiRowDelete?: boolean;
  showSetting?: boolean;
  onEditorPreparing?: (e: EditorPreparingEvent<any, any>) => void;
  onCellPrepared?: (e: CellPreparedEvent) => void;
  fetchData?: any;
  allowCheckDeleteConfirm?: boolean;
  autoFetchData?: boolean;
  keyExpr?: string | string[];
  onSelectionChanged?: (rowKeys: string[]) => void;
  editingOptions?: IEditingProps;
  onCellClick?: (e: CellClickEvent) => void;
  toolbarItems?: ToolbarItemProps[];
  standaloneToolbars?: ToolbarItemProps[];
  customToolbarItems?: GridCustomToolBarItem[];
  onEditingStart?: (e: EditingStartEvent) => void;
  onEditCanceled?: (e: EditCanceledEvent) => void;
  onSaved?: (e: SavedEvent) => void;
  onInitNewRow?: (e: InitNewRowEvent) => void;
  onSaving?: (e: SavingEvent) => void;
  onRowRemoved?: (e: RowRemovedEvent) => void;
  onRowRemoving?: (e: RowRemovingEvent) => void;
  onPageChanged?: (pageIndex: number) => void;
  stateStoring?: IStateStoringProps;
  storeKey: string;
  onRowEditBtnClick?: (e: any) => void;
  onRowDeleteBtnClick?: (e: any) => void;
  onDeleteMultiBtnClick?: (e: any) => void;
  onRowClick?: (e: RowClickEvent) => void;
  onRowDblClick?: (e: RowDblClickEvent) => void;
  onContentReady?: (e: ContentReadyEvent) => void;
  onFocusedCellChanging?: (e: FocusedCellChangingEvent) => void;
  focusedRowEnabled?: boolean;
  isSingleSelection?: boolean;
  editMode?: boolean;
  hidenTick?: boolean;
  locationCustomToolbar?: "center" | "before" | "after";
  customHeight?: number;
  checkData?: any;
  children?: any;
  isSingleSelectionNotCheckbbox?: boolean;
  allowSelectAll?: boolean;
  onOptionChanged?: (ev: OptionChangedEvent) => void;
  onRowValidating?: (ev: RowValidatingEvent) => void;
  isHiddenAllToolbar?: boolean;
  errorRowEnabled?: boolean;
  onDataErrorOccurred?: (e: DataErrorOccurredEvent) => void;
  permissionUpdate?: string;
  permissionDelete?: string;
  isShowBtnDeleteRow?: boolean;
  hidePagination?: boolean;
  hideHeader?: boolean;
  showSTT?: boolean;
  isScrollingMode?: boolean;
  modeScrolling?: DataGridScrollMode;
  heightWindow?: string | number;
  loadPanel?: boolean;
  showIconSearch?: boolean;
  modeLoadData?: "fetchData" | "dataSource";
  focusedRowKey?: string;
}

export const GridViewOne = forwardRef(
  (
    {
      modeLoadData = "fetchData",
      modeScrolling = "standard",
      showSetting = true,
      onEditorPreparing,
      errorRowEnabled = false,
      onDataErrorOccurred,
      onRowValidating,
      onCellPrepared,
      fetchData,
      autoFetchData = false,
      heightWindow,
      onFocusedCellChanging,
      onOptionChanged,
      focusedRowEnabled,
      keyExpr,
      onRowClick,
      onContentReady,
      onSelectionChanged,
      onRowDblClick,
      dataSource,
      allowCheckDeleteConfirm = false,
      onSetItemValue,
      columns,
      isHidenHeaderFilter = false,
      enablePaging = "auto",
      defaultPageSize = 100,
      onReady,
      allowMultiRowEdit,
      allowMultiRowDelete = true,
      allowInlineEdit = false,
      editingOptions,
      toolbarItems,
      standaloneToolbars,
      onEditingStart,
      onEditCanceled,
      onSaved,
      onInitNewRow,
      onSaving,
      onRowRemoved,
      onRowRemoving,
      onPageChanged,
      isShowBtnDeleteRow = false,
      storeKey,
      onCellClick,
      onRowEditBtnClick,
      onRowDeleteBtnClick,
      onDeleteMultiBtnClick,
      editMode = false,
      customToolbarItems,
      isSingleSelection = false,
      isHiddenCheckBox = false,
      locationCustomToolbar,
      customHeight,
      isSingleSelectionNotCheckbbox = false,
      id = "GridviewOne",
      permissionUpdate = "",
      permissionDelete = "",
      checkData,
      children,
      allowSelectAll = true,
      isHiddenAllToolbar = false,
      hidePagination = false,
      hideHeader = false,
      showSTT = true,
      isScrollingMode = true,
      loadPanel = true,
      showIconSearch = true,
      focusedRowKey,
    }: GridViewProps,
    ref: any
  ) => {
    const gridColumns: ColumnOptions[] =
      showSTT == true
        ? columns?.some(
            (item: any) => item.dataField === "STT" || item.dataField === "_idx"
          )
          ? [...columns]
          : [
              {
                filterType: "include", // mặc định là include => KHÔNG SỬA
                visible: true,
                alignment: "left",
                // allowFiltering:{false},
                allowResizing: false,
                width: 80,
                minWidth: 80,
                dataField: "STT",
                caption: "STT",
                cssClass: "table-data-center table-data-stt",
              },
              ...columns,
            ]
        : columns;

    const setLoad = useSetAtom(loadPanelAtom);
    let dataGridRef = useRef<DataGrid | null>(null);
    let pagerRef = useRef<any>(null);
    const setDataGrid = useSetAtom(dataGridAtom);
    const [pagerVisible, showPaging] = useState(
      enablePaging == "no" ? false : true
    );
    const isCloseCallAPI = useRef<any>(true);
    const permissionStore: any = useAtomValue(permissionAtom);
    const baseClientId = useMemo(() => {
      return nanoid();
    }, []);

    const selectionDivRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const customToolbarRef = useRef<any>(null);

    const [searchPanelVisible, setSearchPanelVisible] = useAtom(
      searchPanelVisibleAtom
    );

    const refreshGrid = () => {
      setTimeout(() => {
        dataGridRef.current?.instance.refresh();
      }, 0);
    };
    const onChangePageSize = (pageSize: number) => {
      let change = true;
      if (
        dataGridRef.current?.instance.pageIndex() == 0 &&
        (!data || data.length == 0)
      ) {
        change = false;
      }
      dataGridRef.current?.instance.pageIndex(0);
      dataGridRef.current?.instance.pageSize(pageSize);

      pagerRef.current?.setData({
        pageIndex: 0,
        pageSize: pageSize,
        pageCount: 0,
        totalCount: 0,
        ref: dataGridRef.current,
      });

      if (change) handlePageChanged(0);
    };
    const [visible, setVisible] = useState(false);
    const { saveState, loadState } = useSavedState<ColumnOptions[]>({
      storeKey,
    });
    const chooserVisible = useVisibilityControl({ defaultVisible: false });

    const defaultEditingOptions: IEditingProps = {
      mode: "popup",
      useIcons: true,
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: false,
      popup: {},
      form: {},
      confirmDelete: false, // custom confirm delete dialog,
    };

    const editingOptionsApply = useMemo(() => {
      let result = {
        visibleUpdate: true,
        visibleDelete: true,
      };

      const button = permissionStore?.buttons;

      if (permissionDelete !== "") {
        const check = button.includes(permissionDelete);
        result.visibleDelete = check;
      }
      if (permissionUpdate !== "") {
        const check = button.includes(permissionUpdate);
        result.visibleUpdate = check;
      }

      let ret = { ...defaultEditingOptions, ...editingOptions };

      if (!result.visibleUpdate) {
        ret = {
          ...ret,
          allowUpdating: result.visibleUpdate,
        };
      }

      if (!result.visibleDelete) {
        ret = {
          ...ret,
          allowDeleting: result.visibleDelete,
        };
      }

      return ret;
    }, [editingOptions]);

    // I want to restore columns from localStorage if it exists
    useEffect(() => {
      const savedState = loadState();

      if (savedState) {
        // we need check the order of column from changes set
        const shouldHideColumns = differenceBy<ColumnOptions, ColumnOptions>(
          // columns,
          gridColumns,
          savedState,
          "dataField"
        );

        for (let i = 0; i < shouldHideColumns.length; i++) {
          const column = shouldHideColumns[i];
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visible",
            false
          );
        }
        // update column with new index
        savedState.forEach((column: ColumnOptions, index: number) => {
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visibleIndex",
            index + 1
          );
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visible",
            true
          );
        });
        // setColumnsState(outputColumns);
      }
    }, [gridColumns]);

    const onHiding = useCallback(() => {
      chooserVisible.close();
    }, []);

    const onApply = useCallback(
      (changes: any) => {
        chooserVisible.close();
        // we need check the order of column from changes set
        const shouldHideColumns = differenceBy<ColumnOptions, ColumnOptions>(
          // columns,
          gridColumns,
          changes,
          "dataField"
        );
        for (let i = 0; i < shouldHideColumns.length; i++) {
          const column = shouldHideColumns[i];
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visible",
            false
          );
        }
        // update column with new index
        changes.forEach((column: ColumnOptions, index: number) => {
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visibleIndex",
            index + 1
          );
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visible",
            true
          );
        });
        saveState(changes);
      },
      [chooserVisible, saveState]
    );

    const onToolbarPreparing = useCallback((e: any) => {
      e.toolbarOptions.items.push({
        widget: "dxButton",
        location: "after",
        visible: false,
        options: {
          icon: "/images/icons/settings.svg",
          elementAttr: {
            id: "myColumnChooser",
          },
          onClick: () => setVisible(!visible),
        },
      });

      setTimeout(() => {
        customToolbarRef.current?.refresh(dataGridRef.current);
      }, 0);
    }, []);

    const handleSelectionChanged = useCallback((e: any) => {
      // if (editMode) {
      //   let keys = dataGridRef.current?.instance.getSelectedRowKeys();
      //   if (keys && keys.length > 0)
      //     selectionDivRef.current.style.display = "block";
      //   else selectionDivRef.current.style.display = "none";
      // }
      onSelectionChanged?.(e);

      customToolbarRef.current?.refresh(dataGridRef.current);
    }, []);

    const handleDeleteMultiBtnClicked = (e: any) => {
      if (onDeleteMultiBtnClick) return onDeleteMultiBtnClick(e);
      return ConfirmComponent({
        asyncFunction: async () => {
          let rows = dataGridRef.current?.instance.getVisibleRows();

          var list = getGridDataInner();

          if (rows && list && rows.length == list.length) {
            var row;
            for (var i = rows.length - 1; i >= 0; --i) {
              row = rows[i];
              if (row.isSelected) {
                list.splice(row.rowIndex, 1);
              }
            }
            setData(list);
          }
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to delete?"),
      });
    };

    const { t } = useI18n("Common");

    const handlePageChanged = useCallback((pageIndex: number) => {
      dataGridRef.current?.instance.pageIndex(pageIndex);
      onPageChanged?.(pageIndex);

      if (isCloseCallAPI.current) {
        doFetchData();
      }
    }, []);

    const allToolbarItems: ToolbarItemProps[] = [
      ...(toolbarItems || []),
      {
        location: locationCustomToolbar ? locationCustomToolbar : "before",
        render: () => (
          <GridCustomToolbar
            items={customToolbarItems}
            ref={customToolbarRef}
          />
        ),
      },
      !isHidenHeaderFilter && pagerVisible && !hidePagination
        ? {
            location: "after",
            render: () => {
              return (
                <>
                  <GridviewOnePager
                    ref={pagerRef}
                    onPageSizeChanged={onChangePageSize}
                    allowedPageSizes={[10, 20, 100, 200, 500, 1000, 3000, 5000]}
                    data={{
                      pageIndex: 0,
                      pageCount: 0,
                      totalCount: 0,
                      pageSize: 100,
                    }}
                    onPageChanged={handlePageChanged}
                  ></GridviewOnePager>
                </>
              );
            },
          }
        : {
            location: "after",
            render: () => {
              return <></>;
            },
          },
    ];

    const [data, setDataSource] = useState<any>(dataSource);
    // const [currentHeight, setCurrentHeight] = useState(
    //   customHeight && customHeight > 0 ? customHeight : "100%"
    // );

    const [currentHeight, setCurrentHeight] = useState("100%");

    useEffect(() => {
      setCurrentHeight((prev) => {
        return customHeight && customHeight > 0 ? customHeight : "100%";
      });
    }, [customHeight]);

    useEffect(() => {
      setDataGrid(dataGridRef);

      if (autoFetchData) {
        doFetchData();
      } else {
        if (modeLoadData == "dataSource") {
          setData(refineDataSource(dataSource));
        }
      }
    }, [modeLoadData, dataSource]);

    const doFetchData = async () => {
      if (!fetchData) return false;
      showPaging(true);
      isCloseCallAPI.current = true;

      fetchData()
        .then((resp: any) => {
          setLoad(true);
          if (resp?.PageIndex > 0) {
            const indexEnd = (resp?.PageIndex + 1) * resp?.PageSize;
            const indexStart = resp?.PageIndex * resp?.PageSize;
            setData(
              resp?.DataList?.map((item: any, index: any) => ({
                ...item,
                STT: range(indexStart + 1, indexEnd + 1)[index],
              }))
            );
          } else {
            setData(
              resp?.DataList?.map((item: any, index: any) => ({
                ...item,
                STT: index + 1,
              }))
            );
          }
          pagerRef.current?.setData({
            pageIndex: resp?.PageIndex ?? 0,
            pageSize: resp?.PageSize ?? 0,
            pageCount: resp?.PageCount ?? 0,
            totalCount: resp?.ItemCount ?? 0,
            ref: dataGridRef.current,
          });
          customToolbarRef.current?.refresh(dataGridRef.current);
          setLoad(false);
        })
        .catch((err: any) => {
          setLoad(false);
        });
      return true;
    };

    const setData = (data: any) => {
      dataGridRef.current?.instance.clearSelection();

      setDataSource(refineDataSource(data));

      refreshGrid();
    };

    useImperativeHandle(ref, () => ({
      setHeight: (height: any) => {
        setCurrentHeight(height);
      },

      refetchData(pageIndex?: number) {
        isCloseCallAPI.current = true;
        setLoad(true);
        if (!pageIndex) pageIndex = 0;
        dataGridRef.current?.instance.clearSelection();
        dataGridRef.current?.instance.pageIndex(pageIndex);

        doFetchData();
      },
      refetchDataAndPageSize(pageIndex?: number) {
        isCloseCallAPI.current = true;
        setLoad(true);
        if (!pageIndex) pageIndex = 0;
        dataGridRef.current?.instance.clearSelection();
        pagerRef.current?.setData({
          pageIndex: 0,
          pageSize: 100,
          pageCount: 0,
          totalCount: 0,
          ref: dataGridRef.current,
        });
        dataGridRef.current?.instance.pageIndex(0);
        dataGridRef.current?.instance.pageSize(100);

        doFetchData();
      },
      setData(data: any) {
        if (enablePaging === "auto" && pagerVisible) showPaging(false);
        setData(data);
      },

      setPageData(resp: any) {
        showPaging(true);
        isCloseCallAPI.current = true;
        if (resp?.PageIndex > 0) {
          const indexEnd = (resp?.PageIndex + 1) * resp?.PageSize;
          const indexStart = resp?.PageIndex * resp?.PageSize;

          setData(
            resp?.DataList?.map((item: any, index: any) => ({
              ...item,
              STT: range(indexStart + 1, indexEnd + 1)[index],
            }))
          );
        } else {
          setData(
            resp?.DataList?.map((item: any, index: any) => ({
              ...item,
              STT: index + 1,
            }))
          );
        }

        pagerRef.current?.setData({
          pageIndex: resp?.PageIndex ?? 0,
          pageSize: resp?.PageSize ?? 0,
          pageCount: resp?.PageCount ?? 0,
          totalCount: resp?.ItemCount ?? 0,
          ref: dataGridRef.current,
        });
        customToolbarRef.current?.refresh(dataGridRef.current);
      },
      refreshGrid() {
        refreshGrid();
      },
      setDefaultPaging() {
        isCloseCallAPI.current = false;
        setDataSource([]);
        pagerRef.current?.setData({
          pageIndex: 0,
          pageSize: 100,
          pageCount: 0,
          totalCount: 0,
          ref: dataGridRef.current,
        });
        dataGridRef.current?.instance.pageIndex(0);
        dataGridRef.current?.instance.pageSize(100);
      },
      getVisibleData() {
        //saveEditingData();
        return getVisibleData();
      },
      getData() {
        //saveEditingData();
        return getGridDataInner();
      },

      saveEditingData() {
        return saveEditingData();
      },

      getSelectedRowsData() {
        return dataGridRef.current?.instance.getSelectedRowsData();
      },

      addRow() {
        dataGridRef.current?.instance.clearSelection();
        if (editingOptions?.mode == "batch") {
          saveEditingData();
          return addData([{}]);
        }
        return dataGridRef.current?.instance.addRow();
        // if (editingOptions?.mode == 'batch') {
        //   let rows = dataGridRef.current?.instance.getVisibleRows();
        //   let list = rows?.map(r => r.data);
        //   if (!list) list = [];
        //   list = [{}, ...list];
        //   setData(list);
        // }
        // else {
        //   dataGridRef.current?.instance.addRow();
        // }
      },
      async addData(data: any[]) {
        dataGridRef.current?.instance.clearSelection();

        //saveEditingData();
        dataGridRef.current?.instance.saveEditData().then(() => {
          addData(data);
        });
      },
      async addDataUniq(data: any[], key: string) {
        dataGridRef.current?.instance.clearSelection();

        //saveEditingData();
        dataGridRef.current?.instance.saveEditData().then(() => {
          addDataUniq(data, key);
        });
      },
      showEditMultiPopup() {
        handleMultiEditClick();
      },
      clearSelection() {
        dataGridRef.current?.instance.clearSelection();
      },
      getDxInstance() {
        return dataGridRef.current?.instance;
      },
      getPageSize: (defaultPageSize = 100) => {
        const currentPageSize = dataGridRef?.current?.instance.pageSize();

        return currentPageSize && currentPageSize > 0
          ? currentPageSize
          : defaultPageSize;
      },
    }));
    const refineData = (item: any, idx: number) => {
      if (
        (editingOptions?.mode == "batch" && !keyExpr) ||
        keyExpr?.length == 0
      ) {
        if (!item._dxgridKey) item._dxgridKey = nanoid();
      }

      return item;
    };

    const refineDataSource = (dataSource: any) => {
      let pagerData = pagerRef.current?.getData();

      // let pIdx = pagerData?.pageIndex > 0 ? pagerData?.pageIndex : 0;
      // let pSize = pagerData?.pageSize ?? defaultPageSize;
      // let idx = pIdx * pSize;

      if (
        !!onSetItemValue ||
        (editingOptions?.mode == "batch" && !keyExpr) ||
        keyExpr?.length == 0
      ) {
        dataSource.forEach((e: any) => {
          refineData(e, 0);
        });
      }

      dataSource?.map((item: any, index: any) => {
        if (pagerData && !item.STT) {
          item.STT = index + 1;
        }
        return item;
      });

      return dataSource;
    };
    const getVisibleData = () => {
      let rows = dataGridRef.current?.instance.getVisibleRows();

      let ret = rows?.map((r) => r.data);

      return ret;
    };
    const saveEditingData = () => {
      var list = getVisibleData();
      // console.log(651, list);
      setData([...(list ?? [])]);
      //dataGridRef.current?.instance.saveEditData();

      return list;
    };

    const addData = (data: any[]) => {
      let list = dataGridRef.current?.instance.getDataSource().items();
      if (!list) list = [];
      list = [...data, ...list];

      setData(list);
    };
    const addDataUniq = (data: any[], key: string) => {
      let list = dataGridRef.current?.instance.getDataSource().items();
      if (!list) list = [];
      list = uniqBy([...data, ...list], key);

      setData(list);
    };
    const getGridDataInner = () => {
      return dataGridRef.current?.instance.getDataSource().items();
    };

    const handleMultiEditClick = () => {
      showDialog(({ onClose }) => (
        <GridViewMultiEditPopup
          columns={columns}
          onClose={onClose}
          onSubmit={(data: any) => {
            editMultiRows(data);
            onClose();
          }}
        />
      ));
    };

    const setRef = (grref: any) => {
      dataGridRef.current = grref;

      // onReady?.(ref);
    };

    const editMultiRows = (data: any) => {
      if (data.ColName && data.Value) {
        var rows = dataGridRef.current?.instance.getVisibleRows();
        if (rows && rows.length > 0)
          for (var row of rows) {
            if (row.isSelected) {
              row.data[data.ColName] = data.Value;
            }
          }

        refreshGrid();
      }
    };

    const handleKeyDown = (e: any) => {
      // Kiểm tra nếu người dùng nhấn Ctrl + A
      if (e.event.ctrlKey && e.event.key.toLowerCase() === "a") {
        e.preventDefault(); // Ngăn chặn hành động mặc định (chọn tất cả)
      }
    };
    const handleToggleSearchPanel = useCallback(() => {
      setSearchPanelVisible(true);
    }, [searchPanelVisible]);

    return (
      <div className={"base-gridview grid-view-customize bg-white h-full"}>
        <DataGrid
          className={`base-gridview grid-view-customize ${
            hideHeader ? "hidden-header-table" : ""
          }`}
          keyExpr={keyExpr ?? "_dxgridKey"}
          errorRowEnabled={errorRowEnabled}
          onDataErrorOccurred={onDataErrorOccurred}
          cacheEnabled={false}
          id={id}
          onFocusedCellChanging={onFocusedCellChanging}
          height={heightWindow ? heightWindow : currentHeight}
          width={"100%"}
          ref={(r) => setRef(r)}
          dataSource={data}
          noDataText={checkData ? "" : t("There is no data")}
          remoteOperations={false}
          columnAutoWidth={true}
          repaintChangesOnly
          showBorders
          onInitialized={() => {
            customToolbarRef.current?.refresh(dataGridRef.current);

            onReady?.(dataGridRef);
          }}
          scrolling={{
            mode: modeScrolling,
          }}
          onContentReady={onContentReady}
          onRowClick={onRowClick}
          allowColumnResizing
          showColumnLines
          onCellClick={onCellClick}
          showRowLines
          focusedRowEnabled={focusedRowEnabled}
          columnResizingMode={"widget"}
          focusedRowKey={focusedRowKey}
          onToolbarPreparing={onToolbarPreparing}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={onEditorPreparing}
          onCellPrepared={onCellPrepared}
          onEditingStart={onEditingStart}
          onEditCanceled={onEditCanceled}
          onRowValidating={onRowValidating}
          onSaved={onSaved}
          onKeyDown={handleKeyDown}
          onInitNewRow={onInitNewRow}
          onRowDblClick={onRowDblClick}
          onOptionChanged={onOptionChanged}
          onSaving={onSaving}
          onRowRemoved={onRowRemoved}
          onRowRemoving={onRowRemoving}
          allowColumnReordering={true}
          loadPanel={{
            enabled: loadPanel,
          }}
        >
          <ColumnChooser enabled={true} mode={"select"}>
            <Search enabled={true}></Search>
          </ColumnChooser>
          <ColumnFixing enabled={true} />
          <Pager visible={false} />
          <Paging defaultPageSize={defaultPageSize} enabled={true} />
          <HeaderFilter visible={true}>
            <Search enabled={true}></Search>
          </HeaderFilter>

          <Toolbar visible={!isHiddenAllToolbar}>
            {showIconSearch && (
              <ToolbarItem location="before" visible={!searchPanelVisible}>
                <div
                  onClick={handleToggleSearchPanel}
                  className="w-[28px] h-[28px] flex items-start justify-center cursor-pointer hover:bg-[#EAF9F2] hover:shadow-md rounded-[5px]"
                >
                  <div className="toggle__search mb-[1px] h-full flex items-center">
                    <Icon name={"search"} width={14} height={14} />
                  </div>
                </div>
              </ToolbarItem>
            )}
            {standaloneToolbars &&
              standaloneToolbars.map((item, index) => {
                return (
                  <ToolbarItem
                    key={item.key}
                    location={item.location}
                    visible={true}
                  >
                    {item.render ? item.render() : <></>}
                  </ToolbarItem>
                );
              })}
            {!!allToolbarItems &&
              allToolbarItems.map((item, index) => {
                return (
                  <ToolbarItem key={index} location={item.location}>
                    {item.widget === "dxButton" && <Button {...item.options} />}
                    {!!item.render && item.render()}
                  </ToolbarItem>
                );
              })}
            {editMode && (
              <ToolbarItem location="before" visible={true}>
                <div ref={selectionDivRef} style={{ display: "block" }}>
                  {/* <PermissionContainer permission={permissionDeleteMultiple}>
                  </PermissionContainer> */}
                  {allowMultiRowDelete && (
                    <Button
                      stylingMode={"contained"}
                      type={"default"}
                      text={t("Delete")}
                      onClick={handleDeleteMultiBtnClicked}
                    />
                  )}
                  {allowMultiRowEdit && (
                    <Button
                      stylingMode={"contained"}
                      type={"default"}
                      onClick={handleMultiEditClick}
                      text={t("Edit multi rows")}
                    />
                  )}
                </div>
              </ToolbarItem>
            )}

            <ToolbarItem visible={showSetting} location="after">
              <div
                id={`myColumnChooser_${baseClientId}`}
                className={"search-form__settings cursor-pointer"}
                onClick={() => chooserVisible.toggle()}
              >
                {/* <Icon name={"setting"} width={14} height={14} /> */}
                <SettingIcon />
              </div>
            </ToolbarItem>
            <ToolbarItem location="after">
              <CustomColumnChooser
                title={t("ToggleColumn")}
                applyText={t("Apply")}
                cancelText={t("Cancel")}
                selectAllText={t("SelectAll")}
                container={"#root"}
                button={`#myColumnChooser_${baseClientId}`}
                visible={chooserVisible.visible}
                columns={gridColumns}
                onHiding={onHiding}
                onApply={onApply}
                actualColumns={gridColumns}
                gridInstance={dataGridRef.current?.instance}
              />
            </ToolbarItem>
          </Toolbar>
          {editMode && (
            <Editing {...editingOptionsApply}>
              {/* <Texts
              confirmDeleteMessage={t("Are you sure to delete those records?")}
              ok={t("OK")}
              cancel={t("Cancel")}
            /> */}
            </Editing>
          )}
          {isSingleSelection && (
            <Column
              dataField={"SelectionCheckBox"}
              width={50}
              caption={t("")}
              showInColumnChooser={false}
              allowFiltering={false}
              allowSearch={false}
              allowResizing={false}
              cellRender={(e: any) => {
                const {
                  data,
                  row: { isSelected, rowIndex },
                  value,
                  key,
                } = e;
                return (
                  <SelectionCheckBox
                    isSelected={isSelected}
                    key={key}
                    gridRef={dataGridRef}
                    rowIndex={rowIndex}
                  />
                );
              }}
              dataType={"boolean"}
            ></Column>
          )}
          {/* Thêm isShowBtnDeleteRow để tắt editMode khi sửa dụng icon delete tự customize   */}
          {isShowBtnDeleteRow === false && editMode && (
            <Column
              visible={!allowInlineEdit} // true thì mở cho sửa
              type="buttons"
              width={80}
              visibleIndex={0} // Default 0 cho nó lên đầu => Nếu không nó sẽ bị nhảy lộn xộn khi dùng GridViewOne
              fixed={false}
              allowResizing={false}
            >
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="edit"
                icon={"/images/icons/edit.svg"}
                onClick={onRowEditBtnClick}
              />
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="delete"
                icon={"/images/icons/trash.svg"}
                onClick={(e: any) => {
                  if (onRowDeleteBtnClick) return onRowDeleteBtnClick(e);
                  if (allowCheckDeleteConfirm) {
                    return ConfirmComponent({
                      asyncFunction: async () => {
                        var list = getGridDataInner();
                        list?.splice(e.row.rowIndex, 1);
                        setData(list);
                      },
                      title: t("Confirm"),
                      contentConfirm: t("Do you want to delete?"),
                    });
                  } else {
                    var list = getGridDataInner();
                    list?.splice(e.row.rowIndex, 1);
                    setData(list);
                  }
                  //dataGridRef.current?.instance?.deleteRow(e.row.rowIndex);
                }}
              />
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="save"
                icon={"/images/icons/save.svg"}
              />
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="cancel"
                icon={"/images/icons/refresh.svg"}
              />
            </Column>
          )}
          {isScrollingMode && (
            <Scrolling
              mode={"standard"}
              showScrollbar="always"
              preloadEnabled
              useNative
              columnRenderingMode="virtual"
            />
          )}

          <StateStoring
            enabled={!!storeKey}
            type={"custom"}
            customLoad={() => {
              if (storeKey) {
                customLoad(storeKey, dataGridRef);
              }
            }}
            customSave={(gridState: any) => {
              if (storeKey) {
                let newState = { columns: gridState.columns };
                customSave(storeKey, newState);
              }
            }}
            key={storeKey}
          />
          <Selection
            mode={
              !isHiddenCheckBox && !isSingleSelection
                ? "multiple"
                : isSingleSelectionNotCheckbbox
                ? "single"
                : "none"
            }
            selectAllMode="page"
            allowSelectAll={allowSelectAll}
          />
          {/* {isSingleSelection && <Selection mode={"none"} />} */}

          {!isHidenHeaderFilter && (
            <Scrolling
              renderAsync={true}
              mode={"standard"}
              showScrollbar={"always"}
              rowRenderingMode={"standard"}
            />
          )}

          {gridColumns.map((col: any) => {
            const filteredData = data
              ?.filter(
                (val: any) =>
                  val[col.dataField] !== "" &&
                  val[col.dataField] !== null &&
                  val[col.dataField] !== undefined
              )
              .map((item: any) => ({
                text: item[col.dataField],
                value: item[col.dataField],
              }));

            // Kiểm tra nếu có giá trị rỗng thì thêm vào "blanks"
            const hasBlanks = data?.some(
              (val: any) =>
                val[col.dataField] === "" ||
                val[col.dataField] === null ||
                val[col.dataField] === undefined
            );

            // Thêm tùy chọn "blanks" vào đầu danh sách nếu cần
            if (hasBlanks) {
              filteredData.unshift({
                text: "blanks",
                value: null,
              });
            }

            return (
              <Column
                key={col.dataField}
                filterType="include" // mặc định là include => KHÔNG SỬA
                headerFilter={
                  col?.hasOwnProperty("customizeDataHeader")
                    ? {
                        search: true,
                        allowSearch: true,
                        dataSource:
                          col?.customizeDataHeader(data) ?? filteredData,
                      }
                    : undefined
                }
                {...col}
                cssClass={
                  col.dataType == "number" ? "table-data-right" : col.cssClass
                }
                alignment={col.alignment ? col.alignment : "left"}
              ></Column>
            );
          })}

          {/* {columns.map((col: any) => {
            return (
              <Column
                key={col.dataField}
                filterType="exclude"
                headerFilter={{
                  search: true,
                  allowSearch: true,
                }}
                {...col}
              ></Column>
            );
          })} */}

          {children}
        </DataGrid>
      </div>
    );
  }
);

GridViewOne.displayName = "GridViewOne";
