import React, { useEffect, useRef, useState } from "react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useI18n } from "@/i18n/useI18n";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

import { showErrorAtom } from "@/packages/store";
import { StatusUser } from "./UserStatus";
import { nanoid } from "nanoid";
import { ColumnOptions } from "@/types";
import { BButton } from "@/packages/components/buttons";
import { dataMultiAtom } from "./store";

export const PopupMultiAPI = () => {
  const { t } = useI18n("COMMON");
  const [dataMulti, setDataMulti] = useAtom(dataMultiAtom);
  const [open, setOpen] = useState(false);
  const gridRef = useRef<any>(null);
  const [dataMap, setDataMap] = useState<any>([]);
  // const { columns } = OrderList();
  const showError = useSetAtom(showErrorAtom);

  useEffect(() => {
    if (dataMulti?.data?.count > 0) {
      const error = dataMulti?.data.dataError;
      const success = dataMulti?.data.dataSuccess;
      setDataMap([...success, ...error]);
      gridRef.current.setData([...success, ...error]);
      setOpen(true);
    }
  }, [dataMulti]);

  const dataConfig = [
    {
      dataField: "name",
      visible: true,
      caption: t("Name"),
      width: 200,
    },
    {
      dataField: "status",
      visible: true,
      width: 200,
      caption: t("Status"),
      cellRender: ({ data }: any) => {
        return (
          <StatusUser
            key={nanoid()}
            isActive={data.status === "success" ? true : false}
          />
        );
      },
    },
    {
      dataField: "error",
      visible: true,
      width: 200,
      caption: t("Error"),
      cellRender: ({ data }: any) => {
        return (
          <>
            {data.error === null ? (
              <></>
            ) : (
              <BButton
                label={t("ShowError")}
                onClick={() => showError(data.error)}
              />
            )}
          </>
        );
      },
    },
  ];

  const columns: ColumnOptions[] = Object.keys(dataMap[0] || {})
    .filter(
      (item: any) => item !== "error" && item !== "name" && item !== "status"
    )
    .map((key) => {
      if (key === "link") {
        return {
          dataField: key,
          visible: true,
          caption: t(`${key}`),
          cellRender: (e: any) => {
            return (
              <a href={e.value} target="_blank">
                {e.value}
              </a>
            );
          },
        };
      }
      return {
        dataField: key,
        visible: true,
        caption: t(`${key}`),
      };
    });

  const onHidding = () => {
    setOpen(false);
    setDataMulti({
      dataError: [],
      dataSuccess: [],
      count: 0,
    });
  };

  return (
    <Popup
      visible={open}
      title={dataMulti.tilteNotify}
      onHiding={onHidding}
      wrapperAttr={{
        class: "search-car-popup",
      }}
    >
      <GridViewOne
        ref={gridRef}
        defaultPageSize={999999999999999999999999}
        isHiddenCheckBox
        isHidenHeaderFilter
        dataSource={[]}
        customHeight={"95%"}
        columns={[...columns, ...dataConfig]}
        isLoading={false}
        autoFetchData={false}
        allowSelection={false}
        storeKey={"showData-order-list"}
        customToolbarItems={[]}
        fetchData={() => {}}
        // onSelectionGetData={handleSelectionChanged}
      />

      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Cancel"),
          onClick: onHidding,
          elementAttr: {
            class: "search-car-popup cancel-button",
          },
        }}
      />
    </Popup>
  );
};
