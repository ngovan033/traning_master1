import { UploadFieldCustom } from "./upload-components/file-uploader";

interface TextboxFieldProps {
  field: any;
  label?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  direction?: string;
  spacing?: string;
}

export const UploadFileField = ({
  field,
  label,
  required = false,
  error,
  disabled,
  direction,
  spacing = "8px",
}: TextboxFieldProps) => {
  const { onChange, ref, ...rest } = field;

  return (
    <div
      className={`hook-form-upload flex ${
        direction == "vertical" ? "flex-col" : `my-[${spacing}]`
      }  ${required ? "required" : ""} `}
      style={{
        marginBottom: spacing,
        marginTop: spacing,
      }}
    >
      {label && (
        <label
          className={`${
            direction == "vertical"
              ? "w-full"
              : "w-[160px] min-w-[160px] mr-[12px] h-[70px] flex items-center"
          } break-all`}
        >
          {label}
          {required && <span className="ml-[0.5px] text-red-500">*</span>}
        </label>
      )}

      <UploadFieldCustom
        data={rest.value ?? []}
        className="w-full"
        controlFileInput={[
          "DOCX",
          "PDF",
          "JPG",
          "PNG",
          "XLSX",
          "TXT",
          "PPTX",
          "DOC",
          "XLS",
          "XLSM",
          "JPEG",
          "GIF",
          "SVG",
          "XML",
        ]}
        onValueChanged={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e,
            },
          });
        }}
      />
    </div>
  );
};
