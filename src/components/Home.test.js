import {render, screen} from '@testing-library/react'
import Home from "./Home";
import {ADD_THREAD, LOGOUT} from "../modules/files";
import userEvent from "@testing-library/user-event";

it('should show Add Thread and Logout button', () => {
    const dispatch = jest.fn()
    render(<Home _useDispatch={() => dispatch} _useSelector={() => {}} _Threads={() =>{}} _UsersList={() =>{}} _MessagesList={() =>{}}/>)
    expect(screen.getByTitle('Add Thread')).toBeInTheDocument()
    expect(screen.getByTitle('Logout')).toBeInTheDocument()
})

it('should dispatch LOGOUT when logout button clicked', () => {
    const dispatch = jest.fn()
    render(<Home _useDispatch={() => dispatch} _useSelector={() => {}} _Threads={() =>{}} _UsersList={() =>{}} _MessagesList={() =>{}} />)
    screen.getByTitle('Logout').click()
    expect(dispatch).toHaveBeenCalledWith({type: LOGOUT})
})

it('should dispatch ADD_THREAD when add button clicked', () => {
    const dispatch = jest.fn()
    render(<Home _useDispatch={() => dispatch} _useSelector={() => {}} _Threads={() =>{}} _UsersList={() =>{}} _MessagesList={() =>{}}/>)
    screen.getByTitle('Add Thread').click()
    //userEvent.click(screen.getByTitle('Add Thread'))
    expect(dispatch).toHaveBeenCalledWith({type: ADD_THREAD})
})
it('should display _Threads, _UsersList, _MessagesList', () => {
    const expectedThreads = 'This is Threads'
    const expectedUsersList = 'This is Users'
    const expectedMessagesList = 'This is Messages'
    const state = {loggedInUser: 'username'}
    const mockThreads = () => <div>{expectedThreads}</div>
    const mockUsersList = () => <div>{expectedUsersList}</div>
    const mockMessagesList = () => <div>{expectedMessagesList}</div>

    render(<Home _Threads= {mockThreads} _UsersList = {mockUsersList}
                 _MessagesList = {mockMessagesList} _useDispatch={() => {}}
                 _useSelector={fn => fn(state)}/>)
    expect(screen.getByText(expectedThreads)).toBeInTheDocument()
    expect(screen.getByText(expectedUsersList)).toBeInTheDocument()
    expect(screen.getByText(expectedMessagesList)).toBeInTheDocument()
});