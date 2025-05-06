import { useI18n } from "@/i18n/useI18n";
import { usePermissions } from "@/packages/contexts/permission";
import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { useDialog } from "@/packages/hooks/useDiaglog";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { format } from "date-fns";
import { Popup, TabPanel } from "devextreme-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { PopupTimKiemXeChiaSe } from "../PopupTimKiemXeChiaSe/PopupTimKiemXeChiaSe";
import { CustomerCar } from "./components/interface/customercar-interface";
import { usePopupThongTinKhachHangVaXeLocale } from "./components/locale/usePopupThongTinKhachHangVaXeLocale";
import RepairHistory from "./components/repair-history/RepairHistory";
import { useDataSource } from "./datasource/useDataSource";
import "./style/PopupThongTinKhachHangVaXe.scss";

interface IPopupThongTinKhachHangVaXe {
  onSaving: (data: any) => void;
  isEditing?: boolean;
}

const defaultValue: CustomerCar = {
  CustomerTypeListDataSource: [],
  ProvinceListDataSource: [],
  DistrictListDataSource: [],
  TradeMarkCodeListDataSource: [],
  ModelCodeListDataSource: [],
  InsuranceDataSource: [],
  PlateColorDataSource: [],
  CusPersonType: "1", // 1 - cá nhân | 2 - tổ chức
  CusTypeID: null, // Loại khách hàng
  Sex: null, // 0 - nam | 1 - nữ  | Giới tính phần thông tin khách hàng
  DOB: null, // Ngày sinh
  Mobile: null, // Di động
  Email: null, // Email
  CusName: "", // Tên khách hàng - Tên tổ chức
  Tel: null, // Điện thoại
  Website: null, // website
  ProvinceCode: "", // Tỉnh thành
  DistrictCode: "", // Quận huyện
  Fax: null, // Fax
  TaxCode: null, // Mã số thuế
  IDCardNo: null, // Số CMND
  Address: "", // Địa chỉ
  ContName: "", // Tên người liên hệ
  ContTel: null, // Điện thoại người liên hệ
  ContAddress: null, // Địa chỉ người liên hệ
  ContMobile: "", // Di động người liên hệ
  ContSex: null, // Giới tính người liên hệ
  ContEmail: null, // Email người liên hệ
  IsContact: true, // Khách hàng cùng là người liên lạc
  PlateNo: null, // Biển số
  FrameNo: "", // Số khung
  CurrentKm: null, // Km hiện tại
  WarrantyExpiresDate: null, // Ngày hết hạn bảo hành
  PlateColorCode: null, // Màu biển số
  TradeMarkCode: "", // Hiệu xe
  SerialNo: null, // Mã AVN
  DateBuyCar: null, // Ngày mua xe
  WarrantyRegistrationDate: null, // Ngày đăng ký bảo hành
  CusConfirmedWarrantyDate: null, // Ngày xác nhận bảo hành
  ModelID: "", // Model
  ColorCode: null, // Màu xe
  ProductYear: null, // Năm sản xuất
  BatteryNo: null, // Số seri ắc quy
  InsNo: null, // Số hợp đồng bảo hiểm
  InsContractNo: null, // Số hợp đồng
  InsStartDate: null, // Ngày bắt đầu bảo hiểm
  InsFinishedDate: null, // Ngày kết thúc bảo hiểm
  WarrantyKM: null, // Km bảo hành
  FlagPlateNo: false, // Cờ xe không biển số
  EngineNo: null, // Số máy
  CurrentTab: 0,
  CarID: null,
  CusID: null,
  DealerCode: null,
};

const PopupThongTinKhachHangVaXe = forwardRef(
  ({ onSaving, isEditing = true }: IPopupThongTinKhachHangVaXe, ref) => {
    const { DealerCode } = usePermissions();

    const { t } = useI18n("");

    const windowSize = useWindowSize();

    const { requireLocale } = useCommonLocale();
    const { locale } = usePopupThongTinKhachHangVaXeLocale();
    const { commonLocale } = useCommonLocale();
    const { showDialog } = useDialog();

    const refSubmitButton = useRef(null);
    const shareCarPopupRef = useRef(null);
    const repairRef = useRef(null);

    const [open, setOpen] = useState(false);
    // const [currentInfo, setCurrentInfo] = useState<any>({
    //   CusID: null,
    //   CarID: null,
    // });

    const dataSource = useDataSource();

    const getFlagPlateNo = (plateNo: string, frameNo: string) => {
      return (
        plateNo?.length > 5 &&
        plateNo?.substring(0, 5) == DealerCode &&
        plateNo?.substring(5) == frameNo
      );
    };

    useImperativeHandle(ref, () => ({
      async showPopup(data) {
        if (data && data.Customer.CusID) {
          setValue("DealerCode", data.Customer.DealerCode);
          setValue(
            "CusPersonType",
            data.Customer.CusPersonType == "2" ? "2" : "1"
          );
          setValue("CusTypeID", data.Customer.CusTypeID);
          setValue("Sex", data.Customer.Sex ? "1" : "0");
          setValue("DOB", data.Customer.DOB);
          setValue("Mobile", data.Customer.Mobile);
          setValue("Email", data.Customer.Email);
          setValue("CusName", data.Customer.CusName);
          setValue("Tel", data.Customer.Tel);
          setValue("Website", data.Customer.Website);
          setValue("ProvinceCode", data.Customer.ProvinceCode);
          setValue("DistrictCode", data.Customer.DistrictCode);
          setValue("Fax", data.Customer.Fax);
          setValue("TaxCode", data.Customer.TaxCode);
          setValue("IDCardNo", data.Customer.IDCardNo);
          setValue("Address", data.Customer.Address);
          setValue("ContName", data.Customer.ContName);
          setValue("ContTel", data.Customer.ContTel);
          setValue("ContAddress", data.Customer.ContAddress);
          setValue("ContMobile", data.Customer.ContMobile);
          setValue("ContSex", data.Customer.ContSex ? "1" : "0");
          setValue("ContEmail", data.Customer.ContEmail);
          setValue("IsContact", data.Customer.IsContact);
          setValue("PlateNo", data.Car.PlateNo);
          setValue("FrameNo", data.Car.FrameNo);
          setValue("CurrentKm", data.Car.CurrentKm);
          setValue("WarrantyExpiresDate", data.Car.WarrantyExpiresDate);
          setValue("PlateColorCode", data.Car.PlateColorCode);
          setValue(
            "TradeMarkCode",
            data.Car.TradeMarkCode ? String(data.Car.TradeMarkCode) : null
          );
          setValue("SerialNo", data.Car.SerialNo);
          setValue("DateBuyCar", data.Car.DateBuyCar);
          setValue(
            "WarrantyRegistrationDate",
            data.Car.WarrantyRegistrationDate
          );
          setValue(
            "CusConfirmedWarrantyDate",
            data.Car.CusConfirmedWarrantyDate
          );
          setValue("ModelID", data.Car.ModelID);
          setValue("ColorCode", data.Car.ColorCode);
          setValue("ProductYear", data.Car.ProductYear);
          setValue("BatteryNo", data.Car.BatteryNo);
          setValue("InsNo", data.Car.InsNo);
          setValue("InsContractNo", data.Car.InsContractNo);
          setValue("InsStartDate", data.Car.InsStartDate);
          setValue("InsFinishedDate", data.Car.InsFinishedDate);
          setValue("WarrantyKM", data.Car.WarrantyKM);
          setValue(
            "FlagPlateNo",
            getFlagPlateNo(data.Car.PlateNo, data.Car.FrameNo)
          );
          setValue(
            "OldFlagPlateNo",
            getFlagPlateNo(data.Car.PlateNo, data.Car.FrameNo)
          );
          setValue("EngineNo", data.Car.EngineNo);
          setValue("CurrentTab", 0);
          setValue("CarID", data.Car.CarID);
          setValue("CusID", data.Customer.CusID);

          if (data.Customer.ProvinceCode) {
            dataSource
              .getDistrictListDataSource(data.Customer.ProvinceCode)
              .then((data) => {
                setValue("DistrictListDataSource", data);
              });
          }

          if (data.Car.TradeMarkCode) {
            dataSource
              .getModelCodeListDataSource(data.Car.TradeMarkCode)
              .then((list) => {
                setValue("ModelCodeListDataSource", list);
              });
          }
        }

        setOpen(true);
      },
      viewShareCar(data) {
        reset();

        setValue("PlateNo", data.PlateNo);
        setValue("FrameNo", data.FrameNo);
        setValue("CurrentKm", data.CurrentKm);
        setValue("WarrantyExpiresDate", data.WarrantyExpiresDate);
        setValue("PlateColorCode", data.PlateColorCode);
        setValue(
          "TradeMarkCode",
          data.TradeMarkCode ? String(data.TradeMarkCode) : null
        );
        setValue("SerialNo", data.SerialNo);
        setValue("DateBuyCar", data.DateBuyCar);
        setValue("WarrantyRegistrationDate", data.WarrantyRegistrationDate);
        setValue("CusConfirmedWarrantyDate", data.CusConfirmedWarrantyDate);
        setValue("ModelID", data.ModelID);
        setValue("ColorCode", data.ColorCode);
        setValue("ProductYear", data.ProductYear);
        setValue("BatteryNo", data.BatteryNo);
        setValue("InsNo", data.InsNo);
        setValue("InsContractNo", data.InsContractNo);
        setValue("InsStartDate", data.InsStartDate);
        setValue("InsFinishedDate", data.InsFinishedDate);
        setValue("WarrantyKM", data.WarrantyKM);
        setValue("FlagPlateNo", getFlagPlateNo(data.PlateNo, data.FrameNo));
        setValue("OldFlagPlateNo", getFlagPlateNo(data.PlateNo, data.FrameNo));
        setValue("EngineNo", data.EngineNo);
        setValue("CurrentTab", 0);

        if (data.TradeMarkCode) {
          dataSource
            .getModelCodeListDataSource(data.TradeMarkCode)
            .then((data) => {
              setValue("ModelCodeListDataSource", data);
            });
        }

        setOpen(true);
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
      clearErrors,
      trigger,
    } = useForm<CustomerCar>({
      defaultValues: defaultValue,
    });

    const customerTypeListDataSource = watch("CustomerTypeListDataSource");
    const provinceListDataSource = watch("ProvinceListDataSource");
    const districtListDataSource = watch("DistrictListDataSource");
    const tradeMarkCodeListDataSource = watch("TradeMarkCodeListDataSource");
    const modelCodeListDataSource = watch("ModelCodeListDataSource");
    const insuranceDataSource = watch("InsuranceDataSource");
    const plateColorDataSource = watch("PlateColorDataSource");

    const currentCusPersonType = watch("CusPersonType");
    const currentIsContact = watch("IsContact");
    const currentFlagPlateNo = watch("FlagPlateNo");

    useEffect(() => {
      if (open) {
        dataSource.customerTypeListDataSource().then((data) => {
          setValue("CustomerTypeListDataSource", data);
        });

        dataSource.provinceListDataSource().then((data) => {
          setValue("ProvinceListDataSource", data);
        });

        dataSource.getTradeMarkCodeListDataSource().then((data) => {
          setValue("TradeMarkCodeListDataSource", data);
        });

        dataSource.getInsuranceActive().then((data) => {
          setValue("InsuranceDataSource", data);
        });

        dataSource.getMstPlateColorActive().then((data) => {
          setValue("PlateColorDataSource", data);
        });
      }
    }, [open]);

    const handleSave = () => {
      if (refSubmitButton.current) {
        refSubmitButton.current.click();
      }
    };

    const handleClose = () => {
      setOpen(false);
      setValue("CurrentTab", 0);
      clearErrors();
      reset();
      repairRef.current?.reset();
    };

    const handleChangeProvince = async (value, field) => {
      field.onChange({
        target: {
          name: "ProvinceCode",
          value: value,
        },
      });

      if (value) {
        await dataSource.getDistrictListDataSource(value).then((data) => {
          setValue("DistrictListDataSource", data);
        });
      } else {
        setValue("DistrictListDataSource", []);
        setValue("DistrictCode", null);
      }
    };

    const handleChangeTradeMarkCode = async (value, field) => {
      field.onChange({
        target: {
          name: "TradeMarkCode",
          value: value,
        },
      });
      if (value) {
        await dataSource.getModelCodeListDataSource(value).then((data) => {
          setValue("ModelCodeListDataSource", data);
        });
      } else {
        setValue("ModelCodeListDataSource", []);
        setValue("ModelID", null);
      }
    };

    const onSelectCustomer = async (data) => {
      setValue("PlateNo", data.PlateNo);
      setValue("FrameNo", data.FrameNo);
      setValue("CurrentKm", data.CurrentKm);
      setValue("WarrantyExpiresDate", data.WarrantyExpiresDate);
      setValue("PlateColorCode", data.PlateColorCode);
      setValue("TradeMarkCode", data.TradeMarkCode);
      setValue("SerialNo", null);
      setValue("DateBuyCar", data.DateBuyCar);
      setValue("WarrantyRegistrationDate", data.WarrantyRegistrationDate);
      setValue("CusConfirmedWarrantyDate", data.CusConfirmedWarrantyDate);
      setValue("ColorCode", data.ColorCode);
      setValue("ProductYear", data.ProductYear);
      setValue("BatteryNo", null);
      setValue("WarrantyKM", data.WarrantyKM);
      setValue("EngineNo", data.EngineNo);

      if (data.TradeMarkCode) {
        await dataSource
          .getModelCodeListDataSource(data.TradeMarkCode)
          .then((result) => {
            setValue("ModelCodeListDataSource", result);

            if (result.some((x) => x.ModelID == data.ModelID)) {
              setValue("ModelID", data.ModelID);
            } else {
              setValue("ModelID", null);
            }
          });
      } else {
        setValue("ModelCodeListDataSource", []);
      }
    };

    const onSubmit = async (data) => {
      const Ser_Customer = {
        CusID: data.CusID,
        DealerCode: DealerCode,
        CusName: data.CusName,
        Sex: data.Sex == "1",
        Address: data.Address,
        Tel: data.Tel,
        Mobile: data.Mobile,
        Fax: data.Fax,
        Email: data.Email,
        Website: data.Website,
        Bank: data.Bank,
        BankAccountNo: data.BankAccountNo,
        TaxCode: data.TaxCode,
        IsContact: data.IsContact,
        Note: data.Note,
        ContName: data.ContName,
        ContSex: data.ContSex == "1",
        ContAddress: data.ContAddress,
        ContTel: data.ContTel,
        ContMobile: data.ContMobile,
        ContFax: data.ContFax,
        ContEmail: data.ContEmail,
        CusTypeID:
          data.CusTypeID && data.CusPersonType == "2" ? data.CusTypeID : null,
        OrgTypeID: data.OrgTypeID ?? null,
        DOB: data.DOB ? format(new Date(data.DOB), "yyyy-MM-dd") : null,
        IDCardNo: data.IDCardNo,
        ProvinceCode: data.ProvinceCode,
        DistrictCode: data.DistrictCode,
      };

      const Lst_Ser_Car = {
        CarID: data.CarID ?? null,
        ColorCode: data.ColorCode,
        CurrentKm: data.CurrentKm,
        CusID: data.CusID,
        DateBuyCar: data.DateBuyCar,
        DealerCode: data.DealerCode,
        EngineNo: data.EngineNo,
        FrameNo: data.FrameNo,
        InsContractNo: data.InsContractNo,
        InsFinishedDate: data.InsFinishedDate,
        InsNo: data.InsNo,
        InsStartDate: data.InsStartDate,
        IsActive: data.IsActive,
        ModelID: data.ModelID,
        Note: data.Note,
        PlateNo: data.PlateNo,
        ProductYear: data.ProductYear,
        SalesCarID: data.SalesCarID,
        TradeMarkCode: data.TradeMarkCode,
        WarrantyRegistrationDate: data.WarrantyRegistrationDate,
        SerialNo: data.SerialNo,
        BatteryNo: data.BatteryNo,
        WarrantyExpiresDate: data.WarrantyExpiresDate,
        CusConfirmedWarrantyDate: data.CusConfirmedWarrantyDate,
        WarrantyKM: data.WarrantyKM,
        PlateColorCode: data.PlateColorCode,
        FlagPlateNo: data.FlagPlateNo == false ? "1" : "0",
      };

      if (
        data.DateBuyCar &&
        data.WarrantyRegistrationDate &&
        new Date(data.DateBuyCar) > new Date(data.WarrantyRegistrationDate)
      ) {
        showDialog({
          title: "Thông báo",
          message: "Ngày mua xe không được lớn hơn ngày đăng ký bảo hành!",
        });

        return;
      }

      if (
        data.InsStartDate &&
        data.InsFinishedDate &&
        new Date(data.InsStartDate) > new Date(data.InsFinishedDate)
      ) {
        showDialog({
          title: "Thông báo",
          message: "Ngày bắt đầu và ngày hết hạn không hợp lệ!",
        });

        return;
      }

      const params = {
        Ser_Customer: Ser_Customer,
        Lst_Ser_Car: [Lst_Ser_Car],
      };

      await dataSource.saveDL(params).then((resp) => {
        if (resp.success && resp.data) {
          onSaving(resp.data);
          handleClose();
        }
      });
    };

    const onError = (errors) => {
      const order = [
        "CusPersonType",
        "CusTypeID",
        "Sex",
        "CusName",
        "Mobile",
        "ProvinceCode",
        "DistrictCode",
        "Address",
        "ContName",
        "ContMobile",
        "PlateNo",
        "FrameNo",
        "TradeMarkCode",
        "ModelID",
        "InsContractNo",
      ];

      // Tìm lỗi theo order, nếu không tìm thấy thì lấy lỗi đầu tiên

      const firstError = order.find((x) => errors[x]);

      if (firstError) {
        showDialog({
          title: "Thông báo",
          message: errors[firstError].message,
        });
      } else {
        const key = Object.keys(errors)[0];

        showDialog({
          title: "Thông báo",
          message: errors[key].message,
        });
      }
    };

    const formSubmit = (e) => {
      e.stopPropagation();

      return handleSubmit(onSubmit, onError)(e);
    };

    const currentTab = watch("CurrentTab");

    const onTabChange = (value) => {
      setValue("CurrentTab", value);

      if (value == 1) {
        repairRef.current?.setData({
          PlateNo: getValues("PlateNo"),
          FrameNo: getValues("FrameNo"),
        })
      }
    };

    const handleChangeCusPersonType = (value, field) => {
      field.onChange({
        target: {
          name: "CusPersonType",
          value: value,
        },
      });

      setValue("Sex", null);
      setValue("IsContact", value == "2" ? false : true);
    };

    const handleFindCarShare = () => {
      const plateNo = getValues("PlateNo");
      const frameNo = getValues("FrameNo");

      shareCarPopupRef.current?.showPopup(plateNo, frameNo);
    };

    const renderLoaiKH = () => {
      return (
        <div>
          <div
            className={`${currentCusPersonType != "1" ? "block" : "hidden"}`}
          >
            <Controller
              name={"CusTypeID"}
              control={control}
              render={({ field }) => {
                return (
                  <SelectBoxField
                    field={field}
                    label={"Loại khách hàng"}
                    dataSource={customerTypeListDataSource}
                    valueExpr="CusTypeID"
                    displayExpr="CusTypeName"
                    required
                    spacing="2.5px"
                  />
                );
              }}
              rules={
                currentCusPersonType != "1"
                  ? {
                      required: requireLocale("Loại khách hàng"),
                    }
                  : {}
              }
            />
          </div>
          <div
            className={`${currentCusPersonType == "1" ? "block" : "hidden"}`}
          >
            <Controller
              name={"Sex"}
              control={control}
              render={({ field }) => {
                return (
                  <SelectBoxField
                    field={field}
                    label={locale.Sex}
                    // error={currentCusPersonType == "1" ? errors.Sex : null}
                    dataSource={dataSource.genderListDataSource}
                    valueExpr="key"
                    displayExpr="value"
                    required
                    spacing="2.5px"
                  />
                );
              }}
              rules={
                currentCusPersonType == "1"
                  ? {
                      required: requireLocale(locale.Sex),
                      validate: (value) => {
                        if (value != "0" && value != "1") {
                          return requireLocale(locale.Sex);
                        }

                        return true;
                      },
                    }
                  : {}
              }
            />
          </div>
        </div>
      );
    };

    return (
      <Popup
        visible={open}
        title="Thông tin khách hàng và xe"
        height={"100%"}
        wrapperAttr={{
          class: "PopupCapNhatThongTinKhachHangVaXe",
        }}
        showCloseButton
        onHiding={handleClose}
        // resizeEnabled
        position="top"
      >
        <form
          id="editForm"
          onSubmit={formSubmit}
          style={{
            height: "90%",
          }}
        >
          <div>
            <TabPanel
              width="100%"
              animationEnabled={true}
              swipeEnabled={true}
              dataSource={[
                {
                  title: "Khách hàng và xe",
                  id: 0,
                },
                {
                  title: "Lịch sử sửa chữa",
                  id: 1,
                },
              ]}
              className="my-[2px] custom-tab-panel"
              onSelectedIndexChange={onTabChange}
              selectedIndex={currentTab}
            />
          </div>

          <div
            className="flex flex-col h-full mt-[5px] p-[10px]"
            style={{
              display: currentTab == 0 ? "flex" : "none",
            }}
          >
            <CollapseHeader
              showCollapse={false}
              spacing="0"
              spacingTitle="160px"
              title="Thông tin khách hàng"
              headerRender={
                <Controller
                  name={"IsContact"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <CheckBoxField
                        field={field}
                        label={locale.IsContact}
                        spacing="0px"
                      />
                    );
                  }}
                />
              }
              render={
                <div className="flex flex-col relative">
                  <div className="grid grid-cols-3 my-[2px] mx-[10px] gap-[50px]">
                    <div className="flex flex-col ">
                      <div className="">
                        <Controller
                          name={"CusPersonType"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <SelectBoxField
                                field={field}
                                label={"Khách hàng"}
                                dataSource={
                                  dataSource.cusPersonTypeListDataSource
                                }
                                valueExpr="type"
                                displayExpr="display"
                                props={{
                                  onValueChange: (value) =>
                                    handleChangeCusPersonType(value, field),
                                }}
                                spacing="2.5px"
                              />
                            );
                          }}
                          rules={{
                            required: requireLocale("Khách hàng"),
                          }}
                        />
                      </div>
                      <div className="">{renderLoaiKH()}</div>
                      <div className="">
                        <Controller
                          name={"DOB"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <DateBoxField
                                field={field}
                                label={locale.DOB}
                                disabled={currentCusPersonType != "1"}
                                displayFormat="yyyy-MM-dd"
                                pickerType="calendar"
                                type="date"
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>
                      <div className="">
                        <Controller
                          name={"Mobile"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.Mobile}
                                required
                                spacing="2.5px"
                              />
                            );
                          }}
                          rules={{
                            required: requireLocale(locale.Mobile),
                            validate: (value) => {
                              if (value?.trim() == "") {
                                return requireLocale(locale.Mobile);
                              }

                              return true;
                            },
                          }}
                        />
                      </div>
                      <div className="">
                        <Controller
                          name={"Tel"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.Tel}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <div className="">
                        <Controller
                          name={"CusName"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.CusName}
                                required
                                spacing="2.5px"
                                props={{
                                  maxLength: 128,
                                }}
                              />
                            );
                          }}
                          rules={{
                            required: requireLocale(locale.CusName),
                            validate: (value) => {
                              // CusName chỉ bao gồm tiếng việt hợp lệ và có thể có dấu cách
                              if (/[~`!@#$%^&*()]/.test(value)) {
                                return "Họ tên không được chứa ký tự đặc biệt!";
                              }

                              if (value?.trim() == "") {
                                return requireLocale(locale.CusName);
                              }

                              return true;
                            },
                          }}
                        />
                      </div>

                      <div className="">
                        <Controller
                          name={"IDCardNo"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.IDCardNo}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>
                      <div className="">
                        <Controller
                          name={"ProvinceCode"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <SelectBoxField
                                field={field}
                                label={locale.ProvinceCode}
                                dataSource={provinceListDataSource}
                                valueExpr="ProvinceCode"
                                displayExpr="ProvinceName"
                                required
                                showClearButton
                                props={{
                                  onValueChange: (value) =>
                                    handleChangeProvince(value, field),
                                }}
                                spacing="2.5px"
                              />
                            );
                          }}
                          rules={{
                            required: requireLocale(locale.ProvinceCode),
                          }}
                        />
                      </div>
                      <div className="">
                        <Controller
                          name={"DistrictCode"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <SelectBoxField
                                field={field}
                                label={locale.DistrictCode}
                                dataSource={districtListDataSource}
                                valueExpr="DistrictCode"
                                displayExpr="DistrictName"
                                required
                                showClearButton
                                spacing="2.5px"
                              />
                            );
                          }}
                          rules={{
                            required: requireLocale(locale.DistrictCode),
                          }}
                        />
                      </div>

                      <div className="">
                        <Controller
                          name={"Address"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.Address}
                                required
                                spacing="2.5px"
                                props={{
                                  maxLength: 128,
                                }}
                              />
                            );
                          }}
                          rules={{
                            required: requireLocale(locale.Address),
                            validate: (value) => {
                              // Address không được chứa các ký tự sau ~`!@#$%^&*()
                              if (/[~`!@#$%^&*()]/.test(value)) {
                                return "Địa chỉ không được chứa ký tự đặc biệt!";
                              }

                              if (value?.trim() == "") {
                                return requireLocale(locale.Address);
                              }

                              return true;
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <div className="">
                        <Controller
                          name={"Fax"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.Fax}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>
                      <div className="">
                        <Controller
                          name={"TaxCode"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.TaxCode}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>

                      <div className="">
                        <Controller
                          name={"Website"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                disabled={currentCusPersonType == "1"}
                                field={field}
                                label={locale.Website}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>

                      <div className="">
                        <Controller
                          name={"Email"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.Email}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
            ></CollapseHeader>

            {/*  */}

            {!currentIsContact && (
              <CollapseHeader
                showCollapse={false}
                spacing="0"
                title="Thông tin người liên lạc"
                render={
                  <div className="grid grid-cols-3 my-[2px] mx-[10px] gap-[50px]">
                    <div className="flex flex-col">
                      <div className="">
                        <Controller
                          name={"ContName"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.ContName}
                                // error={
                                //   !currentIsContact ? errors.ContName : null
                                // }
                                required
                                spacing="2.5px"
                              />
                            );
                          }}
                          rules={
                            !currentIsContact
                              ? {
                                  required: requireLocale(locale.ContName),
                                  validate: (value) => {
                                    // ContName chỉ bao gồm tiếng việt hợp lệ và có thể có dấu cách
                                    if (/[~`!@#$%^&*()]/.test(value)) {
                                      return "Họ tên không được chứa ký tự đặc biệt!";
                                    }

                                    if (value?.trim() == "") {
                                      return requireLocale(locale.ContName);
                                    }

                                    return true;
                                  },
                                }
                              : {}
                          }
                        />
                      </div>
                      <div className="">
                        <Controller
                          name={"ContTel"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.ContTel}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="">
                        <Controller
                          name={"ContAddress"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.ContAddress}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>
                      <div className="">
                        <Controller
                          name={"ContMobile"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.ContMobile}
                                // error={
                                //   !currentIsContact ? errors.ContMobile : null
                                // }
                                required
                                spacing="2.5px"
                              />
                            );
                          }}
                          rules={
                            !currentIsContact
                              ? {
                                  required: requireLocale(locale.ContMobile),
                                  validate: (value) => {
                                    if (value?.trim() == "") {
                                      return requireLocale(locale.ContMobile);
                                    }

                                    return true;
                                  },
                                }
                              : {}
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="">
                        <Controller
                          name={"ContSex"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <SelectBoxField
                                field={field}
                                label={locale.ContSex}
                                dataSource={dataSource.genderListDataSource}
                                valueExpr="key"
                                displayExpr="value"
                                required
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>

                      <div className="">
                        <Controller
                          name={"ContEmail"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextBoxField
                                field={field}
                                label={locale.ContEmail}
                                spacing="2.5px"
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                }
              ></CollapseHeader>
            )}

            {/*  */}

            {/* Thông tin xe */}

            <CollapseHeader
              showCollapse={false}
              spacingTitle="100px"
              spacing="0"
              title="Thông tin xe"
              headerRender={
                <div className="flex items-center gap-[10px]">
                  <Controller
                    name={"FlagPlateNo"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <CheckBoxField
                          field={field}
                          label={locale.FlagPlateNo}
                          props={{
                            onValueChange: (value) => {
                              field.onChange({
                                target: {
                                  name: "FlagPlateNo",
                                  value: value,
                                },
                              });

                              if (value) {
                                setValue("PlateNo", null);
                              } else {
                                // 2 ký tự đầu của biển số là 2 chữ cái đầu mã đại lý
                                // dấu gạch ngang
                                // 3 ký tự tiếp theo là 3 số sau của mã đại lý
                                // 2 ký tự tiếp theo là 2 số tìm thấy đầu tiên của số khung

                                const oldFlagPlateNo =
                                  getValues("OldFlagPlateNo") ?? "";
                                const VIN = getValues("FrameNo") ?? "";
                                const dealerCode =
                                  getValues("DealerCode") ?? "";

                                const firstNumberFoundInFrameNo =
                                  VIN.match(/\d/g)?.[0] ?? "";

                                const secondNumberFoundInFrameNo =
                                  VIN.match(/\d/g)?.[1] ?? "";

                                const newPlateNo = `${dealerCode?.[0]}${dealerCode?.[1]}-${dealerCode?.[2]}${dealerCode?.[3]}${dealerCode?.[4]}${firstNumberFoundInFrameNo}${secondNumberFoundInFrameNo}`;

                                if (oldFlagPlateNo) {
                                  setValue("PlateNo", newPlateNo);
                                } else {
                                  setValue("PlateNo", getValues("OldPlateNo"));
                                }
                              }
                            },
                          }}
                          spacing="2.5px"
                        />
                      );
                    }}
                  />

                  <ButtonCommon
                    onClick={handleFindCarShare}
                    size="tiny"
                    text={"Tìm kiếm xe chia sẻ"}
                  ></ButtonCommon>
                </div>
              }
              render={
                <div className="grid grid-cols-3  my-[2px] mx-[10px] gap-[50px]">
                  <div className="flex flex-col">
                    <div className=""></div>
                    <Controller
                      name={"PlateNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={locale.PlateNo}
                            // error={!currentFlagPlateNo ? errors.PlateNo : null}
                            required={true}
                            disabled={currentFlagPlateNo}
                            spacing="2.5px"
                            props={{
                              onValueChange: (value) => {
                                field.onChange({
                                  target: {
                                    name: "PlateNo",
                                    value: value.toUpperCase(),
                                  },
                                });
                                setValue("OldPlateNo", value);
                              },
                            }}
                          />
                        );
                      }}
                      rules={
                        !currentFlagPlateNo
                          ? {
                              required: requireLocale(locale.PlateNo),
                              validate: (value) => {
                                // Định dạng biển số: 29A-12345 hoặc 29A-1234 hoặc 29AA-12345 hoặc 29AA-1234
                                const regexNormalCar =
                                  /^[0-9]{2}[A-Z]{1,2}-[0-9]{4,5}$/;
                                const regexSpecialCar = /^[A-Z]{2}-[0-9]{4,5}$/;

                                // 1NN-12545
                                const regexSpecialCar2 =
                                  /^[0-9]{1}[A-Z]{2}-[0-9]{4,5}$/;
                                if (
                                  !regexNormalCar.test(value) &&
                                  !regexSpecialCar.test(value) &&
                                  !regexSpecialCar2.test(value)
                                ) {
                                  return "Biển số xe không đúng định dạng!";
                                }

                                return true;
                              },
                            }
                          : {
                              required: {
                                value: false,
                                message: "",
                              },
                              validate: (value) => {
                                return true;
                              },
                            }
                      }
                    />
                    <div className="">
                      <Controller
                        name={"FrameNo"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={locale.FrameNo}
                              required
                              spacing="2.5px"
                              props={{
                                onValueChange: (value) => {
                                  field.onChange({
                                    target: {
                                      name: "FrameNo",
                                      value: value.toUpperCase(),
                                    },
                                  });
                                },
                              }}
                            />
                          );
                        }}
                        rules={{
                          required: requireLocale(locale.FrameNo),
                          validate: (value) => {
                            if (value?.trim() == "") {
                              return requireLocale(locale.FrameNo);
                            }

                            if (value.length < 17) {
                              return "Số khung phải đủ 17 ký tự!";
                            }

                            return true;
                          },
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"CurrentKm"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <NumberBoxField
                              field={field}
                              label={locale.CurrentKm}
                              disabled
                              format="#,##0"
                              showPlaceholder={false}
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"WarrantyExpiresDate"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <DateBoxField
                              disabled={true}
                              field={field}
                              label={"Ngày hết hạn BH"}
                              displayFormat="yyyy-MM-dd"
                              type="date"
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"WarrantyKM"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <NumberBoxField
                              field={field}
                              label={"Số KM GHBH"}
                              disabled
                              format="#,##0"
                              showPlaceholder={false}
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"PlateColorCode"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <SelectBoxField
                              field={field}
                              label={locale.PlateColorCode}
                              dataSource={plateColorDataSource}
                              valueExpr="PlateColorCode"
                              displayExpr="PlateColorName"
                              showClearButton
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="">
                      <Controller
                        name={"TradeMarkCode"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <SelectBoxField
                              field={field}
                              label={locale.TradeMarkCode}
                              dataSource={tradeMarkCodeListDataSource}
                              valueExpr="TradeMarkCode"
                              displayExpr="TradeMarkName"
                              required
                              props={{
                                onValueChange: (value) =>
                                  handleChangeTradeMarkCode(value, field),
                              }}
                              showClearButton
                              spacing="2.5px"
                            />
                          );
                        }}
                        rules={{
                          required: requireLocale(locale.TradeMarkCode),
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"EngineNo"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={locale.EngineNo}
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"DateBuyCar"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <DateBoxField
                              field={field}
                              label={locale.DateBuyCar}
                              displayFormat="yyyy-MM-dd"
                              type="date"
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"WarrantyRegistrationDate"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <DateBoxField
                              disabled={true}
                              field={field}
                              label={"Ngày ĐKBH"}
                              displayFormat="yyyy-MM-dd"
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"CusConfirmedWarrantyDate"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <DateBoxField
                              disabled={true}
                              field={field}
                              label={"Ngày KH XNBH"}
                              displayFormat="yyyy-MM-dd"
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="">
                      <Controller
                        name={"ModelID"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <SelectBoxField
                              field={field}
                              label={locale.ModelID}
                              dataSource={modelCodeListDataSource}
                              valueExpr="ModelID"
                              displayExpr="ModelName"
                              required
                              showClearButton
                              spacing="2.5px"
                            />
                          );
                        }}
                        rules={{
                          required: requireLocale("Model"),
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"ColorCode"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={locale.ColorCode}
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"ProductYear"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={locale.ProductYear}
                              spacing="2.5px"
                            />
                          );
                        }}
                        rules={{
                          validate: (value) => {
                            // ProductYear chỉ bao gồm số
                            if (value && !/^[0-9]*$/.test(value)) {
                              return "Năm sản xuất không hợp lệ!";
                            }

                            return true;
                          },
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"SerialNo"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={locale.SerialNo}
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"BatteryNo"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={"Mã bình ắc quy"}
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              }
            ></CollapseHeader>

            {/*  */}

            {/* Thông tin bảo hiểm */}

            <CollapseHeader
              showCollapse={false}
              spacing="0"
              title="Thông tin bảo hiểm"
              render={
                <div className="grid grid-cols-3 my-[2px] mx-[10px] gap-[50px]">
                  <div className="flex flex-col">
                    <div className="">
                      <Controller
                        name={"InsNo"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <SelectBoxField
                              field={field}
                              label={locale.InsNo}
                              dataSource={insuranceDataSource}
                              displayExpr={"InsVieName"}
                              valueExpr="InsNo"
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"InsContractNo"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={locale.InsContractNo}
                              spacing="2.5px"
                              props={{
                                maxLength: 20,
                              }}
                            />
                          );
                        }}
                        rules={{
                          validate: (value) => {
                            if (value && !/^[0-9]*$/.test(value)) {
                              return "Số hợp đồng không hợp lệ!";
                            }

                            return true;
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="">
                      <Controller
                        name={"InsStartDate"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <DateBoxField
                              field={field}
                              label={locale.InsStartDate}
                              displayFormat="yyyy-MM-dd"
                              type="date"
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"InsFinishedDate"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <DateBoxField
                              field={field}
                              label={locale.InsFinishedDate}
                              displayFormat="yyyy-MM-dd"
                              type="date"
                              spacing="2.5px"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              }
            ></CollapseHeader>
          </div>

          <div
            className="h-full pr-[10px]"
            style={{
              display: currentTab == 1 ? "flex" : "none",
            }}
          >
            <RepairHistory
              control={control}
              errors={errors}
              locale={locale}
              commonLocale={commonLocale}
              getValues={getValues}
              ref={repairRef}
            />
          </div>

          <button
            hidden={true}
            ref={refSubmitButton}
            type={"submit"}
            form={"editForm"}
          ></button>

          <PopupTimKiemXeChiaSe
            onSelectedCustomer={onSelectCustomer}
            ref={shareCarPopupRef}
            title="Danh sách xe chia sẻ hệ thống"
            viewAll={true}
          />
        </form>

        <div className="h-[30px] flex items-center justify-end popup-footer mt-[10px] gap-[8px]">
          <ButtonCommon
            onClick={handleSave}
            text="Lưu"
            size="small"
            visible={isEditing && currentTab != 1}
          ></ButtonCommon>

          <ButtonCommon
            onClick={handleClose}
            text="Thoát"
            type="secondary"
            size="small"
          ></ButtonCommon>
        </div>
        {/* <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-cancel"
          options={{
            text: commonLocale.BUTTON_SAVE,
            onClick: handleSave,
            stylingMode: "contained",
            type: "default",
          }}
          visible={currentTab == 0 && isEditing}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: commonLocale.BUTTON_EXIT,
            onClick: handleClose,
            elementAttr: {
              // class: "cancel-button",
            },
          }}
        /> */}
      </Popup>
    );
  }
);

export default PopupThongTinKhachHangVaXe;
