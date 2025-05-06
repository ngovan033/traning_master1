import { useI18n } from "@/i18n/useI18n";
import { uniq } from "lodash-es";

export const headerFilterAllowTranslate = <T, K extends keyof T>(
  data: T[] | undefined,
  dataField: any,
  emptyValuePlaceholder?: any,
  keyTranslate?: string
) => {
  if (data) {
    const { t } = useI18n(keyTranslate ?? "header_filter");
    const dataValue = data.map(
      (item: any) => item[dataField] ?? emptyValuePlaceholder
    );
    const uniqValue = uniq(dataValue);
    const datafilter = {
      dataSource: uniqValue.sort().map((item: any) => {
        return {
          text: `${t(item)}`,
          value: item,
        };
      }),
    };
    return datafilter;
  } else {
    return [];
  }
};
export const headerFilterAllowTranslatev2 = <T, K extends keyof T>(
  data: T[] | undefined,
  dataField: any,
  emptyValuePlaceholder?: any
) => {
  if (data) {
    const dataValue = data.map(
      (item: any) => item[dataField] ?? emptyValuePlaceholder
    );
    console.log("🚀 ~ dataValue:", dataValue);
    const uniqValue = uniq(dataValue);
    const datafilter = uniqValue.sort().map((item: any) => {
      return {
        text: item,
        value: item,
      };
    });

    return datafilter;
  } else {
    return [];
  }
};
