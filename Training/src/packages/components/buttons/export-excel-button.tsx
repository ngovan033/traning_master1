import {
  BButtonProps,
  BButton,
} from "src/packages/components/buttons/base-button";

interface ExportExcelButtonProps extends BButtonProps {}
export const ExportExcelButton = ({
  label = "Xuất Excel",
  onClick,
}: ExportExcelButtonProps) => {
  return <BButton label={label} onClick={onClick} />;
};
