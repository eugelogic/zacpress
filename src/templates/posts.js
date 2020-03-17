import React from 'react'
import { graphql } from 'gatsby'

const Posts = props => {
    const {
        data: {
            wpgql: { posts },
        },
        pageContext: { pageNumber, hasNextPage }
    } = props

    const currentPage = pageNumber ? `- Page ${pageNumber}` : ``
    return (
        <div>
            <h1>Blog Archive {currentPage}</h1>
            {posts.nodes.map(post =>
                <h2 key={post.id}>{post.title}</h2>
            )}
        </div>
    )
}

export default Posts

export const pageQuery = graphql`
    query GET_POSTS($ids: [ID]) {
        wpgql {
            posts( where: { in: $ids }) {
                nodes {
                    id
                    title
                }
            }
        }
    }
`