import { useI18n } from "@/i18n/useI18n";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Button, Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { atom, useAtom } from "jotai";
import { useRef, useState } from "react";
import "./printmulti.scss";
import useColumnsPrintMult from "./use-columns-print-multi";
import usePrint, { List } from "./usePrint";

interface PrintProp {
  visible: boolean;
  list: List;
}

interface VisibleTable {
  invalid: boolean;
  valid: boolean;
}

export const printPropAtom = atom<PrintProp>({
  visible: false,
  list: {
    valid: [],
    invalid: [],
    count: 0,
  },
});

const Print = () => {
  const { t } = useI18n("PRINTMODALModal");

  const gridRef_valid = useRef();
  const gridRef_invalid = useRef();

  const [printProp, setPrintProp] = useAtom(printPropAtom);
  const [visibleTable, setVisibleTable] = useState<VisibleTable>({
    valid: false,
    invalid: false,
  });

  const handleClose = () => {
    setPrintProp({
      visible: false,
      list: {
        valid: [],
        invalid: [],
        count: 0,
      },
    });
  };

  const columns = useColumnsPrintMult();

  const { printMultiByLink } = usePrint();

  const fetchData_valid = async () => {
    return {
      DataList: printProp.list.valid,
    };
  };

  const fetchData_invalid = async () => {
    return {
      DataList: printProp.list.invalid,
    };
  };

  const handlePrint = async () => {
    await printMultiByLink({ list: printProp.list.valid });
  };

  const toggleValidTable = () => {
    setVisibleTable({
      valid: !visibleTable.valid,
      invalid: visibleTable.invalid,
    });
  };

  const toggleInvalidTable = () => {
    setVisibleTable({
      valid: visibleTable.valid,
      invalid: !visibleTable.invalid,
    });
  };

  return (
    <Popup
      visible={printProp.visible}
      onHidden={handleClose}
      showCloseButton
      title={t("Print Multi")}
      width={600}
      height={500}
      contentRender={() => (
        <div className="flex flex-col print-multi">
          <div className=" mt-[20px] flex items-center justify-between mb-[10px]">
            <div className="flex items-baseline gap-[10px]">
              <div className="text-[20px] text-green-500">{t("Valid")}</div>
              {printProp.list.valid.length > 0 ? (
                <div>
                  ({t("Count")}: {printProp.list.valid.length})
                </div>
              ) : (
                <div>({t("Count")}: 0)</div>
              )}
            </div>
            {printProp.list.valid.length > 0 && (
              <Button
                style={{ padding: "5px 10px" }}
                type="default"
                onClick={toggleValidTable}
              >
                {visibleTable.valid ? t("Hide detail") : t("More detail")}
              </Button>
            )}
          </div>

          {/* printProp.list.valid.length > 0 && */}
          {printProp.list.valid.length > 0 && visibleTable.valid && (
            <GridViewOne
              columns={columns.columns_valid}
              dataSource={printProp.list.valid}
              fetchData={fetchData_valid}
              ref={gridRef_valid}
              storeKey="PrintMultiTable_Valid"
              allowSelection={false}
              isHiddenCheckBox
              isHidenHeaderFilter
              customHeight={300}
              keyExpr={"code"}
            />
          )}

          <hr className="mt-[20px]" />

          <div className=" mt-[20px] flex items-center justify-between mb-[10px]">
            <div className="flex items-baseline gap-[10px]">
              <div className="text-[20px] text-red-500">{t("Invalid")}</div>

              {printProp.list.invalid.length > 0 ? (
                <div>
                  ({t("Count")}: {printProp.list.invalid.length})
                </div>
              ) : (
                <div>({t("Count")}: 0)</div>
              )}
            </div>
            {printProp.list.invalid.length > 0 && (
              <Button
                style={{ padding: "5px 10px" }}
                type="default"
                onClick={toggleInvalidTable}
              >
                {visibleTable.invalid ? t("Hide detail") : t("More detail")}
              </Button>
            )}
          </div>
          {/* printProp.list.invalid.length > 0 && */}
          {printProp.list.invalid.length > 0 && visibleTable.invalid && (
            <GridViewOne
              columns={columns.columns_invalid}
              dataSource={printProp.list.invalid}
              fetchData={fetchData_invalid}
              ref={gridRef_invalid}
              storeKey="PrintMultiTable_Invalid"
              allowSelection={false}
              isHiddenCheckBox
              isHidenHeaderFilter
              customHeight={300}
              keyExpr={"code"}
            />
          )}
        </div>
      )}
    >
      {printProp.list.valid.length > 0 && (
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={{
            text: t("Print"),
            onClick: handlePrint,
            stylingMode: "contained",
          }}
        />
      )}

      <ToolbarItem toolbar="bottom" location="after">
        <Button
          text={t("Close")}
          className="cancel-button"
          onClick={handleClose}
        />
      </ToolbarItem>
    </Popup>
  );
};

export default Print;
