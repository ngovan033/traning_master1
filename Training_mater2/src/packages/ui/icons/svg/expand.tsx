import { useState } from "react";

const expandOut = (
  <svg
    fill="#000000"
    width="16px"
    height="16px"
    viewBox="0 0 36 36"
    version="1.1"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>resize-line</title>
    <path
      className="clr-i-outline clr-i-outline-path-1"
      d="M19,4a1,1,0,0,0,0,2h9.59l-9.25,9.25a1,1,0,1,0,1.41,1.41L30,7.41V17a1,1,0,0,0,2,0V4Z"
    ></path>
    <path
      className="clr-i-outline clr-i-outline-path-2"
      d="M4,19a1,1,0,0,1,2,0v9.59l9.25-9.25a1,1,0,1,1,1.41,1.41L7.41,30H17a1,1,0,0,1,0,2H4Z"
    ></path>
    <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
  </svg>
);

const expandIn = (
  <svg
    fill="#000000"
    width="16px"
    height="16px"
    viewBox="0 0 36 36"
    version="1.1"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      className="clr-i-outline clr-i-outline-path-1"
      d="M32,15H22.41l9.25-9.25a1,1,0,0,0-1.41-1.41L21,13.59V4a1,1,0,0,0-2,0V17H32a1,1,0,0,0,0-2Z"
    ></path>
    <path
      className="clr-i-outline clr-i-outline-path-2"
      d="M4,19a1,1,0,0,0,0,2h9.59L4.33,30.25a1,1,0,1,0,1.41,1.41L15,22.41V32a1,1,0,0,0,2,0V19Z"
    ></path>
    <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
  </svg>
);

const ExpandIcon = ({ onExpand }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand(!isExpanded);
  };

  return (
    <div
      onClick={handleExpand}
      className="h-[24px] w-[24px] flex justify-center items-center hover:bg-[#EAF9F2] hover:shadow-md rounded-[5px]"
    >
      {isExpanded ? expandIn : expandOut}
    </div>
  );
};

export default ExpandIcon;
