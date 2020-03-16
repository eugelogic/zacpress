import React from 'react'
import { graphql } from 'gatsby'

const Page = props => {
    const {
        data: {
            wpgql: { page },
        },
    } = props
    const { title , content } = page
    return (
        <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    )
}

export default Page

export const pageQuery = graphql`
    query GET_PAGE($id: ID!) {
        wpgql {
            page(id: $id) {
                title
                content
                uri
            }
        }
    }
`