import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import { DropDownButton } from "devextreme-react";
import { Item } from "devextreme-react/drop-down-button";
import { useMemo } from "react";
import ButtonCommon from "../../button/ButtonCommon";
import BreadcrumbIcon from "../../icons/svg/breadcrumb";
import { ToggleSidebarButton } from "../../toggle-sidebar-button";

interface IListButton {
  icon?: JSX.Element;
  text: string;
  onClick: () => void;
  visible?: boolean;
  type?: "primary" | "secondary";
}

interface IBreadcrumbDetail {
  handleNavigateHome?: () => void;
  mainTitle: string;
  detailTitle?: string;
  listButton?: IListButton[];
}

const BreadcrumbDetail = ({
  handleNavigateHome,
  mainTitle,
  detailTitle,
  listButton = [],
}: IBreadcrumbDetail) => {
  const style = useStylingCommon();

  const willShowButtonMore = listButton.length > 6;

  const renderNormalButton = useMemo(() => {
    return listButton?.map((item, index) => {
      return (
        <div key={index} className={`${item.visible && "ml-[6px]"} `}>
          <ButtonCommon
            text={item.text}
            onClick={item.onClick}
            icon={item.icon}
            visible={item.visible}
            type={item.type}
          />
        </div>
      );
    });
  }, [listButton]);

  const renderMoreButton = useMemo(() => {
    const listButtonMore = listButton.slice(6);
    const listNormalButton = listButton.slice(0, 6);

    return (
      <div className="flex items-center">
        {listNormalButton?.map((item, index) => {
          return (
            <div key={index} className={`${item.visible && "ml-[6px]"} `}>
              <ButtonCommon
                text={item.text}
                onClick={item.onClick}
                icon={item.icon}
                visible={item.visible}
                type={item.type}
              />
            </div>
          );
        })}
        <DropDownButton
          style={{
            marginLeft: "6px",
          }}
          showArrowIcon={false}
          keyExpr={"id"}
          displayExpr={"text"}
          wrapItemText={false}
          dropDownOptions={{
            width: 200,
            wrapperAttr: {
              class: "headerform__menuitems",
            },
          }}
          icon="/images/icons/more.svg"
        >
          {listButtonMore?.map((moreButton, index) => {
            return (
              <Item
                key={index}
                render={(c: any) => {
                  return (
                    <ButtonCommon
                      text={moreButton.text}
                      onClick={moreButton.onClick}
                      icon={moreButton.icon}
                      visible={moreButton.visible}
                      type={moreButton.type}
                    />
                  );
                }}
              />
            );
          })}
        </DropDownButton>
      </div>
    );
  }, [listButton]);

  return (
    <div className="w-full flex flex-col header-sticky z-[9999]">
      <div className={style.HEADER_SEARCH.HEADER_SEARCH_CONTAINER}>
        <div className="flex items-center">
          <ToggleSidebarButton />
          <p
            className={`cursor-pointer hover:underline ${
              detailTitle
                ? "text-[#5F7D95] text-[14px] font-[400]"
                : "text-[#0E223D] text-[14px] font-[600] "
            } `}
            onClick={handleNavigateHome}
          >
            {mainTitle}
          </p>

          {detailTitle && (
            <>
              <div className="mx-[17px]">
                <BreadcrumbIcon />
              </div>
              <p className="text-[#0E223D] text-[14px] font-[600] ">
                {detailTitle}
              </p>
            </>
          )}
        </div>

        <div className="flex items-center">
          {willShowButtonMore ? renderMoreButton : renderNormalButton}
        </div>
      </div>

      <div className="separator"></div>
    </div>
  );
};

export default BreadcrumbDetail;
