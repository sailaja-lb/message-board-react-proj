import {render, screen} from "@testing-library/react";
import PostInput from "./PostInput";
import userEvent from "@testing-library/user-event";

test('should show input fields with current post data', () => {
    let post = {
        date: new Date(),
        message: 'Message1',
        user: ''
    }

    const setPost = jest.fn()
    const cancel = jest.fn()
    const apply = jest.fn()

    const {rerender} = render(<PostInput post={post} onPostChange={setPost} onCancel={cancel}
                                           onApply={apply}/>)

    expect(screen.getByDisplayValue(post.message)).toBeInTheDocument()
    expect(screen.getByDisplayValue(post.date.toISOString().substring(0,10))).toBeInTheDocument()
    expect(screen.getByTitle('Apply')).toBeInTheDocument()
    expect(screen.getByTitle('Cancel')).toBeInTheDocument()
    rerender(<PostInput post={post} setPost={setPost} cancel={cancel}/>)
})

it('should call onCancel when cancel button clicked', () => {
    let post = {
        date: new Date(),
        message: 'Message1',
        user: ''
    }

    const setPost = jest.fn()
    const cancel = jest.fn()
    const apply = jest.fn()

    render(<PostInput post={post} onPostChange={setPost} onCancel={cancel}
                        onApply={apply}/>)
    screen.getByTitle('Cancel').click()
    expect(cancel).toHaveBeenCalled()
})

it('should call onApply when the apply button is clicked', () => {
    let post = {
        date: new Date(),
        message: 'Message1',
        user: ''
    }
    const setPost = jest.fn()
    const cancel = jest.fn()
    const apply = jest.fn()

    render(<PostInput post={post} onPostChange={setPost} onCancel={cancel}
                        onApply={apply}/>)
    screen.getByTitle('Apply').click()
    expect(apply).toHaveBeenCalled()
})

// it('should dispatch EDIT_POST when any field changes', () => {
//     const postToEdit = {
//         date: new Date(),
//         message: 'Message1',
//         user: ''
//     }
//
//     const setPost = jest.fn()
//     const cancel = jest.fn()
//     const apply = jest.fn()
//
//     render(<PostInput post={postToEdit} onPostChange={setPost} onCancel={cancel}
//                         onApply={apply}/>)
//     const titleElement = screen.getByDisplayValue(postToEdit.message)
//     const dateElement = screen.getByDisplayValue(postToEdit.date.toISOString().substring(0,10))
//     const newText = 'A'
//     userEvent.type(titleElement, newText)
//     let post = {...postToEdit, message: postToEdit.message + newText}
//     expect(setPost).toHaveBeenCalledWith(post)
//
//     const yesterday = new Date()
//     yesterday.setDate(yesterday.getDate() - 1)
//     yesterday.setTime(0)
//     userEvent.type(dateElement, yesterday.toISOString().substring(0, 10))
//     post = {...postToEdit, date: yesterday}
//     expect(setPost).toHaveBeenCalledWith(post)
// })