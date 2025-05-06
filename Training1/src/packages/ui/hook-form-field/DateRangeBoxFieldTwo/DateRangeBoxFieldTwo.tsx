import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { DateRangeBox, Validator } from "devextreme-react";
import { CustomRule, RequiredRule } from "devextreme-react/form";
import "./DateRangeBoxFieldTwo.scss";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { EnterKeyEvent } from "devextreme/ui/date_range_box";

interface IDateRangeBoxFieldTwoProps {
  dataField: any;
  formComponent: any;
  defaultStartDate: any;
  defaultEndDate: any;
  displayFormat?: any;
  width?: string;
  cssClass?: string;
  requiredText?: string;
  showClearButton?: boolean;
  useMaskBehavior?: boolean;
  openOnFieldClick?: boolean;
  labelMode?: any;
  calendarOptions?: any;
  isRequiredAll?: boolean;
  isRequiredFrom?: boolean;
  isRequiredTo?: boolean;
  isRequiredRange?: boolean;
  isRequiredRangeDay?: boolean;
  onEnterKey?: ((e: EnterKeyEvent) => void) | undefined;
  turnOnShowErrorRange?: boolean;
}

export const DateRangeBoxFieldTwo = ({
  dataField,
  formComponent,
  defaultStartDate,
  defaultEndDate,
  displayFormat = "yyyy-MM-dd",
  width = "270",
  showClearButton = true,
  useMaskBehavior = true,
  openOnFieldClick = true,
  labelMode = "hidden",
  isRequiredAll = false,
  isRequiredRange = false,
  isRequiredFrom = false,
  isRequiredTo = false,
  cssClass,
  requiredText,
  calendarOptions,
  isRequiredRangeDay = false,
  onEnterKey,
  turnOnShowErrorRange = true,
}: IDateRangeBoxFieldTwoProps) => {
  const { t } = useI18n("DateRangeBoxFieldTwo");

  const [isShowError, setIsShowError] = useState(false);
  const [isShowErrorFrom, setIsShowErrorFrom] = useState(false);
  const [isShowErrorTo, setIsShowErrorTo] = useState(false);
  const [isShowErrorRange, setIsShowErrorRange] = useState(false);

  function validateVacationDateAll({ value }: any) {
    const [startDate, endDate] = value;

    if (startDate !== null && endDate !== null) {
      return true;
    } else {
      setIsShowError(true);
      return false;
    }
  }
  function validateVacationDateFrom({ value }: any) {
    const [startDate] = value;

    if (startDate !== null) {
      return true;
    } else {
      setIsShowErrorFrom(true);
      setIsShowErrorTo(false);
      return false;
    }
  }
  function validateVacationDateTo({ value }: any) {
    const [startDate, endDate] = value;

    if (endDate !== null) {
      return true;
    } else {
      setIsShowErrorTo(true);
      setIsShowErrorFrom(false);
      return false;
    }
  }

  function validateRageDate({ value }: any) {
    const [startDate, endDate] = value;
    const yearDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    const result = yearDiff > 1 || (yearDiff === 1 && monthDiff > 0);
    setIsShowErrorRange(result);
    return !result;
  }

  function isGreaterThanOneYear({ value }: any) {
    // Tính số milliseconds trong một năm
    const [startDate, endDate] = value;
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
    const differenceInTime = Math.abs(endDate - startDate);
    setIsShowErrorRange(differenceInTime > oneYearInMilliseconds);
    return !(differenceInTime > oneYearInMilliseconds);
  }

  return (
    <div className={`flex flex-col relative  ${cssClass}`}>
      <DateRangeBox
        width={width}
        onEnterKey={onEnterKey}
        className={`dateRange dateRangeBoxFieldTwo  `}
        displayFormat={displayFormat}
        showClearButton={showClearButton}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        useMaskBehavior={useMaskBehavior}
        openOnFieldClick={openOnFieldClick}
        calendarOptions={calendarOptions}
        labelMode={labelMode}
        onValueChanged={(e: any) => {
          if (isRequiredAll && !e.value[0] && !e.value[1]) {
            setIsShowError(true);
          } else {
            setIsShowError(false);
          }

          if (isRequiredFrom && !e.value[0]) {
            setIsShowErrorFrom(true);
          } else {
            setIsShowErrorFrom(false);
          }
          if (isRequiredTo && !e.value[1]) {
            setIsShowErrorTo(true);
          } else {
            setIsShowErrorTo(false);
          }
          formComponent.updateData(dataField, e.value);
        }}
        validationMessageMode="always"
        validationMessagePosition={"top"}
        validationError={false}
        activeStateEnabled={false}
      >
        {isRequiredRange && (
          <Validator validationGroup={"form"}>
            <CustomRule validationCallback={validateRageDate} />
          </Validator>
        )}
        {isRequiredRangeDay && (
          <Validator validationGroup={"form"}>
            <CustomRule validationCallback={isGreaterThanOneYear} />
          </Validator>
        )}

        {isRequiredAll && (
          <Validator validationGroup={"form"}>
            <CustomRule validationCallback={validateVacationDateAll} />
          </Validator>
        )}
        {isRequiredFrom && (
          <Validator validationGroup={"form"}>
            <CustomRule validationCallback={validateVacationDateFrom} />
          </Validator>
        )}
        {isRequiredTo && (
          <Validator validationGroup={"form"}>
            <CustomRule validationCallback={validateVacationDateTo} />
          </Validator>
        )}
      </DateRangeBox>

      {isShowError && (
        <span className="text-red-500 absolute top-5 ml-[14px]">
          {requiredText ?? t("DateFromToIsRequired")}
        </span>
      )}
      {isShowErrorFrom && (
        <span className="text-red-500 absolute top-5 ml-[14px]">
          {requiredText ?? "Ngày từ bắt buộc nhập!"}
        </span>
      )}
      {isShowErrorTo && (
        <span className="text-red-500 absolute top-5 ml-[14px]">
          {requiredText ?? "Ngày đến bắt buộc nhập!"}
        </span>
      )}
      {turnOnShowErrorRange && isShowErrorRange && (
        <span className="text-red-500 absolute top-5 ml-[14px]">
          {t("Searched within 1 year period only")}
        </span>
      )}
    </div>
  );
};
