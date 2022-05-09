import PostInput from "./PostInput";
import {APPLY_ADD_POST, CANCEL_ADD_POST} from "../modules/files";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export default function AddPost({threadId, _useDispatch = useDispatch, _useSelector = useSelector,
                                    _PostInput = PostInput}) {
    const dispatch = _useDispatch()
    const loggedInUser = _useSelector((state) => state.loggedInUser)
    const [post, setPost] = useState({
        message: '',
        date: new Date(),
        user: loggedInUser
    })

    function handleAdd() {
        dispatch({type: APPLY_ADD_POST, post, threadId})
    }

    function handleCancel() {
        dispatch({type: CANCEL_ADD_POST})
    }

    return <_PostInput post={post} onPostChange={setPost}
                       onApply={handleAdd} onCancel={handleCancel}/>
}