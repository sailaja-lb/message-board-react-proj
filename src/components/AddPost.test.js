import {render} from "@testing-library/react";
import AddPost from "./AddPost";
import {APPLY_ADD_POST, CANCEL_ADD_POST} from "../modules/files";

it('should supply post, onPostChange, onCancel, and onApply to PostInput', () => {
    let _onPostChange
    let _onCancel
    let _onApply
    let _post
    const _PostInput = ({post, onPostChange, onCancel, onApply}) => {
        _post = post
        _onPostChange = onPostChange
        _onCancel = onCancel
        _onApply = onApply
        return <></>
    }
    const loggedInUser = 'some user';
    const dispatch = jest.fn()

    render(<AddPost _useDispatch={() => dispatch} _useSelector={fn => fn({loggedInUser})}
                      _PostInput={_PostInput}/>)
    _onCancel()
    expect(dispatch).toHaveBeenLastCalledWith({type: CANCEL_ADD_POST})
    _onApply()
    expect(dispatch).toHaveBeenLastCalledWith({type: APPLY_ADD_POST, post: _post})
})
