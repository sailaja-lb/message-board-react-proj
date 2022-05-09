import {render, screen} from "@testing-library/react";
import EditThread from "./EditThread";
import {APPLY_EDIT_THREAD, CANCEL_EDIT_THREAD, EDIT_THREAD} from "../modules/files";

test('should supply thread, onThreadChange, onCancel, and onApply to ThreadInput', () => {
    const threadToEdit = 'some thread'
    let _onThreadChange
    let _onCancel
    let _onApply
    const _ThreadInput = ({thread, onThreadChange, onCancel, onApply}) => {
        _onThreadChange=onThreadChange
        _onCancel = onCancel
        _onApply = onApply
        return <>{thread}</>
    }
    const dispatch = jest.fn()

    render(<EditThread _useSelector={fn => fn({threadToEdit})} _useDispatch={() => dispatch}
                     _ThreadInput={_ThreadInput}/>)
    expect(screen.getByText(threadToEdit)).toBeInTheDocument()
    _onThreadChange('change')
    expect(dispatch).toHaveBeenLastCalledWith({type: EDIT_THREAD, thread: 'change'})
    _onCancel()
    expect(dispatch).toHaveBeenLastCalledWith({type: CANCEL_EDIT_THREAD})
    _onApply()
    expect(dispatch).toHaveBeenLastCalledWith({type: APPLY_EDIT_THREAD})
})