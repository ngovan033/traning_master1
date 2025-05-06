import { ReactNode, useState } from "react";
import ExpandIcon from "../../icons/svg/expand";

interface ICollapseHeader {
  headerRender?: JSX.Element;
  render: JSX.Element;
  title: string | JSX.Element | ReactNode;
  className?: string;
  showExpand?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  spacing?: string;
  spacingTitle?: string;
  showCollapse?: boolean;
}

const CollapseHeader = ({
  render,
  title,
  headerRender,
  className,
  showExpand = false,
  onExpand,
  spacing = "16px",
  spacingTitle = "200px",
  showCollapse = true,
}: ICollapseHeader) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollaspe = () => {
    if (showCollapse) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={`flex flex-col mb-[5px] ${className ? className : ""}`}>
      <div
        className={`flex items-center bg-[#E8F0F6] h-[30px] px-[14px] mx-[${spacing}] cursor-pointer relative collapse-header`}
        style={{
          userSelect: "none",
        }}
      >
        <div
          className={`text-[#0E223D] font-[600] `}
          style={{
            minWidth: `${spacingTitle}`,
          }}
        >
          {title}
        </div>

        {headerRender ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex-grow h-[30px] flex items-center"
          >
            {headerRender}
          </div>
        ) : (
          <></>
        )}

        {showCollapse && (
          <div
            className={`cursor-pointer ${
              isCollapsed && "rotate-180"
            } absolute right-[14px]`}
            onClick={handleCollaspe}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15C6.01664 15 4.56659 14.5601 3.33322 13.736C2.09985 12.9119 1.13856 11.7406 0.570904 10.3701C0.00324631 8.99968 -0.14528 7.49168 0.14411 6.03682C0.433498 4.58196 1.14781 3.24559 2.1967 2.1967C3.24559 1.14781 4.58196 0.433498 6.03682 0.14411C7.49168 -0.14528 8.99968 0.00324631 10.3701 0.570904C11.7406 1.13856 12.9119 2.09985 13.736 3.33322C14.5601 4.56659 15 6.01664 15 7.5C14.9977 9.48841 14.2067 11.3947 12.8007 12.8007C11.3947 14.2067 9.48841 14.9977 7.5 15ZM7.5 0.882353C6.19115 0.882353 4.9117 1.27047 3.82343 1.99763C2.73517 2.72478 1.88697 3.75832 1.38609 4.96754C0.885218 6.17675 0.754166 7.50734 1.00951 8.79104C1.26485 10.0747 1.89512 11.2539 2.82062 12.1794C3.74611 13.1049 4.92526 13.7351 6.20896 13.9905C7.49266 14.2458 8.82325 14.1148 10.0325 13.6139C11.2417 13.113 12.2752 12.2648 13.0024 11.1766C13.7295 10.0883 14.1176 8.80885 14.1176 7.5C14.1155 5.74554 13.4177 4.06353 12.1771 2.82294C10.9365 1.58234 9.25446 0.884455 7.5 0.882353Z"
                fill="#191C19"
              />
              <path
                d="M7.82734 6.26206L11.3479 9.78265C11.391 9.81504 11.426 9.85701 11.4501 9.90525C11.4742 9.95349 11.4868 10.0067 11.4868 10.0606C11.4868 10.1145 11.4742 10.1677 11.4501 10.2159C11.426 10.2642 11.391 10.3061 11.3479 10.3385C11.3155 10.3816 11.2736 10.4166 11.2253 10.4407C11.1771 10.4648 11.1239 10.4774 11.07 10.4774C11.0161 10.4774 10.9629 10.4648 10.9146 10.4407C10.8664 10.4166 10.8244 10.3816 10.792 10.3385L7.54851 7.09588L4.30587 10.3385C4.12057 10.5238 3.93528 10.4312 3.74998 10.3385C3.56469 10.1532 3.65734 9.96794 3.74998 9.78265L7.27057 6.26206C7.36322 6.07677 7.64116 6.07677 7.82734 6.26206Z"
                fill="#191C19"
              />
              <path
                d="M7.82734 3.77294L11.3479 7.29353C11.391 7.32592 11.426 7.36789 11.4501 7.41613C11.4742 7.46437 11.4868 7.51755 11.4868 7.57147C11.4868 7.62539 11.4742 7.67857 11.4501 7.72681C11.426 7.77505 11.391 7.81702 11.3479 7.84941C11.3155 7.89252 11.2736 7.92751 11.2253 7.9516C11.1771 7.97569 11.1239 7.98824 11.07 7.98824C11.0161 7.98824 10.9629 7.97569 10.9146 7.9516C10.8664 7.92751 10.8244 7.89252 10.792 7.84941L7.54851 4.60676L4.30587 7.84941C4.12057 8.03471 3.93528 7.94206 3.74998 7.84941C3.56469 7.66412 3.65734 7.47882 3.74998 7.29353L7.27057 3.77294C7.36322 3.58765 7.64116 3.58765 7.82734 3.77294Z"
                fill="#191C19"
              />
            </svg>
          </div>
        )}

        {showExpand ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className=" absolute right-[40px]"
          >
            <ExpandIcon onExpand={onExpand}></ExpandIcon>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        style={{
          display: isCollapsed ? "none" : "block",
        }}
        className="w-full overflow-hidden"
      >
        {render}
      </div>
    </div>
  );
};

export default CollapseHeader;
