import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { useSlot, withSlot } from "@packages/hooks/useSlot";
import ResponsiveBox, {
  Col,
  Item,
  Location,
  Row,
} from "devextreme-react/responsive-box";
import React, { memo, ReactNode } from "react";

function screen(width: number) {
  return width < 700 ? "sm" : "lg";
}
interface AdminContentLayoutProps {
  className?: string;
  header: ReactNode;
  content: ReactNode;
}
const Layout = ({
  children,
  className,
  header,
  content,
}: React.PropsWithChildren<AdminContentLayoutProps>) => {
  return (
    <ResponsiveBox
      className={`w-full ${className}`}
      singleColumnScreen="sm"
      screenByWidth={screen}
      height={"100%"}
    >
      <Row ratio={0} baseSize={1} shrink={1}></Row>
      <Row ratio={9} baseSize={9}></Row>

      <Col ratio={2}></Col>
      <Item>
        <Location row={0} col={0} />
        <div className={"w-full flex items-center"}>
          <ToggleSidebarButton />
          {header}
        </div>
        <div className={"separator"} />
      </Item>
      <Item>
        <Location row={1} col={0}></Location>
        <div className={"h-full"}>{content}</div>
      </Item>
    </ResponsiveBox>
  );
};

export const AdminContentLayoutCustom = memo(Layout);
