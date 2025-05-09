import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import ButtonCommon from "@/packages/ui/button/ButtonCommon";
import CollapseHeader from "@/packages/ui/header/collapse_header/CollapseHeader";
import SearchPrimaryIcon from "@/packages/ui/icons/svg/search-primary";
import { ColumnOptions } from "@/types";
import { SelectBox, TextBox } from "devextreme-react";
import { useRef } from "react";

export const PhuTungPage = () => {
  const textBoxRef = useRef();
  const dataSource = [
    {
      STT:1,
      SerID: 1,
      SerCode: "",
      SerName: "",
      LoaiDichVu: "Sửa chữa",
      DoiTuongTT: "Khách hàng",
      GioDM: "",
      HeSoGia: "",
      SLC: 5,
      DonGia: 4000000,
      ThanhTien: 2500000,
      Thue: 5,
      GiaBaoHiem: 0,
      Note: "",
    },
    {
      STT:2,
      SerID: 2,
      SerCode: "",
      SerName: "",
      LoaiDichVu: "Lắp đặt",
      DoiTuongTT: "Bảo hiểm",
      GioDM: "",
      HeSoGia: "",
      SLC: 10,

      DonGia: 4000000,
      ThanhTien: 4000000,
      Thue: 10,
      GiaBaoHiem: 0,
      Note: "",
    },
    {
      STT:3,
      SerID: 3,
      SerCode: "",
      SerName: "",
      LoaiDichVu: "Lắp đặt",
      DoiTuongTT: "Khách hàng",
      GioDM: "",
      SLC: 0,

      HeSoGia: "",
      DonGia: 5000000,
      ThanhTien: 5000000,
      Thue: 0,
      GiaBaoHiem: 5,
      Note: "",
    },
    {
      STT:4,
      SerID: 4,
      SerCode: "",
      SerName: "",
      LoaiDichVu: "Sửa chữa",
      DoiTuongTT: "Khách hàng",
      GioDM: "",
      SLC: 0,

      HeSoGia: "",
      DonGia: 4000000,
      ThanhTien: 2500000,
      Thue: 5,
      GiaBaoHiem: 0,
      Note: "",
    },
    {
      STT:5,
      SerID: 5,
      SerCode: "",
      SerName: "",
      SLC: 0,
      LoaiDichVu: "Lắp đặt",
      DoiTuongTT: "Bảo hiểm",
      GioDM: "",
      HeSoGia: "",
      DonGia: 4000000,
      ThanhTien: 4000000,
      Thue: 10,
      GiaBaoHiem: 0,
      Note: "",
    },
  ];

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: "STT",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      width: 150,
    },
    {
      dataField: "SerCode",
      caption: "Mã PT",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      width: 150,
    },
    {
      dataField: "SerName",
      caption: "Tên PT",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
    },

    {
      dataField: "DoiTuongTT",
      caption: "Đối tượng thanh toán",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      cellRender: ({ data }) => (
        <SelectBox
          defaultValue={data.DoiTuongTT}
          dataSource={["Khách hàng", "Bảo hiểm"]}
          onValueChanged={(e) => {
            data.DoiTuongTT = e.value;
          }}
        />
      ),
    },
    {
      dataField: "GioDM",
      caption: "DVT",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
    },
    {
      dataField: "GioDM",
      caption: "Tồn kho",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
    },
    {
      dataField: "SLC",
      caption: "SL cần",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      cellRender: ({ data }) => <TextBox defaultValue={data.SLC} />,
    },
    {
      dataField: "HeSoGia",
      caption: "Hệ số giá",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      cellRender: ({ data }) => <TextBox defaultValue={data.HeSoGia} />,
    },
    {
      dataField: "DonGia",
      caption: "Đơn giá",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      cellRender: ({ data }) => <TextBox defaultValue={data.DonGia} />,
    },
    {
      dataField: "ThanhTien",
      caption: "Thành tiền",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      // cellRender: ({ data }) => <TextBox defaultValue={data.ThanhTien} />,
    },
    {
      dataField: "Thue",
      caption: "Thuế(%)",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      cellRender: ({ data }) => <TextBox defaultValue={data.Thue} />,
    },
    {
      dataField: "GiaBaoHiem",
      caption: "Giá bảo hiểm",
      visible: true,
      columnIndex: 1,
      editorType: "dxTextBox",
      cellRender: ({ data }) => <TextBox defaultValue={data.GiaBaoHiem} />,
    },
    {
      dataField: "Note",
      caption: "Ghi chú",
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 200,
      cellRender: ({ data }) => <TextBox defaultValue={data.Note} />,
    },
  ];

  return (
    <>
      <CollapseHeader
        showCollapse={true}
        className="small-monitor"
        title="Phụ tùng/dầu mỡ vật tư(10)"
        render={
          <div className="mx-[16px] mt-[5px]">
            <GridViewOne
              dataSource={dataSource}
              columns={columns}
              autoFetchData={false}
              allowSelection={true}
              // editMode={false}
              showSTT={false}
              keyExpr={"SerID"}
              storeKey={"PhuTungGrid"}
              customHeight={205}
              hideHeader={true}
              loadPanel={false}
            />
          </div>
        }
        headerRender={
          <div className="flex items-center gap-[10px] w-full justify-around">
            <div className="flex items-center">
              <TextBox
                width={200}
                showClearButton
                style={{
                  height: "24px",
                }}
              />
              <div className="ml-[5px]">
                <ButtonCommon
                  icon={<SearchPrimaryIcon />}
                  size="small"
                ></ButtonCommon>
              </div>
            </div>
            <div className="flex gap-[8px] ml-[-150px]">
              <ButtonCommon size="small">Xóa</ButtonCommon>
              <ButtonCommon size="small">Điền nhiều hàng</ButtonCommon>
            </div>
            <div className="flex items-center gap-[8px]">
              <label className="font-semibold text-[14px] text-[#1e2c50]">
                Tổng tiền:
              </label>

              <div className="bg-[#f7f9fa] px-[8px] py-[2px] border rounded-[4px] min-w-[100px] text-right font-semibold text-[#1e2c50]">
                20.000.000
              </div>
              <div className="bg-[#f7f9fa] px-[8px] py-[2px] border rounded-[4px] min-w-[100px] text-right font-semibold text-[#1e2c50]">
                500.000
              </div>
              <div className="bg-[#f7f9fa] px-[8px] py-[2px] border rounded-[4px] min-w-[130px] text-right font-semibold text-[#1e2c50]">
                10.000.000.000
              </div>
            </div>
          </div>
        }
        showExpand
      ></CollapseHeader>
    </>
  );
};
