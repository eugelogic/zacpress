import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ArchivePosts from '../components/archivePosts'

const UserTemplate = props => {
    const {
        data: {
            wpgql: { user },
        },
    } = props
    const { name, description, posts } = user
    return (
        <Layout>
            <h1>User: {name}</h1>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
            <ArchivePosts posts={posts} />
        </Layout>
    )
}

export default UserTemplate

export const pageQuery = graphql`
    query GET_USER($id: ID!) {
        wpgql {
            user(id: $id) {
                id
                name
                description
                posts {
                    nodes {
                        postId
                        title(format: RENDERED)
                        slug
                    }
                }
            }
        }
    }
`