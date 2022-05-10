import { render, screen } from '@testing-library/react';
import Login from './Login';
import userEvent from "@testing-library/user-event";
import {LOGIN, LOGIN_ERROR, REGISTER} from "../modules/files";


it('should show username and password inputs', () => {
    render(<Login _useDispatch={() => {}} _useSelector={() => {}}/>);
    const usernameElement = screen.getByPlaceholderText(/Username/);
    expect(usernameElement).toBeInTheDocument();
    const passwordElement = screen.getByPlaceholderText(/Password/);
    expect(passwordElement).toBeInTheDocument();
});

it('should show login button', () => {
    render(<Login _useDispatch={() => {}} _useSelector={() => {}}/>);
    const loginButton = screen.getByText(/Login/);
    expect(loginButton).toBeInTheDocument();
});

it('should show register button', () => {
    render(<Login _useDispatch={() => {}} _useSelector={() => {}}/>);
    const registerButton = screen.getByText(/Register/);
    expect(registerButton).toBeInTheDocument();
});

it('should dispatch LOGIN with typed creds when login button clicked', () => {
    const dispatch = jest.fn()
    const credentials = {
        username: 'user1',
        password: 'password1'
    }
    const users = [
        {username: 'user1', password: 'password1'},
        {username: 'user2', password: 'password2'},
        {username: 'user3', password: 'password3'},
    ]
    const state = {
        users
    }
    render(<Login _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)
    userEvent.type(screen.getByPlaceholderText('Username'), credentials.username)
    userEvent.type(screen.getByPlaceholderText('Password'), credentials.password)
    userEvent.click(screen.getByText('Login'))
    expect(dispatch).toHaveBeenCalledWith({type: LOGIN, credentials})
})

it('should dispatch REGISTER when Register button is clicked', () => {
    const dispatch = jest.fn()
    render(<Login _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Register'))
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER})
})

it('should dispatch LOGIN_ERROR when credentials entered are incorrect', () => {
    const dispatch = jest.fn()
    const credentials = {
        username: 'user3',
        password: 'password3'
    }
    const users = [
        {username: 'user1', password: 'password1'},
        {username: 'user2', password: 'password2'},
    ]
    const currState = {
        users
    }
    render(<Login _useDispatch={() => dispatch} _useSelector={fn => fn(currState)}/>)
    userEvent.type(screen.getByPlaceholderText('Username'), credentials.username)
    userEvent.type(screen.getByPlaceholderText('Password'), credentials.password)
    userEvent.click(screen.getByText('Login'))
    expect(dispatch).toHaveBeenCalledWith({type: LOGIN_ERROR})
})