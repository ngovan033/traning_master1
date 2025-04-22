import { ColumnOptions } from "@/types";
import { Icon } from "@packages/ui/icons";
import { Button } from "devextreme-react";

interface SelectedColumnProps {
  onClick: () => void;
  item: ColumnOptions;
}
export function SelectedColumn({ item, onClick }: SelectedColumnProps) {
  return (
    <div
      className={"flex text-[13px] font-normal justify-between items-center"}
    >
      <Button
        stylingMode={"text"}
        className={"ml-auto icon-remove"}
        onClick={onClick}
      >
        <Icon name={"remove"} color={"#FF0000"} size={10} />
      </Button>

      {item.caption}
    </div>
  );
}
