import { forwardRef } from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme, useTheme } from "@emotion/react";

type HeadingProps = {
  size?: string;
  as?: keyof JSX.IntrinsicElements;
  css?: Interpolation<Theme>;
  className?: string;
  children: JSX.Element | string;
};

export const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  (
    { size = "largest", as = "h2", children, ...rest }: HeadingProps,
    ref
  ): JSX.Element => {
    const theme = useTheme();
    const h1SizeStyle = {
      fontWeight: 300,
      fontFamily: theme.fonts.body,
      fontSize: theme.headerSizes.larger,
    };
    const h2SizeStyle = {
      fontFamily: theme.fonts.body,
      fontSize: theme.headerSizes.large,
    };

    const StyledHeading = styled("div")<HeadingProps>`
      ${() => size === "larger" && h1SizeStyle}
      ${() => size === "large" && h2SizeStyle}
    `;
    return (
      <StyledHeading className="Heading" size={size} as={as} ref={ref} {...rest}>
        {children}
      </StyledHeading>
    );
  }
);

Heading.displayName = "Heading";
