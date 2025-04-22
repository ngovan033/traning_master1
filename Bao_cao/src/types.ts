import { ClientGateInfo, IOrg, IUser, Row, User } from "@packages/types";
import { ValidationRule } from "devextreme-react/common";
import { IColumnProps, IToolbarItemProps } from "devextreme-react/data-grid";
import { IFormOptions, IItemProps } from "devextreme-react/form";
import { EventInfo } from "devextreme/events";
import { ClickEvent } from "devextreme/ui/button";
import dxTreeView, { ItemClickEvent } from "devextreme/ui/tree_view";
import React, { forwardRef } from "react";

export interface AuthState {
  networkId: string;
  token?: string;
  currentUser?: IUser;
  // full information about the user with permission
  sysUser?: User;
  permissions?: string[];
  orgData?: IOrg;
  clientGate?: ClientGateInfo;
  clientGateUrl?: string;
  createDTime?: Date;
  orgId: String | number;
}
export interface AuthContextData {
  auth: AuthState;
  loggedIn: boolean;
  login: (
    accessToken: string,
    user?: IUser,
    orgData?: IOrg,
    clientGate?: ClientGateInfo
  ) => void;
  logout: () => void;
  selectNetwork: (networkId: string) => void;
  setClientGateInfo: (clientGate: ClientGateInfo) => void;
}
export interface SidebarItem {
  text?: string;
  subMenuTitle?: string;
  path: string;
  key: string;
}
export interface HeaderProps {
  menuToggleEnabled: boolean;
  title?: string;
  logo?: boolean;
  toggleMenu?: (e: ClickEvent) => void;
  items?: MenuBarItem[];
  extraItems?: MenuBarItem[];
  onMenuItemClick?: (item: MenuBarItem) => void;
}

export interface MenuBarProps {
  items: MenuBarItem[];
  extraItems?: MenuBarItem[];
  bgColor?: string;
  textColor?: string;
  onClick?: (item: MenuBarItem) => void;
}

export interface MenuBarItem {
  [x: string]: any;
  text: string;
  path: string;
  icon?: string;
  permissionCode?: string;
}

export interface SideNavigationMenuProps {
  selectedItemChanged: (e: ItemClickEvent) => void;
  openMenu: (e: React.PointerEvent) => void;
  compactMode: boolean;
  onMenuReady: (e: EventInfo<dxTreeView>) => void;
}

export interface UserPanelProps {
  menuMode: "context" | "list";
}

export interface SideNavToolbarProps {
  title: string;
}

export interface SingleCardProps {
  title?: string;
  description?: string;
}

export type Handle = () => void;

interface NavigationData {
  currentPath: string;
}

export type NavigationContextType = {
  setNavigationData?: ({ currentPath }: NavigationData) => void;
  navigationData: NavigationData;
};

export type ValidationType = {
  value: string;
};

export interface CellInfo<T> {
  data: T;
  row: Row;
  value: any;
  setValue: (value: string, text: string) => void;
}

export interface RouteItem {
  key: string;
  path: string;
  pageTitle?: string;
  mainMenuTitle?: string;
  subMenuTitle?: string;
  mainMenuKey: string;
  subMenuKey?: string;
  permissionCode?: string;
  getPageElement?: Function;
  items?: RouteItem[];
  isHQ?: "MAIN.HQ" | "MAIN.DL" | "";
  hasBreak?: boolean | "HQ" | "DL";
  view?: "DL" | "HQ" | "";
}

export interface ExItem extends IItemProps {
  disableCollapsible?: boolean;
  visiableHeader?: any;
}
export interface FormOptions extends Omit<IFormOptions, "items"> {
  items: ExItem[];
}

export type Alignment = "center" | "left" | "right";
export type DataType = "string" | "number" | "date" | "boolean" | "object";
export interface ColumnOptions extends IColumnProps {
  editorType?: string;
  columnIndex?: number;
  groupKey?: string;
  isSearchable?: boolean;
  alignment?: Alignment;
  dataType?: DataType;
  order?: number;
  label?: {
    text?: string;
  };
  onCellPrepared?: (e: any) => void;
  validationRules?: ValidationRule[];

  multiRowEditorOptions?: any;
}

export interface ToolbarItemProps extends IToolbarItemProps {
  location?: any;
}
export type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement
) => (props: P & React.RefAttributes<T>) => React.ReactElement;

export const fixedForwardRef = forwardRef as FixedForwardRef;
