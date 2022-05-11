import {useState} from "react";
import {Button, Card, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {CREATE_USER, REGISTER_CANCEL} from "../modules/files";
import {BsLock, BsPerson} from "react-icons/bs";

function Register({_useDispatch = useDispatch}) {
    const dispatch = _useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submit, setSubmit] = useState(false)

    function sendCredentials() {
        dispatch({type: CREATE_USER, credentials: {username, password}})
    }

    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        //setSubmit(true)
        sendCredentials();
    }
    return <Card style={{borderWidth: 0}}>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-2">
                    <InputGroup.Text><BsPerson/></InputGroup.Text>
                    <Form.Control type='text' placeholder="Username" onChange={onUsernameChange}
                                  isInvalid={submit && !username}/>
                </InputGroup>

                <InputGroup className="mb-2">
                    <InputGroup.Text><BsLock/></InputGroup.Text>
                    <Form.Control type='password' placeholder="Password" onChange={onPasswordChange}
                                  isInvalid={submit && !password}/>
                </InputGroup>

                <Row className={'p-3'}>
                    <Button type={'submit'} variant={"primary"}>Submit</Button>
                </Row>
                <Row className={'p-3'}>
                    <Button type={'submit'} variant={"primary"} onClick={() => dispatch({type: REGISTER_CANCEL})}>Cancel</Button>
                </Row>
            </Form>
        </Card.Body>
    </Card>
}

export default Register;