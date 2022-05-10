import {render, screen} from "@testing-library/react";
import Thread from "./Thread";
import {ADD_POST, DELETE_THREAD, EDIT_THREAD} from "../modules/files";

test('should show date, title, username in thread', () => {
    const date = new Date()
    const title = 'title'
    const user = 'someuser'
    const threadId = 0
    const state = {loggedInUser: user, postToThreadId: threadId}
    render(<Thread thread={{id: threadId, date, title, user}} _useDispatch={() => {}}
                 _useSelector={fn => fn(state)} _Posts={() => {}} _EditThread={() => {}}/>)
    expect(screen.getByText(date.toLocaleString())).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(user)).toBeInTheDocument()

})

it('should show an edit button', () => {
    const user = 'someuser'
    const threadId = 0
    const thread ={
        id: threadId,
        title: 'title',
        user,
        date: new Date(),
        posts: []
    }
    const state = {loggedInUser: user, postToThreadId: threadId}
    const dispatch = jest.fn()
    render(<Thread thread={thread} _useDispatch={() => dispatch} _useSelector={fn => fn(state)} _Posts={() => {}} _EditThread={() => {}}/>)
    expect(screen.getByTitle('Edit')).toBeInTheDocument()
})

it('should dispatch EDIT_THREAD w/ its thread when the edit button is clicked', () => {
    const thread = {
        id: 0,
        date: new Date(),
        title: ''
    }

    const dispatch = jest.fn()
    render(<Thread thread={thread} _useDispatch={() => dispatch} _useSelector={fn => fn({})} _Posts={() => {}} _EditThread={() => {}}/>)
    screen.getByTitle('Edit').click()
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_THREAD, thread})
})
it('should show _EditThread when threadToEdits id matches its own thread', () => {
    const mock = jest.fn()
    const thread = {id: 5}
    const state = {
        threadToEdit: thread
    }
    render(<Thread thread={thread} _useSelector={fn => fn(state)} _useDispatch={() => {}} _Posts={() => {}}
                   _EditThread={mock}/>)
    expect(mock).toHaveBeenCalled()
})

it('should show an delete button', () => {
    const user = 'someuser'
    const threadId = 0
    const thread ={
        id: threadId,
        title: 'title',
        user,
        date: new Date(),
        posts: []
    }
    const state = {loggedInUser: user, postToThreadId: threadId}
    const dispatch = jest.fn()
    render(<Thread thread={thread} _useDispatch={() => dispatch} _useSelector={fn => fn(state)} _Posts={() => {}} _EditThread={() => {}}/>)
    expect(screen.getByTitle('Delete')).toBeInTheDocument()
})

it('should dispatch DELETE_THREAD w/ the its threads id when the delete button is clicked', () => {
    const thread = {
        id: 0,
        date: new Date(),
        username: ''
    }
    const dispatch = jest.fn()
    render(<Thread thread={thread} _useDispatch={() => dispatch} _useSelector={fn => fn({})} _Posts={() => {}} _EditThread={() => {}}/>)
    screen.getByTitle('Delete').click()
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_THREAD, id: thread.id})
})


it('should show an ADD POST button', () => {
    const user = 'someuser'
    const threadId = 0
    const thread = {
        id: threadId,
        title: 'title',
        user,
        date: new Date(),
        posts: []
    }
    const state = {loggedInUser: user, postToThreadId: threadId}
    const dispatch = jest.fn()
    render(<Thread thread={thread} _useDispatch={() => dispatch} _useSelector={fn => fn(state)} _Posts={() => {}} _EditThread={() => {}}/>)
    expect(screen.getByTitle('Post')).toBeInTheDocument()
})
it('should dispatch ADD_POST when button clicked', () => {
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
        posts: []
    }
    const state = {loggedInUser: user, postToThreadId: threadId, postToAdd: postId}
    render(<Thread thread={thread} _useDispatch={() => dispatch} _useSelector={fn => fn({state})} _Posts={() => {}} _EditThread={() => {}}/>)
    screen.getByText('Add Post').click()
    expect(dispatch).toHaveBeenCalledWith({type: ADD_POST, thread})
})
