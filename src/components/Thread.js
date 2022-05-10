import {Button, Card, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ADD_POST, DELETE_THREAD, EDIT_THREAD} from "../modules/files";
import EditThread from "./EditThread";
import Posts from "./Posts";
import {BsFillTrashFill, BsPencilSquare} from "react-icons/bs";

export default function Thread({
                                 thread, _useDispatch = useDispatch, _useSelector = useSelector,
                                 _EditThread = EditThread, _Posts=Posts
                             }) {
    const dispatch = _useDispatch()
    const editID = _useSelector(state => state.threadToEdit?.id)
    const loggedInUser = _useSelector(state => state.loggedInUser)
    const { id, title, user, date, posts=[] } = thread

    const StaticThread = () => <>
            <Card>
                <Card.Header>
                    <Row className='align-items-center'>
                        {user === loggedInUser ? (
                            <>
                                <Col xs='auto'>
                                    <Button title='Edit' variant={"outline-secondary"} size='sm'
                                            onClick={() => dispatch({type: EDIT_THREAD, thread})}>
                                        <BsPencilSquare/>
                                    </Button>
                                </Col>
                                <Col xs='auto'>
                                    <Button title='Delete' variant={"outline-danger"} size='sm'
                                            onClick={() => dispatch({type: DELETE_THREAD, id})}>
                                        <BsFillTrashFill/>
                                    </Button>
                                </Col>
                            </>
                            ) : null}
                        <Col xs='auto'>
                            <Button title='Post' variant={"outline-secondary"} size='sm'
                                    onClick={() => dispatch({type: ADD_POST, thread})}>
                                Add Post
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {title}
                    <div>
                        <sub>{user} </sub><sub> {date.toLocaleString()}</sub>
                    </div>
                </Card.Body>
            </Card>
            <_Posts thread={thread} />
        </>

    if (id === editID) {
        return <_EditThread/>
    } else {
        return StaticThread()
    }
}