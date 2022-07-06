import reducer, {
    ADD_POST,
    ADD_THREAD, APPLY_ADD_POST,
    APPLY_ADD_THREAD,
    APPLY_EDIT_THREAD, CANCEL_ADD_POST,
    CANCEL_ADD_THREAD,
    CANCEL_EDIT_THREAD,
    CREATE_USER,
    DELETE_THREAD,
    EDIT_THREAD,
    LOGIN, LOGIN_ERROR,
    LOGOUT, POST_MESSAGE,
    REGISTER, USERS
} from "./files";

it('should initialed with isLoggedIn false', () => {
    const state = reducer()
    expect(state.isLoggedIn).toBe(false)
})
it('should initialed with loginErrorMessage to false', () => {
    const state = reducer()
    expect(state.loginErrorMessage).toBe(false)
})
it('should initialed with successfulRegisterMessage to false', () => {
    const state = reducer()
    expect(state.successfulRegisterMessage).toBe(false)
})

it('should set loginErrorMessage to true' +
    'when the LOGIN action is performed and credentials are wrong', () => {
    // const state= reducer(undefined, {
    //     type: LOGIN, credentials: {
    //         username: '',
    //         password: ''
    //     }
    // })
    const currentState = reducer()
    currentState.loginErrorMessage = false
    //state.loginErrorMessage = false
    const loginState = reducer(undefined, {type: LOGIN_ERROR})
    expect(loginState.loginErrorMessage).toBe(true)
})

it('should set isLoggedIn to true when the LOGIN action is performed ' +
    'and credentials are correct', () => {
    const state = reducer(undefined, {
        type: LOGIN, credentials: {
            username: 'sailaja',
            password: 'mypass'
        }
    })
    expect(state.isLoggedIn).toBe(true)

})

it('should initialed with isRegister false', () => {
    const state = reducer()
    expect(state.isRegister).toBe(false)
})

it('should set isRegister to true when the Register action is performed', () => {
    const currentState = reducer()
    expect(currentState.isRegister).toBe(false)
    const state = reducer(undefined, {type: REGISTER})
    expect(state.isRegister).toBe(true)
})
it('should set isRegister to false when the CREATE_USER action is performed ' +
    'and credentials are entered', () => {
    const state = reducer(undefined, {
        type: CREATE_USER, credentials: {
            username: '',
            password: ''
        }
    })
    expect(state.isRegister).toBe(false)
    expect(state.isLoggedIn).toBe(false)
})

it('should set isLoggedIn to false when the LOGOUT action is performed', () => {
    // const currentState = reducer()
    // currentState.isLoggedIn = true
    const state = reducer(undefined, {type: LOGOUT})
    expect(state.isLoggedIn).toBe(false)
})

it('should start w/ threadToAdd null', () => {
    const state = reducer()
    expect(state.threadToAdd).toBeNull()
})

it('should set threadToAdd when ADD_THREAD action is performed', () => {
    const state = reducer(undefined, {type: ADD_THREAD})
    const now = new Date()
    now.setTime(0)
    expect(state.threadToAdd).toStrictEqual({
        title: '',
        date: now,
        user: ''
    })
})

it('should set threadToAdd to null when CANCEL_ADD_THREAD is performed', () => {
    // const currentState = reducer()
    // currentState.threadToAdd = 'some thread'
    const state = reducer(undefined, {type: CANCEL_ADD_THREAD})
    expect(state.threadToAdd).toBeNull()
})

it('should add a thread with a unique id and set threadToAdd to null ' +
    'when APPLY_ADD_THREAD action is performed', () => {
    const existing = ['first']
    const thread = {title: 'my thread',posts:[]}
    const currentState = reducer()
    currentState.threads = existing
    const state = reducer(currentState, {type: APPLY_ADD_THREAD, thread})
    expect(state.threads).toStrictEqual([...existing, {...thread, id: expect.stringMatching(
            /[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/)}])
    expect(state.threadToAdd).toBeNull()
})

it('should start with threadToEdit null', () => {
    const state = reducer()
    expect(state.threadToEdit).toBeNull()
})

it('should remove a thread when DELETE_THREAD is performed', () => {
    const currentState = reducer()
    currentState.threads = [
        {id: 0, title: 'thread1'},
        {id: 1, title: 'thread2'},
        {id: 2, title: 'thread3'}
    ]
    const state = reducer(currentState, {type: DELETE_THREAD, id: 1})
    expect(state.threads).toStrictEqual([
        {id: 0, title: 'thread1'},
        {id: 2, title: 'thread3'}
    ])
})

it('should set threadToEdit when EDIT_THREAD is performed', () => {
    const thread = 'my thread'
    const state = reducer(undefined, {type: EDIT_THREAD, thread})
    expect(state.threadToEdit).toBe(thread)
})

it('should update all fields of a thread and set threadToEdit to null when APPLY_EDIT_THREAD is performed', () => {
    const currentState = reducer()
    currentState.thread = [
        {id: 0, title: 'thread1'},
        {id: 1, title: 'thread2'},
        {id: 2, title: 'thread3'}
    ]
    currentState.threadToEdit = {id: 1, title: 'new'}
    const state = reducer(currentState, {type: APPLY_EDIT_THREAD})
    expect(state.threads).toStrictEqual([
        {id: 0, title: 'thread1'},
        {id: 1, title: 'new'},
        {id: 2, title: 'thread3'}
    ])
    expect(state.threadToEdit).toBeNull()
})

it('should set threadToEdit to null when CANCEL_EDIT_THREAD is performed', () => {
    // const currentState = reducer()
    // currentState.threadToEdit = {title: 'thread title', date: new Date(), id: 0, user: 'user1' }
    const state = reducer(undefined, {type: CANCEL_EDIT_THREAD})
    expect(state.threadToEdit).toBeNull()
})

//apply add post
it('should set postToAdd when ADD_POST action is performed', () => {
    const thread = {
        id : 1
    }
    const loggedInUser = 'some user'
    const state = reducer({loggedInUser}, {type: ADD_POST, thread})
    const now = new Date()
    expect(state.postToAdd).toStrictEqual({
        message: '',
        user: 'some user',
        date: now
    })
    expect(state.postToThreadId).toBe(thread.id)
})
it('should set postToAdd and postToThreadId to null when CANCEL_ADD_POST is performed', () => {
    // const currentState = reducer()
    // currentState.postToAdd = {message: 'msg', user: 'user1', date: new Date() }
    // currentState.postToThreadId = 0
    const state = reducer(undefined, {type: CANCEL_ADD_POST})
    expect(state.postToAdd).toBeNull()
    expect(state.postToThreadId).toBeNull()
})
it('should set USERS state when users action is performed', () => {
    const existingUsers =[
        {username: 'user1', password: 'pass1'},
        {username: 'user2', password: 'pass2'}
        ]
    const user = {username: 'user3', password: 'pass3'}
    const currentState = reducer()
    currentState.users = existingUsers
    const state = reducer(currentState, {type: USERS, user})
    expect(state.users).toStrictEqual([...existingUsers, user])
})
it('should set POST_MESSAGES state when action is performed',() => {
    const existingMsgs =[
        {message: 'msg1'},
        {message: 'msg2'}
    ]
    const message = {message: 'msg3', date: new Date()}
    const currentState = reducer()
    currentState.messages = existingMsgs
    const state = reducer(currentState, {type: POST_MESSAGE, message:message})
    expect(state.messages).toStrictEqual([...existingMsgs, {...message, id: expect.stringMatching(
        /[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/)}])
})
it('should set APPLY_ADD_POST when clicked', () => {
    const currentState = reducer()
    currentState.threads = [{title: 'thread1', id: 1, posts: []}]
    const newPost = {message: 'post1'}
    const state = reducer(currentState, {type: APPLY_ADD_POST, post: newPost, threadId: 1})
    expect(state.threads).toStrictEqual([{title: 'thread1', id: 1, posts: [{...newPost, id: expect.stringMatching(
        /[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/)}]}])
})