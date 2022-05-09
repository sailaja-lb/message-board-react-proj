import Thread from "./Thread";
import {useSelector} from "react-redux";
import AddThread from "./AddThread";

export default function Threads({_useSelector = useSelector, _Thread = Thread, _AddThread = AddThread}) {
    const threads = _useSelector(state => state.threads)
    const threadToAdd = _useSelector(state => state.threadToAdd)

    return (
        <>
            {threadToAdd ? <div><_AddThread/><hr/></div> : null}
            {threads.map((thread, index) => <div>
                <_Thread thread={thread}/>
                <hr/>
            </div>)
            }
        </>
    )
}