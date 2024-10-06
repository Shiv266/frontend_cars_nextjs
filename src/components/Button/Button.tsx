import React, { ComponentProps, FC } from "react";

type Variant = "filled" | "outlined" | "text";

interface ButtonProps extends ComponentProps<"button"> {
  label: string;
  variant?: Variant;
}

const variantClass = {
  filled: "button-filled",
  outlined: "button-outlined",
  text: "button-text",
} as const;

const Button: FC<ButtonProps> = ({
  label,
  variant = "filled",
  className,
  ...rest
}) => {
  return (
    <button {...rest} className={`${variantClass[variant]} ${className ?? ""}`}>
      {label}
    </button>
  );
};

export default Button;
