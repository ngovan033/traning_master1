import { format, formatDistance, getMonth, set } from "date-fns";

export const formatDate = (date?: Date): string => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
};

export const isValidDateTime = (dateTimeString: any) => {
  const regex =
    /^([1-9]\d{3})-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|3[0-1]) \d{2}:\d{2}$/;
  if (!regex.test(dateTimeString)) return false;

  // Tách năm, tháng, ngày để kiểm tra thêm
  const [year, month, day] = dateTimeString.split(/[- :]/);

  // Kiểm tra ngày hợp lệ (có thể sử dụng thư viện để kiểm tra chính xác hơn)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (day > daysInMonth[month - 1] || (month === 2 && !isLeapYear && day > 28))
    return false;

  return true;
};
export const isValidDateTimeType = (dateString: any) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  // Kiểm tra xem ngày có hợp lệ hay không (ví dụ: không có ngày 30/02)
  const date: any = new Date(dateString);
  const isValid = date instanceof Date && !isNaN(date as any);
  const [year, month, day] = dateString.split("-").map(Number);

  return (
    isValid &&
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};

export const formatDateFollowYM = (date?: Date): string => {
  if (!date) return "";
  return format(date, "yyyy-MM");
};

//  ---------------------------------- LUẬT QUY ĐỊNH CỦA BÁO CÁO ----------------------------------------------
export const validateTimeStartDayOfMonth =
  (Number.isNaN(
    +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0]
  )
    ? 0
    : +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0]) <
  10
    ? set(Date.now(), { month: +getMonth(Date.now()) - 1, date: 1 }) // lấy ngày 1 tháng trước
    : set(Date.now(), { date: 1 }); // lấy ngày 1 tháng hiện tại

//  ---------------------------------- LUẬT QUY ĐỊNH CỦA NGHIỆP VỤ ----------------------------------------------
// 1. Ngày thực hiện tìm kiếm sau ngày 15 của tháng hiện tại --> thời gian tìm kiếm bắt đầu từ 01 tháng hiện tại
// 2. Ngày thực hiện tìm kiếm trước ngày 15 của tháng hiện tại --> thời gian tìm kiếm bắt đầu từ 01 tháng trước
export const validateMajorTimeStartDayOfMonth =
  (Number.isNaN(
    +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0]
  )
    ? 0
    : +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0]) <
  15
    ? set(Date.now(), { month: +getMonth(Date.now()) - 1, date: 1 }) // lấy ngày 1 tháng trước
    : set(Date.now(), { month: +getMonth(Date.now()), date: 1 }); // lấy ngày 1 tháng hiện tại
