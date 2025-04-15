import { format, getDate, set } from "date-fns";

export const useGetTime = () => {
  const now = new Date();
  const endDate = new Date(now.getTime());
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  now.setMonth(now.getMonth() - 1);

  var ngayDauThang = new Date(now.getFullYear(), now.getMonth(), 2);

  var getLui1Thang = ngayDauThang.toISOString().slice(0, 10);

  const dateCustomize = (dateMinus: any) => {
    const dateTime = set(Date.now(), {
      date: getDate(Date.now()) - dateMinus,
    });
    return dateTime;
  };
  const getMonthYear = (date: any) => {
    const myDate = new Date(date);

    // Lấy năm
    const year = myDate.getFullYear();

    // Lấy tháng (lưu ý rằng tháng bắt đầu từ 0, nên bạn có thể cần cộng thêm 1)
    const month = myDate.getMonth() + 1;
    return `${year}-${month >= 10 ? month : "0" + "" + month}`;
  };
  const getYear = (date: any) => {
    const myDate = new Date(date);

    // Lấy năm
    const year = myDate.getFullYear();

    return `${year}`;
  };

  const getTimeHHMMSS = () => {
    // Get the current time components
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the time to ensure two digits
    const formatHours = (hours < 10 ? "0" : "") + hours;
    const formatMinutes = (minutes < 10 ? "0" : "") + minutes;
    const formatSeconds = (seconds < 10 ? "0" : "") + seconds;

    // Create a string representing the current time in HH:mm:ss format
    const Time =
      format(date, "yyyy-MM-dd") +
      " " +
      formatHours +
      ":" +
      formatMinutes +
      ":" +
      formatSeconds;
    return Time;
  };
  const convertTimeHHMMSStoDateTime = (dateTime: string) => {
    const inputDate = new Date(dateTime);

    // Extract year, month, and day components from the Date object
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(inputDate.getDate()).padStart(2, "0");

    // Form the output date string in the format "YYYY-MM-DD"
    const outputDate = `${year}-${month}-${day}`;
    return outputDate;
  };
  const convertTimeHHMMSStoTime = (dateTime: string) => {
    if (dateTime) {
      const inputDate = new Date(dateTime);

      // Extract year, month, and day components from the Date object
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed

      // Form the output date string in the format "YYYY-MM-DD"
      const outputDate = `${year}-${month}`;
      return outputDate;
    }
    return "";
  };
  const convertISO8601 = (dateTime: string) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}`;
    return formattedDate;
  };
  const convertISO8601Full = (dateTime: string) => {
    if (dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    return "";
  };
  const convertISO8601FullHHMMSS = (dateTime: string) => {
    if (dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedDateTime;
    }
    return "";
  };

  const subTractMonth = (dateTime: any, numberMinus: number) => {
    const date = new Date(dateTime);
    date.setMonth(date.getMonth() - numberMinus);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const firstDay = new Date(year, date.getMonth(), 1);
    const formattedDate = firstDay.toISOString().slice(0, 10);

    return formattedDate;
  };

  const firstDayOfYear = () => {
    const today = new Date()
    const year = today.getFullYear();
    const firstDay = new Date(year, 0, 1); // Ngày đầu tiên của năm
    firstDay.setDate(firstDay.getDate() + 1); // Cộng thêm 1 ngày
    return firstDay.toISOString().split('T')[0]; // Trả 
  }
  const getLastMonthDate = () => {
    // Tạo một đối tượng Date đại diện cho ngày hôm nay
    let today = new Date();

    // Lấy ngày của ngày hôm nay
    let day = today.getDate();

    // Lấy tháng của ngày hôm nay (lưu ý rằng tháng trong JavaScript bắt đầu từ 0, do đó cần phải cộng thêm 1)
    let month = today.getMonth() + 1;

    // Lấy năm của ngày hôm nay
    let year = today.getFullYear();
    if (month >= 10) {
      // Kiểm tra nếu tháng là tháng 1, thì giảm năm đi 1 và thiết lập tháng là 12 (tháng trước)
      if (month === 1) {
        month = 12;
        year--;
      } else {
        month--;
      }

      // Trả về đối tượng chứa ngày, tháng và năm của tháng trước
      return `${year}-${month < 9 ? `0${month}` : month}-${day < 9 ? `0${day}` : day
        }`;
    } else {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      return convertISO8601Full(firstDay as any);
    }
  };
  const congThemNgayHomNay = (soNgayThemVao: any) => {
    function themSoKhong(neuCan: any, so: any) {
      return neuCan && so < 10 ? "0" + so : so;
    }
    if (soNgayThemVao) {
      // Ngày hôm nay
      const ngayHomNay = new Date();

      // Số ngày bạn muốn thêm vào
      // Đây là ví dụ, bạn có thể thay đổi số này theo nhu cầu của mình

      // Tính toán ngày kết thúc
      const ngayKetThuc = new Date(ngayHomNay);
      ngayKetThuc.setDate(ngayKetThuc.getDate() + soNgayThemVao * 30);

      // Lấy các thành phần của ngày kết thúc
      const ngay = themSoKhong(true, ngayKetThuc.getDate());
      const thang = themSoKhong(true, ngayKetThuc.getMonth() + 1); // Tháng trong JavaScript tính từ 0 đến 11, nên cần cộng thêm 1
      const nam = ngayKetThuc.getFullYear();

      // Định dạng lại thành chuỗi "năm/tháng/ngày"
      const ngayKetThucFormatted = nam + "-" + thang + "-" + ngay;
      return ngayKetThucFormatted;
    }
    return 0;
  };
  const congThemNgay = (soNgayThemVao: any) => {
    function themSoKhong(neuCan: any, so: any) {
      return neuCan && so < 10 ? "0" + so : so;
    }
    if (soNgayThemVao) {
      // Ngày hôm nay
      const ngayHomNay = new Date();

      // Số ngày bạn muốn thêm vào
      // Đây là ví dụ, bạn có thể thay đổi số này theo nhu cầu của mình

      // Tính toán ngày kết thúc
      const ngayKetThuc = new Date(ngayHomNay);
      ngayKetThuc.setDate(ngayKetThuc.getDate() + soNgayThemVao);

      // Lấy các thành phần của ngày kết thúc
      const ngay = themSoKhong(true, ngayKetThuc.getDate());
      const thang = themSoKhong(true, ngayKetThuc.getMonth() + 1); // Tháng trong JavaScript tính từ 0 đến 11, nên cần cộng thêm 1
      const nam = ngayKetThuc.getFullYear();

      // Định dạng lại thành chuỗi "năm/tháng/ngày"
      const ngayKetThucFormatted = nam + "-" + thang + "-" + ngay;
      return ngayKetThucFormatted;
    }
    return 0;
  };
  const convertTimeISOtoDate = (inputDateStr: any) => {
    // Parse the input date string
    const inputDate = new Date(inputDateStr);

    // Format the date to the desired output format
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(inputDate.getDate()).padStart(2, "0");
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");

    // Construct the output date string
    const outputDateStr = `${year}-${month}-${day} ${hours}:${minutes}`;
    return outputDateStr;
  };
  const calculateDayDifference = (date1: any, date2: any) => {
    if (date1 && date2) {
      const today: any = new Date(date1);
      const chooseData: any = new Date(date2);

      // Tính toán số mili giây giữa hai ngày
      const diffTime = today - chooseData;

      // Chuyển đổi số mili giây thành số ngày
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays;
    }
    return 0;
  };

  return {
    endDate,
    firstDay,
    now,
    getLastMonthDate,
    calculateDayDifference,
    dateCustomize,
    getTimeHHMMSS,
    convertTimeHHMMSStoDateTime,
    convertISO8601FullHHMMSS,
    convertTimeHHMMSStoTime,
    getLui1Thang,
    getMonthYear,
    convertISO8601,
    convertISO8601Full,
    subTractMonth,
    getYear,
    congThemNgayHomNay,
    congThemNgay,
    convertTimeISOtoDate,
    firstDayOfYear
  };
};
