import React from "react";
interface IItemRenderSelectbox {
  className?: string;
  valueExpr: string;
  displayExpr: string;
  widthValueExpr?: string;
  isOneColRender?: boolean;
  listValueExprOneColRender?: string[];
}
const ItemRenderSelectbox = ({
  className,
  valueExpr,
  displayExpr,
  widthValueExpr = "w-[30%]",
  isOneColRender = false,
  listValueExprOneColRender = [],
}: IItemRenderSelectbox) => {
  return (
    <div className={`w-[100%] flex items-center justify-start ${className}`}>
      {isOneColRender && listValueExprOneColRender.includes(valueExpr) ? (
        <p>{displayExpr}</p>
      ) : (
        <>
          <div className={`${widthValueExpr} mr-[10px] border-r-2`}>
            <p title={valueExpr} className="truncate">
              {valueExpr}
            </p>
          </div>
          <div className="flex-1 ml-[10px]">
            <p
              title={displayExpr}
              className="overflow-hidden text-ellipsis whitespace-break-spaces"
            >
              {displayExpr}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemRenderSelectbox;
