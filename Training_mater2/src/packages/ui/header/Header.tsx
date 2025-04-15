import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import DMS_Logo from "../icons/svg/logo";
import "./Header.scss";
import HeaderMenu from "./header_menu/HeaderMenu";
import HeaderProfile from "./header_profile/HeaderProfile";

export function Header() {
  const style = useStylingCommon();

  return (
    <header className={style.HEADER.HEADER_CONTAINER}>
      <div className={style.HEADER.HEADER_LOGO}>
        <DMS_Logo />
      </div>

      <HeaderMenu />

      <HeaderProfile />
    </header>
  );
}
