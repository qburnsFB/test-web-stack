import { ButtonHTMLAttributes, forwardRef } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Loader } from "@components/Common";
import { css, useTheme } from "@emotion/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  onClick?: any | undefined;
  disabled?: boolean;
  loading?: boolean;
  children: JSX.Element | string;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, disabled, loading, onClick, children, ...rest }: ButtonProps,
    ref
  ): JSX.Element => {
    const theme = useTheme();

    const buttonVariants = {
      initial: { scale: 1, transition: { duration: 0.25 } },
      hover: { scale: 1.05, transition: { duration: 0.25 } },
      tap: { scale: 0.9, transition: { duration: 0.15 } },
    };

    const loadingStyle = css`
      cursor: default;
      pointer-events: none;
    `;

    const primaryStyle = () => css`
      background: #fff;
    `;

    const secondaryStyle = () => css`
      background: transparent;
    `;

    const StyledButton = styled("button")`
      font-weight: 600;
      display: inline-block;
      min-width: 280px;
      height: 90px;
      border-radius: 0.5rem;
      color: #000;
      font-size: ${theme.fontSizes.large};
      padding: 0.65rem 1.5rem;
      outline: none;
      position: relative;
      cursor: pointer;
      pointer-events: all;
      border: 4px solid rgba(0, 0, 0, 0.1);
      &[disabled],
      &[aria-disabled="true"] {
        border: 4px solid rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.5);
        cursor: auto;
        pointer-events: none;
      }

      &:hover {
        border: 4px solid rgba(0, 0, 0, 0.4);
      }

      &:focus {
        border: 4px solid rgba(0, 0, 0, 0.5);
      }

      ${() => loading && loadingStyle}
      ${() => (!variant || variant === "primary") && primaryStyle}
      ${() => variant === "secondary" && secondaryStyle}
    `;

    return (
      <motion.div
        css={{
          display: "inline-block",
          position: "relative",
          zIndex: theme.zIndex.high,
          "&:focus": { outline: 0 },
        }}
        variants={!disabled ? buttonVariants : undefined}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <StyledButton
          className="Button"
          disabled={disabled}
          onClick={onClick}
          ref={ref}
          {...rest}
        >
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            children
          )}
        </StyledButton>
      </motion.div>
    );
  }
);

Button.displayName = "Button";
