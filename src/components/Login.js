import {useState} from "react";
import {Alert, Button, Card, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN, REGISTER, LOGIN_ERROR} from "../modules/files";
import {BsLock, BsPerson} from "react-icons/bs";

function Login({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const dispatch = _useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submit, setSubmit] = useState(false)
    const successfulRegisterMessage = _useSelector(state => state.successfulRegisterMessage)
    const loginErrorMessage = _useSelector(state => state.loginErrorMessage)
    const users = _useSelector(state => state.users)

    function validateCredentials() {
         const isCredentialsExist =  users.findIndex((user) =>
             user.username === username &&
            user.password === password) >= 0;

         if (isCredentialsExist) {
             dispatch({type: LOGIN, credentials: {username, password}})
         } else {
             dispatch({type: LOGIN_ERROR})
         }
    }

    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmit(true)
        validateCredentials();
    }

    return <Card style={{borderWidth: 0}}>
        <Card.Body>
            {successfulRegisterMessage ? (<Alert variant={"success"}>
                    Successfully Registered. Please login</Alert>) : null}
            {loginErrorMessage ? (<Alert variant={"danger"}>
                Failed to login</Alert>) : null}
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
                    <Button type={"submit"} variant={"primary"}>Login</Button>
                </Row>
                <Row className={'p-3'}>
                    <Button type={"button"} variant={"primary"} onClick={() => dispatch({type: REGISTER})}>Register</Button>
                </Row>
            </Form>
        </Card.Body>
    </Card>
}

export default Login