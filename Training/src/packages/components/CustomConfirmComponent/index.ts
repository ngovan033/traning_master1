import { confirm, custom, CustomDialogOptions } from "devextreme/ui/dialog";
import "./style.scss";
import {
  useCommonConfig,
  useCommonUtils,
} from "@/packages/common/CommonUltils";

interface ICustomDialogOptions extends CustomDialogOptions {
  cssClass?: string | null;
}
// use:
// ...\2023.H.CarServices\14.FrontEnd\V10\src\pages\carservice\Ser_RO\components\ToolbarGridCustom\ToolBarROService.tsx
const CustomConfirmComponent = ({
  title,
  messageHtml,
  showTitle,
  message,
  dragEnabled,
  buttons,
  cssClass,
}: ICustomDialogOptions) => {
  const commonUtils = useCommonUtils();
  const commonConfig = useCommonConfig();
  // Ưu tiên sử dung message
  if (!commonUtils.isNullOrEmpty(message)) {
    messageHtml = `<div class="${
      cssClass ?? ""
    } confirm-wrapper"><p class="confirm-wrapper-text confirm-wrapper-text--overwrite" >${commonUtils.strVaule(
      message
    )}</p></div>`;
  }
  if (showTitle === undefined || showTitle === null) {
    showTitle = true;
  }
  if (dragEnabled === undefined || dragEnabled === null) {
    dragEnabled = true;
  }
  const objCustomDialogOptions = {
    title: title,
    messageHtml: messageHtml,
    showTitle: showTitle,
    message: message,
    dragEnabled: dragEnabled,
    buttons: buttons,
  } as CustomDialogOptions;

  return custom(objCustomDialogOptions);
  // .then((dialogResult: boolean) => {
  //   if (dialogResult) {
  //     asyncFunction();
  //   }
  // });
};
export default CustomConfirmComponent;
