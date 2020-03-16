const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
    // Set up our query
    const GET_POSTS = graphql`
        query GET_POSTS($first:Int $after:String) {
            wpgraphql {
                posts(
                    first: $first
                    after: $after
                ) {
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                    nodes {
                        id
                        uri
                        postId
                        title
                    }
                }
            }
        }
    `

    const { createPage } = actions
    const allPosts = []
    // Create a function for getting pages
    const fetchPages = async variables =>
        await graphql(GET_POSTS, variables).then(({ data }) => {
            const {
                wpgraphql: {
                    posts: {
                        nodes,
                        pageInfo: { hasNextPage, endCursor },
                    },
                },
            } = data
            nodes.map(post => {
                allPosts.push(post)
            })
            if (hasNextPage) {
                return fetchPages({ first: variables.first, after: endCursor })
            }
            return allPosts
        })

    // Map over all the posts and call createPage
    await fetchPages({ first: 100, after: null }).then(allPosts => {
        const postTemplate = path.resolve(`./src/templates/post.js`)

        allPosts.map(post => {
            console.log(`create post: ${post.uri}`)
            createPage({
                path: `/blog/${post.uri}`,
                component: postTemplate,
                context: post,
            })
        })
    })

}