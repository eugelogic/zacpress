import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const CategoryTemplate = props => {
    const {
        data: {
            wpgql: { category },
        },
    } = props
    const { name } = category
    return (
        <Layout>
            <h1>Category: {name}</h1>
        </Layout>
    )
}

export default CategoryTemplate

export const pageQuery = graphql`
    query GET_CATEGORY($id: ID!) {
        wpgql {
            category(id: $id) {
                id
                name
                slug
            }
        }
    }
`