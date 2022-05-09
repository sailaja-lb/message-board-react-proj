import {useDispatch, useSelector} from "react-redux";
import {APPLY_EDIT_THREAD, CANCEL_EDIT_THREAD, EDIT_THREAD} from "../modules/files";
import ThreadInput from "./ThreadInput";

export default function EditThread({_useSelector = useSelector, _useDispatch = useDispatch,
                                     _ThreadInput = ThreadInput}) {
    const dispatch = _useDispatch()
    const thread = _useSelector(state => state.threadToEdit)

    function setThread(change) {
        dispatch({type: EDIT_THREAD, thread: change})
    }

    function handleApply() {
        dispatch({type: APPLY_EDIT_THREAD})
    }

    function handleCancel() {
        dispatch({type: CANCEL_EDIT_THREAD})
    }

    return <_ThreadInput thread={thread} onThreadChange={setThread} onApply={handleApply}
                         onCancel={handleCancel} />
}