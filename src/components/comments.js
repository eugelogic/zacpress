import React from 'react'

const Comment = ({
    comment: { commentId, content, date, author, children },
    isChild
}) => {
    let hasChildren = false
    if(children && children.nodes.length) {
        hasChildren = true
    }
    return (
        <div id={commentId} className="comment">
            <div dangerouslySetInnerHTML={{ __html: content}} />
            <p className="meta">
                From: {author.name} on {date}
            </p>
            {hasChildren && <ChildComments comments={children.nodes} />}
            {!isChild && (
                <p>
                    <button
                    onClick={event => {
                    event.preventDefault()
                    console.log(`Leave a Comment`)
                    }}>
                        Reply
                    </button>
                </p>
            )}
        </div>
    )
}

const ChildComments = ({ comments }) =>
    comments.map(comment => (
        <Comment key={comment.id} comment={comment} isChild />
    ))

const Comments = ({ post }) => {
    const comments = post.comments.nodes
    let header = `No Comments Yet!`
    if(comments.length === 1) {
        header = `Comment`
    } else if (comments.length > 1) {
        header = `Comments`
    }
    return (
        <section className="comments">
            <h2>{header}</h2>
            {comments.reverse().map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </section>
    )
}

export default Comments