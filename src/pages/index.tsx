import Header from '../components/header'
import { getBlogPosts } from '../lib/blog-helpers'
import sharedStyles from '../styles/shared.module.css'
import blogStyles from '../styles/blog.module.css'
import Link from 'next/link'
import { textBlock } from '../lib/notion/renderers'

export async function getStaticProps({ preview }) {
	const posts = (await getBlogPosts({ preview: false })).slice(0, 10)

	return {
		props: {
			preview: preview || false,
			posts,
		},
		revalidate: 10,
	}
}

export default function Index({ posts = [] }) {
	return (
		<>
			<Header titlePre="Home" />
			<div className={sharedStyles.layout}>
				<h1>hitochan777</h1>
				<div className="explanation">
					Hi, my name is hitochan777 and I am a software developer who loves
					React, GraphQL, Python and of course learning new things.
				</div>
				<div className="posts">
					<h2>Latest Blog Posts</h2>
					{posts.map(post => {
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
								{post.Date && <div className="posted">{post.dateStr}</div>}
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
