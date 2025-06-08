type IconArrowProps = {
  className?: string;
  size?: number;
  color?: string;
  direction?: "up" | "down" | "left" | "right";
};

export const IconArrow = ({
  className = "",
  size = 10,
  color = "currentColor",
  direction = "down",
}: IconArrowProps) => (
  <svg
    viewBox="0 0 7 10"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
    style={{
      transform:
        direction === "up"
          ? "rotate(90deg)"
          : direction === "left"
          ? "rotate(0deg)"
          : direction === "right"
          ? "rotate(180deg)"
          : "rotate(-90deg)",
      transition: "transform 0.2s",
    }}
  >
    <path d="M 4 0 L 0 4 L 0 5 L 4 9 L 5 9 L 5 8 L 2 5 L 2 4 L 5 1 L 5 0 Z" />
  </svg>
);
