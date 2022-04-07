import { connect, styled, useConnect } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import Container from "./container/container";
import { Packages } from "../../types";

/**
 * The header of the site, showing the title and description, and the nav bar.
 *
 * @returns The header element.
 */
const Header = () => {
  const { state } = useConnect<Packages>();
  return (
    <>
      <Container>
        <Inner>
          <StyledLink link="/">
            <Title>{state.frontity.title}</Title>
          </StyledLink>
          <Description>{state.frontity.description}</Description>
          <MobileMenu />
        </Inner>
      </Container>
      <Container>
        <Nav />
      </Container>
    </>
  );
};

export default connect(Header);

const Inner = styled.header`
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 16px;
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
