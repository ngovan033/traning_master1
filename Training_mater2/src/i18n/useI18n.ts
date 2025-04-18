import { localeApi } from "@/packages/api";
import { localeAtom } from "@/packages/store/localization-store";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
interface Locale {
  cate: string;
  value: string;
}
export const useI18n = (cat: string) => {
  const [data] = useAtom(localeAtom);

  const cache = useRef<Locale[]>([]);

  useEffect(() => {
    return () => {
      if (cache.current.length > 0) {
        localeApi.addLocaleData(cache.current);
      }
    };
  }, []);

  const translateWithFormat = (key: string, ...args: any[]) => {
    // format string

    const format = (str: string, ...args: any[]) => {
      return str.replace(/{(\d+)}/g, (match, i) => {
        return typeof args[i] != "undefined" ? args[i] : match;
      });
    };
    const text = translate(key);
    return format(text, ...args);
  };
  const translate = (key: string) => {
    cat = cat.toString().trim().toUpperCase();
    if (!key || key == "") return key;
    const texts = data;
    let added = true;
    if (!texts) return key;
    var ret: string = key;
    if (!texts.hasOwnProperty(cat)) {
      added = false;
    } else {
      let items = texts[cat];
      let ext = items.find((v) => v.key == key);
      if (!ext) {
        added = false;
      } else {
        ret = ext.value ? ext.value : key;
      }
    }
    if (!added) {
      const newCache = [...cache.current, { cate: cat, value: key }];
      if (newCache.length > 1) {
        localeApi.addLocaleData(newCache);
        cache.current = [];
      } else {
        cache.current = newCache;
      }
    }
    return ret;
  };

  return {
    t: translate,
    tf: translateWithFormat,
  };
};
