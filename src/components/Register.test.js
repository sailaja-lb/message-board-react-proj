import { render, screen } from '@testing-library/react';
import Register from './Register';
import userEvent from "@testing-library/user-event";
import {LOGOUT} from "../modules/files";
import {CREATE_USER} from "../modules/files";


it('should show username and password inputs', () => {
    render(<Register _useDispatch={() => {}}/>);
    const userName = screen.getByPlaceholderText(/Username/);
    expect(userName).toBeInTheDocument();
    const passWord = screen.getByPlaceholderText(/Password/);
    expect(passWord).toBeInTheDocument();
});

it('should show Register button', () => {
    render(<Register _useDispatch={() => {}}/>);
    const registerButton = screen.getByText(/Submit/i);
    expect(registerButton).toBeInTheDocument();
});

it('should dispatch Register with typed credentials when register button clicked', () => {
    const mock = jest.fn()
    render(<Register _useDispatch={() => mock}/>)
    const credentials = {
        username: 'some username',
        password: 'some password'
    }
    userEvent.type(screen.getByPlaceholderText('Username'), credentials.username)
    userEvent.type(screen.getByPlaceholderText('Password'), credentials.password)
    userEvent.click(screen.getByText(/Submit/i))
    expect(mock).toHaveBeenCalledWith({type: CREATE_USER, credentials})
})

it('should show cancel button', () => {
    render(<Register _useDispatch={() => {}}/>);
    const cancelButton = screen.getByText(/Submit/i);
    expect(cancelButton).toBeInTheDocument();
});

it('should dispatch LOGOUT when cancel button clicked', () => {
    const dispatch = jest.fn()
    render(<Register _useDispatch={() => dispatch}/>)
    screen.getByText('Cancel').click()
    expect(dispatch).toHaveBeenCalledWith({type: LOGOUT})
})