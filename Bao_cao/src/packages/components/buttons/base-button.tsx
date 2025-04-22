import Button, { IButtonOptions } from "devextreme-react/button";
import { Icon, IconName } from "@packages/ui/icons";
import { match, P } from "ts-pattern";
import "./base-button.scss";
import { usePermissions } from "@/packages/contexts/permission";
export interface BButtonProps extends IButtonOptions {
  iconName?: IconName;
  label?: string;
  cssLabel?: string;
  isMdSize?: boolean;
  permissionCode?: string;
}
export const BButton = ({
  label = "Print",
  iconName,
  onClick,
  type = "default",
  className = "",
  cssLabel,
  isMdSize = false,
  permissionCode,
  ...rest
}: BButtonProps) => {
  const { hasButtonPermission } = usePermissions();
  if (permissionCode && !hasButtonPermission(permissionCode)) {
    return <></>;
  }
  return (
    <Button
      stylingMode={"contained"}
      type={type}
      text={label}
      onClick={onClick}
      activeStateEnabled={false}
      focusStateEnabled={false}
      className={`base-button ${className} ${isMdSize ? "config_md_btn" : ""}`}
      {...rest}
    >
      {match(iconName)
        .with(P.nullish, () => null)
        .otherwise(() => (
          <Icon className={"mr-2"} size={13} name={iconName!} />
        ))}
      {match(label)
        .with(P.nullish, () => null)
        .otherwise(() => (
          <span className={cssLabel}>{label}</span>
        ))}
    </Button>
  );
};
