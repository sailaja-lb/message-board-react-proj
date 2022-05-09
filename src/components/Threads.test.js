import {render, screen} from "@testing-library/react";
import Threads from "./threads";

it('should show 2 threads', () => {
    const state = {threads: ['thread1', 'thread2']}
    const mockThread = ({thread}) => <>{thread}</>
    render(<Threads _useSelector={fn => fn(state)} _Thread={mockThread}/>)
    expect(screen.getByText(state.threads[0])).toBeInTheDocument()
    expect(screen.getByText(state.threads[1])).toBeInTheDocument()
})

it('should show AddThread at the beginning when adding a thread', () => {
    const state = {threads: ['thread1', 'thread2'], threadToAdd: '?'}
    const mockThread = ({thread}) => <div>{thread}</div>
    const addThreadText = 'Add Thread?'
    const mockAddThread = () => <div>{addThreadText}</div>
    render(<Threads _useSelector={fn => fn(state)} _Thread={mockThread} _AddThread={mockAddThread}/>)
    expect(screen.getByText(addThreadText)).toBeInTheDocument()
    expect(screen.getByText(state.threads[0])).toBeInTheDocument()
    expect(screen.getByText(state.threads[1])).toBeInTheDocument()
})