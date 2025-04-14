import { ValidationRule } from "devextreme-react/common";

const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
const regexNumber =
  /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
const stringType = /[a-zA-Z0-9]/;
export const excludeSpecialCharactersUnderDotMinus = /^[a-zA-Z0-9_.-]+$/; // ngăn kí tự đặc biệt, trừ _ - .
export const onlyNumberType = /[0-9]/;
const only2number = /^.{0,2}$/; //chỉ cho phép nhập 2 số
// I need to exclude special
export const checkAllWhiteSpace = /^\s*$/;
// checking string have any white space
export const checkAnyWhiteSpace = /\s/;
const excludeSpecialCharacters = /^[a-zA-Z0-9]+$/;
export const excludeSpecialCharactersAllowDash = /^[a-zA-Z0-9-()/]+$/; // cho phép dấu - ( ) /
const excludeSpecialCharactersAllowDash2 = /^[a-zA-Z0-9-.]+$/; // cho phép dấu - và .
const excludeSpecialCharactersAllowSpace = /^[a-zA-Z0-9\s]+$/; // khôgn cho kí tự đặc biệt, ngoại trừ khoảng trắng
const excludeSpecialCharactersOnlyNumbers = /^[0-9]+$/;
const excludeSpecialCharactersOnlyNumbers2 = /^[0-9/-]+$/; //Thêm 1 dấu gạch ngang, vd: 123-123
const excludeSpecialCharactersOnlyNumbers3 = /^[0-9/.]+$/; //Thêm 1 dấu chấm, vd: 123.123
const vietnameseCharacter = /^[a-zA-Z0-9À-ỹ\s]+$/;
const vietnameseCharacter3 = /^[a-zA-Z0-9À-ỹ\s_+\-()/]+$/; // cho phép các kí tự _, +, -, /, and ()
const noMoreThan50Character = /^[a-zA-Z0-9-.]{0,50}$/; // Không nhập quá 50 ký tự, cho phép dấu - và .
const noMoreThan200Character = /^[a-zA-Z0-9-.]{0,200}$/; // Không nhập quá 200 ký tự, cho phép dấu - và .
const greaterThanZero = /^(?!0\.0+$)([1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+)$/;
// email
const min6Characters = /^.{6,}$/;
export const emailType =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// /^[a-zA-Z0-9ÀÁẢẠẦẤẨẬẪÃĂẰẮẲẴẶÂâầấẩẫậãẵắẳẫặêếềễểệÊÈÉËẼẺẸèéëẽẻẹịìíĩỉIỈĨỊÌọộồốổỗÔỒỐỔỘỖổỗơờớởỡợƠỜỚỞỠỢƯỪỨỬỮỰƯựừứửữƠỚỜỞỠỢẦẤẨẪẬỂỀẾỄỆôồốổỗộổÔỒỐỔỘỖổỗơờớởỡợƠỜỚỞỠỢàáảãạăắằẳẵặÂẤẦẨẪẬẨẨĂẮẰẲẴẶĂđĐÔỒỐỔỖỘơờớởỡợƠỜỚỞỠỢƠếềểễệÈÉẼẺẸËêềếểễệỀÊỂỄỆùúủũụưừứửữựƯỨỪỬỮỰÙÚỦŨỤỲÝỶỸỴỲỴỶỸƳỴỶỸỲỲýỹỷỵýùúủũụưừứửữựƯỨỪỬỮỰÙÚỦŨỤỲÝỶỸỴỲỴỶỸỲỲ\s]+$/;
const vietnameseCharacterExcludeSpecialCharacter = /^[\p{L}\p{N} ]+$/; // Nhập tiếng việt, nhưng không cho nhập kí tự đặc biêt
export const OnlyPositiveInteger = /^[0-9]\d*$/; // regex số nguyên dương
const OnlyPositiveNumber = /^\d*\.?\d+$/; // regex số dương, bao gồm cho phép cả thập phân
const noLeadingSpace = /^(?! )[^\n]*$/;

// set format number with localize,...
export const FORMAT_NUMBER = {
  INT_NUMBER_ALLOW_ZERO: "$#",
  INT_NUMBER_NOTCOMMA: "#",
  INT_NUMBER: "#,##0", // Exp: 100 - 1,000 - 2,100 - 3,400,000
  FLOAT_NUMBER: ",##0.###", // Exp: 100 - 100,000.2 - 122,332.222
  FLOAT_NUMBER_R2: ",##0.##", // Exp: 100 - 100,000.23 - 122,332.22
  FLOAT_NUMBER_R2_00: "#,##0.00", // Exp: 1.00 - 0.50
};
export const Only2Number = {
  type: "pattern",
  pattern: only2number,
} as ValidationRule;

export const RequiredOnlyPositiveInteger = {
  type: "pattern",
  pattern: OnlyPositiveInteger,
} as ValidationRule;

export const RequiredGreaterThanZero = {
  type: "pattern",
  pattern: greaterThanZero,
} as ValidationRule;

export const RequiredOnlyPositiveNumber = {
  type: "pattern",
  pattern: OnlyPositiveNumber,
} as ValidationRule;
export const NoLeadingSpace = {
  type: "pattern",
  pattern: noLeadingSpace,
} as ValidationRule;

export const RequiredVietNameeseExcludeSpecialCharacters = {
  type: "pattern",
  pattern: vietnameseCharacter,
} as ValidationRule;
export const Min6Characters = {
  type: "pattern",
  pattern: min6Characters,
} as ValidationRule;

export const RequiredVietNameeseExcludeSpecialCharacters2 = {
  type: "pattern",
  pattern: vietnameseCharacterExcludeSpecialCharacter,
} as ValidationRule;
export const ExcludeSpecialCharactersUnderDotMinus = {
  type: "pattern",
  pattern: excludeSpecialCharactersUnderDotMinus,
} as ValidationRule;

export const RequiredVietNameeseExcludeSpecialCharacters3 = {
  type: "pattern",
  pattern: vietnameseCharacter3,
} as ValidationRule;

export const RequiredDateBoxCompareToNow = {
  type: "custom",
  validationCallback: (data: any) => {
    const year = new Date(data.value).getFullYear();
    const month = new Date(data.value).getMonth();
    const day = new Date(data.value).getDate();
    if (
      year >= new Date(Date.now()).getFullYear() &&
      month >= new Date(Date.now()).getMonth()
    ) {
      return true;
    }
    return false;
  },
};

export const requiredStringType = {
  type: "pattern",
  pattern: stringType,
} as ValidationRule;

export const requiredType = {
  type: "required",
} as ValidationRule;

export const RequiredField = (message: string): ValidationRule => {
  return {
    type: "required",
    message,
  };
};

export const requiredEmailType = {
  type: "pattern",
  pattern: emailType,
} as ValidationRule;

export const regexLatType = {
  type: "pattern",
  pattern: regexLat,
} as ValidationRule;

export const numberType = {
  type: "pattern",
  pattern: regexNumber,
} as ValidationRule;

export const regexLonType = {
  type: "pattern",
  pattern: regexLon,
} as ValidationRule;

export const ExcludeSpecialCharactersType = {
  type: "pattern",
  pattern: excludeSpecialCharacters,
} as ValidationRule;

export const ExcludeSpecialCharactersTypeAllowDash = {
  type: "pattern",
  pattern: excludeSpecialCharactersAllowDash,
} as ValidationRule;
export const ExcludeSpecialCharactersTypeAllowDash2 = {
  type: "pattern",
  pattern: excludeSpecialCharactersAllowDash2,
} as ValidationRule;

export const ExcludeSpecialCharactersAllowSpaceType = {
  type: "pattern",
  pattern: excludeSpecialCharactersAllowSpace,
} as ValidationRule;

export const requiredRangeNumber = {
  type: "range",
  min: 0,
  max: 100000000000,
} as ValidationRule;

export const requiredRangePercent = {
  type: "range",
  min: 0,
  max: 100,
} as ValidationRule;

export const requiredOnlyNumber = {
  type: "pattern",
  pattern: onlyNumberType,
} as ValidationRule;

export const requiredExcludeSpecialCharactersOnlyNumbers = {
  type: "pattern",
  pattern: excludeSpecialCharactersOnlyNumbers,
} as ValidationRule;

export const requiredExcludeSpecialCharactersOnlyNumbers2 = {
  type: "pattern",
  pattern: excludeSpecialCharactersOnlyNumbers2,
} as ValidationRule;
export const requiredExcludeSpecialCharactersOnlyNumbers3 = {
  type: "pattern",
  pattern: excludeSpecialCharactersOnlyNumbers3,
} as ValidationRule;
export default {
  requiredStringType,
  requiredType,
  RequiredField,
  regexLatType,
  numberType,
  regexLonType,
  ExcludeSpecialCharactersType,
  requiredRangeNumber,
  requiredOnlyNumber,
  RequiredOnlyPositiveInteger,
  RequiredOnlyPositiveNumber,
};

export const requiredNoMoreThan50Character = {
  type: "pattern",
  pattern: noMoreThan50Character,
} as ValidationRule;
export const requiredNoMoreThan200Character = {
  type: "pattern",
  pattern: noMoreThan200Character,
} as ValidationRule;
