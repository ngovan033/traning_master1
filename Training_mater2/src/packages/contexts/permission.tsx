import { permissionAtom } from "@packages/store/permission-store";
import { useAtomValue } from "jotai";
import React, { createContext, useContext } from "react";

interface PermissionContextProps {
  hasMenuPermission: (code: string) => boolean;
  hasButtonPermission: (code: string) => boolean;
  isHQ: () => boolean;
  DealerName: string | undefined;
  DealerCode: string | undefined;
  isHTV: boolean;
  isHTC: boolean;
  isDealer: boolean;
  Info: any;
}
const PermissionContext = createContext({} as PermissionContextProps);

export const usePermissions = () => useContext(PermissionContext);

export function PermissionProvider(props: React.PropsWithChildren<unknown>) {
  const permissionStore = useAtomValue(permissionAtom);
  const hasMenuPermission = (code: string) => {
    return permissionStore.menu?.includes(code) ?? false;
  };
  const hasButtonPermission = (code: string) => {
    return permissionStore.buttons?.includes(code) ?? false;
  };

  const isHQ = () => {
    return "MAIN.HQ" === permissionStore.sysUser?.BizUserType;
  };

  return (
    <PermissionContext.Provider
      value={{
        hasMenuPermission,
        hasButtonPermission,
        isHQ,
        DealerName: permissionStore.sysUser?.DealerName,
        DealerCode: permissionStore.sysUser?.DealerCode,
        isHTV: permissionStore.sysUser?.DealerCode == "HTV",
        isHTC: permissionStore.sysUser?.DealerCode == "HTC",
        isDealer:
          permissionStore.sysUser?.DealerCode != "HTV" &&
          permissionStore.sysUser?.DealerCode != "HTC",
        Info: permissionStore.sysUser,
      }}
      {...props}
    />
  );
}
