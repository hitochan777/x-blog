import { Client } from '@notionhq/client'
import { BlocksChildrenListResponse } from '@notionhq/client/build/src/api-endpoints'

export default class NotionClientWrapper {
  private _notion: Client
  constructor(private _databaseId: string) {
    this._notion = new Client({ auth: process.env.NOTION_TOKEN })
  }

  public async getBlogPosts() {
    const res = await this._notion.databases.query({
      database_id: this._databaseId,
    })
    return res.results.map((result) => this._transformRawPost(result))
  }

  public async getBlogPost(pageId: string) {
    const pageRes = await this._notion.pages.retrieve({ page_id: pageId })
    const post: Partial<
      ReturnType<NotionClientWrapper['_transformRawPost']> & {
        blocks: BlocksChildrenListResponse['results']
      }
    > = this._transformRawPost(pageRes)
    const res = await this._notion.blocks.children.list({ block_id: pageId })
    post.blocks = res.results
    return post
  }

  public async getSlugToPageInfoTable() {
    const posts = await this.getBlogPosts()
    return new Map(posts.map((post) => [post.slug, post]))
  }

  private _transformRawPost(rawPost) {
    return {
      id: rawPost.id,
      title: rawPost.properties.title.title[0]?.plain_text || '',
      slug: rawPost.properties.slug.rich_text[0]?.plain_text || rawPost.id,
      tags: rawPost.properties.tags.multi_select.map((choice) => choice.name),
      published: rawPost.properties.published.checkbox,
      createdAt: rawPost.created_time,
      updatedAt: rawPost.last_edited_time,
    }
  }
}

export const getDateStr = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
}
