import { render, screen } from '@testing-library/react';
import Register from './Register';
import userEvent from "@testing-library/user-event";
import {CREATE_USER, REGISTER_CANCEL} from "../modules/files";
import {act} from "react-dom/test-utils";


it('should show username and password input fields', () => {
    render(<Register _useDispatch={() => {}}/>);
    const userName = screen.getByPlaceholderText(/Username/);
    expect(userName).toBeInTheDocument();
    const passWord = screen.getByPlaceholderText(/Password/);
    expect(passWord).toBeInTheDocument();
});

it('should show Submit button', () => {
    render(<Register _useDispatch={() => {}}/>);
    const submitButton = screen.getByText(/Submit/);
    expect(submitButton).toBeInTheDocument();
});

it('should dispatch CREATE_USER with typed credentials when submit button clicked', () => {
    const mock = jest.fn()
    render(<Register _useDispatch={() => mock}/>)
    const credentials = {
        username: 'some username',
        password: 'some password'
    }
    // eslint-disable-next-line testing-library/no-unnecessary-act
    // act(()=> {userEvent.type(screen.getByPlaceholderText('Username'), credentials.username)
    //  userEvent.type(screen.getByPlaceholderText('Password'), credentials.password)
    //     userEvent.click(screen.getByText(/Submit/))})
    userEvent.type(screen.getByPlaceholderText('Username'), credentials.username)
    userEvent.type(screen.getByPlaceholderText('Password'), credentials.password)
    //userEvent.click(screen.getByText(/Submit/i))
    screen.getByText('Submit').click()
    expect(mock).toHaveBeenCalledWith({type: CREATE_USER, credentials})
})

it('should show cancel button', () => {
    render(<Register _useDispatch={() => {}}/>);
    const cancelButton = screen.getByText(/Submit/i);
    expect(cancelButton).toBeInTheDocument();
});

it('should dispatch LOGOUT when cancel button is clicked', () => {
    const dispatch = jest.fn()
    render(<Register _useDispatch={() => dispatch}/>)
    screen.getByText('Cancel').click()
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_CANCEL})
})