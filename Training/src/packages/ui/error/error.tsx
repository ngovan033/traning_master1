import { useI18n } from "@/i18n/useI18n";
import { ErrorMessage, clearErrorAtom, useErrorStore } from "@/packages/store";
import { ScrollView } from "devextreme-react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";

import Button from "devextreme-react/button";
import { useState } from "react";

import { useCommonLocale } from "@/packages/hooks/useCommonLocale";
import { format } from "date-fns";
import { nanoid } from "nanoid";
import { stringError } from "./error-download";
import ErrorLogin from "./error-login";
import "./error.scss";

const ErrorDetail = ({ error }: { error: ErrorMessage }) => {
  const { t } = useI18n("Error");
  const objDebugInfo = error._dicDebug;
  const _dicExcs = error._dicExcs;
  const Lst_c_K_DT_SysInfo = _dicExcs?.Lst_c_K_DT_SysInfo;
  let Lst_c_K_DT_SysError = [
    ...(_dicExcs?.Lst_c_K_DT_SysError ?? []).filter(
      (item) => item.PCode !== "AccessToken"
    ),
  ];
  const Lst_c_K_DT_SysWarning = _dicExcs?.Lst_c_K_DT_SysWarning;
  const errorCode =
    Lst_c_K_DT_SysInfo != null && Lst_c_K_DT_SysInfo.length > 0
      ? Lst_c_K_DT_SysInfo[0].ErrorCode
      : "";
  const errorMessage = t(errorCode);

  return (
    <div>
      {!!_dicExcs && (
        <div className="error__excresult">
          ----------------------------------------------------------------------------------
          <div className="error__excresult-title font-semibold">
            {t("Exception result")}
          </div>
          <div className="error__excresult__key flex">
            <span>ErrorCode: </span>
            <span className="pl-[5px]">{errorCode}</span>
          </div>
          <div className="error__excresult__key flex">
            <span>ErrorMessage:</span>{" "}
            <span className="pl-[5px]">{errorMessage}</span>
          </div>
          ----------------------------------------------------------------------------------
          <div className="error__excresult__key font-semibold">
            Lst_c_K_DT_SysInfo:
          </div>
          {Lst_c_K_DT_SysInfo != null && Lst_c_K_DT_SysInfo.length > 0 ? (
            Lst_c_K_DT_SysInfo.map((item, index) => {
              return (
                <div key={item.Tid}>
                  {Object.entries(item).map(([key, value]) => {
                    return (
                      <div key={`${key}_${index}`}>
                        <div className="error__debuginfo__key">
                          {key}: {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <></>
          )}
          ----------------------------------------------------------------------------------
          <div className="error__excresult__key font-semibold">
            Lst_c_K_DT_SysError:
          </div>
          <div>----------------------</div>
          {Lst_c_K_DT_SysError != null && Lst_c_K_DT_SysError.length > 0 ? (
            Lst_c_K_DT_SysError.map((item, index) => {
              return (
                <div key={item.PCode} className="mb-[5px]">
                  {Object.entries(item)
                    // .filter(([key, value]) => value !== "AccessToken")
                    .map(([key, value]) => {
                      return (
                        <div key={`${key}_${index}`}>
                          <div className="error__debuginfo__key flex ">
                            <div>{key}:</div>
                            <div className="pl-[5px] w-[95%] break-words">
                              {value}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  {index != Lst_c_K_DT_SysError.length - 1 && (
                    <div>----------------------</div>
                  )}
                </div>
              );
            })
          ) : (
            <></>
          )}
          <div className="error__excresult__key hidden">
            Lst_c_K_DT_SysWarning:
          </div>
          {Lst_c_K_DT_SysWarning != null && Lst_c_K_DT_SysWarning.length > 0 ? (
            Lst_c_K_DT_SysWarning.map((item, index) => {
              return (
                <div key={item.PCode}>
                  {Object.entries(item).map(([key, value]) => {
                    return (
                      <div key={`${key}_${index}`}>
                        <div className="error__debuginfo__key flex">
                          <span>{key}: </span> <span>{value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      )}
      {/* {!!objDebugInfo && (
        <div className="error__debuginfo hidden">
          <div className="error__debuginfo-title">{t("Debug information")}</div>
          {Object.entries(objDebugInfo).map(([key, value]) => {
            return (
              <div key={key}>
                <div className="error__debuginfo__key flex">
                  <span>{key}: </span>
                  <span>{JSON.stringify(value, null, 2)}</span>
                </div>
              </div>
            );
          })}
          -----------------------------------------
        </div>
      )} */}
      {/* {JSON.stringify(error)} */}
    </div>
  );
};

export default function Error() {
  const [size, setSize] = useState<"short" | "full">("short");
  const viewModeSizes = {
    short: {
      width: 400,
      height: 180,
    },
    full: {
      width: 550,
      height: 600,
    },
  };

  const { t } = useI18n("Error");
  const { errors } = useErrorStore();
  const { commonLocale } = useCommonLocale();

  let tokenFail = true;

  const clear = useSetAtom(clearErrorAtom);
  const hasErrors = !!errors && errors.length > 0;
  if (hasErrors) {
    const objErr = [...(errors[0]?._dicExcs?.Lst_c_K_DT_SysError ?? [])].find(
      (i) => i.PCode === "excSE.ErrorCode"
    );
    if (objErr) {
      if (objErr.PVal == "Unauthorize") {
        tokenFail = false;
      }
    }
  }

  const handleClose = () => {
    setSize("short");
    errors?.[0]?.callback?.();
    clear();
  };

  const handleDownload = () => {
    const jsonContent = stringError(errors);

    const blob = new Blob([jsonContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Error ${format(new Date(), "yyyy-MM-dd HH:mm:ss")}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleZoom = () => {
    setSize(size === "short" ? "full" : "short");
  };

  const title = t("ErrorTitle");

  if (
    errors[0]?._dicExcs?.Lst_c_K_DT_SysError?.some(
      (error) => error.PVal === "Unauthorize"
    )
  ) {
    return (
      <ErrorLogin
        login={errors[0]?._dicExcs?.Lst_c_K_DT_SysError?.some(
          (error) => error.PVal === "Unauthorize"
        )}
        naoid={nanoid()}
      />
    );
  }

  return (
    <Popup
      titleRender={(item: any) => (
        <div className="flex items-center gap-[10px]">
          <img src="/images/icons/warning.svg" className="h-[24px] w-[24px]" />

          <span className="h-[16px] flex items-center text-[16px] font-semibold">
            Lỗi
          </span>
        </div>
      )}
      // container=".dx-viewport"
      visible={hasErrors}
      // position={size == "short" ? "center" : "top"}
      position="center"
      minWidth={viewModeSizes[size].width}
      minHeight={viewModeSizes[size].height}
      height={viewModeSizes[size].height}
      width={viewModeSizes[size].width}
      maxHeight={"90%"}
      maxWidth={"90%"}
      onHiding={() => setSize("short")}
      wrapperAttr={{
        class: `error-popup ${size}`,
      }}
      resizeEnabled
      dragEnabled
    >
      <Position at="bottom" my="center" />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={{
          text: t("Download"),
          onClick: handleDownload,
          stylingMode: "contained",
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={{
          text:
            size === "short"
              ? commonLocale.BUTTON_EXPAND
              : commonLocale.BUTTON_COLLAPSE,
          onClick: handleZoom,
          stylingMode: "contained",
        }}
      />
      <ToolbarItem toolbar="bottom" location="after">
        <Button
          text={t("Close")}
          className="cancel-button"
          onClick={handleClose}
          style={{
            margin: 0,
          }}
        />
      </ToolbarItem>
      <ScrollView showScrollbar={"always"}>
        <div className="">
          {errors.map((item, index) => {
            if (item) {
              return (
                <div className="error-item" key={index}>
                  {/* <div
                    className="error__main"
                    onClick={() => {
                      document.getElementById("editable").focus();
                    }}
                  > */}
                  <div className="error__main">
                    <p className="break-words font-semibold">
                      {item?.message ?? "Error"}
                    </p>
                  </div>
                  {size === "full" && (
                    <div className="error__detail">
                      <ErrorDetail error={item} />
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </ScrollView>
    </Popup>
  );
}
