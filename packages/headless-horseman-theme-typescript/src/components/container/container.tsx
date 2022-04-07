import { connect, styled } from "frontity";

export interface ContainerProps {
  // Weather the container is full width. Default is false
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({
  fullWidth = false,
  children,
  ...rest
}: ContainerProps) => {
  return (
    <StyledContainer
      fullWidth={fullWidth}
      {...rest}
      className="container"
    >
      {children}
    </StyledContainer>
  );
};
export default connect(Container);

const StyledContainer = styled.div<ContainerProps>`
  position: relative;
  max-width: ${(props) =>
    props.fullWidth
      ? "100%"
      : "var(--container-width)"};
  width: 100%;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
`;
