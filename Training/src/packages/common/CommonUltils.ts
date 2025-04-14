import { da } from "date-fns/locale";
import { format } from "date-fns";
export const isNullOrEmpty = (data: any) => {
  if (
    data !== undefined &&
    data !== null &&
    data.toString().trim().length > 0
  ) {
    return false;
  } else {
    return true;
  }
};

export const strVaule = (data: any) => {
  if (!isNullOrEmpty(data)) {
    data = data.toString().trim();
  } else {
    data = "";
  }
  return data;
};

export const strVauleOrNull = (data: any) => {
  if (!isNullOrEmpty(data)) {
    data = data.toString().trim();
  } else {
    data = null;
  }
  return data;
};

export const convertBooleanToFlag_20241023 = (data: any) => {
  let flag = '';
  if (!isNullOrEmpty(data)) {
    const bData = data as boolean;
    if (bData) {
      flag = '1';
    }
    else {
      flag = '0';
    }
  } else {
    flag = '0';
  }
  return flag;
};

export const convertBooleanToFlag = (data: any) => {
  let flag = '';
  let bData = false;
  if (!isNullOrEmpty(data)) {
    const type = typeof (data);
    if (type == 'string') {
      const strData = strVaule(data);
      if (isStringEquals(strData, '0')) {
        flag = '0';
      }
      else if (isStringEquals(strData, '1')) {
        flag = '1';
      }
    }
    else if (type == 'boolean') {
      bData = data as boolean;
      if (bData) {
        flag = '1';
      }
      else {
        flag = '0';
      }
    }
  } else {
    flag = '0';
  }
  return flag;
};

export const convertBooleanToFlagOrNull = (data: any) => {

  let flag = null;
  if (!isNullOrEmpty(data)) {
    const bData = data as boolean;
    if (bData) {
      flag = '1';
    }
    else {
      flag = '0';
    }
  } else {
    flag = null;
  }
  return flag;
};

export const convertFlagToBoolean = (data: any) => {
  let bFlag = false;
  if (isStringEquals(data, '1')) {
    bFlag = true;
  }
  return bFlag;
};

export const strJSONStringify = (data: any) => {
  let strJson = null;
  if (data !== undefined && data !== null) {
    strJson = JSON.stringify(data);
  }
  return strJson;
};

export const toLocaleLowerCase = (data: any) => {
  if (!isNullOrEmpty(data)) {
    data = strVaule(data);
    data = data.toLocaleLowerCase();
  } else {
    data = "";
  }
  return data;
};

export const toLocaleUpperCase = (data: any) => {
  if (!isNullOrEmpty(data)) {
    data = strVaule(data);
    data = data.toLocaleUpperCase();
  } else {
    data = "";
  }
  return data;
};

export const locDau = (data: any) => {
  // using : onkeyup="commonUtils.locDau(this);"
  let strData = '';
  if (!isNullOrEmpty(data)) {
    data = strVaule(data);
    if (eval(data)) {
      strData = eval(data).value;
    } else {
      strData = data;
    }

    strData = strData.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ |ặ|ẳ|ẵ/g, "a");

    strData = strData.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ |Ặ|Ẳ|Ẵ/g, "A");

    strData = strData.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");

    strData = strData.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");

    strData = strData.replace(/ì|í|ị|ỉ|ĩ/g, "i");

    strData = strData.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");

    strData = strData.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ |ợ|ở|ỡ/g, "o");

    strData = strData.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ |Ợ|Ở|Ỡ/g, "O");

    strData = strData.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");

    strData = strData.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");

    strData = strData.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");

    strData = strData.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");

    strData = strData.replace(/đ/g, "d");

    strData = strData.replace(/Đ/g, "D");

    //strData = strData.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\\|\||\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    //strData = strData.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\\|\||\<|\>|\?|\/|,|\:|\;|\'| |\"|\&|\#|\$|\`|\[|\]|~|$|_/g, "-"); // cho phép nhập dấu ., các ký tự ko cho phép -> -
    //strData = strData.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\\|\||\<|\>|\?|\/|,|\:|\;|\'| |\"|\&|\#|\$|\`|\[|\]|~|$|/g, ""); // cho phép nhập dấu ., các ký tự ko cho phép -> -
    strData = strData.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\\|\||\<|\>|\?|,|\:|\;|\'| |\"|\&|\#|\$|\`|\[|\]|~|$|/g, ""); // cho phép nhập dấu ., các ký tự ko cho phép -> -
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */

    strData = strData.replace(/-+-/g, "-");//thay thế 2- thành 1- 
    strData = strData.replace(/_+_/g, "_");//thay thế 2 _ thành 1 _
    strData = strData.replace(/\.+\./g, ".");//thay thế 2 . thành 1 .

    strData = strData.replace(/^\-+/g, ""); //cắt bỏ ký tự - ở đầu
    strData = strData.replace(/^\_+/g, ""); //cắt bỏ ký tự _ ở đầu
    strData = strData.replace(/^\.+/g, ""); //cắt bỏ ký tự . ở đầu

    //strData = strData.replace(/^\-+|\-+$/g, ""); //
    //strData = strData.replace(/\-/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi 

    eval(data).value = strData.trim();
  }
  else {
    return '';
  }
};

export const reverse = (data: any) => {
  // Đảo ngược chuỗi
  let strData = '';
  if (!isNullOrEmpty(data)) {
    data = strVaule(data);
    for (var i = data.length - 1; i >= 0; i--) {
      strData += data[i];
    }
  }

  return strData;
};

export const catChuoi = (data: any, soluongkytu: number) => {
  let subchuoi = '';
  if (!isNullOrEmpty(data)) {
    data = data.toString().trim();
    if (data.length <= soluongkytu) {
      subchuoi = data;
    } else {
      var indexOf = data.lastIndexOf(" ", soluongkytu);
      if (indexOf > 0) {
        subchuoi = data.substring(0, indexOf).trim() + '...';
      } else {
        subchuoi = data.substring(0, soluongkytu).trim() + '...';
      }
    }
  }
  return subchuoi;
};

export const replaceAll = (chuoi: any, chuoicanthaythe: any, chuoithaythe: any) => {
  //const chuoi = 'Báo điện -tử-dân trí baodientudantri-https://dantri.com.vn';
  //const chuoicanthaythe = "/";
  //const chuoithaythe = " // ";
  const patt = new RegExp(chuoicanthaythe, "g");
  return chuoi.replace(patt, chuoithaythe);
};
/**
 * Cần test kỹ
 * @param chuoi = 'Báo điện -tử-dân trí baodientudantri-https://dantri.com.vn';
 * @param chuoicanthaythe = ["/", "-"];
 * @param chuoithaythe = ["//", " – "];
 * @returns 
 */
export const replaceAll_Arrays_ChuoiCanThayThe = (chuoi: any, chuoicanthaythe: any, chuoithaythe: any) => {
  if (chuoicanthaythe !== null && chuoicanthaythe.length > 0) {
    let _chuoicanthaythe = '';
    let _chuoithaythe = '';
    let patt = null;
    for (let i = 0; i < chuoicanthaythe.length; i++) {
      _chuoicanthaythe = chuoicanthaythe[i];
      for (let i = 0; i < chuoithaythe.length; i++) {
        _chuoithaythe = chuoithaythe[i];
        patt = new RegExp(_chuoicanthaythe, "g");
        chuoi = chuoi.replace(patt, _chuoithaythe);
      }
    }
  }
  return chuoi;
};

export const iLength = (data: any) => {
  let iLength = 0;
  if (!isNullOrEmpty(data)) {
    iLength = strVaule(data).length;
  }
  return iLength;
};

export const isStringEquals = (firstData: any, secondData: any) => {
  firstData = strVaule(firstData);
  secondData = strVaule(secondData);
  if (firstData === secondData) {
    return true;
  }
  return false;
};

export const isNumber = (data: any) => {
  // isNumber('a') => true; (không là số)
  // isNumber(1.5.5) => true; (không là số)
  // isNumber(1,5) => true; (không là số) (dấu '.' mới hợp lệ (là phần phân cách thập phân))
  // isNumber(1111.555) => false; (là số)

  let check = false;
  if (!isNullOrEmpty(data)) {
    if (!isNaN(data)) {
      check = true; // là số
    }
  }
  return check;
};

export const convertToInt = (data: any) => {
  let value = 0;
  if (isNumber(data)) {
    value = parseInt(data);
  }
  return value;
};

export const convertToIntOrNull = (data: any) => {
  let value: number | null;
  if (isNumber(data)) {
    value = parseInt(data);
    return value;
  }
  return null;
};

export const convertToFloat = (data: any) => {
  let value = 0.0;
  if (isNumber(data)) {
    value = parseFloat(data);
  }
  return value;
};

export const convertToFloatOrNull = (data: any) => {
  let value: number | null;
  if (isNumber(data)) {
    value = parseFloat(data);
    return value;
  }
  return null;
};

/**
 * 
 * @param number số
 * @param scale lấy bao số phần thập phân
 * @returns 
 * sing fnumber = formatNumber(convertToFloat(number), parseInt(scale));
 */
export const formatNumber = (number: number, scale: number) => {
  const _number = number.toFixed(scale) + '';
  const x = _number.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  if (scale === 0) {
    return x1; //10,000
  } else {
    return x1 + x2; //10,000.05
  }
};

export const validateEmail = (data: any) => {
  if (!isNullOrEmpty(data)) {
    data = strVaule(data);
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(data);
  }
  return false;
};

export const validateHhMm = (data: any) => {
  if (!isNullOrEmpty(data)) {
    data = strVaule(data);
    const regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    return regex.test(data);
    // const isValid = regex.test(data);
    // if (isValid) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
  return false;
};

export const checkDate = (data: any) => {
  if (isNullOrEmpty(data)) {
    return false;
  }
  const date = new Date(data);
  const check = (date instanceof Date);
  return check;
};

export const formatDate = (data: any, strFormat: any) => {

  let strDate = '';
  if (checkDate(data)) {
    data = strVaule(data);
    strDate = format(new Date(data), strFormat);
  }
  return strDate;
};
export const formatDateOrNull = (data: any, strFormat: any) => {
  let strDate = null;
  if (checkDate(data)) {
    data = strVaule(data);
    strDate = format(new Date(data), strFormat);
  }
  return strDate;
};
export const convertToDateTime = (data: any) => {
  let dateTime = null;
  if (checkDate(data)) {
    data = strVaule(data);
    dateTime = new Date(data);
  }
  return dateTime;
};
export const dateTimeSubtractDays = (first: any, second: any) => {
  if (!isNullOrEmpty(first) && !isNullOrEmpty(second)) {
    const timeFirst = new Date(first).getTime();
    const timeSecond = new Date(second).getTime();
    const diff = timeFirst - timeSecond;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  }
  return 0;
};

export const dateTimeAddDays = (first: any, second: any) => {
  let date = new Date(first);
  date.setDate(date.getDate() + second);
  return date;
};
export const dateTimeAddHours = (first: any, second: any) => {
  let date = new Date(first);
  date.setHours(date.getHours() + second);
  return date;
};
export const totalMonths = (enddate: any, startdate: any) => {
  let totalMonths;
  const startdateCur = new Date(startdate);
  const enddateCur = new Date(enddate);
  const startMonthCur = startdateCur.getMonth();
  const startYearCur = startdateCur.getFullYear();
  const endMonthCur = enddateCur.getMonth();
  const endYearCur = enddateCur.getFullYear();
  totalMonths = (endYearCur - startYearCur) * 12;
  totalMonths -= (startMonthCur + 1);
  totalMonths += (endMonthCur + 1);
  return totalMonths <= 0 ? 0 : totalMonths;
};
export const getToday = () => {
  const dateTime = new Date();
  const iDate = dateTime.getDate();
  const iMonth = dateTime.getMonth() + 1;
  const iYear = dateTime.getFullYear();

  const date = iDate < 10 ? `0${iDate}` : `${iDate}`;
  const month = iMonth < 10 ? `0${iMonth}` : `${iMonth}`;


  return `${iYear}-${month}-${date}`;
};

export const getDateTime_HH_mm = () => {
  const dateTime = new Date();
  const iDate = dateTime.getDate();
  const iMonth = dateTime.getMonth() + 1;
  const iYear = dateTime.getFullYear();

  const iHours = dateTime.getHours();
  const iMinutes = dateTime.getMinutes();
  const iSeconds = dateTime.getSeconds();

  const date = iDate < 10 ? `0${iDate}` : `${iDate}`;
  const month = iMonth < 10 ? `0${iMonth}` : `${iMonth}`;

  const hours = iHours < 10 ? `0${iHours}` : `${iHours}`;
  const minutes = iMinutes < 10 ? `0${iMinutes}` : `${iMinutes}`;
  const seconds = iSeconds < 10 ? `0${iSeconds}` : `${iSeconds}`;


  return `${iYear}-${month}-${date} ${hours}:${minutes}`;
};

export const getDateTimeNow = () => {
  const dateTime = new Date();
  const iDate = dateTime.getDate();
  const iMonth = dateTime.getMonth() + 1;
  const iYear = dateTime.getFullYear();

  const iHours = dateTime.getHours();
  const iMinutes = dateTime.getMinutes();
  const iSeconds = dateTime.getSeconds();

  const date = iDate < 10 ? `0${iDate}` : `${iDate}`;
  const month = iMonth < 10 ? `0${iMonth}` : `${iMonth}`;

  const hours = iHours < 10 ? `0${iHours}` : `${iHours}`;
  const minutes = iMinutes < 10 ? `0${iMinutes}` : `${iMinutes}`;
  const seconds = iSeconds < 10 ? `0${iSeconds}` : `${iSeconds}`;


  return `${iYear}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};
export const compareTwoDates = (first: any, second: any) => {
  // first > second => return true 
  const timeFirst = new Date(first).getTime();
  const timeSecond = new Date(second).getTime();
  if (timeFirst > timeSecond) {
    return true;
  } else {
    return false;
  }
};

export const compareTwoDates_GE = (first: any, second: any) => {
  // Is greater than or equal to
  // first >= second => return true 
  const timeFirst = new Date(first).getTime();
  const timeSecond = new Date(second).getTime();
  if (timeFirst >= timeSecond) {
    return true;
  } else {
    return false;
  }
};

export const compareTwoDates_Equals = (first: any, second: any) => {
  // Is greater than or equal to
  // first >= second => return true 
  const timeFirst = new Date(first).getTime();
  const timeSecond = new Date(second).getTime();
  if (timeFirst == timeSecond) {
    return true;
  } else {
    return false;
  }
};

export const getTimeAgo = (startdate: any, enddate: any) => {
  let strTime = "";
  if (checkDate(startdate) && checkDate(enddate)) {
    const startdateCur = new Date(startdate);
    const enddateCur = new Date(enddate);
    const timeSpan = enddateCur.getTime() - startdateCur.getTime();

    const deltaSeconds = convertToFloat(timeSpan / 1000); // TotalSeconds
    const deltaMinutes = convertToFloat(deltaSeconds / 60.0);
    let minutes = convertToInt(0);

    if (deltaSeconds < 5) {
      strTime = "Just now"; // "Just now" "Vừa mới"
    }
    else if (deltaSeconds < 60) {
      strTime = Math.floor(deltaSeconds) + " seconds ago"; // " giây trước" " seconds ago"
    }
    else if (deltaSeconds < 120) {
      strTime = "A minute ago"; // "A minute ago" "1 phút trước"
    }
    else if (deltaMinutes < 60) {
      strTime = Math.floor(deltaMinutes) + " minutes ago"; // " minutes ago" " phút trước"
    }
    else if (deltaMinutes < 120) {
      strTime = "An hour ago"; // "An hour ago" "1 giờ trước"
    }
    else if (deltaMinutes < (24 * 60)) {
      minutes = convertToInt(Math.floor(deltaMinutes / 60));
      strTime = minutes + " hours ago"; //  " hours ago"  " giờ trước"
    }
    else if (deltaMinutes < (24 * 60 * 2)) {
      strTime = "Yesterday"; // "Yesterday" "Hôm qua"
    }
    else if (deltaMinutes < (24 * 60 * 7)) {
      minutes = convertToInt(Math.floor(deltaMinutes / (60 * 24)));
      strTime = minutes + " days ago"; // " days ago" " ngày trước"
    }
    else if (deltaMinutes < (24 * 60 * 14)) {
      strTime = "Last week"; // "Last week" "Tuần trước"
    }
    else if (deltaMinutes < (24 * 60 * 31)) {
      minutes = convertToInt(Math.floor(deltaMinutes / (60 * 24 * 7)));
      strTime = minutes + " weeks ago"; // " weeks ago" " tuần trước"
    }
    else if (deltaMinutes < (24 * 60 * 61)) {
      strTime = "Last month"; // "Last month" "Tháng trước"
    }
    else if (deltaMinutes < (24 * 60 * 365.25)) {
      minutes = convertToInt(Math.floor(deltaMinutes / (60 * 24 * 30)));
      strTime = minutes + " months ago"; // " months ago" " tháng trước"
    }
    else if (deltaMinutes < (24 * 60 * 731)) {
      strTime = "Last year"; // "Last year" "1 năm trước"
    }
    else {
      minutes = convertToInt(Math.floor(deltaMinutes / (60 * 24 * 365)));
      strTime = minutes + " years ago"; // " years ago" " năm trước"
    }
  }
  return strTime;

};

/**
 * Tìm kiếm danh sách phần tử trong mảng
 * @param arr 
 * @param key 
 * @param value 
 * @returns 
 */
export const filterObjectInArr = (arr: any[], key: any, value: any) => {
  if ((arr !== undefined && arr !== null && arr.length > 0)
    && !isNullOrEmpty(key)
    && !isNullOrEmpty(value)) {
    key = strVaule(key);
    value = strVaule(value);

    return arr.filter(x => x[key] === value);
  }
  else {
    return null;
  }
};

/**
 * Tìm kiếm phần tử trong mảng
 * @param arr 
 * @param key 
 * @param value 
 * @returns 
 */
export const findObjectInArr = (arr: any[], key: any, value: any) => {
  if ((arr !== undefined && arr !== null && arr.length > 0)
    && !isNullOrEmpty(key)
    && !isNullOrEmpty(value)) {
    key = strVaule(key);
    value = strVaule(value);
    const obj = arr.find(x => strVaule(x[key]) === value);
    return obj;
  }
  else {
    return null;
  }
};

/**
 * Xóa phần tử trong mảng// check laij
 * @param arr 
 * @param key 
 * @param value 
 * @returns 
 */
export const removeObjectInArr = (arr: any[], key: any, value: any) => {
  if ((arr !== undefined && arr !== null && arr.length > 0)
    && !isNullOrEmpty(key)
    && !isNullOrEmpty(value)) {
    key = strVaule(key);
    value = strVaule(value);
    const index = arr.findIndex(function (it) {
      return it[key] === value;
    })
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  else {
    return null;
  }
};

export const randHex = (length: number) => {
  const maxlen = 16,
    min = Math.pow(16, Math.min(length, maxlen) - 1),
    max = Math.pow(16, Math.min(length, maxlen)) - 1,
    n = Math.floor(Math.random() * (max - min + 1)) + min;
  let r = n.toString(16);
  while (r.length < length) {
    r = r + randHex(length - maxlen);
  }
  return r;
};

export const randomPassword = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const useCommonUtils = () => {
  return {
    isNullOrEmpty,
    strVaule,
    strVauleOrNull,
    convertBooleanToFlag,
    convertBooleanToFlagOrNull,
    convertFlagToBoolean,
    strJSONStringify,
    toLocaleLowerCase,
    toLocaleUpperCase,
    locDau,
    reverse,
    catChuoi,
    replaceAll,
    replaceAll_Arrays_ChuoiCanThayThe,
    iLength,
    isStringEquals,
    isNumber,
    convertToInt,
    convertToIntOrNull,
    convertToFloat,
    convertToFloatOrNull,
    formatNumber,
    validateEmail,
    validateHhMm,
    checkDate,
    formatDate,
    formatDateOrNull,
    convertToDateTime,
    dateTimeSubtractDays,
    dateTimeAddDays,
    dateTimeAddHours,
    totalMonths,
    getToday,
    getDateTime_HH_mm,
    getDateTimeNow,
    compareTwoDates,
    compareTwoDates_GE,
    compareTwoDates_Equals,
    getTimeAgo,
    filterObjectInArr,
    findObjectInArr,
    removeObjectInArr,
    randHex,
    randomPassword,
  };
};

export const useCommonConfig = () => {
  return {
    /**
     * Phân trang
     */
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    Ft_PageSize_Max: 123456000000,
    /**
     * Trạng thái
     */
    FlagActive: `1`,
    FlagInactive: `0`,
    /**
     * Định dạng ngày tháng
     */
    FormatDate: `yyyy-MM-dd`,
    FormatDate_Hours_Minutes: `yyyy-MM-dd HH:mm`,
    FormatDateTime: `yyyy-MM-dd HH:mm:ss`,
    /**
     * Định dạng số
     */
    FormatInt: `#,##0`,
    FormatFloat_1: `#,##0.#`,
    FormatFloat_2: `#,##0.##`,
    FormatFloat_3: `#,##0.###`,
    FormatFloat_4: `#,##0.####`,
    FormatFloat_5: `#,##0.#####`,
    FormatFloat_6: `#,##0.######`,
    FormatFloat_7: `#,##0.#######`,
    FormatFloat_8: `#,##0.########`,
    FormatFloat_9: `#,##0.#########`,
  }
};
