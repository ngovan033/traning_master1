import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { Button } from "devextreme-react";
import { Icon } from "../icons";

export default function PageNotData({ text }: any) {
  const { t } = useI18n("Common");

  const navigate = useNetworkNavigate();

  const handleBack = () => {
    navigate("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center gap-[10px]">
        <Icon name="WarningIcon" size={30} />
        <div className="text-[18px] font-normal text-[#5F7D95]">
          {text ? (
            text
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div>
                Không tìm thấy trang hoặc không có quyền truy cập trang này.
              </div>
              <div>Vui lòng kiểm tra lại!</div>
            </div>
          )}
        </div>

        <Button
          style={{
            background: "#00703c",
            color: "#fff",
            margin: 0,
            padding: "5px 15px",
          }}
          onClick={handleBack}
          // text={commonLocale.BUTTON_CONFIRM}
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
}
