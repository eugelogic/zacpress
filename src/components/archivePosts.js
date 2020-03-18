import React from "react"
import { Link } from "gatsby"

const ArchivePosts = ({ posts, title = true }) => (
    <>
        {title && <h2>Posts</h2>}
        {posts.nodes.map(post => (
            <h3 key={post.id}>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
        ))}
    </>
)

export default ArchivePosts