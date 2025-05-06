import { MutableRefObject, Ref } from "react";
import { useConfiguration } from "../hooks";

export const zip = (first: any[], second: any[]) =>
  first.reduce((acc, current, index) => {
    acc = acc.concat(current);
    if (second[index]) {
      acc = acc.concat(second[index]);
    } else {
      acc = acc.concat({});
    }
    return acc;
  }, []);
// PhanThang zip 3 cols to create new
export const zip3cols = (first: any[], second: any[], third: any[]) =>
  first.reduce((acc, current, index) => {
    acc.push(current);

    if (second[index]) {
      acc.push(second[index]);
    } else {
      acc.push({});
    }

    if (third[index]) {
      acc.push(third[index]);
    } else {
      acc.push({});
    }

    return acc;
  }, []);

// a function that returns an array of unique AreaCode and count of each AreaCode
export const uniqueFilterByDataField = <T, K extends keyof T>(
  data: T[] | undefined,
  dataField: K,
  emptyValuePlaceholder?: string
) => {
  if (data) {
    return data
      .reduce((acc: any, cur: T | any) => {
        const value = cur[dataField] ?? emptyValuePlaceholder;
        const existingItem = acc.find((item: any) => item.key === value);
        if (!existingItem) {
          acc.push({ key: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { key: string; count: number }[])
      .sort((a: any, b: any) => {
        if (!a.key) {
          return -1;
        }
        if (typeof a.key !== "string") {
          return a.key.toString().localeCompare(b.key.toString());
        }
        return a.key.localeCompare(b.key);
      })
      .map((item: any) => ({
        text: `${item.key} (${item.count})`,
        value: item.key,
      }));
  } else {
    return [];
  }
};

export const filterByFlagActive = <T>(
  data: T[] | undefined,
  displayTexts: { [key: string]: string } = {
    true: "Active",
    false: "Inactive",
  }
) => {
  if (data) {
    return data
      .reduce((acc: any, cur: T | any) => {
        const value = cur.FlagActive;
        const existingItem = acc.find((item: any) => item.key === value);
        if (!existingItem) {
          acc.push({ key: value, count: 1 });
        } else {
          existingItem.count++;
        }
        return acc;
      }, [] as { key: string; count: number }[])
      .map((item: any) => ({
        text: `${displayTexts[item.key]} (${item.count})`,
        value: item.key,
      }));
  } else {
    return [];
  }
};
const areaCodeFilter = <T, K = keyof T>(data: T[], dataField: K) => {};

// a convert function: "2023-05-02T17:00:00.000Z" -> "2023-05-02"
export const convertDateToString = (utcDateString: string) => {
  return new Date(utcDateString).toISOString().slice(0, 10);
};

export const flagEditorOptions = {
  searchEnabled: true,
  valueExpr: "value",
  displayExpr: "text",
  items: [
    {
      value: "1",
      text: "Active",
    },
    {
      value: "0",
      text: "Inactive",
    },
  ],
};

export const flagEditorOptionsSearch = {
  searchEnabled: true,
  valueExpr: "value",
  displayExpr: "text",
  items: [
    {
      value: "",
      text: "All",
    },
    {
      value: "1",
      text: "Active",
    },
    {
      value: "0",
      text: "Inactive",
    },
  ],
};

export const convertDate = (param: Date) => {
  var date = new Date(param);
  var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  return dateString;
};

export const getListOnlyMonth = () => {
  const yearList = [];

  // Set the start and end dates
  const startDate = new Date("2019-01-01");
  const endDate = new Date();

  // Loop through the months from end to start in descending order
  for (
    let date = endDate;
    date >= startDate;
    date.setMonth(date.getMonth() - 1)
  ) {
    const year = date.getFullYear(); // Get the year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month and pad with leading zero if needed
    const yearMonth = `${year}-${month}`; // Concatenate the year and month
    yearList.push({ value: yearMonth, text: yearMonth });
  }

  return yearList; // Return the generated yearList
};

// check mảng con có nằm trong mảng cha hay không
export const isAlertDuplicateFunc = (
  parent: any[],
  children: any[],
  key: string
): boolean => {
  for (const child of children) {
    const matchingObject = parent.find((obj1) => obj1[key] === child[key]);
    if (matchingObject) {
      return true;
    }
  }
  return false;
};

export const onKeyDownNumberBox = (ev: any, condition?: any) => {
  const kb = ev?.event?.key;
  const isValid = /^[0-9]+$/.test(kb);

  let lstAllow = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Backspace",
    ".",
    ",",
  ];

  if (condition?.isNegative === true) {
    lstAllow.push("-");
  }

  const isAllow = lstAllow.includes(kb);

  const isCtrlCombination =
    ev.event.ctrlKey && (kb === "a" || kb === "c" || kb === "v" || kb === "x");

  if (isValid === false && isAllow === false && !isCtrlCombination) {
    ev.event?.preventDefault();
    ev.event?.stopImmediatePropagation();
  }
};

// is duplicate object in array
export const removeDuplicateObjectInArrayByKey = (array: any, key: string) => {
  const seen: any = {};
  return array.filter((item: any) => {
    const itemKey = key ? item[key] : item;
    if (seen[itemKey]) {
      return false;
    }
    seen[itemKey] = true;
    return true;
  });
};

export const computedPmtPaymentStorage = (sum: number) => {
  const T = sum; // Tổng tiền sau VAT => T = SUM ( G: tổng cột chi phí lưu kho )
  const T1 = sum / 1.1; // Tổng tiền chưa VAT => T1 = T/1.1
  const V = T - T1; // VAT 10% => V = T - T1

  return V;
};

// remove duplicate obj in arr
export const excludeDuplicateObjOfArr = <T>(array: T[], key: keyof T) => {
  if (array.length > 0) {
    const uniqueArray: T[] = array.reduce(
      (accumulator: T[], currentObject: T) => {
        const isDuplicate = accumulator.some(
          (obj) => obj[key] === currentObject[key]
        );

        if (!isDuplicate) {
          accumulator.push(currentObject);
        }

        return accumulator;
      },
      []
    );
    return uniqueArray;
  } else {
    return [];
  }
};

export function encodeUrlData(data) {
  const encodedData = encodeURIComponent(data);
  return encodedData;
}

export function decodeUrlData(encodedData) {
  // Giải mã URL encoding
  let decodedUrl = decodeURIComponent(encodedData);

  return decodedUrl;
}

export function parseQueryString(query) {
  if (query.startsWith("query?")) {
    query = query.slice(6); // Loại bỏ "query?="
  }

  const params = new URLSearchParams(query);
  const result = {};

  for (const [key, value] of params.entries()) {
    if (key === "orderpartno") {
      result[key] = value.replace(/_/g, "."); // Chuyển "_" thành "."
    } else if (key === "lstpartid") {
      result[key] = value.split("_"); // Chuyển thành mảng
    } else {
      result[key] = value;
    }
  }

  return result;
}

// Example Usage
const queryString =
  "query?=supplierid=3431&orderpartno=VS058_OPN_F3K_95304&lstpartid=126469_126475_127305_127306";
const parsedData = parseQueryString(queryString);
console.log(parsedData);

export const onDeleteRowData = (
  refDataGrid: MutableRefObject<any>,
  key: string,
  objDelete?: Object
) => {
  const configuration = useConfiguration();

  const dxDataGrid = refDataGrid.current?.getDxInstance();
  if (!dxDataGrid) {
    console.error("Data grid instance not found.");
    return [];
  }

  const list = dxDataGrid.option("dataSource") || [];
  // dùng chung cho trường hợp xóa 1 và xóa nhiều của cả khi tích chọn hoặc click icon delete 1
  let selectedRows;
  if (objDelete) {
    selectedRows = [objDelete];
  } else {
    selectedRows = dxDataGrid.getSelectedRowsData();
  }

  const selectedRowData = new Set(selectedRows.map((item) => item[key])); //

  const unselectedData = list.filter((item) => !selectedRowData.has(item[key])); //

  const PageSize = configuration.MAX_PAGE_ITEMS;
  const PageIndex = 0;
  const ItemCount = unselectedData.length;
  const PageCount = Math.ceil(ItemCount / PageSize); //

  // Update the grid's page data
  refDataGrid.current?.setPageData({
    PageIndex,
    PageCount,
    PageSize,
    ItemCount,
    DataList: unselectedData,
  });

  return unselectedData;
};

// Format money, decimal, percent
export const useConvertNumber = () => {
  const convertMoneyVND = (number: any, shorten?: any) => {
    if (number) {
      const parts = number?.toString().split(".");
      // Lấy phần nguyên và thêm dấu phẩy
      if (shorten === 0 && parts[1] != undefined) {
        const firstDigit = parseInt(Math.abs(parts[1]).toString()[0]);
        if (firstDigit >= 5) {
          if (parts[0] < 0) {
            parts[0] = (Number(parts[0]) - 1).toString();
          } else {
            parts[0] = (Number(parts[0]) + 1).toString();
          }
        }
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // Kết hợp lại thành chuỗi định dạng
      if (
        parts[1] != undefined &&
        shorten &&
        parts[1].toString().length >= shorten
      )
        parts[1] = parts[1]?.slice(0, shorten);
      return parts.join(".");
    }
    return 0;
  };
  const formatNumber = (num: any) => {
    if (num) {
      if (typeof num !== "number") {
        return null; // Kiểm tra đầu vào
      }

      // Làm tròn lên nếu là số thập phân
      const roundedNum = Math.ceil(num * 100) / 100;

      // Kiểm tra xem số có phần thập phân hay không
      if (roundedNum % 1 !== 0) {
        return roundedNum.toLocaleString("vi-VN", { minimumFractionDigits: 2 });
      } else {
        return roundedNum.toLocaleString("vi-VN");
      }
    }
    return 0;
  };
  const convertPercent = (percent: any) => {
    return percent?.toFixed(2);
  };
  const convertDecimal = (decimal: any) => {
    return decimal?.toFixed(2).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
  };
  const convertMoneyDecimal = (number: any) => {
    if (number) {
      const [integerPart, decimalPart] = number.toString().split(".");

      // Thêm dấu phẩy vào phần nguyên
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );

      // Ghép phần nguyên và phần thập phân lại
      return decimalPart
        ? `${formattedIntegerPart}.${decimalPart}`
        : formattedIntegerPart;
    }
    return 0;
  };
  const convertRound = (number: any) => {
    if (number) {
      if (String(number).slice(-1) >= "5") {
        number = Math.ceil(number * 10) / 10;
      }
      return number;
    }
    return 0;
  };
  const customRound = (num: any) => {
    const integerPart = Math.trunc(num); // Lấy phần nguyên của số
    const decimalPart = num - integerPart; // Lấy phần thập phân của số

    // Nếu phần thập phân >= 0.5 thì làm tròn lên, ngược lại làm tròn xuống
    return decimalPart >= 0.5 ? Math.ceil(num) : Math.floor(num);
  };
  const roundNumber = (number: any) => {
    if (number) {
      return Math.round(number);
    }
    return 0;
  };
  return {
    convertDecimal,
    convertMoneyVND,
    convertPercent,
    convertMoneyDecimal,
    roundNumber,
    convertRound,
    formatNumber,
    customRound,
  };
};
