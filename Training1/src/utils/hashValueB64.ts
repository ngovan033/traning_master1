// Encode Base64
export const encodeBase64 = (str: any) => {
  return btoa(unescape(encodeURIComponent(str))); // Đảm bảo hỗ trợ UTF-8
};

// Decode Base64
export const decodeBase64 = (encodedStr: any) => {
  return decodeURIComponent(escape(atob(encodedStr)));
};
