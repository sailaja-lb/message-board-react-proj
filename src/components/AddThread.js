import ThreadInput from "./ThreadInput";
import {APPLY_ADD_THREAD, CANCEL_ADD_THREAD} from "../modules/files";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export default function AddThread({_useDispatch = useDispatch, _useSelector = useSelector, _ThreadInput = ThreadInput}) {
    const dispatch = _useDispatch()
    const loggedInUser = _useSelector((state) => state.loggedInUser)
    const [thread, setThread] = useState({
        title: '',
        date: new Date(),
        user: loggedInUser
    })

    function handleAdd() {
        dispatch({type: APPLY_ADD_THREAD, thread})
    }

    function handleCancel() {
        dispatch({type: CANCEL_ADD_THREAD})
    }

    return <_ThreadInput thread={thread} onThreadChange={setThread} onApply={handleAdd}
                         onCancel={handleCancel} />
}