import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { isAfter, isBefore, parse } from "date-fns";
import { ScrollView } from "devextreme-react";
import { nanoid } from "nanoid";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCavityStatusDataSource } from "../datasource/useCavityStatusDataSource";
import Khoang from "../khoang/Khoang";

function generateHourArray() {
  const hours = [];
  for (let i = 6; i <= 19; i++) {
    if (i == 19) {
      hours.push(`${i}:00`);
    } else {
      hours.push(`${i}:00`);
      hours.push(`${i}:30`);
    }
  }
  return hours;
}

const CavityTable = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    setListData: (data: any[]) => {
      setValue("ListData", data);
    },
  }));

  const windowSize = useWindowSize();

  const listTime = generateHourArray();

  const dataSource = useCavityStatusDataSource();

  const listLoaiCuocHen = [
    "BaoDuongDinhKy",
    "SuaChuaChung",
    "SuaChuaDongSon",
    "SuaChuaKhac",
  ];

  const EACH = 100 / 27;

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
      ListCavity: [],
      ListData: [],
    },
  });

  useEffect(() => {
    dataSource.getAllCavity().then((listCavity) => {
      setValue("ListCavity", listCavity);
    });
  }, []);

  const listCavity = watch("ListCavity");
  const listData = watch("ListData");

  const renderKhoang = useMemo(() => {
    const data = listCavity.map((cavity) => {
      const findCavity = listData.find((cavityData: any) => {
        return cavityData.CavityID == cavity.CavityID;
      });

      if (!findCavity) {
        return {
          Khoang: cavity.CavityName,
          From: 0,
          To: 0,
          LoaiCuocHen: "",
          PlateNo: "",
        };
      }
      // nếu findCavity?.AppTimeFrom nhỏ hơn 06:00:00 thì bằng 06:00:00
      const timeFrom = findCavity?.AppTimeFrom;
      const parsedTimeFrom = parse(timeFrom, "HH:mm:ss", new Date());
      const validTimeAM = parse("06:00:00", "HH:mm:ss", new Date());

      const adjustedTimeFrom = isBefore(parsedTimeFrom, validTimeAM)
        ? "06:00:00"
        : timeFrom;

      const timeTo = findCavity?.AppTime; // 11:05:00
      const parsedTimeTo = parse(timeTo, "HH:mm:ss", new Date());
      const validTimePM = parse("19:30:00", "HH:mm:ss", new Date());

      const adjustedTimeTo = isAfter(parsedTimeTo, validTimePM)
        ? "19:30:00"
        : timeTo;

      const partsTimeFrom = adjustedTimeFrom.split(":");
      const partsTimeTo = adjustedTimeTo.split(":");

      const startDate = new Date(); // use the current date as the starting point
      const endDate = new Date();

      startDate.setHours(partsTimeFrom[0]);
      startDate.setMinutes(partsTimeFrom[1]);

      endDate.setHours(partsTimeTo[0]);
      endDate.setMinutes(partsTimeTo[1]);

      return {
        Khoang: cavity.CavityName,
        From: startDate,
        To: endDate,
        LoaiCuocHen: findCavity?.AppTypeCode,
        PlateNo: findCavity?.PlateNo,
        IsStar: findCavity?.NewAppStatus == "Xác nhận",
      };
    });

    const result = data.map((item: any) => {
      const timeFrom = new Date(item.From);

      const timeTo = new Date(item.To);

      const h_from = timeFrom.getHours();
      const m_from = timeFrom.getMinutes();

      const h_to = timeTo.getHours();
      const m_to = timeTo.getMinutes();

      const diff = h_to * 60 + m_to - (h_from * 60 + m_from);

      const diffStart = h_from * 60 + m_from - 360;

      const w = (diff / 30) * EACH;

      const s = (diffStart / 30) * EACH;

      return {
        ...item,
        Width: w,
        Start: s,
        BienSo: item.PlateNo,
      };
    });
    // .filter((item: any) => {
    //   if (fd_BaoDuongDinhKy && item.LoaiCuocHen == "BaoDuongDinhKy") {
    //     return item;
    //   }
    //   if (fd_SuaChuaChung && item.LoaiCuocHen == "SuaChuaChung") {
    //     return item;
    //   }
    //   if (fd_SuaChuaDongSon && item.LoaiCuocHen == "SuaChuaDongSon") {
    //     return item;
    //   }
    //   if (fd_SuaChuaKhac && item.LoaiCuocHen == "SuaChuaKhac") {
    //     return item;
    //   }
    // });

    return result.map((item: any) => {
      return (
        <Khoang
          title={item.Khoang}
          start={item.Start}
          width={item.Width}
          loai={item.LoaiCuocHen}
          key={nanoid()}
          bienso={item.BienSo}
          isStar={item.IsStar}
        />
      );
    });
  }, [listCavity, listData]);

  return (
    <div className="flex flex-col p-[5px]">
      <div className="mt-[20px] pr-[20px] flex items-center border-[#f8cbad] border-b-[1px]">
        <div className="w-[150px] h-[15px]"></div>
        <div
          className="flex items-center "
          style={{
            // gridTemplateColumns: "repeat(13)",
            gridAutoFlow: "column",
            width: "calc(100% - 150px)",
          }}
        >
          {listTime.map((item: any) => {
            return (
              <div
                className="pl-[1px] text-[10px] border-l-[1px] border-[#f8cbad] "
                style={{
                  width: "calc(100% / 27)",
                  height: 15,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <ScrollView
        height={windowSize.height - 250}
        style={{
          scrollBehavior: "smooth",
        }}
      >
        <div className="mr-[20px] pb-[10px]">{renderKhoang}</div>
      </ScrollView>
    </div>
  );
});

export default CavityTable;
