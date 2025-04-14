import { createClientGateApi } from "@packages/api";
import { authAtom } from "@packages/store/auth-store";
import { User } from "@packages/types";
import { atomsWithQuery } from "jotai-tanstack-query";

interface PermissionState {
  menu?: string[];
  buttons?: string[];
  sysUser?: User;
}
export const [permissionAtom] = atomsWithQuery<PermissionState>((get) => {
  const auth = get(authAtom);
  // const showError = useSetAtom(showErrorAtom);
  return {
    queryKey: ["permissions", auth?.currentUser?.Id],
    queryFn: async ({}) => {
      if (auth) {
        const { currentUser, networkId, orgData, clientGateUrl } = auth;

        if (!currentUser) {
          return {};
        }
        const api = createClientGateApi(
          currentUser!,
          clientGateUrl!,
          networkId,
          orgData?.Id!
        );
        const res: any = await api.GetForCurrentUser();
        if (res.isSuccess) {
          // parsing permission data
          const grantedMenu = res.Data?.Lst_Sys_Access.filter(
            (item: any) =>
              item.so_FlagActive === "1" && item.so_ObjectType === "MENU"
          ).map((item: any) => item.so_ObjectCode);
          const grantedButtons = res.Data?.Lst_Sys_Access.filter(
            (item: any) =>
              item.so_FlagActive === "1" && item.so_ObjectType === "BTN"
          ).map((item: any) => item.so_ObjectCode);
          return {
            menu: grantedMenu,
            buttons: grantedButtons,
            sysUser: res.Data?.Sys_User,
          };
        } else {
          // showError({
          //   message: res._strErrCode,
          //   _strErrCode: res._strErrCode,
          //   _strTId: res._strTId,
          //   _strAppTId: res._strAppTId,
          //   _objTTime: res._objTTime,
          //   _strType: res._strType,
          //   _dicDebug: res._dicDebug,
          //   _dicExcs: res._dicExcs,
          // });
          if (res.errorCode === "SysUserGetForCurrentUser") {
            window.location.href = "/login";
            return {};
          }
          return {};
        }
      }
      return {};
    },
    networkMode: "offlineFirst",
    keepPreviousData: false,
  };
});
