import { usePermissions } from "@/packages/contexts/permission";
import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import { CSSProperties, ReactNode } from "react";

interface IButtonCommonProps {
  text?: string;
  icon?: string | JSX.Element;
  onClick?: () => void;
  visible?: boolean;
  size?: "tiny" | "small" | "medium" | "large";
  type?: "primary" | "secondary" | "success" | "onlytext";
  disabled?: boolean;
  children?: ReactNode;
  permissionCode?: string;
  style?: CSSProperties;
}

const ButtonCommon = ({
  text = "",
  icon,
  onClick,
  visible = true,
  size = "medium",
  type = "primary",
  disabled = false,
  permissionCode,
  children,
  style,
}: IButtonCommonProps) => {
  const styleCommon = useStylingCommon();
  const { hasButtonPermission } = usePermissions();

  {
    /* Nếu có mã phân quyền thì ẩn/hiện theo phân quyền button
          <=> còn không điền mã phân quyền ( tức là "" or undefined) thì mặc định cho hiện nút */
  }
  if (permissionCode) {
    if (!hasButtonPermission(permissionCode)) {
      return <></>;
    }
  }

  if (!visible) {
    return <></>;
  }

  return (
    <div
      className={`${styleCommon.BUTTON.BUTTON_CONTAINER} ${size} ${type} ${
        disabled ? "disabled-button" : ""
      } ${!text && icon ? "only-icon" : ""}`}
      onClick={disabled ? () => {} : onClick}
      style={style}
    >
      {icon ? <div>{icon}</div> : <></>}
      {text ? (
        <div className={styleCommon.BUTTON.BUTTON_TEXT}>{text}</div>
      ) : (
        <></>
      )}
      {children}
    </div>
  );
};

export default ButtonCommon;
