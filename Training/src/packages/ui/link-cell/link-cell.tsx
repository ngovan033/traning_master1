import { CSSProperties, useMemo } from "react";

export interface LinkCellProps<T extends string, E> {
  value: T;
  onClick: () => void;
  style?: CSSProperties | undefined;
}
export const LinkCell = <T extends string, E>({
  value,
  onClick,
  style,
}: LinkCellProps<T, E>) => {
  return useMemo(
    () => (
      <div
        className={`code-cell hover:underline hover:text-[#00703c] hover:cursor-pointer text-[#0E223D] text-[13px] `}
        onClick={onClick}
        style={style}
      >
        {value}
      </div>
    ),
    []
  );
};
