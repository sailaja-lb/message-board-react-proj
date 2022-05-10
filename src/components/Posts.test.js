import {render, screen} from "@testing-library/react";
import {ADD_POST, DELETE_THREAD, EDIT_THREAD} from "../modules/files";
import Posts from "./Posts";

it('should show post, user, date', () => {
    const dispatch = jest.fn()
    const user = 'someuser'
    const threadId = 0
    const postId = 0
    const now = new Date()
    now.setTime(0)
    const thread = {
        id: threadId,
        title: 'title',
        user,
        date: now,
        posts: [{id: 1, message: 'new post', user: 'someuser', date: new Date()}]
    }
    const state = {loggedInUser: user, postToThreadId: threadId, postToAdd: postId}
    render(<Posts thread={thread} _useDispatch={() => dispatch} _useSelector={fn => fn({state})} _AddPost = {() => {}}/>)
    expect(screen.getByText('new post')).toBeInTheDocument()
    expect(screen.getByText('someuser')).toBeInTheDocument()

})