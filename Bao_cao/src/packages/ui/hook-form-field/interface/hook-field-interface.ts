import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

export interface ILabelOptions {
  /**
   * Label của field
   */
  labelContent?: string;

  /**
   * Custom class của label
   */
  labelClass?: string;

  /**
   * Width của label (mặc định = 30%)
   */
  labelWidth?: string;

  /**
   * Có hiển thì label hay không (mặc định = true)
   */
  visible?: boolean;
}

export interface IStylingOptions {
  /**
   * Margin top and bottom của field (mặc định = 6px)
   */
  spacing?: string;

  /**
   * Customize class cho container của field
   */
  cssClass?: string;
}

export interface IHookField {
  /**
   * Field dùng để bind với hook-form dựa vào name của controller
   */
  field: ControllerRenderProps<FieldValues, Path<FieldValues>>;

  /**
   * Label của field (bỏ trống thì không hiển thị label)
   */
  label: ILabelOptions;

  /**
   * Error của field (bỏ trống thì không hiển thị error)
   */
  error?: FieldErrors<FieldValues>;

  /**
   * Bắt buộc nhập
   */
  required?: boolean;

  /**
   * Readonly field
   */
  disabled?: boolean;

  /**
   * Layout của field (ngang hay dọc)
   */
  direction?: "vertical" | "horizontal";

  /**
   * Styling của field
   */
  styling?: IStylingOptions;

  /**
   * Hiển thị nút clear (mặc định = false)
   */
  showClearButton?: boolean;

  /**
   * Hiển thị placeholder (mặc định = true)
   */
  showPlaceholder?: boolean;
}

export interface ICommonLabel extends IHookField {
  /**
   * Truyền input cho children
   */
  children: React.ReactNode;

  /**
   * Tên class cho children
   */
  childrenClassName: string;
}
