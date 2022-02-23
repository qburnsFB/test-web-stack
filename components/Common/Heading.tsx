import { forwardRef } from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme, useTheme } from "@emotion/react";

type HeadingProps = {
  size?: string;
  as?: any;
  css?: Interpolation<Theme>;
  children: JSX.Element | string;
};

export const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  (
    { size = "largest", as = "h2", children, ...rest }: HeadingProps,
    ref
  ): JSX.Element => {
    const theme = useTheme();
    const h1SizeStyle = {
      fontFamily: theme.fonts.body,
      fontSize: theme.headerSizes.larger,
    };
    const h2SizeStyle = {
      fontFamily: theme.fonts.body,
      fontSize: theme.headerSizes.large,
    };

    const StyledHeader = styled("div")<HeadingProps>`
      ${() => size === "h1" && h1SizeStyle}
      ${() => size === "h2" && h2SizeStyle}
    `;
    return (
      <StyledHeader size={size} as={as} ref={ref} {...rest}>
        {children}
      </StyledHeader>
    );
  }
);

Heading.displayName = "Heading";
