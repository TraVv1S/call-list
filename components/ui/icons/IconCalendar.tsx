type IconCalendarProps = {
  className?: string;
  size?: number;
  color?: string;
};

export const IconCalendar = ({
  className = "",
  size = 18,
  color = "currentColor",
}: IconCalendarProps) => (
  <svg
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <path
      d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
      fill={color}
    />
  </svg>
);
