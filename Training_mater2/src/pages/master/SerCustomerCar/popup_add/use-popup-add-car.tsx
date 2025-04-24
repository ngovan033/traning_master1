import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  checkAllWhiteSpace,
  checkAnyWhiteSpace,
  FORMAT_NUMBER,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { useQuery } from "@tanstack/react-query";
import { format, isAfter, isBefore, set } from "date-fns";
import { CheckBox, Form, NumberBox, Popup, Validator } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { useAtomValue, useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { toast } from "react-toastify";
import { dataViewAtom } from "../components/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { ValidationCallbackData } from "devextreme/common";
import { formatDate } from "@/packages/common/date_utils";
import { convertFrameNoToPlateNo, convertPlateNoToFrameNo } from "../common";
import { permissionAtom } from "@/packages/store/permission-store";
import { onKeyDownNumberBox } from "@/packages/common";

interface IPopupAddCarProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  formCarData: any;
  carInfoRef: any;
  dataGridCarRef: any;
  checkBox: any;
  setCheckBox: any;
  listInsNo: any;
  listModelName: any;
  setListModelName: any;
  handleViewHistory: (data: any) => void;
}

export const PopupAddCar = forwardRef(
  (
    {
      visible,
      container,
      onHidding,
      formCarData,
      carInfoRef,
      dataGridCarRef,
      checkBox,
      setCheckBox,
      listInsNo,
      listModelName,
      setListModelName,
      handleViewHistory,
    }: IPopupAddCarProps,
    addCarRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar");
    const { t: validateMsg } = useI18n("Validate");
    const permissionStore = useAtomValue(permissionAtom);
    const api = useClientgateApi();
    const config = useConfiguration();
    const showError = useSetAtom(showErrorAtom);
    const dataView = useAtomValue(dataViewAtom);
    const setLoad = useSetAtom(loadPanelAtom);
    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });
    const setDataView = useSetAtom(dataViewAtom);
    const ref = useRef<any>(null);
    useImperativeHandle(addCarRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showUploadPopup.open();
      },
    }));

    //=================================callAPI===================================
    const { data: listTradeMarkCode, isLoading: isGetDataTradeMarkCode } =
      useQuery(
        ["listTradeMarkCode-Ser_CustomerCar_AddNew"],
        () =>
          api.Ser_Mst_TradeMark_SearchDL({
            IsActive: "1",
            DealerCode: "",
            TradeMarkCode: "",
            TradeMarkName: "",
            Ft_PageIndex: 0,
            Ft_PageSize: config.MAX_PAGE_ITEMS,
          } as any),
        {}
      );

    //=================================callAPI-end===================================

    //=============================handle===============================================
    const handleClose = () => {
      showUploadPopup.close();
      // setListModelName([]);
      onHidding();
      // setCheckBox(false);
    };

    const handleSave = async () => {
      const validate = carInfoRef.current?.instance?.validate();
      const formData1 = carInfoRef?.current?.props?.formData;

      //
      if (!validate?.isValid) {
        return;
      }

      let plateNo = "";
      let frameNo = "";
      plateNo = formData1?.PlateNo?.toUpperCase?.()?.trim() ?? "";
      frameNo = formData1?.FrameNo?.toUpperCase?.()?.trim() ?? "";

      const isValidDateStart_End = isAfter(
        new Date(formData1.InsStartDate),
        new Date(formData1.InsFinishedDate)
      );

      // có thể bỏ trống 1 trong 2, nhưng đã nhập là phải check luật start <= end
      if (formData1.InsStartDate && formData1.InsFinishedDate) {
        if (isValidDateStart_End) {
          toast.warning(
            t("Sonethings went wrong with the InsStartDate and InsFinishedDate")
          );
          return;
        }
      }

      // //
      if (formCarData?.CarID === "") {
        ConfirmComponent({
          asyncFunction: async () => {
            setLoad(true);

            const resp = await api.Ser_CustomerCar_AddNewCar({
              CusID: dataView?.CustomerInfo?.CusID ?? "",
              ModelID: formData1?.ModelName ?? "",
              PlateNo: checkBox ? "" : plateNo,
              FrameNo: frameNo,
              EngineNo: formData1?.EngineNo ?? "",
              ColorCode: formData1?.ColorCode ?? "",
              ProductYear: formData1?.ProductYear ?? "",
              DateBuyCar: formData1?.DateBuyCar
                ? formatDate(new Date(formData1?.DateBuyCar))
                : "",
              WarrantyRegistrationDate:
                formData1?.WarrantyRegistrationDate ?? "",
              CurrentKm: formData1?.CurrentKm ?? "",
              TradeMarkCode: formData1?.TradeMarkCode ?? "",

              InsNo: formData1?.InsNo ?? "",
              InsContractNo: formData1?.InsContractNo?.trim() ?? "",
              InsStartDate: formData1?.InsStartDate
                ? formatDate(new Date(formData1?.InsStartDate))
                : "",
              InsFinishedDate: formData1?.InsFinishedDate
                ? formatDate(new Date(formData1?.InsFinishedDate))
                : "",
              FlagPlateNo: checkBox ? "0" : "1",

              SalesCarID: formData1?.SalesCarID ?? "",
              IsActive: formData1?.IsActive ?? "1",
              Note: formData1?.Note ?? "",
            });

            if (resp.isSuccess) {
              const response = await api.Ser_CustomerCar_SerCarSearchDL({
                CarID: "",
                CusID: dataView?.CustomerInfo?.CusID ?? "",
                PlateNo: "",
                FrameNo: "",
                EngineNo: "",
                ModelId: "",
                TradeMarkCode: "",
                DealerCode: "",
                SalesCarID: "",
                IsActive: "1",
                InsNo: "",
                Ft_PageIndex: 0,
                Ft_PageSize: 100,
              });

              if (response?.isSuccess) {
                if (response?.DataList) {
                  // xóa xe xong đồng thời cập nhật lại atom cho toàn bộ dữ liệu chi tiết update
                  setDataView((prev: any) => {
                    return {
                      CustomerInfo: prev.CustomerInfo,
                      CarInfo: response?.DataList,
                    };
                  });
                  dataGridCarRef?.current?.setData(response?.DataList);
                  handleClose();
                }
              }
              toast.success(t("Create successfully!"));
            } else {
              showError({
                message: t(resp._strErrCode),
                _strErrCode: resp._strErrCode,
                _strTId: resp._strTId,
                _strAppTId: resp._strAppTId,
                _objTTime: resp._objTTime,
                _strType: resp._strType,
                _dicDebug: resp._dicDebug,
                _dicExcs: resp._dicExcs,
              });
            }
            setLoad(false);
          },
          title: t("Confirm"),
          contentConfirm: t("Do you want to save ?"),
        });
      } else {
        ConfirmComponent({
          asyncFunction: async () => {
            setLoad(true);

            const resp = await api.Ser_CustomerCar_UpdateCar({
              CusID: dataView?.CustomerInfo?.CusID ?? "",
              ModelID: formData1?.ModelName ?? "",
              CarID: formData1?.CarID ?? "",
              PlateNo: checkBox ? "" : plateNo,
              FrameNo: frameNo,
              EngineNo: formData1?.EngineNo ?? "",
              ColorCode: formData1?.ColorCode ?? "",
              ProductYear: formData1?.ProductYear ?? "",
              DateBuyCar: formData1?.DateBuyCar
                ? formatDate(new Date(formData1?.DateBuyCar))
                : "",
              WarrantyRegistrationDate:
                formData1?.WarrantyRegistrationDate ?? "",
              CurrentKm: formData1?.CurrentKm ?? "",
              TradeMarkCode: formData1?.TradeMarkCode ?? "",

              InsNo: formData1?.InsNo ?? "",
              InsContractNo: formData1?.InsContractNo?.trim() ?? "",
              InsStartDate: formData1?.InsStartDate
                ? formatDate(new Date(formData1?.InsStartDate))
                : "",
              InsFinishedDate: formData1?.InsFinishedDate
                ? formatDate(new Date(formData1?.InsFinishedDate))
                : "",
              FlagPlateNo: checkBox ? "0" : "1",

              SalesCarID: formData1?.SalesCarID ?? "",
              IsActive: formData1?.IsActive ?? "1",
              Note: formData1?.Note ?? "",
            });

            if (resp.isSuccess) {
              const response = await api.Ser_CustomerCar_SerCarSearchDL({
                CarID: "",
                CusID: dataView?.CustomerInfo?.CusID ?? "",
                PlateNo: "",
                FrameNo: "",
                EngineNo: "",
                ModelId: "",
                TradeMarkCode: "",
                DealerCode: "",
                SalesCarID: "",
                IsActive: "1",
                InsNo: "",
                Ft_PageIndex: 0,
                Ft_PageSize: 100,
              });

              if (response?.isSuccess) {
                if (response?.DataList) {
                  setDataView((prev: any) => {
                    return {
                      CustomerInfo: prev.CustomerInfo,
                      CarInfo: response?.DataList,
                    };
                  });
                  dataGridCarRef?.current?.setData(response?.DataList);
                  showUploadPopup.close();
                }
              }
              toast.success(t("Update successfully!"));
            } else {
              showError({
                message: t(resp._strErrCode),
                _strErrCode: resp._strErrCode,
                _strTId: resp._strTId,
                _strAppTId: resp._strAppTId,
                _objTTime: resp._objTTime,
                _strType: resp._strType,
                _dicDebug: resp._dicDebug,
                _dicExcs: resp._dicExcs,
              });
            }
            setLoad(false);
          },
          title: t("Confirm"),
          contentConfirm: t("Do you want to save ?"),
        });
      }
    };

    const handleChangeTradeMarkCode = async (e: string) => {
      if (e === null) {
        setListModelName([]);
        carInfoRef.current.instance.updateData("ModelName", "");
      } else {
        setLoad(true);
        const resp = await api.Ser_MST_Model_SearchDL({
          TradeMarkCode: e,
          ModelName: "",
          Ft_PageIndex: 0,
          Ft_PageSize: config.MAX_PAGE_ITEMS,
        });
        if (resp.isSuccess) {
          setListModelName(resp?.DataList);
          carInfoRef.current.instance.updateData("ModelName", "");
        }
        setLoad(false);
      }
    };

    const handleChangeCheckBox = (e: any) => {
      const formDataSource = carInfoRef.current.instance.option("formData");
      const dealerCode = permissionStore.sysUser?.DealerCode ?? "";
      // biến đổi từ không có biển số (biển số db tự sinh) sang biển số hợp lệ
      if (formCarData.FlagPlateNo === "0") {
        if (e === false) {
          const plateNo = convertFrameNoToPlateNo(
            dealerCode,
            formDataSource.FrameNo
          );
          carInfoRef.current.instance.updateData("PlateNo", plateNo);
        } else {
          const plateNo = convertPlateNoToFrameNo(
            dealerCode,
            formDataSource.FrameNo
          );
          carInfoRef.current.instance.updateData("PlateNo", plateNo);
        }
      }

      // =====
      setCheckBox(e);
    };

    //

    return (
      <Popup
        visible={showUploadPopup.visible}
        title={"Thông tin xe"}
        // title={formCarData?.CarID === "" ? t("AddCar") : t("Update")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "config_md_popup",
        }}
        onHiding={handleClose}
        height={"auto"}
        // width={"90%"}
        width={1150}
      >
        <div className="customize_header_group">
          <div>
            <p className="text-[14px] font-bold">{t("Thông tin xe")}</p>
          </div>
          <div>
            <CheckBox
              text={t("Xe không có biển số")}
              onValueChange={(e) => handleChangeCheckBox(e)}
              value={checkBox}
            />
          </div>
        </div>
        <Form
          ref={carInfoRef}
          id="Ser_CustomerCar_CreateNew_CarInfo_PopupAddCar"
          formData={formCarData}
          labelLocation={"left"}
          validationGroup="Ser_CustomerCar_CreateNew_CarInfo_PopupAddCar"
          elementAttr={{
            id: "config_md_form_v2",
          }}
        >
          <GroupItem colCount={3}>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("PlateNo"),
                  visible: false,
                }}
                isRequired={checkBox ? false : true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField("Biển số bắt buộc nhập!"),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"PlateNo"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  {
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
                            className="customize-textbox-field ml-2"
                            width={"100%"}
                            defaultValue={value}
                            dataField={dataField}
                            formInstance={formInstance}
                            onValueChanged={(e: any) => {
                              formInstance.updateData(dataField, e.value);
                            }}
                            placeholder={!checkBox ? "Nhập" : ""}
                            readOnly={checkBox ? true : false}
                            validationMessageMode="always"
                            validationGroup={
                              !checkBox
                                ? formInstance.option("validationGroup")
                                : undefined
                            }
                            validationRules={[
                              RequiredField("Biển số bắt buộc nhập!"),
                              {
                                type: "custom",
                                message: "Biển số không đúng định dạng!",
                                validationCallback: (ev: any) => {
                                  const val = ev.value.toUpperCase().trim();
                                  // Định dạng biển số: 29A-12345 hoặc 29A-1234 hoặc 29AA-12345 hoặc 29AA-1234
                                  const strvalPlNo01 =
                                    /^[1-9]{1}[0-9]{0,1}[A-Z]{1,2}[-]{1}[0-9]{4,5}$/; // /^[0-9]{2}[a-zA-Z]{1,2}-[0-9]{4,5}$/;
                                  const strvalPlNo02 =
                                    /^[A-Z]{2}[-]{1}[0-9]{4,5}$/; //  /^[a-zA-Z]{2}-[0-9]{4,5}$/;
                                  if (
                                    !strvalPlNo01.test(val) &&
                                    !strvalPlNo02.test(val)
                                  ) {
                                    return false;
                                  }

                                  return true;
                                },
                              },
                            ]}
                          />
                        </div>
                      </div>
                    );
                  }
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("TradeMarkCode"),
                  visible: false,
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("TradeMarkCode")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"TradeMarkCode"}
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
                          items={listTradeMarkCode?.DataList}
                          // displayExpr="TradeMarkName"
                          displayExpr="TradeMarkCode"
                          valueExpr="TradeMarkCode"
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                            handleChangeTradeMarkCode(e.value);
                          }}
                          defaultValue={value}
                          showClearButton={false}
                          placeholder={t("Select")}
                          validationRules={[
                            RequiredField(t("TradeMarkCodeIsRequired")),
                          ]}
                          validationGroup={formInstance.option(
                            "validationGroup"
                          )}
                        />
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("ModelName"),
                  visible: false,
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("ModelName")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"ModelName"}
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
                          items={listModelName}
                          displayExpr="ModelName"
                          valueExpr="ModelID"
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          defaultValue={value}
                          showClearButton={false}
                          placeholder={t("Select")}
                          validationRules={[
                            RequiredField(t("ModelNameIsRequired")),
                          ]}
                          validationGroup={formInstance.option(
                            "validationGroup"
                          )}
                        />
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("CurrentKm"),
                  visible: false,
                }}
                dataField={"CurrentKm"}
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
                          readOnly
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
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: "Số khung",
                  visible: false,
                }}
                dataField={"FrameNo"}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField("Số khung bắt buộc nhập"),
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
                            Số khung
                            <span className="required_form_field">*</span>
                          </p>
                        </div>
                      </div>
                      <div className="container__field_field">
                        <TextField
                          className="customize-textbox-field ml-2"
                          width={"100%"}
                          defaultValue={value}
                          dataField={dataField}
                          formInstance={formInstance}
                          placeholder={t("Input")}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          // mask={"SSSSSSSSSSSSSSSSS"}
                          maxLength={17}
                          validationRules={[
                            RequiredField("Số khung bắt buộc nhập"),
                            {
                              type: "custom",
                              message: "Số khung phải đủ 17 ký tự!",
                              validationCallback: (ev: any) => {
                                const val = ev.value.trim();
                                if (val.length !== 17) {
                                  return false;
                                }
                                return true;
                              },
                            },
                            {
                              type: "custom",
                              message: "Số khung không hợp lệ!",
                              validationCallback: (ev: any) => {
                                const strFrameNo = /[^a-zA-Z0-9._-]/;
                                const val = ev.value.trim();
                                if (strFrameNo.test(val)) {
                                  return false;
                                }
                                return true;
                              },
                            },
                          ]}
                          validationGroup={formInstance.option(
                            "validationGroup"
                          )}
                        />
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("EngineNo"),
                  visible: false,
                }}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"EngineNo"}
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
                          formInstance={formInstance}
                          placeholder={t("Input")}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(
                              dataField,
                              e.value?.toUpperCase()
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("ColorCode"),
                  visible: false,
                }}
                dataField={"ColorCode"}
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
                          formInstance={formInstance}
                          placeholder={t("Input")}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(
                              dataField,
                              e.value?.toUpperCase()
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("ProductYear"), // Đời xe
                  visible: false,
                }}
                dataField={"ProductYear"}
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
                        <div className="">
                          <TextField
                            width={"100%"}
                            defaultValue={value}
                            dataField={dataField}
                            formInstance={formInstance}
                            placeholder={t("Input")}
                            onValueChanged={(e: any) => {
                              const isValid = /^[0-9]+$/.test(e.value);
                              if (!isValid) {
                                e.event?.preventDefault();
                                e.event?.stopImmediatePropagation();
                                return;
                              }
                              formInstance.updateData(dataField, e.value);
                            }}
                            onPaste={(e) => {
                              const pastedText =
                                e.event.originalEvent.clipboardData?.getData(
                                  "text"
                                ) || "";

                              if (!pastedText) {
                                e.event.preventDefault();
                              }

                              const isValid = /^[0-9]+$/.test(pastedText);
                              if (!isValid) {
                                e.event.preventDefault();
                              }
                            }}
                            onKeyDown={(ev: any) => {
                              const kb = ev?.event?.key?.toLowerCase();
                              const isValid = /^[0-9]+$/.test(kb);

                              let lstAllow = [
                                "arrowup",
                                "arrowdown",
                                "arrowleft",
                                "arrowright",
                                "backspace",
                              ];

                              const isAllow = lstAllow.includes(kb);

                              const isCtrlCombination =
                                ev.event.ctrlKey &&
                                (kb === "a" ||
                                  kb === "c" ||
                                  kb === "v" ||
                                  kb === "x");

                              if (
                                isValid === false &&
                                isAllow === false &&
                                !isCtrlCombination
                                // && isExclude === true
                              ) {
                                ev.event?.preventDefault();
                                ev.event?.stopImmediatePropagation();
                              }
                            }}
                            validationRules={[
                              {
                                type: "custom",
                                message: "Đời xe quá nhiều kí tự!",
                                ignoreEmptyValue: true,
                                validationCallback: (
                                  e: ValidationCallbackData
                                ) => {
                                  if (`${e.value}`.length > 10) {
                                    return false;
                                  }
                                  return true;
                                },
                              },
                            ]}
                            validationGroup={formInstance.option(
                              "validationGroup"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>
            </GroupItem>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("DateBuyCar"),
                  visible: false,
                }}
                dataField={"DateBuyCar"}
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
                        <DateField
                          formInstance={formInstance}
                          showClearButton={true}
                          dataField={dataField}
                          width={"100%"}
                          defaultValue={value}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          displayFormat={"yyyy-MM-dd"}
                          // placeholder={t("yyyy-MM-dd")}
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
                  text: t("WarrantyRegistrationDate"), // Ngày đăng kí bảo hành
                  visible: false,
                }}
                dataField={"WarrantyRegistrationDate"}
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
                        <DateField
                          formInstance={formInstance}
                          showClearButton={true}
                          defaultValue={value}
                          dataField={dataField}
                          width={"100%"}
                          readOnly
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          displayFormat={"yyyy-MM-dd"}
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
                  text: t("WarrantyExpiresDate"), // Ngày hết hạn bảo hành
                  visible: false,
                }}
                dataField={"WarrantyExpiresDate"}
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
                        <DateField
                          formInstance={formInstance}
                          showClearButton={true}
                          dataField={dataField}
                          width={"100%"}
                          defaultValue={value}
                          readOnly
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          displayFormat={"yyyy-MM-dd"}
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
                  text: t("CusConfirmedWarrantyDate"), // Ngày KH xác nhận bảo hành
                  visible: false,
                }}
                dataField={"CusConfirmedWarrantyDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className="container__field">
                      <div className="container__field_label_group">
                        <div className="container__field_label">
                          <p>
                            Ngày KH xác nhận bảo hành
                            {/* {t(dataField)} */}
                          </p>
                        </div>
                      </div>
                      <div className="container__field_field">
                        <DateField
                          formInstance={formInstance}
                          showClearButton={true}
                          dataField={dataField}
                          defaultValue={value}
                          readOnly
                          width={"100%"}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          displayFormat={"yyyy-MM-dd"}
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
            </GroupItem>
          </GroupItem>
          <GroupItem colCount={3} caption={t("Thông tin bảo hiểm theo xe")}>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("InsNo"),
                  visible: false,
                }}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"InsNo"}
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
                        <SelectField
                          width={"100%"}
                          formInstance={formInstance}
                          dataField={dataField}
                          items={listInsNo?.DataList}
                          displayExpr="InsVieName"
                          // displayExpr={(item: any) => {
                          //   if (!item) {
                          //     return "";
                          //   }
                          //   return `${item.InsNo} - ${item.InsVieName}`;
                          // }}
                          valueExpr="InsNo"
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          defaultValue={value}
                          showClearButton={false}
                          placeholder={t("Select")}
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
                  text: t("InsContractNo"),
                  visible: false,
                }}
                dataField={"InsContractNo"}
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
                          formInstance={formInstance}
                          placeholder={t("Input")}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          validationRules={[
                            {
                              type: "custom",
                              message: "Số hợp đồng quá nhiều kí tự!",
                              ignoreEmptyValue: true,
                              validationCallback: (
                                e: ValidationCallbackData
                              ) => {
                                const InsContractNo = e.value.trim();
                                if (InsContractNo.length > 20) {
                                  return false;
                                }
                                return true;
                              },
                            },
                            {
                              type: "custom",
                              message: "Số hợp đồng bảo hiểm không hợp lệ!",
                              // "Số hợp đồng chỉ được nhập số và không có khoảng trắng",
                              ignoreEmptyValue: true,
                              validationCallback: (
                                e: ValidationCallbackData
                              ) => {
                                const InsContractNo = e.value.trim();
                                var regexEmptySpace = /\s+/;
                                const regexOnlyNumber = /^[0-9]+$/;
                                const isAllNumber =
                                  regexOnlyNumber.test(InsContractNo);

                                const isContainSpace =
                                  InsContractNo &&
                                  regexEmptySpace.test(InsContractNo);
                                if (!isAllNumber || isContainSpace) {
                                  return false;
                                }

                                return true;
                              },
                            },
                          ]}
                          validationGroup={formInstance.option(
                            "validationGroup"
                          )}
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
                  text: t("InsStartDate"),
                  visible: false,
                }}
                dataField={"InsStartDate"}
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
                        <DateField
                          formInstance={formInstance}
                          showClearButton={true}
                          dataField={dataField}
                          defaultValue={value}
                          width={"100%"}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          displayFormat={"yyyy-MM-dd"}
                          // placeholder={t("yyyy-MM-dd")}
                          useMaskBehavior
                        ></DateField>
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("InsFinishedDate"),
                  visible: false,
                }}
                dataField={"InsFinishedDate"}
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
                        <DateField
                          formInstance={formInstance}
                          showClearButton={true}
                          dataField={dataField}
                          defaultValue={value}
                          width={"100%"}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          displayFormat={"yyyy-MM-dd"}
                          // placeholder={t("yyyy-MM-dd")}
                          useMaskBehavior
                        ></DateField>
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>
            </GroupItem>
          </GroupItem>
        </Form>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: "Xem lịch sử dịch vụ",
            type: "default",
            stylingMode: "contained",
            onClick: () => handleViewHistory(formCarData),
          }}
        />

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Save"),
            type: "default",
            stylingMode: "contained",
            onClick: handleSave,
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: handleClose,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
