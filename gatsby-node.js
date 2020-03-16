/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it
const createPages = require(`./create/createPages`)
const createPosts = require(`./create/createPosts`)
const createCategories = require(`./create/createCategories`)
const createTags = require(`./create/createTags`)

exports.createPages = async ({ actions, graphql }) => {
    await createPages({ actions, graphql })
    await createPosts({ actions, graphql })
    await createCategories({ actions, graphql })
    await createTags({ actions, graphql })
}
