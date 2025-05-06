import { useDialog } from "@/packages/hooks/useDiaglog";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { format } from "date-fns";
import { Button } from "devextreme-react";
import { Controller, useForm } from "react-hook-form";

const CavitySearchForm = ({ onSearch }) => {
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
    defaultValues: {
      ThoiGianCuocHen: new Date(),
      BaoDuongDinhKy: true,
      SuaChuaChung: true,
      SuaChuaDongSon: true,
      SuaChuaKhac: true,
    },
  });

  const { showDialog } = useDialog();

  const handleSearch = () => {
    const dateTimeLine = getValues("ThoiGianCuocHen");
    const plateNo = getValues("BienSo");
    const flagBDDK = getValues("BaoDuongDinhKy");
    const flagSCC = getValues("SuaChuaChung");
    const flagSCDS = getValues("SuaChuaDongSon");
    const flagSCK = getValues("SuaChuaKhac");

    if (!dateTimeLine) {
      showDialog({
        title: "Thông báo",
        message: "Vui lòng chọn ngày!",
      });

      return;
    }

    onSearch({
      PlateNo: plateNo ?? "",
      DateTimeLine: format(dateTimeLine, "yyyy-MM-dd"),
      FlagBDDK: flagBDDK ? "1" : "0",
      FlagSCC: flagSCC ? "1" : "0",
      FlagSCDS: flagSCDS ? "1" : "0",
      FlagSCK: flagSCK ? "1" : "0",
    });
  };

  const handlePrevDay = () => {
    const dateTimeLine = getValues("ThoiGianCuocHen");
    const plateNo = getValues("BienSo");
    const flagBDDK = getValues("BaoDuongDinhKy");
    const flagSCC = getValues("SuaChuaChung");
    const flagSCDS = getValues("SuaChuaDongSon");
    const flagSCK = getValues("SuaChuaKhac");

    const result = dateTimeLine
      ? new Date(dateTimeLine).setDate(new Date(dateTimeLine).getDate() - 1)
      : new Date().setDate(new Date().getDate() - 1);

    setValue("ThoiGianCuocHen", result);

    onSearch({
      PlateNo: plateNo ?? "",
      DateTimeLine: format(result, "yyyy-MM-dd"),
      FlagBDDK: flagBDDK ? "1" : "0",
      FlagSCC: flagSCC ? "1" : "0",
      FlagSCDS: flagSCDS ? "1" : "0",
      FlagSCK: flagSCK ? "1" : "0",
    });
  };

  const handleNextDay = () => {
    const dateTimeLine = getValues("ThoiGianCuocHen");
    const plateNo = getValues("BienSo");
    const flagBDDK = getValues("BaoDuongDinhKy");
    const flagSCC = getValues("SuaChuaChung");
    const flagSCDS = getValues("SuaChuaDongSon");
    const flagSCK = getValues("SuaChuaKhac");

    const result = dateTimeLine
      ? new Date(dateTimeLine).setDate(new Date(dateTimeLine).getDate() + 1)
      : new Date().setDate(new Date().getDate() + 1);

    setValue("ThoiGianCuocHen", result);

    onSearch({
      PlateNo: plateNo ?? "",
      DateTimeLine: format(result, "yyyy-MM-dd"),
      FlagBDDK: flagBDDK ? "1" : "0",
      FlagSCC: flagSCC ? "1" : "0",
      FlagSCDS: flagSCDS ? "1" : "0",
      FlagSCK: flagSCK ? "1" : "0",
    });
  };
  return (
    <div className="flex flex-col px-[10px]">
      <div className="flex items-center gap-[5px] ">
        <Controller
          name={"BienSo"}
          control={control}
          render={({ field }) => {
            return (
              <TextBoxField
                field={field}
                label={"Biển số"}
                onEnterKey={handleSearch}
              />
            );
          }}
        />
        <Button
          style={{
            background: "#00703c",
            color: "#fff",
            margin: 0,
          }}
          text="Tìm kiếm"
          className="btn-small"
          onClick={handleSearch}
        ></Button>
      </div>
      <div className="flex items-center gap-[5px]">
        <div className="w-[100px] min-w-[100px] text-[12px]">Loại cuộc hẹn</div>
        <div className=" bg-[#f8cbad] px-[5px] rounded-[5px]">
          <Controller
            name={"BaoDuongDinhKy"}
            control={control}
            render={({ field }) => {
              return (
                <CheckBoxField
                  field={field}
                  label={"Bảo dưỡng định kỳ"}
                  spacing="0px"
                />
              );
            }}
          />
        </div>
        <div className=" bg-[#c9c9c9] px-[5px] rounded-[5px]">
          <Controller
            name={"SuaChuaChung"}
            control={control}
            render={({ field }) => {
              return (
                <CheckBoxField
                  field={field}
                  label={"Sửa chữa chung"}
                  spacing="0px"
                />
              );
            }}
          />
        </div>
        <div className=" bg-[#00b0f0] px-[5px] rounded-[5px]">
          <Controller
            name={"SuaChuaDongSon"}
            control={control}
            render={({ field }) => {
              return (
                <CheckBoxField
                  field={field}
                  label={"Sửa chữa đồng sơn"}
                  spacing="0px"
                />
              );
            }}
          />
        </div>
        <div className=" bg-[#ffff00] px-[5px] rounded-[5px]">
          <Controller
            name={"SuaChuaKhac"}
            control={control}
            render={({ field }) => {
              return (
                <CheckBoxField
                  field={field}
                  label={"Sửa chữa khác"}
                  spacing="0px"
                />
              );
            }}
          />
        </div>
      </div>
      <div className="w-[500px] flex items-center gap-[5px]">
        <div
          className="bg-[#bebebe] h-[25px] flex items-center justify-center w-[30px] cursor-pointer hover:shadow-md"
          onClick={handlePrevDay}
        >
          <i className="fa-solid fa-angles-left"></i>
        </div>
        <Controller
          name={"ThoiGianCuocHen"}
          control={control}
          render={({ field }) => {
            return (
              <DateBoxField
                field={field}
                error={errors.ThoiGianCuocHen}
                displayFormat="yyyy-MM-dd"
                type="date"
              />
            );
          }}
        />
        <div
          className="bg-[#bebebe] h-[25px] flex items-center justify-center w-[30px] cursor-pointer hover:shadow-md"
          onClick={handleNextDay}
        >
          <i className="fa-solid fa-angles-right"></i>
        </div>
      </div>
    </div>
  );
};

export default CavitySearchForm;
