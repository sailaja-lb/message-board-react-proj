import {v4} from "uuid";

export const LOGIN = 'files/LOGIN'
export const LOGIN_ERROR = 'files/LOGIN_ERROR'
export const REGISTER = 'files/REGISTER'
export const CREATE_USER = 'files/CREATE_USER'
export const LOGOUT = 'files/LOGOUT'
export const USERS = 'files/USERS'
export const ADD_THREAD = 'files/ADD_THREAD'
export const APPLY_ADD_THREAD = 'files/APPLY_ADD_THREAD'
export const CANCEL_ADD_THREAD = 'files/CANCEL_ADD_THREAD'
export const DELETE_THREAD = 'files/DELETE_THREAD'
export const EDIT_THREAD = 'files/EDIT_THREAD'
export const APPLY_EDIT_THREAD = 'files/APPLY_EDIT_THREAD'
export const CANCEL_EDIT_THREAD = 'files/CANCEL_EDIT_THREAD'
export const ADD_POST = 'files/ADD_POST'
export const APPLY_ADD_POST = 'files/APPLY_ADD_POST'
export const CANCEL_ADD_POST = 'files/APPLY_ADD_POST'
export const POST_MESSAGE = 'files/POST_MESSAGE'

const initialState = {
    isLoggedIn: false,
    isRegister: false,
    threadToEdit: null,
    threadToAdd: null,
    postToAdd: null,
    postToThreadId: null,
    users: [],
    threads: [],
    successfulRegisterMessage: false,
    loggedInUser: null,
    messages: [],
    loginErrorMessage: false
}

export default function reducer(state = initialState, action) {
    switch (action?.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                loggedInUser: action.credentials.username,
                loginErrorMessage: false,
                successfulRegisterMessage: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                loginErrorMessage: true,
                successfulRegisterMessage: false
            }
        case REGISTER:
            return {
                ...state,
                isRegister: true,
                loginErrorMessage: false,
                // successfulRegisterMessage: false
            }

        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.credentials],
                isRegister: false,
                isLoggedIn: false,
                successfulRegisterMessage: true
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                threadToAdd: null,
                threadToEdit: null,
                postToAdd: null,
                successfulRegisterMessage: false
            }
        case USERS:
            return {
                ...state,
                users: [...state.users, {...action.user}],
            }
        case ADD_THREAD:
            const now = new Date()
            now.setTime(0)
            return {
                ...state,
                threadToAdd: {title: '', date: now, user: ''}
            }
        case APPLY_ADD_THREAD:
            return {
                ...state,
                threads: [...state.threads, {...action.thread, posts:[], id: v4()}],
                threadToAdd: null
            }
        case CANCEL_ADD_THREAD:
            return {
                ...state,
                threadToAdd: null
            }
        case DELETE_THREAD:
            return {
                ...state,
                threads: state.threads.filter(thread => thread.id !== action.id)
            }

        case EDIT_THREAD:
            return {
                ...state,
                threadToEdit: action.thread
            }
        case APPLY_EDIT_THREAD:
            return {
                ...state,
                threads: state.threads.map(thread => thread.id === state.threadToEdit.id ? state.threadToEdit : thread),
                threadToEdit: null
            }

        case CANCEL_EDIT_THREAD:
            return {
                ...state,
                threadToEdit: null
            }
        case ADD_POST:
            return {
                ...state,
                postToAdd: {message: '', user: state.loggedInUser, date: new Date()},
                postToThreadId: action.thread.id
            }
        case APPLY_ADD_POST:
            return {
                ...state,
                threads: state.threads.map(thread => {
                    if (thread.id === action.threadId) {
                        thread.posts.push({...action.post, id:v4()})
                    }
                    return thread
                }),
                postToAdd: null,
                postToThreadId: null
            }
        case CANCEL_ADD_POST:
            return {
                ...state,
                postToAdd: null,
                postToThreadId: null
            }
        case POST_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {...action.message, date: new Date(), id: v4()}]
            }
        default:
            return state
    }
}