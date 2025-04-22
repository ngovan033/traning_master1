import { useAtomValue } from "jotai";
import { popupGridStateAtom } from "@packages/ui/base-gridview/store/popup-grid-store";
import Button from "devextreme-react/button";
import { ReactNode } from "react";

export interface GridCustomerToolBarItem {
  text: string;
  onClick: any;
  shouldShow: any;
  widget?: "customize" | "dxTextBox";
  customize?: (ref: any) => ReactNode;
  permissionCode?: string;
  visible?: boolean;
}

export const GridCustomToolbar = ({ items }: any) => {
  const { ref } = useAtomValue(popupGridStateAtom);
  // console.log(ref?.instance.getSelectedRowsData());
  if (!items || !items.length || !ref) return null;
  return (
    <div className="flex items-center">
      {items.map((item: GridCustomerToolBarItem, idx: number) => {
        if (item?.widget === "customize") {
          if (item.shouldShow(ref)) {
            return (
              (
                <div key={`button-toolbar-${idx}`}>
                  {item?.customize ? item.customize(ref) : <></>}
                </div>
              ) ?? <div key={`button-toolbar-${idx}`}></div>
            );
          } else {
            return null;
          }
        } else if (item?.widget === "dxTextBox") {
          return (
            <span className="font-bold px-2" key={`button-toolbar-${idx}`}>
              {item.text}
            </span>
          );
        } else if (item?.permissionCode) {
          if (item?.permissionCode) {
            return (
              <Button
                key={`button-toolbar-${idx}`}
                text={item.text}
                onClick={(e) => {
                  item.onClick(e, ref);
                }}
                visible={item.shouldShow(ref)}
              />
            );
          } else {
            return (
              <Button
                key={`button-toolbar-${idx}`}
                text={item.text}
                onClick={(e) => {
                  item.onClick(e, ref);
                }}
                visible={item.shouldShow(ref)}
              />
            );
          }
        } else {
          return (
            <Button
              className="ToolbarButton"
              key={`button-toolbar-${idx}`}
              text={item.text}
              onClick={(e) => {
                item.onClick(e, ref);
              }}
              visible={item.shouldShow(ref)}
            />
          );
        }
      })}
    </div>
  );
};
