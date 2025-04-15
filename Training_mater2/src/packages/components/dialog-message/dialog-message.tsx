import { custom } from "devextreme/ui/dialog";

interface ILstBtn {
  text: string;
  onClick: (e: any) => void;
}

interface IProps {
  title: string;
  strHtml: string;
  lstBtn?: ILstBtn[];
  asyncAccept?: (dialogResult: any) => void;
}

export const DialogMessage = ({
  title,
  strHtml,
  lstBtn,
  asyncAccept,
}: IProps) => {
  const lstBtns = [
    ...(lstBtn ? lstBtn : []),
    {
      text: "OK",
      onClick: (e: any) => {
        return e;
      },
    },
  ];

  let myDialog = custom({
    title: title,
    messageHtml: strHtml,
    buttons: lstBtns,
  });

  myDialog.show().then((dialogResult: any) => {
    if (asyncAccept) {
      asyncAccept(dialogResult);
    }
  });
};
