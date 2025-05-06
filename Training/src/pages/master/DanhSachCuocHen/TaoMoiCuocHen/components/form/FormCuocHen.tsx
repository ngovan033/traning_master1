import { useDataSource } from "@/packages/components/popup/PopupThongTinKhachHangVaXe/datasource/useDataSource";
import PopupThongTinKhachHangVaXe from "@/packages/components/popup/PopupThongTinKhachHangVaXe/PopupThongTinKhachHangVaXe";
import { PopupTimKiemXeChiaSe } from "@/packages/components/popup/PopupTimKiemXeChiaSe/PopupTimKiemXeChiaSe";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import SearchPrimaryIcon from "@/packages/ui/icons/svg/search-primary";
import { format } from "date-fns";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSerAppLocale } from "../../../components/locale/useSerAppLocale";
import { useDataSourceCuocHen } from "../datasource/useDataSourceCuocHen";
import { FindCustomerPopup } from "../find-customer/FindCustomerPopup";
import CustomAppDTime from "./custom-datetime/CustomAppDTime";
import { useLogicHandle } from "./useLogicHandle";

const values = {
  // AppDateTimeFrom: initAppDateTimeFrom,
  KhachHangCungLaNguoiLienLac: true,
  KhachHang: "CANHAN",
  visible: false,
  visible_TKTTKH: false,
  AppTypeCodeDataSource: [],
  CVDVCodeDataSource: [],
  CavityIDDataSource: [],
  Customer: {
    CusID: null,
    DealerCode: null,
    CusName: null,
    Sex: null,
    Address: null,
    Tel: null,
    Mobile: null,
    Fax: null,
    Email: null,
    Website: null,
    Bank: null,
    BankAccountNo: null,
    TaxCode: null,
    IsContact: null,
    Note: null,
    ContName: null,
    ContSex: null,
    ContAddress: null,
    ContTel: null,
    ContMobile: null,
    ContFax: null,
    ContEmail: null,
    CusTypeID: null,
    OrgTypeID: null,
    IsActive: null,
    LogLUDateTime: null,
    LogLUBy: null,
    DOB: null,
    SalesCusID: null,
    ProvinceCode: null,
    DistrictCode: null,
    IDCardNo: null,
    CreatedDate: null,
    CreatedBy: null,
    IsNormal: null,
    FirstCheckInDate: null,
    CheckInCount: null,
    CusRequest: null,
    CheckInDate: null,
    LastCheckInDate: null,
    LastCusRequest: null,
    Km: null,
    ModelName: null,
    CusPersonType: null,
    ProvinceName: null,
    DistrictName: null,
    CusSex: null,
    SexText: null,
    CusAddress: null,
    CusTel: null,
    CusMobile: null,
    CarID: null,
    PlateNo: null,
    FrameNo: null,
    EngineNo: null,
    ModelID: null,
    ProductYear: null,
    ColorCode: null,
    WarrantyRegistrationDate: null,
    DateBuyCar: null,
    CurrentKm: null,
    TradeMarkCode: null,
    SalesCarID: null,
    InsStartDate: null,
    InsNo: null,
    InsVieName: null,
    InsFinishedDate: null,
    InsContractNo: null,
    MemberCarID: null,
    WarrantyExpiresDate: null,
    CusConfirmedWarrantyDate: null,
    WarrantyKM: null,
    SerialNo: null,
    BatteryNo: null,
    PlateColorCode: null,
    InsName: null,
    InsPhone: null,
    InsAddress: null,
    InsTaxCode: null,
    CrdMember: null,
    FlagPlateNo: null,
    _dataIdx: null,
  },
};

const FormCuocHen = forwardRef(({ onSaving }: any, ref) => {
  const { locale } = useSerAppLocale();
  const { commonLocale, requireLocale } = useCommonLocale();
  const { isHQ } = usePermissions();
  const isNPP = isHQ();

  const { Type } = useParams();

  const initAppDateTimeFrom = new Date();

  const {
    getAppTypeCodeDataSource,
    getCVDVCodeDataSource,
    getCavityIDDataSource,
  } = useDataSourceCuocHen();

  const dataSourceTTKHVX = useDataSource();

  const findCustomerPopupRef = useRef();
  const findShareCarPopupRef = useRef();
  const customerPopupRef = useRef();

  const { showDialog } = useDialog();

  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const logicHandle = useLogicHandle();

  const genTel = (tel: string, mobile: string) => {
    if (tel && mobile) {
      return `${tel}/${mobile}`;
    }

    return tel ?? mobile;
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      handeSave();
    },
    setValues: ({ SerApp }) => {
      setValue("AppId", SerApp.AppId);
      setValue("AppNo", SerApp.AppNo);
      setValue("AppTypeCode", SerApp.AppTypeCode);
      setValue("NewAppStatus", SerApp.NewAppStatus);
      setValue("AppDateTimeFrom", SerApp.AppDateTimeFrom);

      // AppDateTimeFromDate

      setValue("AppDateTimeFromDate", SerApp.AppDateTimeFrom);

      const dateAppDateTimeFrom = new Date();
      const timeAppDateTimeFrom = SerApp.AppTimeFrom
        ? SerApp.AppTimeFrom.split(":")
        : format(new Date(), "HH:mm:ss").split(":");
      dateAppDateTimeFrom.setHours(timeAppDateTimeFrom[0]);
      dateAppDateTimeFrom.setMinutes(timeAppDateTimeFrom[1]);
      dateAppDateTimeFrom.setSeconds(timeAppDateTimeFrom[2]);

      setValue("AppDateTimeFromTime", dateAppDateTimeFrom);

      const dateAppTime = new Date();
      const timeAppTime = SerApp.AppTime
        ? SerApp.AppTime.split(":")
        : format(new Date(), "HH:mm:ss").split(":");
      dateAppTime.setHours(timeAppTime[0]);
      dateAppTime.setMinutes(timeAppTime[1]);
      dateAppTime.setSeconds(timeAppTime[2]);
      setValue("AppTimeFromTime", dateAppTime);

      setValue("CVDVCode", SerApp.CVDVCode);
      setValue("CVDVName", SerApp.EngineerName);
      setValue("CavityID", SerApp.CavityID);
      setValue("CavityName", SerApp.CavityName);
      setValue("CusID", SerApp.CusID);
      setValue("CarID", SerApp.CarID);

      setValue("TrademarkNameModel", SerApp.TrademarkNameModel);
      setValue("ModelName", SerApp.ModelName);
      setValue("PlateNo", SerApp.PlateNo);
      setValue("CusRequest", SerApp.CusRequest);
      setValue("CusName", SerApp.CusName);
      setValue("CusTel", genTel(SerApp?.CusTel, SerApp?.CusMobile));
      setValue("CusRequest", SerApp?.CusRequest);

      setValue("FlagRO", SerApp.FlagRO); // Cờ giữ CarID từ RO
    },
  }));

  const {
    register,
    reset,
    unregister,
    watch,
    control,
    setValue,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<any>({
    values: values,
    defaultValues: {
      AppDateTimeFrom: initAppDateTimeFrom,
      AppTimeFrom: initAppDateTimeFrom,
      AppDateTimeFromDate: initAppDateTimeFrom,
      AppDateTimeFromTime: initAppDateTimeFrom,
      FlagSharedCar: "0",
    },
  });

  useEffect(() => {
    getAppTypeCodeDataSource().then((data) => {
      setValue("AppTypeCodeDataSource", data);
    });

    getCVDVCodeDataSource().then((data) => {
      setValue("CVDVCodeDataSource", data);
    });

    getCavityIDDataSource().then((data) => {
      setValue("CavityIDDataSource", data);
    });
  }, []);

  const AppTypeCodeDataSource = watch("AppTypeCodeDataSource");
  const CVDVCodeDataSource = watch("CVDVCodeDataSource");
  const CavityIDDataSource = watch("CavityIDDataSource");

  const handleOpen = () => {};

  const handleOpenPopupFindCustomerByName = async (currentCusName?: string) => {
    const cusName = currentCusName ?? getValues("CusName");

    await logicHandle
      .isOnlyFindOneCustomer({
        CusName: cusName,
        FrameNo: "",
        PlateNo: "",
      })
      .then((resp) => {
        if (resp?.Length == 1) {
          onSelectedCustomerFromDealer(resp.Data);
        }

        if (resp?.Length > 1) {
          if (findCustomerPopupRef.current) {
            findCustomerPopupRef.current.searchWithCustomerName(cusName);
          }
        }

        if (resp?.Length == 0) {
          if (findShareCarPopupRef.current) {
            findShareCarPopupRef.current.showPopupOnly();
          }
        }
      });
  };

  const handleOpenPopupFindCustomerByPlate = async (currentPlateNo: string) => {
    const plateNo = currentPlateNo ?? getValues("PlateNo");

    await logicHandle
      .isOnlyFindOneCustomer({
        CusName: "",
        FrameNo: "",
        PlateNo: plateNo,
      })
      .then((resp) => {
        if (resp?.Length == 1) {
          onSelectedCustomerFromDealer(resp.Data);
        }

        if (resp?.Length > 1) {
          if (findCustomerPopupRef.current) {
            findCustomerPopupRef.current.searchWithPlateNo(plateNo);
          }
        }

        if (resp?.Length == 0) {
          if (findShareCarPopupRef.current) {
            findShareCarPopupRef.current.showPopupOnly(plateNo);
          }
        }
      });
  };

  const handleViewCustomer = async () => {
    const cusID = getValues("CusID");
    const carID = getValues("CarID");
    const currentFlag = getValues("FlagSharedCar");
    if (currentFlag == "0" || !currentFlag) {
      await dataSourceTTKHVX
        .getByCusAndCarID({
          CusID: cusID,
          CarID: carID,
        })
        .then((data) => {
          if (customerPopupRef.current) {
            customerPopupRef.current.showPopup(data);
          }
        });
    } else {
      const customer = getValues("Customer");

      customerPopupRef.current.viewShareCar(customer);
    }
  };

  const onSelectedCustomerFromDealer = (customer: any) => {
    setValue("CusID", customer.CusID);
    setValue("CarID", customer.CarID);
    setValue("CusName", customer.CusName);
    setValue("CusTel", genTel(customer.Tel, customer.Mobile));
    setValue("TrademarkNameModel", customer.TradeMarkCode);
    setValue("ModelName", customer.ModelName);
    setValue("PlateNo", customer.PlateNo);
    setValue("Customer", customer);
    setValue("FlagSharedCar", "0");
    setValue("FlagRO", "0");
  };

  const onSelectedCarFromHQ = (car: any) => {
    // setValue("CusID", car.CusID);
    // setValue("CarID", car.CarID);
    setValue("CusName", null);
    setValue("CusTel", null);
    setValue("TrademarkNameModel", car.TradeMarkCode);
    setValue("ModelName", car.ModelName);
    setValue("PlateNo", car.PlateNo);
    // setValue("car", car);
    setValue("EngineNo", car.EngineNo);
    setValue("FlagSharedCar", "1");
    setValue("FlagRO", "0");
  };

  const handeSave = () => {
    if (refSubmitButton.current) {
      refSubmitButton.current.click();
    }
  };

  const checkDate = (data) => {
    const fromDate = new Date(data?.AppDateTimeFromDate); // fromDate = toDate
    const fromTime = new Date(data?.AppDateTimeFromTime);
    const toTime = new Date(data?.AppTimeFromTime);

    if (!data.AppDateTimeFromTime || !fromTime || isNaN(fromTime.getTime())) {
      showDialog({
        title: "Thông báo",
        message: "Ngày hẹn từ không hợp lệ!",
      });

      return false;
    }

    if (!toTime || isNaN(toTime.getTime())) {
      showDialog({
        title: "Thông báo",
        message: "Ngày DK giao xe không hợp lệ!",
      });

      return false;
    }

    const fromDateFormat = format(fromDate, "yyyy-MM-dd");
    const fromTimeFormat = format(fromTime, "HH:mm:ss");
    const toTimeFormat = format(toTime, "HH:mm:ss");

    const parsedFromDate = Date.parse(`${fromDateFormat} ${fromTimeFormat}`);
    const parsedToDate = Date.parse(`${fromDateFormat} ${toTimeFormat}`);
    const parsedCurrentDate = Date.parse(new Date().toISOString());

    if (parsedFromDate < parsedCurrentDate) {
      showDialog({
        title: "Thông báo",
        message: "Ngày hẹn từ không hợp lệ!",
      });

      return false;
    }

    if (parsedToDate < parsedFromDate) {
      showDialog({
        title: "Thông báo",
        message: "Ngày DK giao xe không hợp lệ!",
      });

      return false;
    }

    return true;
  };

  const onSubmit = (data) => {
    if (!checkDate(data)) {
      return;
    }

    onSaving(data);
  };

  const formSubmit = (e) => {
    e.stopPropagation();

    return handleSubmit(onSubmit)(e);
  };

  const checkKeyDown = (e) => {
    if (e.target.nodeName == "TEXTAREA") {
    } else {
      if (e.key === "Enter") e.preventDefault();
    }
  };

  const onUpdateCustomerSuccess = (data: any) => {
    toast.success("Cập nhật thành công");

    const { Ser_Customer, Ser_Car } = data;

    const genTel = (tel: string, mobile: string) => {
      if (tel && mobile) {
        return `${tel}/${mobile}`;
      }

      return tel ?? mobile;
    };

    setValue("CusID", Ser_Customer.CusID);
    setValue("CarID", Ser_Car.CarID);
    setValue("CusName", Ser_Customer.CusName);
    setValue("CusTel", genTel(Ser_Customer.Tel, Ser_Customer.Mobile));
    setValue("TrademarkNameModel", Ser_Car.TradeMarkCode);
    setValue("ModelName", Ser_Car.ModelName);
    setValue("PlateNo", Ser_Car.PlateNo);
    setValue("Customer", Ser_Customer);
    setValue("FlagSharedCar", "0");
    setValue("FlagRO", "0");
  };

  return (
    <form
      id="FormCuocHen"
      onSubmit={formSubmit}
      className="flex flex-col"
      onKeyDown={(e) => checkKeyDown(e)}
    >
      <CollapseHeader
        showCollapse={false}
        className="mt-[5px]"
        title="Thông tin cuộc hẹn"
        render={
          <div className="grid grid-cols-3 mx-[30px] gap-[75px] pb-[10px]">
            <div className="flex flex-col">
              <div className="">
                <Controller
                  name={"AppNo"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={locale.AppNo}
                        disabled
                      />
                    );
                  }}
                />
              </div>
              <div className="hook-field">
                <Controller
                  name={"AppTypeCode"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={locale.AppTypeCode}
                        error={errors.AppTypeCode}
                        dataSource={AppTypeCodeDataSource}
                        displayExpr="AppTypeName"
                        valueExpr="AppTypeCode"
                        required
                        disabled={isNPP}
                      />
                    );
                  }}
                  rules={{ required: requireLocale(locale.AppTypeCode) }}
                />
              </div>
              {Type != "add" && (
                <div className="hook-field">
                  <Controller
                    name={"NewAppStatus"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={locale.NewAppStatus}
                          error={errors.NewAppStatus}
                          disabled
                        />
                      );
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <CustomAppDTime
                control={control}
                errors={errors}
                dateName="AppDateTimeFromDate"
                timeName="AppDateTimeFromTime"
                label={locale.AppDateTimeFrom}
                disable={isNPP}
                disableTime={isNPP}
                required
              />
              <CustomAppDTime
                control={control}
                errors={errors}
                disable
                dateName="AppDateTimeFromDate"
                timeName="AppTimeFromTime"
                label={locale.AppTimeFrom}
                disableTime={isNPP}
              />
            </div>
            <div className="flex flex-col">
              <div className="hook-field">
                {isNPP ? (
                  <Controller
                    name={"CVDVName"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={locale.CVDVCode}
                          disabled
                        />
                      );
                    }}
                  />
                ) : (
                  <Controller
                    name={"CVDVCode"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label={locale.CVDVCode}
                          dataSource={CVDVCodeDataSource}
                          displayExpr="EngineerName"
                          valueExpr="EngineerNo"
                          props={{
                            itemRender: (data) => {
                              return (
                                <div className="flex items-center h-[30px] px-[5px]">
                                  <div className="w-[100px] min-w-[100px] border-r-2 error-code text-ellipsis overflow-hidden">
                                    {data?.EngineerNo}
                                  </div>
                                  <div className="pl-[5px]">
                                    {data?.EngineerName}
                                  </div>
                                </div>
                              );
                            },
                            dropDownOptions: {
                              wrapperAttr: {
                                class: "custom-dropdown-select",
                              },
                              resizeEnabled: true,
                            },
                          }}
                        />
                      );
                    }}
                  />
                )}
              </div>
              <div className="hook-field">
                {isNPP ? (
                  <Controller
                    name={"CavityName"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={locale.CavityID}
                          disabled
                        />
                      );
                    }}
                  />
                ) : (
                  <Controller
                    name={"CavityID"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label={locale.CavityID}
                          error={errors.CavityID}
                          dataSource={CavityIDDataSource}
                          displayExpr="CavityName"
                          valueExpr="CavityID"
                          required
                          props={{
                            itemRender: (data) => {
                              return (
                                <div className="flex items-center h-[30px] px-[5px]">
                                  <div className="w-[100px] min-w-[100px] border-r-2 error-code text-ellipsis overflow-hidden">
                                    {data?.CavityNo}
                                  </div>
                                  <div className="pl-[5px]">
                                    {data?.CavityName}
                                  </div>
                                </div>
                              );
                            },
                            dropDownOptions: {
                              wrapperAttr: {
                                class: "custom-dropdown-select",
                              },
                              resizeEnabled: true,
                            },
                          }}
                        />
                      );
                    }}
                    rules={{ required: requireLocale(locale.CavityID) }}
                  />
                )}
              </div>
            </div>
          </div>
        }
      ></CollapseHeader>

      <CollapseHeader
        showCollapse={false}
        title="Thông tin khách hàng và xe"
        render={
          <div className="flex flex-col">
            <div className="grid grid-cols-3 mx-[30px] gap-[75px] mt-[2px]  ">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-[5px] hook-field">
                  <div className="flex-grow">
                    <Controller
                      name={"CusName"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={locale.CusName}
                            error={errors.CusName}
                            required
                            onEnterKey={(currentText: string) =>
                              handleOpenPopupFindCustomerByName(currentText)
                            }
                            showClearButton
                            disabled={isNPP}
                          />
                        );
                      }}
                      rules={{ required: requireLocale(locale.CusName) }}
                    />
                  </div>
                  <ButtonCommon
                    icon={<SearchPrimaryIcon />}
                    onClick={() => handleOpenPopupFindCustomerByName()}
                    visible={!isNPP}
                    size="small"
                  ></ButtonCommon>
                </div>
                <div className="flex items-center gap-[5px] justify-between">
                  <div className="flex-grow">
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={locale.PlateNo}
                            error={errors.PlateNo}
                            onEnterKey={(currentText: string) =>
                              handleOpenPopupFindCustomerByPlate(currentText)
                            }
                            showClearButton
                            disabled={isNPP}
                          />
                        );
                      }}
                    />
                  </div>

                  <ButtonCommon
                    icon={<SearchPrimaryIcon />}
                    onClick={() => handleOpenPopupFindCustomerByPlate()}
                    visible={!isNPP}
                    size="small"
                  ></ButtonCommon>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="">
                  <Controller
                    name={"CusTel"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={locale.CusTel}
                          error={errors.CusTel}
                          disabled
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"TrademarkNameModel"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={locale.TrademarkNameModel}
                          error={errors.TrademarkNameModel}
                          disabled
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="">
                  <Controller
                    name={"ModelName"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={locale.ModelName}
                          error={errors.ModelName}
                          disabled
                        />
                      );
                    }}
                  />
                </div>

                <div className="flex items-center mt-[4px]">
                  <ButtonCommon
                    onClick={handleViewCustomer}
                    visible={!isNPP}
                    size="small"
                    text={commonLocale.BUTTON_UPDATE_CUSTOMER}
                  ></ButtonCommon>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 grid-rows-3  mx-[30px]">
              <div className="col-span-3 row-span-3 hook-field">
                <Controller
                  name={"CusRequest"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextAreaField
                        field={field}
                        label={"Yêu cầu KH"}
                        disabled={isNPP}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        }
      ></CollapseHeader>

      <button
        hidden={true}
        ref={refSubmitButton}
        type={"submit"}
        form={"FormCuocHen"}
      ></button>

      <FindCustomerPopup
        ref={findCustomerPopupRef}
        onSelectedCustomer={onSelectedCustomerFromDealer}
      />

      <PopupTimKiemXeChiaSe
        ref={findShareCarPopupRef}
        onSelectedCustomer={onSelectedCarFromHQ}
      />

      <PopupThongTinKhachHangVaXe
        ref={customerPopupRef}
        onSaving={onUpdateCustomerSuccess}
      />
    </form>
  );
});

export default FormCuocHen;
