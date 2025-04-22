import { useSlot, withSlot } from "@packages/hooks/useSlot";
import React from "react";

import "./page-header-layout.scss";
const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const BeforeTemplate = useSlot({
    children,
    name: "Before",
  });
  const CenterTemplate = useSlot({
    children,
    name: "Center",
  });

  return (
    <>
      <div className="w-full flex items-center px-2 h-[44px]">
        <div className="w-[25%] box1">
          <BeforeTemplate />
        </div>
        <div className="w-[50%] box2 ml-[50px] flex justify-start">
          <div className="w-full">
            <CenterTemplate />
          </div>
        </div>
        <div className="w-[25%] box3"></div>
      </div>
    </>
  );
};
export const PageHeaderLayout = withSlot(Layout);
