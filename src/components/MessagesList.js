import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";

export default function MessagesList({_useSelector = useSelector}) {
    const loggedInUser = _useSelector(state => state.loggedInUser)
    const messages = _useSelector(state => state.messages)

    return (
        <Card>
            <Card.Header><h5>Messages</h5></Card.Header>
            <Card.Body>
                {messages.map(message => (loggedInUser === message.from || loggedInUser === message.to) ?
                    <div key={message.id}>
                        {message.message}
                        <div>
                            <sub>{message.from} {message.date.toLocaleString()}</sub>
                        </div>
                        <hr />
                    </div> :
                    null)}
            </Card.Body>
        </Card>
    )
}