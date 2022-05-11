import {useDispatch, useSelector} from "react-redux";
import {Card} from "react-bootstrap";
import {POST_MESSAGE} from "../modules/files";

export default function UsersList({_useSelector = useSelector, _useDispatch = useDispatch}) {
    const dispatch = _useDispatch();
    const loggedInUser = _useSelector(state => state.loggedInUser)
    const users = _useSelector(state => state.users)

    function createPersonalMessage(event, toUser) {
        event.preventDefault()
        const message = window.prompt(`Send message to ${toUser}`)
        if (message) {
            dispatch({type: POST_MESSAGE, message: {message, from: loggedInUser, to: toUser}})
        }
    }
    return (
        <Card>
            <Card.Header><h5>Users List</h5></Card.Header>
            <Card.Body>
                {users.map((user, index) => (loggedInUser !== user.username) ?
                    <div key={index}>
                        <a href={"#"} onClick={event => createPersonalMessage(event, user.username)}>
                            {user.username}
                        </a>
                    </div>:
                    null)}
            </Card.Body>
        </Card>
    )
}