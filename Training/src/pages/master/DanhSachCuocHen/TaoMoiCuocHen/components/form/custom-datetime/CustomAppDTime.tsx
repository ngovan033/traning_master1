import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { Controller } from "react-hook-form";

interface IProps {
  control: any;
  errors: any;
  disable?: boolean;
  dateName: string;
  timeName: string;
  label?: string;
  disableTime?: boolean;
  required?: boolean;
}

const CustomAppDTime = ({
  control,
  errors,
  disable = false,
  dateName,
  timeName,
  label,
  disableTime = false,
  required = false,
}: IProps) => {
  return (
    <div
      className="flex items-center hook-form-textbox"
      style={{
        margin: 0,
      }}
    >
      {label && (
        <label className={`${"w-[110px] min-w-[110px]"} break-all mr-[12px]`}>
          {label}{" "}
          <span className="ml-[0.5px] text-red-500">{required && "*"}</span>
        </label>
      )}
      <div className="flex items-center gap-[5px] flex-grow">
        <div
          style={{
            width: "calc(50% - 5px)",
          }}
        >
          <Controller
            name={dateName}
            control={control}
            render={({ field }) => {
              return (
                <DateBoxField
                  field={field}
                  displayFormat="yyyy-MM-dd"
                  type="date"
                  disabled={disable}
                />
              );
            }}
          />
        </div>
        <div className="w-[10px]">-</div>
        <div
          style={{
            width: "calc(50% - 5px)",
          }}
        >
          <Controller
            name={timeName}
            control={control}
            render={({ field }) => {
              return (
                <DateBoxField
                  field={field}
                  displayFormat="HH:mm:ss"
                  type="time"
                  applyValueMode="instantly"
                  disabled={disableTime}
                />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomAppDTime;
