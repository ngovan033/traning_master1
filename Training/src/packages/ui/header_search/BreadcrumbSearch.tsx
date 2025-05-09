import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import ButtonCommon from "../button/ButtonCommon";
import CreateIcon from "../icons/svg/create";
import SearchIcon from "../icons/svg/search";
import { useState } from "react";

interface IListButton {
  icon?: JSX.Element;
  text: string;
  onClick: () => void;
  visible?: boolean;
}

interface IButtonOptions {
  showButtonAdd?: boolean;
  onClickButtonAdd?: () => void;
  listButton?: IListButton[];
  permissionBtnAddCode?: string;
}

interface IBreadcrumbSearchProps {
  /**
   * Nội dung breadcrumb
   */
  title?: string;
  /**
   * Xử lý khi người dùng nhập từ khóa tìm kiếm và nhấn enter
   */
  handleSearch?: (keyword: string) => void;
  /**
   * Hiển thị ô tìm kiếm
   */
  showSearch?: boolean;

  /**
   * Cấu hình cho button
   */
  buttonOptions?: IButtonOptions;
}

const BreadcrumbSearch = ({
  title,
  
  handleSearch,
  showSearch = true,
  buttonOptions = {
    showButtonAdd: false,
  },
}: IBreadcrumbSearchProps) => {
  const style = useStylingCommon();
  const [isLoading, setIsLoading] = useState(false); 
  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (isLoading) return; // Chặn spam khi loading

      const currentKeyword = event.currentTarget.value;

      setIsLoading(true); // Bắt đầu loading
      try {
        await handleSearch?.(currentKeyword);
      } finally {
        setIsLoading(false); // Kết thúc loading
      }
    }
  };
  return (
    <div className={style.HEADER_SEARCH.HEADER_SEARCH_CONTAINER}>
      <div className={style.HEADER_SEARCH.HEADER_SEARCH_TITLE}>{title}</div>

      {showSearch && (
        <div className={style.HEADER_SEARCH.HEADER_SEARCH_BOX}>
          <SearchIcon></SearchIcon>

          <input
            type="text"
            className={style.HEADER_SEARCH.HEADER_SEARCH_INPUT}
            placeholder="Tìm kiếm"
            onKeyDown={handleKeyDown}
          />
        </div>
      )}

      <div className="flex items-center gap-[8px]">
        {buttonOptions.showButtonAdd ? (
          <div>
            <ButtonCommon
              permissionCode={buttonOptions.permissionBtnAddCode}
              text="Thêm mới"
              onClick={buttonOptions.onClickButtonAdd}
              icon={<CreateIcon />}
            />
          </div>
        ) : (
          <></>
        )}
        {buttonOptions.listButton?.map((item, index) => {
          return (
            <div key={index}>
              <ButtonCommon
                text={item.text}
                onClick={item.onClick}
                icon={item.icon}
                visible={item.visible}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BreadcrumbSearch;
