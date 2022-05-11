import {render, screen} from "@testing-library/react";
import UsersList from "./UsersList";
import {POST_MESSAGE} from "../modules/files";
import userEvent from "@testing-library/user-event";


it('should display all the users except the loggedInUser',() => {
    const loggedInUser = 'user1'
    const state = {
        users: [{username: 'user1', password:''}, {username: 'user2', password:''}],
        loggedInUser
    }

    render(<UsersList _useDispatch={()=> {}} _useSelector={fn => fn(state)} />)
    expect(screen.getByText('user2')).toBeInTheDocument()
    expect(screen.queryByText('user1')).not.toBeInTheDocument()
})
it('should generate a window prompt and dispatch POST_MESSAGE when username link is clicked', () => {
    const dispatch = jest.fn()
    const message = {
        from: 'user1',
        message: 'hi user2',
        to: 'user2'
    }
    window.prompt = jest.fn().mockImplementation(() => 'hi user2')
    const loggedInUser = 'user1'
    const state = {
        users: [{username: 'user1', password:''}, {username: 'user2', password:''}],
        loggedInUser
    }
    render(<UsersList _useDispatch={() => dispatch} _useSelector={fn=> fn(state)} />)
    const userLink = screen.getByRole('link', { name: 'user2' });
    userEvent.click(userLink)
    expect(window.prompt).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({type: POST_MESSAGE, message})
});
