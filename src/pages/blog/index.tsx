import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import { getBlogPosts } from '../../lib/blog-helpers'

export async function getStaticProps({ preview }) {
  const posts = await getBlogPosts({ preview })
  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 60,
  }
}

const Index = ({ posts = [], preview }) => {
  console.log(posts)
  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map((post) => {
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <h3>
                <span className={blogStyles.titleContainer}>
                  {!post.Published && (
                    <span className={blogStyles.draftBadge}>Draft</span>
                  )}
                  <Link href="/blog/[slug]" as={post.blogLink}>
                    <a>{post.Page}</a>
                  </Link>
                </span>
              </h3>
              {post.dateStr && <div className="posted">{post.dateStr}</div>}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Index
