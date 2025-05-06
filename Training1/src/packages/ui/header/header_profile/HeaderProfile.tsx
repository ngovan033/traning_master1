import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import { Template } from "devextreme-react";
import { UserPanel } from "../../user-panel";

const HeaderProfile = () => {
  const style = useStylingCommon();

  return (
    <div className={style.HEADER.HEADER_PROFILE}>
      <div className="user-button cursor-pointer">
        <UserPanel menuMode={"context"} />
      </div>

      <Template name={"userPanelTemplate"}>
        <UserPanel menuMode={"list"} />
      </Template>
    </div>
  );
};

export default HeaderProfile;
