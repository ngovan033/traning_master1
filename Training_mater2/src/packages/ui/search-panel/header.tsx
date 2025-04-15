import { useI18n } from "@/i18n/useI18n";
import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import { Icon } from "@packages/ui/icons";
import CollapseLeftIcon from "../icons/svg/collapse-left";
import SettingColumnIcon from "../icons/svg/setting-column";

interface HeaderProps {
  onToggleSettings?: () => void;
  onCollapse?: () => void;
  enableColumnToggler?: boolean;
  className?: string;
}

export const Header = ({
  className,
  onCollapse,
  onToggleSettings,
  enableColumnToggler = true,
}: HeaderProps) => {
  const { t } = useI18n("Common");
  const style = useStylingCommon();

  return (
    <div
      className={`header-search-panel flex ${className} flex-row items-center pl-[16px] pr-[9px] h-[44px]`}
    >
      <div className={"mr-auto flex items-center text-[#00703C]"}>
        <Icon name={"search"} width={14} height={14} />
        <span className={"search-form__title"}>{t("Search")}</span>
      </div>
      <div className={"flex flex-end items-center gap-[2px]"}>
        {enableColumnToggler && (
          <div className={style.ICON.ICON_CONTAINER} onClick={onToggleSettings}>
            <SettingColumnIcon />
          </div>
        )}

        <div className={style.ICON.ICON_CONTAINER} onClick={onCollapse}>
          <CollapseLeftIcon />
        </div>
      </div>
    </div>
  );
};
