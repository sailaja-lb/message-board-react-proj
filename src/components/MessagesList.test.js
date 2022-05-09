import {render, screen} from '@testing-library/react'
import MessagesList from "./MessagesList";

it('should display MessagesList',() => {

    const state = {
        loggedInUser: 'user1',
        users: [{username: 'user1', password: ''}, {username: 'user2', password: ''}],
        messages: [{message: 'msg1', date: new Date(), from: 'user1', to: 'user2', id: 123}]
    }

    render(<MessagesList _useSelector={fn => fn(state)} />)
    expect(screen.getByText(state.messages[0].message)).toBeInTheDocument()
})