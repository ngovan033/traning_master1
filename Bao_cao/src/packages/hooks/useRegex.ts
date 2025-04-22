export const useRegex = () => {
  const regexVIN = /^[a-zA-Z][\w.-]*[a-zA-Z0-9]*[0-9]$/;

  const checkVIN = (vin: string): boolean => {
    return regexVIN.test(vin) && vin.length == 17;
  };

  return {
    checkVIN,
  };
};
