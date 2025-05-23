interface ICollapseLeftIcon {
  reverse?: boolean;
}

const CollapseLeftIcon = ({ reverse = false }: ICollapseLeftIcon) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="CollapseLeftIcon"
      className={reverse ? "transform rotate-180" : ""}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4444 13.2222C12.4444 13.6518 12.7927 14 13.2222 14C13.6518 14 14 13.6518 14 13.2222L14 0.777776C14 0.348222 13.6518 0 13.2222 0C12.7927 0 12.4444 0.348223 12.4444 0.777777L12.4444 13.2222ZM5.72344 3.0875L4.64062 2L0 6.5L4.64062 11L5.72344 9.9125L2.97773 7.25H11.375V5.75H2.97773L5.72344 3.0875Z"
        fill="#5F7D95"
      />
    </svg>
  );
};

export default CollapseLeftIcon;
