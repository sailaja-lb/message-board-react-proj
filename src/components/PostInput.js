import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {BsFileEarmarkPlus, BsXCircleFill} from "react-icons/bs";

export default function PostInput({post, onPostChange, onCancel, onApply}) {
    const { date, message } = post

    return <Card>
        <Card.Header>
            <Row className='align-items-center'>
                <Col xs='auto'>
                    <Button title='Apply' variant={"outline-success"} size='sm'
                            onClick={onApply}>
                        <BsFileEarmarkPlus/>
                    </Button>
                </Col>
                <Col xs='auto'>
                    <Button title='Cancel' variant={"outline-danger"} size='sm'
                            onClick={onCancel}>
                        <BsXCircleFill/>
                    </Button>
                </Col>
                <Col xs='auto'>
                    <Form.Control type='date' placeholder='Date'
                                  defaultValue={date.toISOString().substring(0, 10)}
                                  onChange={e => onPostChange({...post, date: new Date(e.target.value)})}/>
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <Form.Control as="textarea" rows={2} defaultValue={message}
                          placeholder='Post message'
                          onChange={e => onPostChange({...post, message: e.target.value})}/>
        </Card.Body>
    </Card>
}