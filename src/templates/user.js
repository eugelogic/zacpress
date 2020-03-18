import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const UserTemplate = props => {
    const {
        data: {
            wpgql: { user },
        },
    } = props
    const { name , description } = user
    return (
        <Layout>
            <h1>User: {name}</h1>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
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
            }
        }
    }
`