import {Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import AddPost from "./AddPost";

export default function Posts({thread, _useDispatch = useDispatch, _useSelector = useSelector,
                                   _AddPost = AddPost}) {
    //const dispatch = _useDispatch()
    //const editID = _useSelector(state => state.threadToEdit?.id)
    //const loggedInUser = _useSelector(state => state.loggedInUser)
    const postToAdd = _useSelector(state => state.postToAdd)
    const postToThreadId = _useSelector(state => state.postToThreadId)
    const { id, posts=[] } = thread

    return <>
        <div style={{marginLeft: 20}}>
            {(postToAdd && postToThreadId === id) ? <_AddPost threadId={id} /> : null}
            {posts.map(post => <div key={post.id}>
                <Card>
                    <Card.Body>
                        {post.message}
                        <div>
                            <sub>{post.user} </sub><sub> {post.date.toLocaleString()}</sub>
                        </div>
                    </Card.Body>
                </Card>
            </div>)}
        </div>
    </>
}