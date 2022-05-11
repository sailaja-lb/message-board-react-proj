import {render, screen} from "@testing-library/react";
import ThreadInput from "./ThreadInput";
import userEvent from "@testing-library/user-event";

it('should show input fields with current thread data', () => {
    let thread = {
        date: new Date(),
        title: 'Title1'
    }
    const setThread = jest.fn()
    const cancel = jest.fn()
    const apply = jest.fn()

    const {rerender} = render(<ThreadInput thread={thread} onThreadChange={setThread} onCancel={cancel}
                                         onApply={apply}/>)

    expect(screen.getByDisplayValue(thread.title)).toBeInTheDocument()
    expect(screen.getByDisplayValue(thread.date.toISOString().substring(0,10))).toBeInTheDocument()
    expect(screen.getByTitle('Apply')).toBeInTheDocument()
    expect(screen.getByTitle('Cancel')).toBeInTheDocument()
    rerender(<ThreadInput thread={thread} setThread={setThread} cancel={cancel}/>)
})

it('should call onCancel when cancel button clicked', () => {
    let thread = {
        date: new Date(),
        title: 'Title1'
    }
    //const setThread = jest.fn()
    const cancel = jest.fn()
    //const apply = jest.fn()

    render(<ThreadInput thread={thread}
                        //onThreadChange={setThread}
                        onCancel={cancel}
                        //onApply={apply}
    />)
    screen.getByTitle('Cancel').click()
    expect(cancel).toHaveBeenCalled()
})

it('should call onApply when the apply button is clicked', () => {
    let thread = {
        date: new Date(),
        title: 'Title1',
    }
    const setThread = jest.fn()
    const cancel = jest.fn()
    const apply = jest.fn()

    render(<ThreadInput thread={thread} onThreadChange={setThread} onCancel={cancel}
                        onApply={apply}/>)
    screen.getByTitle('Apply').click()
    expect(apply).toHaveBeenCalled()
})

it('should dispatch EDIT_THREAD when any field changes', () => {
    const threadToEdit = {
        date: new Date(),
        title: 'Title1'
    }
    const setThread = jest.fn()
    const cancel = jest.fn()
    const apply = jest.fn()

    render(<ThreadInput thread={threadToEdit} onThreadChange={setThread} onCancel={cancel}
                        onApply={apply}/>)
    const titleElement = screen.getByDisplayValue(threadToEdit.title)
    const dateElement = screen.getByDisplayValue(threadToEdit.date.toISOString().substring(0,10))
    const newText = 'A'
    userEvent.type(titleElement, newText)
    let thread = {...threadToEdit, title: threadToEdit.title + newText}
    expect(setThread).toHaveBeenCalledWith(thread)

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setTime(0)
    userEvent.type(dateElement, yesterday.toISOString().substring(0, 10))
    thread = {...threadToEdit, date: yesterday}
    expect(setThread).toHaveBeenCalledWith(thread)
})