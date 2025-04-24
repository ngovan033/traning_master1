import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { DateField } from "@/packages/components/date-field";
import { DialogMessage } from "@/packages/components/dialog-message/dialog-message";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { SearchParam } from "@/packages/types";
import { useQuery } from "@tanstack/react-query";
import { CheckBox, Form, LoadPanel } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { useAtomValue, useSetAtom } from "jotai";
import { sumBy } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { dataViewAtom, refecthAtom } from "../components/store";
import "./styles.scss";

interface ICustomerInfoProps {
  chuXeRef: any;
  nguoiLienHeRef: any;
  handleClose: any;
  checkBoxRef: any;
}
export const CustomerInfo = ({
  chuXeRef,
  nguoiLienHeRef,
  handleClose,
  checkBoxRef,
}: ICustomerInfoProps) => {
  const { t } = useI18n("Ser_CustomerCar");
  const { t: validateMsg } = useI18n("Validate");
  const api = useClientgateApi();
  const config = useConfiguration();
  const dataView = useAtomValue(dataViewAtom);
  const showError = useSetAtom(showErrorAtom);
  const setLoad = useSetAtom(loadPanelAtom);
  const { type } = useParams();
  const refecthData = useAtomValue(refecthAtom);

  const showViewDebitPopup = useVisibilityControl({
    defaultVisible: false,
  });

  // 1 => CaNhan | 2 => ToChuc
  const [customerType, setCustomerType] = useState<"CaNhan" | "ToChuc">(
    "CaNhan"
  );
  // true => CaNhan | false => ToChuc
  const [isCusContact, setIsCusContact] = useState(true);
  const [listDistrict, setListDistrict] = useState<any>([]);
  const [formChuXeInfo, setformChuXeInfo] = useState({
    CusID: "",
    KhachHang: "1",
    CusTypeID: "",
    CusName: "",
    Sex: "",
    Mobile: "",
    Tel: "",

    ProvinceCode: "",
    DistrictCode: "",
    Address: "",
    DOB: "",
    IDCardNo: "",

    Email: "",
    TaxCode: "",
    Fax: "",
    Website: "",
  });
  const [formNguoiLienHe, setformNguoiLienHe] = useState({
    ContName: "",
    ContTel: "",
    ContMobile: "",

    ContAddress: "",
    ContSex: "",

    ContFax: "",
    ContEmail: "",
  });

  const [formDebit, setFormDebit] = useState({
    lst_Ser_Customer: {
      CusID: "",
      CusName: "",
      Address: "",
      TotalDebitAmount: 0,
      TotalPaymentAmount: 0,
      TotalDebt: 0,
    },
    lst_Ser_CusDebit: [],
    lst_Ser_Payment: [],
  });

  useEffect(() => {
    if (type === "edit") {
      // db có thể trả về null
      let Sex, ContSex, KhachHang;
      if (!dataView?.CustomerInfo?.ContSex) {
        ContSex = "";
      } else {
        const lstTypeContSex = [true, "True", "1", 1];
        const _contSex = dataView?.CustomerInfo?.ContSex;

        // ContSex = dataView?.CustomerInfo?.ContSex === "True" ? "1" : "0";
        if (lstTypeContSex.includes(_contSex)) {
          ContSex = "1";
        } else {
          ContSex = "0";
        }
      }

      // 2 => Tổ chức | 0, 1 => Cá nhân
      if (dataView?.CustomerInfo?.CusPersonType !== "2") {
        KhachHang = "1";
        setCustomerType("CaNhan");
      } else {
        KhachHang = "2";
        setCustomerType("ToChuc");
      }

      // hồi đó là chơi Sex readonly khi ToChuc nhưng giờ cho ẩn luôn
      if (
        dataView?.CustomerInfo?.Sex === null ||
        dataView?.CustomerInfo?.Sex === ""
      ) {
        Sex = "";
      } else {
        // Sex = dataView?.CustomerInfo?.Sex === true ? "1" : "0";
        const lstTypeSex = [true, "True", "1", 1];
        const _sex = dataView?.CustomerInfo?.Sex;

        // Sex = dataView?.CustomerInfo?.Sex === "True" ? "1" : "0";
        if (lstTypeSex.includes(_sex)) {
          Sex = "1";
        } else {
          Sex = "0";
        }
      }
      //
      handleChangeProvince(dataView?.CustomerInfo?.ProvinceCode);
      // set true/false check box with data detail
      // true || 1 || CaNhan **** false || 2 || ToChuc
      const lstTypeIsContact = [true, "True", "1", 1];
      setIsCusContact(
        lstTypeIsContact.includes(dataView?.CustomerInfo.IsContact)
          ? true
          : false
      );

      setformChuXeInfo({
        CusID: dataView?.CustomerInfo?.CusID ?? "",
        CusTypeID: dataView?.CustomerInfo?.CusTypeID ?? "",
        KhachHang: KhachHang, // 2 trường KhachHang và IsContact là giống nhau
        // KhachHang: dataView?.CustomerInfo?.IsContact ? "1" : "2", // 2 trường KhachHang và IsContact là giống nhau
        CusName: dataView?.CustomerInfo?.CusName ?? "",
        Sex: Sex, // dataView?.CustomerInfo?.Sex === true ? "1" : "0",
        Mobile: dataView?.CustomerInfo?.Mobile ?? "",
        Tel: dataView?.CustomerInfo?.Tel ?? "",

        ProvinceCode: dataView?.CustomerInfo?.ProvinceCode ?? "",
        DistrictCode: dataView?.CustomerInfo?.DistrictCode ?? "",
        Address: dataView?.CustomerInfo?.Address ?? "",
        DOB: dataView?.CustomerInfo?.DOB ?? "",
        IDCardNo: dataView?.CustomerInfo?.IDCardNo ?? "",

        Email: dataView?.CustomerInfo?.Email ?? "",
        TaxCode: dataView?.CustomerInfo?.TaxCode ?? "",
        Fax: dataView?.CustomerInfo?.Fax ?? "",
        Website: dataView?.CustomerInfo?.Website ?? "",
      });
      setformNguoiLienHe({
        ContName: dataView?.CustomerInfo?.ContName ?? "",
        ContTel: dataView?.CustomerInfo?.ContTel ?? "",
        ContMobile: dataView?.CustomerInfo?.ContMobile ?? "",

        ContAddress: dataView?.CustomerInfo?.ContAddress ?? "",
        ContSex: ContSex,

        ContFax: dataView?.CustomerInfo?.ContFax ?? "",
        ContEmail: dataView?.CustomerInfo?.ContEmail ?? "",
      });
    }
  }, [dataView]);

  //=================================callAPI===================================
  const { data: listProvince, isLoading: isGetDataProvince } = useQuery(
    ["listProvince-Ser_CustomerCar_AddNew"],
    () =>
      api.Mst_Province_Search({
        FlagActive: "1",
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  // lấy toàn bộ loại khách hàng active
  const {
    data: listCustomerTypeActive,
    isLoading: isLoadingListCustomerTypeActive,
  } = useQuery(["listCustomerTypeActive-Ser_CustomerCar_AddNew"], async () => {
    const response = await api.Ser_MST_CustomerType_GetForCustomerCar();
    return response.DataList;
  });

  // lấy chi tiết thông tin nợ khách hàng
  const { data, isLoading, remove, refetch } = useQuery({
    queryKey: ["Ser_CustomerCar_viewDebit"],
    queryFn: async () => {
      if (refecthData !== "") {
        setLoad(true);
        const response = await api.SerCustomerCar_QLCongNoKhachHang_GetByCusID(
          dataView?.CustomerInfo?.CusID
        );

        if (response.isSuccess) {
          setFormDebit({
            lst_Ser_Customer: {
              CusID:
                response.Data.lst_Ser_Customer[0].CusID ?? // để chống dữ liệu null do api còn lỗi đoạn trả ra CusID
                dataView?.CustomerInfo?.CusID,
              CusName: response.Data.lst_Ser_Customer[0].CusName,
              Address: response.Data.lst_Ser_Customer[0].Address,
              TotalDebitAmount:
                sumBy(
                  response.Data?.lst_Ser_CusDebit,
                  (o: any) => o.DebitAmount
                ) ?? 0,
              TotalPaymentAmount:
                sumBy(
                  response.Data?.lst_Ser_Payment,
                  (o: any) => o.PaymentAmount
                ) ?? 0,
              TotalDebt: Math.ceil(
                sumBy(
                  response.Data?.lst_Ser_CusDebit,
                  (o: any) => o.DebitAmount
                ) -
                  sumBy(
                    response.Data?.lst_Ser_Payment,
                    (o: any) => o.PaymentAmount
                  ) >
                  0
                  ? sumBy(
                      response.Data?.lst_Ser_CusDebit,
                      (o: any) => o.DebitAmount
                    ) -
                      sumBy(
                        response.Data?.lst_Ser_Payment,
                        (o: any) => o.PaymentAmount
                      )
                  : 0
              ),
            },
            lst_Ser_CusDebit: response.Data.lst_Ser_CusDebit,
            lst_Ser_Payment: response.Data.lst_Ser_Payment,
          });

          setLoad(false);
        } else {
          showError({
            message: t(response._strErrCode),
            _strErrCode: response._strErrCode,
            _strTId: response._strTId,
            _strAppTId: response._strAppTId,
            _objTTime: response._objTTime,
            _strType: response._strType,
            _dicDebug: response._dicDebug,
            _dicExcs: response._dicExcs,
          });
          setLoad(false);
        }
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [refecthData]);

  const handleChangeCheckBox = (e: any) => {
    setIsCusContact(e);
  };

  const handleDelete = async () => {
    // Chỉ xóa khi đã xóa hết thông tin xe
    if (dataView?.CarInfo?.length > 0) {
      toast.warning(t("PhaiXoaHetXeTruocKhiXoaKhachHang"));
      // toast.warning(t("Phải xóa hết xe trước khi xóa khách hàng.!"));
    } else {
      ConfirmComponent({
        asyncFunction: async () => {
          const respone = await api.Ser_CustomerCar_Delete({
            CusId: dataView?.CustomerInfo?.CusID,
          });
          if (respone.isSuccess) {
            toast.success(t("Delete successfully!"));
            handleClose();
            return true;
          }
          showError({
            message: t(respone._strErrCode),
            _strErrCode: respone._strErrCode,
            _strTId: respone._strTId,
            _strAppTId: respone._strAppTId,
            _objTTime: respone._objTTime,
            _strType: respone._strType,
            _dicDebug: respone._dicDebug,
            _dicExcs: respone._dicExcs,
          });
          throw new Error(respone._strErrCode);
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to delete?"),
      });
    }
  };

  const handleView = async () => {
    // Không có ID KH hoặc không có Thông tin xe mặc dù có ID KH => Show thông báo k tìm thấy
    if (!dataView?.CustomerInfo?.CusID || dataView.CarInfo.length === 0) {
      DialogMessage({
        strHtml: t("KhongTimThayKHHoacKHChuaCoThongTinXe"),
        title: t("Warning"),
      });
      return;
    }

    setLoad(true);
    const response = await api.SerCustomerCar_QLCongNoKhachHang_GetByCusID(
      dataView?.CustomerInfo?.CusID
    );
    if (response.isSuccess && response?.Data) {
      setFormDebit({
        lst_Ser_Customer: {
          CusID:
            response.Data.lst_Ser_Customer[0].CusID ??
            dataView?.CustomerInfo?.CusID, // để chống dữ liệu null do api còn lỗi đoạn trả ra CusID
          CusName: response.Data.lst_Ser_Customer[0].CusName,
          Address: response.Data.lst_Ser_Customer[0].Address,
          TotalDebitAmount:
            sumBy(response.Data?.lst_Ser_CusDebit, (o: any) => o.DebitAmount) ??
            0,
          TotalPaymentAmount:
            sumBy(
              response.Data?.lst_Ser_Payment,
              (o: any) => o.PaymentAmount
            ) ?? 0,
          TotalDebt: Math.ceil(
            sumBy(response.Data?.lst_Ser_CusDebit, (o: any) => o.DebitAmount) -
              sumBy(
                response.Data?.lst_Ser_Payment,
                (o: any) => o.PaymentAmount
              ) >
              0
              ? sumBy(
                  response.Data?.lst_Ser_CusDebit,
                  (o: any) => o.DebitAmount
                ) -
                  sumBy(
                    response.Data?.lst_Ser_Payment,
                    (o: any) => o.PaymentAmount
                  )
              : 0
          ), // TotalDebt:
          //   sumBy(response.Data?.lst_Ser_CusDebit, (o: any) => o.DebitAmount) -
          //   sumBy(response.Data?.lst_Ser_Payment, (o: any) => o.PaymentAmount),
        },
        lst_Ser_CusDebit: response.Data.lst_Ser_CusDebit,
        lst_Ser_Payment: response.Data.lst_Ser_Payment,
      });
    } else {
      showError({
        message: t(response._strErrCode),
        _strErrCode: response._strErrCode,
        _strTId: response._strTId,
        _strAppTId: response._strAppTId,
        _objTTime: response._objTTime,
        _strType: response._strType,
        _dicDebug: response._dicDebug,
        _dicExcs: response._dicExcs,
      });
    }
    setLoad(false);
  };

  const handleChangeProvince = async (e: any) => {
    if (!e) {
      setListDistrict([]);
      return;
    }

    setLoad(true);
    const resp = await api.Mst_District_Search({
      ProvinceCode: e,
      FlagActive: "1",
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as any);
    if (resp.isSuccess) {
      setListDistrict(resp?.DataList);
    }
    setLoad(false);
  };

  const handleChangeCustomerType = (e: any) => {
    if (e === "1") {
      setCustomerType("CaNhan");
      setIsCusContact(true);
    } else {
      setCustomerType("ToChuc");
      setIsCusContact(false);
    }
    setformChuXeInfo((prev) => {
      return {
        ...prev,
        KhachHang: e,
      };
    });
  };

  const statusField = useMemo(() => {
    // setIsCusContact(dataView?.CustomerInfo.IsContact ? true : false);
    let objField = {
      readOnlyWebsite: false,
      readOnlySex: false,
      readOnlyDOB: false,
    };

    // Chỉ view form đầu (Cá nhân) : True (1)
    if (customerType === "CaNhan") {
      // bắt cho cả case view sau khi create
      objField = {
        readOnlyWebsite: true,
        readOnlySex: false,
        readOnlyDOB: false,
      };
    }

    // View cả 2 form (Tổ chức)
    if (customerType === "ToChuc") {
      // bắt cho cả case view sau khi create
      objField = {
        readOnlyWebsite: false,
        readOnlySex: true,
        readOnlyDOB: true,
      };
    }

    return objField;
  }, [customerType, isCusContact, dataView]);

  return (
    <>
      {isLoading && (
        <LoadPanel
          wrapperAttr={{
            class: "load-panel-custom",
          }}
          visible={true}
          shading={true}
          shadingColor="5px 5px 10px 2px rgba(229, 229, 229, 0.8)"
        />
      )}
      <div className="flex items-center gap-4 mt-2 mb-2">
        <p className="text-base font-bold">{t("Thông tin chủ xe")}</p>
        <CheckBox
          ref={checkBoxRef}
          text={t("Khách hàng cũng là người liên lạc")}
          onValueChange={(e) => handleChangeCheckBox(e)}
          value={isCusContact}
        />
        <div>
          {type === "edit" && (
            <BButton
              permissionCode="BTN_QT_DL_DANHSACHKHACHHANG_CT_XOA"
              isMdSize={true}
              label={t("Xoá")}
              onClick={() => handleDelete()}
            />
          )}
        </div>
      </div>
      <Form
        ref={chuXeRef}
        formData={formChuXeInfo}
        labelLocation={"left"}
        validationGroup={"mainAddCustomer"}
        className="mb-2"
        elementAttr={{
          id: "config_md_form_v2",
        }}
      >
        <GroupItem colCount={3}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("KhachHang"),
                visible: false,
              }}
              dataField={"KhachHang"}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(validateMsg("KhachHangIsRequired")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <SelectField
                        width={"100%"}
                        formInstance={formInstance}
                        dataField={dataField}
                        items={[
                          {
                            text: "Cá Nhân",
                            value: "1",
                          },
                          {
                            text: "Tổ chức",
                            value: "2",
                          },
                        ]}
                        valueExpr={"value"}
                        displayExpr={"text"}
                        placeholder="Chọn"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                          handleChangeCustomerType(e.value);
                        }}
                        defaultValue={value}
                        searchEnabled={false}
                        showClearButton={false}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("CusName"),
                visible: false,
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("CusName")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"CusName"}
              // visible={KhachHang === "1" ? true : false}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        placeholder="Nhập"
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        validationRules={[
                          RequiredField(t("CusNameIsRequired")),
                          {
                            type: "custom",
                            message: "Tên KH không được chứa kí tự đặc biệt",
                            validationCallback: (options) => {
                              if (/[()]/.test(options.value)) {
                                return false;
                                // return "Họ tên không được chứa ký tự đặc biệt!";
                              }

                              // check khoảng trắng ở đầu
                              // if (value.trim() !== value || value.trim() === "") {
                              //   return false;
                              //   // return "Vui lòng nhập Tên khách hàng!";
                              // }

                              return true;
                            },
                          },
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            {/* Cá nhân thì ẩn, còn Tổ chức thì hiện  SelectBox Loại khách hàng */}
            <SimpleItem
              label={{
                text: t("CusTypeID"),
                visible: false,
              }}
              isRequired={formChuXeInfo.KhachHang === "2" ? true : false}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("CusTypeIDsRequired")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"CusTypeID"}
              visible={formChuXeInfo.KhachHang === "2" ? true : false}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <SelectField
                        width={"100%"}
                        formInstance={formInstance}
                        dataField={dataField}
                        items={listCustomerTypeActive}
                        placeholder="Chọn"
                        displayExpr="CusTypeName"
                        valueExpr="CusTypeID"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        defaultValue={value}
                        showClearButton={false}
                        validationRules={[
                          RequiredField(t("CusTypeIDsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            {/* Cá nhân thì hiện, còn Tổ chức thì ẩn  SelectBox Sex */}
            <SimpleItem
              label={{
                text: t("Sex"),
                visible: false,
              }}
              dataField={"Sex"}
              isRequired={formChuXeInfo.KhachHang === "1" ? true : false}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("Sex")),
              ]}
              visible={formChuXeInfo.KhachHang === "1" ? true : false}
              editorOptions={{
                validationMessageMode: "always",
              }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <SelectField
                        readOnly={statusField.readOnlySex}
                        width={"100%"}
                        formInstance={formInstance}
                        searchEnabled={false}
                        dataField={dataField}
                        placeholder="Chọn"
                        items={[
                          {
                            text: "Nam",
                            value: "1",
                          },
                          {
                            text: "Nữ",
                            value: "0",
                          },
                        ]}
                        displayExpr="text"
                        valueExpr="value"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        defaultValue={value}
                        showClearButton={false}
                        validationRules={
                          statusField.readOnlySex
                            ? []
                            : [RequiredField(t("SexeIsRequired"))]
                        }
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Mobile"),
                visible: false,
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("Mobile")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"Mobile"} // Di động
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        placeholder="Nhập"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        // DD không cần bắt luật gì cả, chỉ cần bắt requried
                        validationRules={[
                          RequiredField(t("MobiletIsRequired")),
                        ]}
                        // validationRules={[
                        //   RequiredField(t("MobiletIsRequired")),
                        //   // ExcludeSpecialCharactersType,
                        //   numberType,
                        // ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Tel"),
                visible: false,
              }}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"Tel"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        placeholder="Nhập"
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        validationRules={
                          [
                            // { ...ExcludeSpecialCharactersAllowSpaceType, message: "" },
                          ]
                        }
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ProvinceCode"),
                visible: false,
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ProvinceCode")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"ProvinceCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {/* <p>{t(dataField)}</p> */}
                          Tỉnh /TP
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <SelectField
                        width={"100%"}
                        formInstance={formInstance}
                        dataField={dataField}
                        placeholder="Chọn"
                        items={listProvince?.DataList}
                        // searchEnabled={false}
                        // displayExpr={(item: any) => {
                        //   if (!item) {
                        //     return "";
                        //   }
                        //   return `${item.ProvinceCode} - ${item.ProvinceName}`;
                        // }}
                        displayExpr="ProvinceName"
                        valueExpr="ProvinceCode"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                          handleChangeProvince(e.value);
                          formInstance.updateData("DistrictCode", "");
                        }}
                        // onKeyDown={(ev: any) => {
                        //   const kb = ev?.event?.key;

                        //   let lstBan = ["Backspace"];

                        //   const isAllow = lstBan.includes(kb);

                        //   if (isAllow) {
                        //     ev.event?.preventDefault();
                        //     ev.event?.stopImmediatePropagation();
                        //   }
                        // }}
                        defaultValue={value}
                        showClearButton={false}
                        validationRules={[
                          RequiredField(t("ProvinceCodeIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                        dropDownOptions={{
                          resizeEnabled: true,
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("DistrictCode"),
                visible: false,
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("DistrictCode")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"DistrictCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <SelectField
                        width={"100%"}
                        // searchEnabled={false}
                        placeholder="Chọn"
                        formInstance={formInstance}
                        dataField={dataField}
                        items={listDistrict}
                        // displayExpr={(item: any) => {
                        //   if (!item) {
                        //     return "";
                        //   }
                        //   return `${item.DistrictCode} - ${item.DistrictName}`;
                        // }}
                        displayExpr="DistrictName"
                        valueExpr="DistrictCode"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        defaultValue={value}
                        showClearButton={false}
                        validationRules={[
                          RequiredField(t("DistrictCodeIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                        dropDownOptions={{
                          resizeEnabled: true,
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Address"),
                visible: false,
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("Address")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"Address"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        placeholder="Nhập"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        validationRules={[
                          RequiredField(t("AddresstIsRequired")),
                          {
                            type: "custom",
                            message: "Địa chỉ không được chứa kí tự đặc biệt!",
                            validationCallback: (options) => {
                              if (/[()]/.test(options.value)) {
                                return false;
                              }

                              return true;
                            },
                          },
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("DOB"),
                visible: false,
              }}
              dataField={"DOB"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      {" "}
                      <DateField
                        readOnly={statusField.readOnlyDOB}
                        formInstance={formInstance}
                        showClearButton={true}
                        defaultValue={value || null}
                        dataField={dataField}
                        width={"100%"}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        displayFormat="yyyy-MM-dd"
                        useMaskBehavior

                        // disabled={KhachHang === "2" ?? true}
                        // calendarOptions={{
                        //   maxZoomLevel: "month",
                        // }}
                      ></DateField>
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("IDCardNo"),
                visible: false,
              }}
              dataField={"IDCardNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        placeholder="Nhập"
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("Email"),
                visible: false,
              }}
              dataField={"Email"}
              // isRequired={true}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        placeholder="Nhập"
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        validationRules={
                          [
                            // RequiredField("Chưa nhập Email!"),
                            // Không cần bắt luật nhập email
                            // {
                            //   type: "custom",
                            //   message: "Email không đúng định dạng!",
                            //   validationCallback: (options) => {
                            //     if (!emailType.test(options.value?.trim())) {
                            //       return false;
                            //     }
                            //     return true;
                            //   },
                            // },
                          ]
                        }
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("TaxCode"), // MST
                visible: false,
              }}
              dataField={"TaxCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        placeholder="Nhập"
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Fax"),
                visible: false,
              }}
              dataField={"Fax"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        placeholder="Nhập"
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Website"),
                visible: false,
              }}
              dataField={"Website"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        readOnly={statusField.readOnlyWebsite}
                        placeholder="Nhập"
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        // disabled={KhachHang === "1" ?? true}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>

      {!isCusContact && (
        <>
          <div className="separator"></div>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-base font-bold">
              {t("Thông tin người liên hệ")}
            </p>
          </div>
        </>
      )}
      <Form
        ref={nguoiLienHeRef}
        formData={formNguoiLienHe}
        labelLocation={"left"}
        className="mt-2"
        visible={!isCusContact}
        validationGroup={"mainAddNguoiLienHe"}
        elementAttr={{
          id: "config_md_form_v2",
          class: "class_config_md_form_customercar",
        }}
      >
        <GroupItem colCount={3}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ContName"),
                visible: false,
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ContName")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"ContName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        placeholder="Nhập"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        validationRules={[
                          RequiredField(t("ContNameIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContTel"),
                visible: false,
              }}
              dataField={"ContTel"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        placeholder="Nhập"
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContMobile"),
                visible: false,
              }}
              dataField={"ContMobile"}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ContMobile")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        placeholder="Nhập"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        validationMessagePosition={"bottom"}
                        validationMessageMode={"always"}
                        validationRules={[
                          RequiredField(t("ContMobileIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ContAddress"),
                visible: false,
              }}
              dataField={"ContAddress"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        placeholder="Nhập"
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContSex"),
                visible: false,
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ContSex")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"ContSex"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>
                          {t(dataField)}
                          <span className="required_form_field">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <SelectField
                        width={"100%"}
                        formInstance={formInstance}
                        dataField={dataField}
                        placeholder="Chọn"
                        searchEnabled={false}
                        items={[
                          {
                            text: "Nam",
                            value: "1",
                          },
                          {
                            text: "Nữ",
                            value: "0",
                          },
                        ]}
                        displayExpr="text"
                        valueExpr="value"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        defaultValue={value}
                        showClearButton={false}
                        validationRules={[
                          RequiredField(t("ContSexIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ContFax"),
                visible: false,
              }}
              dataField={"ContFax"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        placeholder="Nhập"
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContEmail"),
                visible: false,
              }}
              dataField={"ContEmail"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="container__field">
                    <div className="container__field_label_group">
                      <div className="container__field_label">
                        <p>{t(dataField)}</p>
                      </div>
                    </div>
                    <div className="container__field_field">
                      <TextField
                        width={"100%"}
                        placeholder="Nhập"
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
    </>
  );
};
