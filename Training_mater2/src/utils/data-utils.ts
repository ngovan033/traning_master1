import { simpleConfirm } from "@/packages/ui/dialogs/dialog-utils";
import _ from "lodash";

export const checkEmptySearchConditions = (input: {
  data: any;
  message: string;
  fields?: any[];
  excludes?: any[];
  yes: Function;
}) => {
  const checkEmptyObject: any = (obj: any) => {
    const check = Object.keys(obj).every((key: any) => {
      if (key === undefined) return true;
      let value = obj[key];

      if (value === undefined || value == "" || value == null) return true;

      if (input.fields && input.fields.length > 0) {
        if (input.fields.indexOf(key) < 0) return true;
      }

      if (input.excludes && input.excludes.indexOf(key) >= 0) {
        return true;
      }

      if (
        (value instanceof Array || value instanceof Object) &&
        _.isEmpty(value)
      )
        return true;
      else if (value instanceof Array && !_.isEmpty(value))
        return checkEmptyArray(value);
      else if (value instanceof Object && !_.isEmpty(value))
        return checkEmptyObject(value);
      return _.isEmpty(value);
    });

    return check;
  };

  const checkEmptyArray: any = (array: any) => {
    return array.every((value: any) => {
      return value === undefined || value == "" || value == null;
    });

    const check = array.every((value: any) => {
      if (value === undefined || value == "" || value == null) return true;
      else if (
        (value instanceof Array || value instanceof Object) &&
        _.isEmpty(value)
      )
        return true;
      else if (value instanceof Array && !_.isEmpty(value))
        return checkEmptyArray(value);
      else if (value instanceof Object && !_.isEmpty(value))
        return checkEmptyObject(value);

      return _.isEmpty(value);
    });

    return check;
  };

  let data = input.data;

  let isEmty = false;
  if (data) {
    // console.log(checkEmptyObject(data));
    if (checkEmptyObject(data)) isEmty = true;
  }

  if (isEmty)
    simpleConfirm(input.message, () => {
      input.yes?.(data);
    });
  else input.yes?.(data);
};
