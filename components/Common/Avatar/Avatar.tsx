import { forwardRef } from "react";
import { Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";

type AvatarProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  css?: Interpolation<Theme>;
  as?: keyof JSX.IntrinsicElements;
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, alt, as, width = "168px", height = "168px", ...rest }: AvatarProps,
    ref
  ): JSX.Element => {
    const StyledAvatar = styled.div`
      border-radius: 50%;
      overflow: hidden;
      width: ${width};
      height: ${height};
      display: inline-block;
      background: #ccc;
    `;

    const StyledImg = styled.img`
      border-radius: 50%;
      width:100%;
      height:100%;
      display:block;
    `;

    return (
        <div css={{
          height: height,
          width: width,
        }}>
      <StyledAvatar className="Avatar" as={as} ref={ref} {...rest}>
        <StyledImg src={src} alt={alt} />
      </StyledAvatar></div>
    );
  }
);

Avatar.displayName = "Avatar";
