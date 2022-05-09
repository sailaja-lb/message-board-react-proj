import {render} from "@testing-library/react";
import AddThread from "./AddThread";
import {APPLY_ADD_THREAD, CANCEL_ADD_THREAD} from "../modules/files";
import {useSelector} from "react-redux";

test('should supply thread, onThreadChange, onCancel, and onApply to ThreadInput', () => {
    let _onThreadChange
    let _onCancel
    let _onApply
    let _thread
    const _ThreadInput = ({thread, onThreadChange, onCancel, onApply}) => {
        _thread = thread
        _onThreadChange = onThreadChange
        _onCancel = onCancel
        _onApply = onApply
        return <></>
    }
    const dispatch = jest.fn()

    const loggedInUser = 'some user';
    render(<AddThread _useDispatch={() => dispatch}
                    _ThreadInput={_ThreadInput} _useSelector={fn => fn({loggedInUser})}/>)
    _onApply()
    expect(dispatch).toHaveBeenLastCalledWith({type: APPLY_ADD_THREAD, thread: _thread})
    _onCancel()
    expect(dispatch).toHaveBeenLastCalledWith({type: CANCEL_ADD_THREAD})
})
