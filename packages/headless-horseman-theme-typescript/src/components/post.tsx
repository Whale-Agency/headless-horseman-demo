import { useEffect } from "react";
import { connect, useConnect, styled } from "frontity";
import Link from "./link";
import List from "./list";
import {
  isAttachmentEntity,
  isPageEntity,
  isPostEntity,
} from "@frontity/source";
import { Packages } from "../../types";
import FeaturedMedia from "./featured-media";
import { PostTypeEntity, PostTypeData } from "@frontity/source/types";
import Container from "./container/container";

/**
 * Properties received by the `Post` component.
 */
interface PostProps {
  /**
   * Data element representing a URL in your frontity site.
   */
  data: PostTypeData;

  /**
   * Whether to render this component.
   */
  when?: boolean;
}

/**
 * The Post component that Mars uses to render any kind of "post type", like
 * posts, pages, attachments, etc.
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const Post = ({ data }: PostProps): JSX.Element => {
  const { state, actions, libraries } = useConnect<Packages>();
  // Get the data of the post.
  const post: PostTypeEntity = state.source[data.type][data.id];
  // Get the data of the author.
  const author = state.source.author[post.author];

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, [actions.source]);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Wrapper>
      <Container>
        <div>
          <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

          {/* Only display author and date on posts */}
          {isPostEntity(post) && (
            <div>
              {author && (
                <StyledLink link={author.link}>
                  <Author>
                    By <b>{author.name}</b>
                  </Author>
                </StyledLink>
              )}
              <DateWrapper>
                {" "}
                on <b>{new Date(post.date).toDateString()}</b>
              </DateWrapper>
            </div>
          )}
        </div>

        {/* Look at the settings to see if we should include the featured image */}
        {state.theme.featured.showOnPost &&
          (isPostEntity(post) || isPageEntity(post)) && (
            <FeaturedMedia id={post.featured_media} />
          )}

        {isAttachmentEntity(post) && (
          // If the post is an attachment, just render the description property,
          // which already contains the thumbnail.
          <div dangerouslySetInnerHTML={{ __html: post.description?.rendered }} />
        )}
      </Container>

      {(isPostEntity(post) || isPageEntity(post)) && (
        // Render the content using the Html2React component so the HTML is
        // processed by the processors we included in the
        // libraries.html2react.processors array.
        //
        // Make sure NOT to wrap it with a fixed-width container. 
        // Full width sections must be set inside the editor.
        <Content>
          <Html2React html={post.content?.rendered} />
        </Content>
      )}
    </Wrapper>

  ) : null;
};

export default connect(Post);

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 54px;
  margin-bottom: 54px;
  color: rgba(12, 17, 43);
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  width: 100%;

  //Make all direct children have fixed width
  > * {
    max-width: var(--container-width);
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 15px;
    padding-right: 15px;
  }

  //Make the direct children that have .is-full class be full width.
  .is-full {
    max-width: 100%;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    width: 100%;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  /* WordPress Core Align Classes */
  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;