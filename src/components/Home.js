import {useDispatch, useSelector} from "react-redux";
import {LOGOUT, ADD_THREAD} from "../modules/files";
import {Button, Col, Row} from "react-bootstrap";
import Threads from "./Threads";
import UsersList from "./UsersList";
import MessagesList from "./MessagesList";

export default function Home({_useDispatch = useDispatch, _useSelector = useSelector,
                                 _Threads = Threads, _UsersList = UsersList, _MessagesList = MessagesList}) {
    const dispatch = _useDispatch()
    const loggedInUser = _useSelector(state => state.loggedInUser)

    return (
        <>
            <Row className='my-3 align-items-center'>
                <Col><Button title='Add Thread' onClick={() => dispatch({type: ADD_THREAD})} variant={"outline-primary"}>
                    ADD THREAD
                </Button></Col>
                <Col xs='auto'>Welcome {loggedInUser}</Col>
                <Col xs='auto'><Button title='Logout' onClick={() => dispatch({type: LOGOUT})} variant={"outline-secondary"}>
                    LOGOUT
                </Button></Col>
            </Row>
            <Row>
                <Col>
                    <_Threads />
                </Col>
                <Col xs lg="2">
                    <_UsersList />
                </Col>
                <Col xs lg="2">
                    <_MessagesList />
                </Col>
            </Row>
        </>
    )
}