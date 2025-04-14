import { atom, useSetAtom } from "jotai";
import { PDFDocument } from "pdf-lib";

import print from "print-js";
import { toast } from "react-toastify";
import { printPropAtom } from "./PrintPopup";

export const printPopupAtom = atom<boolean>(false);

export const printUrlAtom = atom<string | undefined>(undefined);

interface ListItem {
  code: string;
  link: string;
  error: any;
  resp?: any;
}

export interface List {
  valid: ListItem[];
  invalid: ListItem[];
  count: number;
}

const usePrint = () => {
  const setPrintPopup = useSetAtom(printPopupAtom);
  const setPrintUrl = useSetAtom(printUrlAtom);
  const setPrintProp = useSetAtom(printPropAtom);

  const handleListPdf = async (list: List) => {
    const result = list;

    try {
      for (const item of list.valid) {
        if (item.link) {
          const response = await fetch(item.link);
          if (!response.ok) {
            result.invalid.push({
              code: item.code,
              error: "Error when try to get print data!",
              link: "",
              resp: null,
            });

            const refreshList = result.valid.filter((c: any) => {
              return c.code != item.code;
            });

            result.valid = refreshList;
          }
        }
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tải dữ liệu in!");
      throw new Error(JSON.stringify(error));
    }

    return result;
  };

  const mergeByLink = async ({ list }: { list: List }) => {
    const result: any = await handleListPdf(list);

    if (result?.valid?.length == list.count) {
      const pdfDoc = await PDFDocument.create();

      try {
        for (const item of result?.valid) {
          if (!item || item.link == "") {
            toast.error("Đã có lỗi xảy ra khi tải dữ liệu in!");
            throw new Error(`Print error!`);
          }

          const response = await fetch(item.link);
          if (!response.ok) {
            toast.error("Đã có lỗi xảy ra khi tải dữ liệu in!");
            throw new Error(`Print error!`);
          }
          const pdfBytes = new Uint8Array(await response.arrayBuffer());
          const pdf = await PDFDocument.load(pdfBytes);
          const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => pdfDoc.addPage(page));
        }

        const mergedPdfBytes = await pdfDoc.save();

        const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

        const link = URL.createObjectURL(blob);
        print({
          type: "pdf",
          printable: link,
        });
      } catch (error) {
        toast.error("Đã có lỗi xảy ra khi tải dữ liệu in!");
        throw new Error(JSON.stringify(error));
      }
    } else {
      setPrintProp({
        visible: true,
        list: result,
      });
    }
  };

  const printMultiByLink = async ({ list }: { list: ListItem[] }) => {
    const pdfDoc = await PDFDocument.create();

    try {
      for (const item of list) {
        if (!item || item.link == "") {
          toast.error(t("Error when try to get print data!"));
          throw new Error(`Print error!`);
        }

        const response = await fetch(item.link);
        if (!response.ok) {
          toast.error("Đã có lỗi xảy ra khi tải dữ liệu in!");
          throw new Error(`Print error!`);
        }
        const pdfBytes = new Uint8Array(await response.arrayBuffer());
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => pdfDoc.addPage(page));
      }

      const mergedPdfBytes = await pdfDoc.save();

      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

      const link = URL.createObjectURL(blob);
      print({
        type: "pdf",
        printable: link,
      });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tải dữ liệu in!");
      throw new Error(JSON.stringify(error));
    }
  };

  return {
    quickPrint: async ({ url }: { url: string }) => {
      print({
        type: "pdf",
        printable: url,
      });
    },
    previewPrint: ({ url }: { url: string }) => {
      setPrintPopup(true);
      setPrintUrl(url);
    },
    mergeByLink: mergeByLink,
    printMultiByLink: printMultiByLink,
  };
};

export default usePrint;
