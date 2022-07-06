import {render, screen} from "@testing-library/react";
import Threads from "./threads";

// it('should show 2 threads', () => {
//     const state = {threads: ['thread1', 'thread2']}
//     const mockThread = ({thread}) => <>{thread}</>
//     render(<Threads _useSelector={fn => fn(state)} _Thread={mockThread}/>)
//     expect(screen.getByText(state.threads[0])).toBeInTheDocument()
//     expect(screen.getByText(state.threads[1])).toBeInTheDocument()
// })

it('should show AddThread at the beginning when adding a thread', () => {
    const state = {
        threads: [
            {title: 'thread1', date: 'some date', user: 'user1'},
            {title: 'thread2', date: new Date(), user: 'user1'}
        ],
        threadToAdd: {title: 'xyz', date: new Date(), user: 'user'}
    }
    const mockThread = ({thread}) => <div>{thread.title}</div>
    const mockAddThread = () => <div>{'xyz'}</div>
    render(<Threads _useSelector={fn => fn(state)} _Thread={mockThread} _AddThread={mockAddThread}/>)
    expect(screen.getByText('xyz')).toBeInTheDocument()
    expect(screen.getByText('thread1')).toBeInTheDocument()
    expect(screen.getByText(state.threads[1].title)).toBeInTheDocument()
})