import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Post = props => {
    const {
        data: {
            wpgql: { post },
        },
    } = props
    const { title , content, author, categories, tags } = post

    return (
        <Layout>
            <SEO title={title} />
            <h1>{title}</h1>
            <ul className="meta">
                <li>
                    Author: <Link to={`/user/${author.slug}`}>{author.name}</Link>
                </li>
                <li>
                    {` // `}
                    Categories:
                    <ul>
                        {categories.nodes.map(cat => (
                            <li>
                                <Link to={`/blog/category/${cat.slug}`}>{cat.name}</Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    {` // `}
                    Tags:
                    <ul>
                        {tags.nodes.map(cat => (
                            <li>
                                <Link to={`/blog/tag/${cat.slug}`}>{cat.name}</Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </Layout>
    )
}

export default Post

export const pageQuery = graphql`
    query GET_POST($id: ID!) {
        wpgql {
            post(id: $id) {
                title
                content
                uri
                author {
                    name
                    slug
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
                tags {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
    }
`