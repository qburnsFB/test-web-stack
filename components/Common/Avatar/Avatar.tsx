import { forwardRef } from "react";
import styled from "@emotion/styled";

type AvatarProps = {
  src: string;
  alt: string;
  width: string;
  height: string;
  as?: keyof JSX.IntrinsicElements;
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, as, width = "168px", height = "168px", ...rest }: AvatarProps, ref): JSX.Element => {
    const StyledAvatar = styled.div`
      border-radius: 50%;
      height: ${height};
      width: ${width};
      background: transparent;
      overflow: hidden;
      display: block;
    `;

    const StyledImg = styled.img`
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: 50%;
    `;

    return (
      <StyledAvatar as={as} ref={ref} {...rest}>
        <StyledImg src={src} />
      </StyledAvatar>
    );
  }
);

Avatar.displayName = "Avatar";
