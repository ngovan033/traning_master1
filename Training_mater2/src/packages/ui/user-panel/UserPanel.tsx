import type { UserPanelProps } from "@/types";
import { useAuth } from "@packages/contexts/auth";
import { useNetworkNavigate } from "@packages/hooks";
import { useAuthService } from "@packages/services/auth-services";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import List from "devextreme-react/list";
import { useMemo } from "react";

import { useDialog } from "@/packages/hooks/useDiaglog";
import "./UserPanel.scss";

export function UserPanel({ menuMode }: UserPanelProps) {
  const {
    auth: { currentUser },
  } = useAuth();
  const navigate = useNetworkNavigate();
  const { signOut } = useAuthService();
  const { showDialog } = useDialog();

  function navigateToProfile() {
    navigate("/user/profile");
  }

  const handleHelp = () => {
    showDialog({
      title: "Trợ giúp",
      message:
        "Vui lòng liên hệ đội hỗ trợ theo số điện thoại: (04) 7306.8889 hoặc email: support@idocnet.com",
    });
  };

  const menuItems = useMemo(
    () => [
      {
        text: "Tài khoản",
        icon: "user",
        onClick: navigateToProfile,
      },
      {
        text: "Trợ giúp",
        icon: "help",
        onClick: handleHelp,
      },
      {
        text: "Đăng xuất",
        icon: "login",
        onClick: signOut,
      },
    ],
    [signOut, localStorage.getItem("modetab")]
  );
  return (
    <div className={"user-panel"}>
      <div className={"user-info"} id="user-info">
        <div className={"image-container"}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              backgroundImage: `url(${currentUser?.Avatar})`,
              backgroundSize: "cover",
            }}
            className={"user-image shadow-lg"}
          />
        </div>
      </div>

      {menuMode === "context" && (
        <ContextMenu
          items={menuItems}
          target={".user-button"}
          showEvent={"dxclick"}
          cssClass={"user-menu"}
        >
          <Position of="#user-info" offset={{ x: 0, y: 40 }} />
        </ContextMenu>
      )}
      {menuMode === "list" && (
        <List className={"dx-toolbar-menu-action"} items={menuItems} />
      )}
    </div>
  );
}
