import { VisibilityControl } from "@packages/hooks";
import Button from "devextreme-react/button";

interface GroupHeaderProps {
  caption: string;
  control: VisibilityControl;
  disableCollapsible?: boolean;
  visiableHeader?: boolean;
}
export const GroupHeader = ({
  caption,
  control,
  disableCollapsible = false,
  visiableHeader,
}: GroupHeaderProps) => {
  return (
    <>
      {visiableHeader ? (
        <div
          className={
            "form-group-header group-header flex text-xl bg-[#E8F0F6] px-4 py-2 justify-center items-center"
          }
        >
          <div className={"mr-auto"}>{caption}</div>
          {!disableCollapsible && (
            <Button
              className={"ml-auto bg-[#E8F0F6]"}
              hoverStateEnabled={false}
              icon={"/images/icons/expand.svg"}
              onClick={() => control.toggle()}
            />
          )}
        </div>
      ) : null}
    </>
  );
};
