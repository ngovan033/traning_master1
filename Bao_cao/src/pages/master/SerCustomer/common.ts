function takeNumberOfFrameNo(str: string) {
  const match = str.match(/\d{1,2}/);
  return match ? match[0] : "";
}

export const convertFrameNoToPlateNo = (
  dealerCode: string,
  frameNo: string
) => {
  if (!dealerCode) {
    return "";
  }
  let plateNo;
  const _dealerCode = dealerCode.trim().replace(".", "");

  // VS058RLUA9399394 => VS05893
  const subNumber = takeNumberOfFrameNo(frameNo); // => "1", "23", ""

  // VS058
  if (_dealerCode.length === 5) {
    plateNo = _dealerCode + subNumber;
  }

  // VS068.1 => VS0681
  if (_dealerCode.length === 6) {
    plateNo = _dealerCode + (subNumber[0] ? subNumber[0] : "");
  }

  // trường hợp này sẽ không bao giờ xảy ra
  if (_dealerCode.length > 6) {
    plateNo = _dealerCode;
  }

  // output
  if (!plateNo) {
    return "";
  }

  const formatToBienSo = plateNo.substring(0, 2) + "-" + plateNo.substring(2);
  return formatToBienSo;
};

export const convertPlateNoToFrameNo = (
  dealerCode: string,
  frameNo: string
) => {
  let plateNo;
  plateNo = dealerCode + frameNo;
  return plateNo;
};
