import { custom } from "devextreme/ui/dialog";

interface IDiaglog {
  title?: string;
  message: string;
  buttons?: any[];
}

export const useDialog = () => {
  const defaultTitle = "Đã xảy ra lỗi";

  const showDialog = ({
    title = defaultTitle,
    message,
    buttons = [],
  }: IDiaglog) => {
    return custom({
      title: title,
      messageHtml: message,
      buttons:
        buttons.length > 0
          ? buttons
          : [
              {
                text: "OK",
                onClick: (e) => {
                  return;
                },
              },
            ],
    }).show();
  };

  return {
    showDialog,
  };
};
