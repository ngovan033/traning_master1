type StatusRO =
  | "FlagChoSua"
  | "FlagDangSua"
  | "FlagRepaired"
  | "FlagCheckEnd"
  | "FlagPaid"
  | "FlagFinished"
  | "FlagReject"
  | "FlagKhongDung";

export const highlightStatusRow = (
  status: StatusRO,
  prefixClassName?: string
) => {
  const lstStatus = [
    {
      value: "CRE",
      text: "Lập báo giá",
      color: "",
    },
    {
      value: "HRO",
      text: "Lập lệnh sửa chữa",
      color: "",
    },
    {
      value: "PRT",
      text: "In báo giá",
      color: "",
    },
    {
      value: "W4P",
      text: "Đợi phụ tùng",
      color: "",
    },
    {
      value: "HPA",
      text: "Đã có phụ tùng",
      color: "",
    },
    {
      value: "REJ",
      text: "Hủy",
      color: "",
    },
    {
      value: "INGA",
      text: "Vào sửa chữa",
      color: "",
    },
    {
      value: "RPRD",
      text: "Sửa xong",
      color: "",
    },
    {
      value: "CEND",
      text: "Kiểm tra cuối cùng",
      color: "",
    },
    {
      value: "FNS",
      text: "Đã hoàn thành",
      color: "",
    },
    {
      value: "NORE",
      text: "Chưa dùng",
      color: "",
    },
    {
      value: "PAID",
      text: "Đã thanh toán",
      color: "",
    },
  ];

  const statusValue = lstStatus.find((stt) => stt.value === status);

  if (!statusValue) return "";

  // css vất ở file dx-styles.scss, thêm thì sửa cả 2 chỗ
  if (prefixClassName) {
    const css = `${prefixClassName}${statusValue.value}`;
    return css;
  } else {
    const css = `highlight__row--${statusValue.value}`;
    return css;
  }
};

// Chờ sửa :255,192,255
// Đang sửa :192,192,255
// Sửa xong :192,255,255
// Kiểm tra cuối cùng: 230,230,250
// Đã giao xe :192,255,192
// Hủy, hẹn lại :255,255,192
// Thanh toán xong :255,192,192

// FlagChoSua	Chờ sửa			PRT, HRO
// FlagDangSua	Đang sửa			INGA
// FlagRepaired	Sửa xong			RPRD
// FlagCheckEnd	K.Tra C.Cùng			CEND
// FlagPaid	Thanh toán xong			PAID
// FlagFinished	Đã giao xe			FNS
// FlagReject	Lệnh hủy			REJ
// FlagKhongDung	Không dùng			W4P, HPA, NORE
