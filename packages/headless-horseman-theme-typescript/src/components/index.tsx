import { Global, css, connect, styled, Head, useConnect } from "frontity";
import Switch from "@frontity/components/switch";
import { isArchive, isPostType, isError } from "@frontity/source";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import { Packages } from "../../types";
import globalStyles from "./../styles/index";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @returns The top-level react component representing the theme.
 */
const Theme = () => {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Guttenberg default styles. */}
      {/* @todo get it via rest api */}
      <link rel="stylesheet" href={"https://headless-horseman.whaledev.com/wp-includes/css/dist/block-library/style.css"} />

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <List when={isArchive(data)} data={isArchive(data) && data} />
          <Post when={isPostType(data)} data={isPostType(data) && data} />
          <PageError when={isError(data)} data={isError(data) && data} />
        </Switch>
      </Main>
    </>
  );
};

export default connect(Theme);

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1f38c5;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
`;
